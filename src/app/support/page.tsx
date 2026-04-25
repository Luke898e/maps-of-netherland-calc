import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { SupportFeedbackForm } from "@/components/support-feedback-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Report bugs, request features, submit customer testimonials, and contact the maintainer for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/support`
  }
};

export default function SupportPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-3 surface-panel p-8">
        <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">Support and Feedback</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
          Report a Bug, Request a Feature, or Submit a Testimonial
        </h1>
        <p className="leading-7 text-[#203754]">
          Legitimate compliance tools improve through real-world feedback. Use this page to report issues, request
          enhancements, submit reproducible edge cases, or send customer testimonials with publication permission.
        </p>
      </section>

      <Suspense fallback={<p className="surface-panel p-6 text-[#203754]">Loading support form...</p>}>
        <SupportFeedbackForm />
      </Suspense>

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-xl text-[#0f3364]">Release Transparency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="leading-7 text-[#203754]">
            Track resolved issues and feature releases in the public changelog.
          </p>
          <Link
            href="/updates"
            className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
          >
            View Updates
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

