import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

const supportTypes = ["bug", "feature", "question"] as const;

const feedbackPayloadSchema = z.object({
  type: z.enum(supportTypes),
  tool: z.string().trim().min(1).max(120),
  pagePath: z.string().trim().min(1).max(300),
  title: z.string().trim().min(5).max(140),
  email: z.string().trim().email(),
  details: z.string().trim().min(30).max(4000)
});

interface FeedbackPayload extends z.infer<typeof feedbackPayloadSchema> {
  ticketId: string;
  submittedAtIso: string;
}

function isHttpsUrl(value: string | undefined): value is string {
  return typeof value === "string" && value.startsWith("https://");
}

async function forwardToWebhook(payload: FeedbackPayload): Promise<void> {
  const webhookUrl = process.env.SUPPORT_WEBHOOK_URL;
  if (!isHttpsUrl(webhookUrl)) {
    console.info("Support feedback received (webhook not configured).", payload);
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
