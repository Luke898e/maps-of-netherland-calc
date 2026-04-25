import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing and Plans for Nigeria and UK Tax Tools",
  description:
    "Compare plans for the Global Mobility Tax Suite and choose the right level for founders, finance teams, and advisors.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/pricing`
  }
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    bestFor: "Solo founders and early teams",
    points: [
      "Access to both core calculators",
      "Basic report export",
      "Community-level support response"
    ],
    ctaLabel: "Start Free",
    ctaHref: "/tools/nigeria-zero-tax-auditor"
  },
  {
    name: "Team",
    price: "From GBP 49/mo",
    bestFor: "Growing finance and mobility teams",
    points: [
      "Everything in Starter",
      "Priority support queue",
      "Implementation review call each quarter"
    ],
    ctaLabel: "Book Team Demo",
    ctaHref: "/book-demo"
  },
  {
    name: "Advisory",
    price: "Custom",
    bestFor: "Advisory firms and regulated workflows",
    points: [
      "Everything in Team",
      "Custom rollout and governance setup",
      "Dedicated onboarding and SLA pathway"
    ],
    ctaLabel: "Request Proposal",
    ctaHref: "/contact"
  }
] as const;

export default function PricingPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-hero space-y-3 p-8 sm:p-10">
        <p className="section-kicker">Pricing</p>
        <h1 className="text-3xl font-semibold text-[#0f3364] sm:text-4xl">
          Plans for Nigeria and UK Tax Decision Teams
        </h1>
        <p className="body-copy">
          Pick the plan that fits your stage. Start free, then move to team workflows when you need stronger support
          and implementation depth.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="border-[#d4e3f8]">
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">{plan.name}</p>
              <CardTitle className="text-3xl text-[#0f3364]">{plan.price}</CardTitle>
              <p className="text-sm text-[#35577f]">{plan.bestFor}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc space-y-2 pl-5 text-[#203754]">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link
                href={plan.ctaHref}
                className="inline-flex w-full items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
              >
                {plan.ctaLabel}
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Need Help Choosing?</h2>
        <p className="mt-3 leading-7 text-[#203754]">
          If you are unsure which plan is right, book a short call and we will map your stage, team size, and reporting
          needs.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/book-demo"
            className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
          >
            Book Demo
          </Link>
          <Link
            href="/testimonials"
            className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
          >
            See Client Proof
          </Link>
        </div>
      </section>
    </div>
  );
}

