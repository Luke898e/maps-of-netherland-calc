"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

const supportTypes = ["bug", "feature", "question", "testimonial"] as const;
type SupportType = (typeof supportTypes)[number];

const feedbackSchema = z.object({
  type: z.enum(supportTypes),
  tool: z.string().min(1, "Please provide the tool or page name."),
  pagePath: z.string().min(1, "Please provide the page path."),
  title: z.string().min(5, "Title should be at least 5 characters."),
  email: z.string().email("Please enter a valid email address."),
  details: z.string().min(30, "Please provide at least 30 characters of detail."),
  fullName: z.string().max(120, "Please use 120 characters or fewer.").optional().default(""),
  roleTitle: z.string().max(120, "Please use 120 characters or fewer.").optional().default(""),
  companyName: z.string().max(120, "Please use 120 characters or fewer.").optional().default(""),
  publishConsent: z.boolean().optional().default(false),
  website: z.string().max(0, "Invalid request.").optional().default("")
}).superRefine((value, ctx) => {
  if (value.type === "testimonial") {
    if (!value.fullName || value.fullName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fullName"],
        message: "Please provide the customer full name for publication review."
      });
    }
    if (!value.roleTitle || value.roleTitle.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["roleTitle"],
        message: "Please provide a role or title."
      });
    }
    if (!value.companyName || value.companyName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "Please provide the company name."
      });
    }
    if (!value.publishConsent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["publishConsent"],
        message: "Written publication consent is required for named testimonial review."
      });
    }
    if (value.details.trim().length < 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["details"],
        message: "Please provide at least 50 characters for testimonial review."
      });
    }
  }
});

interface FeedbackState {
  type: SupportType;
  tool: string;
  pagePath: string;
  title: string;
  email: string;
  details: string;
  fullName?: string;
  roleTitle?: string;
  companyName?: string;
  publishConsent?: boolean;
  website?: string;
}

const supportTypeLabel: Record<SupportType, string> = {
  bug: "Bug Report",
  feature: "Feature Request",
  question: "General Question",
  testimonial: "Customer Testimonial"
};

