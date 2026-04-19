"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

const supportTypes = ["bug", "feature", "question"] as const;
type SupportType = (typeof supportTypes)[number];

const feedbackSchema = z.object({
  type: z.enum(supportTypes),
  tool: z.string().min(1, "Please provide the tool or page name."),
  pagePath: z.string().min(1, "Please provide the page path."),
  title: z.string().min(5, "Title should be at least 5 characters."),
  email: z.string().email("Please enter a valid email address."),
  details: z.string().min(30, "Please provide at least 30 characters of detail."),
  website: z.string().max(0, "Invalid request.").optional().default("")
});

interface FeedbackState {
  type: SupportType;
  tool: string;
  pagePath: string;
  title: string;
  email: string;
  details: string;
  website?: string;
}

const supportTypeLabel: Record<SupportType, string> = {
  bug: "Bug Report",
  feature: "Feature Request",
  question: "General Question"
};

export function SupportFeedbackForm(): React.JSX.Element {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const initialTool = searchParams.get("tool");
  const initialPath = searchParams.get("path");

  const [state, setState] = useState<FeedbackState>({
    type: initialType === "bug" || initialType === "feature" || initialType === "question" ? initialType : "bug",
    tool: initialTool ?? "Global Mobility & Tax Suite",
    pagePath: initialPath ?? "/",
    title: "",
    email: "",
    details: "",
    website: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const previewSubject = useMemo(() => `[${supportTypeLabel[state.type]}] ${state.title || "Untitled"}`, [state]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const parsed = feedbackSchema.safeParse(state);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        type: fieldErrors.type?.[0] ?? "",
        tool: fieldErrors.tool?.[0] ?? "",
        pagePath: fieldErrors.pagePath?.[0] ?? "",
        title: fieldErrors.title?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        details: fieldErrors.details?.[0] ?? ""
      });
      setSuccessMessage("");
      setSubmitError("");
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/support-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed.data)
      });

      const payload = (await response.json().catch(() => null)) as { ticketId?: string; message?: string } | null;
      if (response.ok) {
        const ticketSuffix = payload?.ticketId ? ` Ticket ID: ${payload.ticketId}.` : "";
        setSuccessMessage(`Report received successfully.${ticketSuffix}`);
        setSubmitError("");
        return;
      }

      if (response.status === 400 || response.status === 403 || response.status === 429 || response.status === 503) {
        setSubmitError(payload?.message ?? "Unable to submit right now. Please retry shortly.");
        return;
      }

      setSubmitError(
        payload?.message ?? `Unable to submit right now (HTTP ${response.status}). Please retry shortly.`
      );
      return;
    } catch {
      // Fallback below opens a prefilled email draft.
    } finally {
      setIsSubmitting(false);
    }

    const bodyLines = [
      `Type: ${supportTypeLabel[parsed.data.type]}`,
      `Tool/Page: ${parsed.data.tool}`,
      `Path: ${parsed.data.pagePath}`,
      `Reporter Email: ${parsed.data.email}`,
      "",
      "Details:",
      parsed.data.details
    ];

    const subject = encodeURIComponent(`[${supportTypeLabel[parsed.data.type]}] ${parsed.data.title}`);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    setSuccessMessage("Support endpoint is unavailable. A prefilled email draft was opened as fallback.");
    setSubmitError("");
  };

  return (
    <Card className="border-[#d4e3f8]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">Submit Bug or Feature Feedback</CardTitle>
        <CardDescription>
          Use this form to report issues and request improvements. Reports are submitted to the support endpoint, with
          automatic email fallback only when a network failure blocks API submission.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="type">Feedback Type</Label>
            <select
              id="type"
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              value={state.type}
              onChange={(event) => setState((prev) => ({ ...prev, type: event.target.value as SupportType }))}
            >
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="question">General Question</option>
            </select>
            {errors.type ? <p className="text-sm text-[#b54747]">{errors.type}</p> : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tool">Tool or Page</Label>
              <Input
                id="tool"
                value={state.tool}
                onChange={(event) => setState((prev) => ({ ...prev, tool: event.target.value }))}
                placeholder="2026 Nigeria Zero-Tax Auditor"
              />
              {errors.tool ? <p className="text-sm text-[#b54747]">{errors.tool}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pagePath">Page Path</Label>
              <Input
                id="pagePath"
                value={state.pagePath}
                onChange={(event) => setState((prev) => ({ ...prev, pagePath: event.target.value }))}
                placeholder="/tools/nigeria-zero-tax-auditor"
              />
              {errors.pagePath ? <p className="text-sm text-[#b54747]">{errors.pagePath}</p> : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Issue/Request Title</Label>
            <Input
              id="title"
              value={state.title}
              onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Development levy result does not update after edit"
            />
            {errors.title ? <p className="text-sm text-[#b54747]">{errors.title}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={state.email}
              onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@example.com"
            />
            {errors.email ? <p className="text-sm text-[#b54747]">{errors.email}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <textarea
              id="details"
              value={state.details}
              onChange={(event) => setState((prev) => ({ ...prev, details: event.target.value }))}
              placeholder="Include exact steps, expected result, actual result, and device/browser if relevant."
              className="min-h-36 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            {errors.details ? <p className="text-sm text-[#b54747]">{errors.details}</p> : null}
          </div>

          <div className="hidden" aria-hidden>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              value={state.website ?? ""}
              onChange={(event) => setState((prev) => ({ ...prev, website: event.target.value }))}
            />
          </div>

          <div className="rounded-md border border-[#dbe7f8] bg-[#f6f9ff] p-3 text-sm text-[#203754]">
            <p className="font-semibold text-[#17467f]">Email subject preview</p>
            <p className="mt-1">{previewSubject}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full justify-center bg-[#12447d] text-white hover:bg-[#0f3968] sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-center sm:w-auto"
              onClick={() => {
                setState({
                  type: "bug",
                  tool: "Global Mobility & Tax Suite",
                  pagePath: "/",
                  title: "",
                  email: "",
                  details: "",
                  website: ""
                });
                setSubmitError("");
                setSuccessMessage("");
              }}
            >
              Reset Form
            </Button>
          </div>

          {submitError ? <p className="text-sm text-[#b54747]">{submitError}</p> : null}
          {successMessage ? <p className="text-sm text-[#1d5a2b]">{successMessage}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
