"use client";

import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(120).optional().default(""),
  subject: z.string().trim().min(5, "Please provide a short subject.").max(140),
  message: z.string().trim().min(40, "Please share at least 40 characters.").max(3000),
  website: z.string().trim().max(0, "Invalid request.").optional().default("")
});

interface InquiryState {
  fullName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  website: string;
}

export function ContactInquiryForm(): React.JSX.Element {
  const [state, setState] = useState<InquiryState>({
    fullName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    website: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const parsed = inquirySchema.safeParse(state);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        company: fieldErrors.company?.[0] ?? "",
        subject: fieldErrors.subject?.[0] ?? "",
        message: fieldErrors.message?.[0] ?? ""
      });
      setSuccessMessage("");
      setSubmitError("");
      return;
    }

    setErrors({});
    setSubmitError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const details = [
      `Name: ${parsed.data.fullName}`,
      `Company: ${parsed.data.company || "Not provided"}`,
      "",
      parsed.data.message
    ].join("\n");

    try {
      const response = await fetch("/api/support-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "question",
          tool: "Contact Inquiry Form",
          pagePath: "/contact",
          title: parsed.data.subject,
          email: parsed.data.email,
          details,
          website: parsed.data.website
        })
      });

      const payload = (await response.json().catch(() => null)) as { ticketId?: string; message?: string } | null;
      if (response.ok) {
        const ticketSuffix = payload?.ticketId ? ` Ticket ID: ${payload.ticketId}.` : "";
        setSuccessMessage(`Inquiry sent successfully.${ticketSuffix}`);
        setState({
          fullName: "",
          email: "",
          company: "",
          subject: "",
          message: "",
          website: ""
        });
        return;
      }

      setSubmitError(payload?.message ?? "Unable to send inquiry right now. Please try again shortly.");
    } catch {
      setSubmitError("Network issue detected. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-[#d4e3f8]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">Inquiry Form</CardTitle>
        <CardDescription>
          Use this form for partnerships, implementation support, or advisory workflow discussions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactFullName">Full Name</Label>
              <Input
                id="contactFullName"
                value={state.fullName}
                onChange={(event) => setState((prev) => ({ ...prev, fullName: event.target.value }))}
                placeholder="Your full name"
              />
              {errors.fullName ? <p className="text-sm text-[#b54747]">{errors.fullName}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Work Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={state.email}
                onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="you@company.com"
              />
              {errors.email ? <p className="text-sm text-[#b54747]">{errors.email}</p> : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactCompany">Company</Label>
            <Input
              id="contactCompany"
              value={state.company}
              onChange={(event) => setState((prev) => ({ ...prev, company: event.target.value }))}
              placeholder="Company name (optional)"
            />
            {errors.company ? <p className="text-sm text-[#b54747]">{errors.company}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactSubject">Subject</Label>
            <Input
              id="contactSubject"
              value={state.subject}
              onChange={(event) => setState((prev) => ({ ...prev, subject: event.target.value }))}
              placeholder="What do you need help with?"
            />
            {errors.subject ? <p className="text-sm text-[#b54747]">{errors.subject}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactMessage">Message</Label>
            <textarea
              id="contactMessage"
              value={state.message}
              onChange={(event) => setState((prev) => ({ ...prev, message: event.target.value }))}
              className="form-textarea"
              placeholder="Share context, timelines, and what outcome you want."
            />
            {errors.message ? <p className="text-sm text-[#b54747]">{errors.message}</p> : null}
          </div>

          <div className="hidden" aria-hidden>
            <Label htmlFor="contactWebsite">Website</Label>
            <Input
              id="contactWebsite"
              value={state.website}
              onChange={(event) => setState((prev) => ({ ...prev, website: event.target.value }))}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full justify-center bg-[#12447d] text-white hover:bg-[#0f3968] sm:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>

          {submitError ? <p className="text-sm text-[#b54747]">{submitError}</p> : null}
          {successMessage ? <p className="text-sm text-[#1d5a2b]">{successMessage}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}

