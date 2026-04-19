import { createHash, randomUUID } from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { siteConfig } from "@/lib/site-config";

const supportTypes = ["bug", "feature", "question"] as const;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_GC_MS = 15 * 60_000;
const RATE_LIMIT_WINDOW_SECONDS = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
const UPSTASH_KEY_PREFIX = "support_rate_limit";
const rateLimitStore = new Map<string, { count: number; windowStart: number; lastSeen: number }>();

type RateLimitMode = "auto" | "memory" | "upstash" | "strict-global";

interface UpstashConfig {
  url: string;
  token: string;
}

const feedbackPayloadSchema = z.object({
  type: z.enum(supportTypes),
  tool: z.string().trim().min(1).max(120),
  pagePath: z.string().trim().min(1).max(300),
  title: z.string().trim().min(5).max(140),
  email: z.string().trim().email(),
  details: z.string().trim().min(30).max(4000),
  website: z.string().trim().max(0, "Invalid request.").optional().default("")
});

interface FeedbackPayload extends z.infer<typeof feedbackPayloadSchema> {
  ticketId: string;
  submittedAtIso: string;
}

function isHttpsUrl(value: string | undefined): value is string {
  return typeof value === "string" && value.startsWith("https://");
}

function resolveRateLimitMode(): RateLimitMode {
  const rawMode = process.env.SUPPORT_RATE_LIMIT_MODE?.trim().toLowerCase();
  if (
    rawMode === "memory" ||
    rawMode === "upstash" ||
    rawMode === "strict-global" ||
    rawMode === "auto"
  ) {
    return rawMode;
  }

  return "auto";
}

function getUpstashConfig(): UpstashConfig | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token || !isHttpsUrl(url)) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    token
  };
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const candidateIp = forwarded?.split(",")[0]?.trim() || realIp?.trim() || "unknown-ip";
  const userAgent = request.headers.get("user-agent")?.slice(0, 80) || "unknown-ua";
  return `${candidateIp}|${userAgent}`;
}

function buildUpstashKey(clientKey: string, now: number): string {
  const bucket = Math.floor(now / RATE_LIMIT_WINDOW_MS);
  const digest = createHash("sha256").update(clientKey).digest("hex").slice(0, 32);
  return `${UPSTASH_KEY_PREFIX}:${bucket}:${digest}`;
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === siteConfig.siteUrl;
  } catch {
    return false;
  }
}

function garbageCollectRateLimit(now: number): void {
  if (rateLimitStore.size < 2000) {
    return;
  }

  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.lastSeen > RATE_LIMIT_GC_MS) {
      rateLimitStore.delete(key);
    }
  }
}

function consumeMemoryRateLimit(key: string, now: number): boolean {
  garbageCollectRateLimit(now);
  const existing = rateLimitStore.get(key);

  if (!existing || now - existing.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now, lastSeen: now });
    return true;
  }

  existing.lastSeen = now;
  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, existing);
    return false;
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return true;
}

async function consumeUpstashRateLimit(
  clientKey: string,
  now: number,
  upstash: UpstashConfig
): Promise<boolean> {
  const key = buildUpstashKey(clientKey, now);
  const response = await fetch(`${upstash.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${upstash.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([["INCR", key], ["EXPIRE", key, RATE_LIMIT_WINDOW_SECONDS]])
  });

  if (!response.ok) {
    throw new Error(`Upstash rate-limit request failed with ${response.status}.`);
  }

  const payload = (await response.json()) as Array<{ result?: unknown; error?: string }>;
  const incrementResult = payload?.[0];
  if (incrementResult?.error) {
    throw new Error(`Upstash rate-limit error: ${incrementResult.error}`);
  }

  const count = Number(incrementResult?.result);
  if (!Number.isFinite(count)) {
    throw new Error("Upstash rate-limit response was invalid.");
  }

  return count <= RATE_LIMIT_MAX_REQUESTS;
}

async function forwardToWebhook(payload: FeedbackPayload): Promise<void> {
  const webhookUrl = process.env.SUPPORT_WEBHOOK_URL;
  if (!isHttpsUrl(webhookUrl)) {
    const sanitizedLog = {
      ticketId: payload.ticketId,
      submittedAtIso: payload.submittedAtIso,
      type: payload.type,
      tool: payload.tool,
      pagePath: payload.pagePath
    };
    console.info("Support feedback received (webhook not configured).", sanitizedLog);
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Support webhook returned ${response.status}.`);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ message: "Origin is not allowed for this endpoint." }, { status: 403 });
  }

  const now = Date.now();
  const clientKey = getClientKey(request);
  const rateLimitMode = resolveRateLimitMode();
  const upstashConfig = getUpstashConfig();

  let isAllowedByRateLimit = false;
  if (rateLimitMode === "memory") {
    isAllowedByRateLimit = consumeMemoryRateLimit(clientKey, now);
  } else if (rateLimitMode === "upstash" || rateLimitMode === "strict-global") {
    if (!upstashConfig) {
      return NextResponse.json(
        { message: "Global rate-limit backend is not configured." },
        { status: 503 }
      );
    }
    try {
      isAllowedByRateLimit = await consumeUpstashRateLimit(clientKey, now, upstashConfig);
    } catch {
      if (rateLimitMode === "strict-global") {
        return NextResponse.json(
          { message: "Support protection is temporarily unavailable. Please retry shortly." },
          { status: 503 }
        );
      }
      isAllowedByRateLimit = consumeMemoryRateLimit(clientKey, now);
    }
  } else if (upstashConfig) {
    try {
      isAllowedByRateLimit = await consumeUpstashRateLimit(clientKey, now, upstashConfig);
    } catch {
      isAllowedByRateLimit = consumeMemoryRateLimit(clientKey, now);
    }
  } else {
    isAllowedByRateLimit = consumeMemoryRateLimit(clientKey, now);
  }

  if (!isAllowedByRateLimit) {
    return NextResponse.json(
      { message: "Too many requests. Please wait a minute before submitting again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(RATE_LIMIT_WINDOW_SECONDS)
        }
      }
    );
  }

  let parsedBody: z.infer<typeof feedbackPayloadSchema>;

  try {
    const jsonBody = await request.json();
    const parsed = feedbackPayloadSchema.safeParse(jsonBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: parsed.error.issues[0]?.message ?? "Invalid feedback payload."
        },
        { status: 400 }
      );
    }
    parsedBody = parsed.data;
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const ticketId = `SUP-${new Date().getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const payload: FeedbackPayload = {
    ...parsedBody,
    ticketId,
    submittedAtIso: new Date().toISOString()
  };

  try {
    await forwardToWebhook(payload);
  } catch {
    return NextResponse.json(
      { message: "Feedback service is temporarily unavailable. Please retry in a few minutes." },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ticketId,
    status: "received"
  });
}