export function SupportFeedbackForm(): React.JSX.Element {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const initialTool = searchParams.get("tool");
  const initialPath = searchParams.get("path");
  const initialTitle = searchParams.get("title");
  const initialEmail = searchParams.get("email");
  const initialDetails = searchParams.get("details");

  const [state, setState] = useState<FeedbackState>({
    type:
      initialType === "bug" ||
      initialType === "feature" ||
      initialType === "question" ||
      initialType === "testimonial"
        ? initialType
        : "bug",
    tool: initialTool ?? "Global Mobility & Tax Suite",
    pagePath: initialPath ?? "/",
    title: initialTitle ?? "",
    email: initialEmail ?? "",
    details: initialDetails ?? "",
    fullName: "",
    roleTitle: "",
    companyName: "",
    publishConsent: false,
    website: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [publicationSnippet, setPublicationSnippet] = useState<string>("");
  const [copyMessage, setCopyMessage] = useState<string>("");
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
        details: fieldErrors.details?.[0] ?? "",
        fullName: fieldErrors.fullName?.[0] ?? "",
        roleTitle: fieldErrors.roleTitle?.[0] ?? "",
        companyName: fieldErrors.companyName?.[0] ?? "",
        publishConsent: fieldErrors.publishConsent?.[0] ?? ""
      });
      setSuccessMessage("");
      setSubmitError("");
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setSubmitError("");
    setPublicationSnippet("");
    setCopyMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/support-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed.data)
      });

      const payload = (await response.json().catch(() => null)) as
        | { ticketId?: string; message?: string; publicationSnippet?: string | null }
        | null;
      if (response.ok) {
        const ticketSuffix = payload?.ticketId ? ` Ticket ID: ${payload.ticketId}.` : "";
        setSuccessMessage(`Report received successfully.${ticketSuffix}`);
        setPublicationSnippet(payload?.publicationSnippet ?? "");
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
      parsed.data.type === "testimonial" ? `Customer Name: ${parsed.data.fullName}` : "",
      parsed.data.type === "testimonial" ? `Role/Title: ${parsed.data.roleTitle}` : "",
      parsed.data.type === "testimonial" ? `Company: ${parsed.data.companyName}` : "",
      parsed.data.type === "testimonial" ? `Publication Consent: ${parsed.data.publishConsent ? "Yes" : "No"}` : "",
      "",
      "Details:",
      parsed.data.details
    ].filter(Boolean);

    const subject = encodeURIComponent(`[${supportTypeLabel[parsed.data.type]}] ${parsed.data.title}`);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    setSuccessMessage("Support endpoint is unavailable. A prefilled email draft was opened as fallback.");
    setPublicationSnippet("");
    setSubmitError("");
  };

  const onCopyPublicationSnippet = async (): Promise<void> => {
    if (!publicationSnippet) {
      return;
    }

    try {
      await navigator.clipboard.writeText(publicationSnippet);
      setCopyMessage("Publish block copied.");
    } catch {
      setCopyMessage("Copy failed. Select the block manually and copy.");
    }
  };

  return (
    <Card className="surface-panel">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">Submit Support Feedback or Testimonial</CardTitle>
        <CardDescription>
          Use this form to report issues, request improvements, or submit a named testimonial with publication consent.
          Submissions go to the support endpoint, with automatic email fallback only when API submission fails.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="type">Feedback Type</Label>
            <select
              id="type"
              className="form-select"
              value={state.type}
              onChange={(event) => setState((prev) => ({ ...prev, type: event.target.value as SupportType }))}
            >
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="question">General Question</option>
              <option value="testimonial">Customer Testimonial</option>
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
            <Label htmlFor="title">{state.type === "testimonial" ? "Testimonial Title" : "Issue/Request Title"}</Label>
            <Input
              id="title"
              value={state.title}
              onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
              placeholder={
                state.type === "testimonial"
                  ? "How the suite helped your workflow"
                  : "Development levy result does not update after edit"
              }
            />
            {errors.title ? <p className="text-sm text-[#b54747]">{errors.title}</p> : null}
          </div>

          {state.type === "testimonial" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="fullName">Customer Full Name</Label>
                <Input
                  id="fullName"
                  value={state.fullName ?? ""}
                  onChange={(event) => setState((prev) => ({ ...prev, fullName: event.target.value }))}
                  placeholder="Jane Doe"
                />
                {errors.fullName ? <p className="text-sm text-[#b54747]">{errors.fullName}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleTitle">Role/Title</Label>
                <Input
                  id="roleTitle"
                  value={state.roleTitle ?? ""}
                  onChange={(event) => setState((prev) => ({ ...prev, roleTitle: event.target.value }))}
                  placeholder="Head of Finance"
                />
                {errors.roleTitle ? <p className="text-sm text-[#b54747]">{errors.roleTitle}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company</Label>
                <Input
                  id="companyName"
                  value={state.companyName ?? ""}
                  onChange={(event) => setState((prev) => ({ ...prev, companyName: event.target.value }))}
                  placeholder="Acme Holdings Ltd"
                />
                {errors.companyName ? <p className="text-sm text-[#b54747]">{errors.companyName}</p> : null}
              </div>
            </div>
          ) : null}

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
              placeholder={
                state.type === "testimonial"
                  ? "Describe the workflow impact, measurable improvement, and the context in which you used the tools."
                  : "Include exact steps, expected result, actual result, and device/browser if relevant."
              }
              className="form-textarea"
            />
            {errors.details ? <p className="text-sm text-[#b54747]">{errors.details}</p> : null}
          </div>

          {state.type === "testimonial" ? (
            <div className="space-y-2 rounded-md border border-[#dbe7f8] bg-[#f6f9ff] p-3">
              <label className="inline-flex items-start gap-2 text-sm text-[#203754]">
                <input
                  type="checkbox"
                  checked={Boolean(state.publishConsent)}
                  onChange={(event) => setState((prev) => ({ ...prev, publishConsent: event.target.checked }))}
                  className="mt-1"
                />
                <span>
                  I confirm I have permission to publish this quote with the provided full name, role, and company on
                  the public testimonials page.
                </span>
              </label>
              {errors.publishConsent ? <p className="text-sm text-[#b54747]">{errors.publishConsent}</p> : null}
            </div>
          ) : null}

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
                  fullName: "",
                  roleTitle: "",
                  companyName: "",
                  publishConsent: false,
                  website: ""
                });
                setSubmitError("");
                setSuccessMessage("");
                setPublicationSnippet("");
                setCopyMessage("");
              }}
            >
              Reset Form
            </Button>
          </div>

          {submitError ? <p className="text-sm text-[#b54747]">{submitError}</p> : null}
          {successMessage ? <p className="text-sm text-[#1d5a2b]">{successMessage}</p> : null}
          {publicationSnippet ? (
            <div className="space-y-3 rounded-md border border-[#dbe7f8] bg-[#f6f9ff] p-3">
              <p className="text-sm font-semibold text-[#17467f]">Publish-ready testimonial block</p>
              <p className="text-sm text-[#35577f]">
                Paste this object into your approved testimonials list after verification.
              </p>
              <pre className="overflow-x-auto rounded-md border border-[#d8e6f8] bg-white p-3 text-xs text-[#203754]">
                {publicationSnippet}
              </pre>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button type="button" variant="outline" onClick={onCopyPublicationSnippet}>
                  Copy Publish Block
                </Button>
                {copyMessage ? <p className="text-sm text-[#35577f]">{copyMessage}</p> : null}
              </div>
            </div>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
