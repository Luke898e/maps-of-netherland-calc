import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Demo for Nigeria and UK Tax Suite",
  description:
    "Book a product demo and workflow review for the Global Mobility Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/book-demo`
  }
};

export default function BookDemoPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="surface-hero space-y-3 p-8 sm:p-10">
        <p className="section-kicker">Demo Booking</p>
        <h1 className="text-3xl font-semibold text-[#0f3364] sm:text-4xl">Book a Guided Product Demo</h1>
        <p className="body-copy">
          Tell us your use case and we will prepare a focused walkthrough for your team.
        </p>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <form action="/support" method="get" className="grid gap-4">
          <input type="hidden" name="type" value="question" />
          <input type="hidden" name="tool" value="Demo Booking" />
          <input type="hidden" name="path" value="/book-demo" />

          <label className="flex flex-col gap-1 text-sm text-[#203754]">
            Full Name
            <input
              type="text"
              name="name"
              required
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="Your full name"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-[#203754]">
            Work Email
            <input
              type="email"
              name="email"
              required
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="name@company.com"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-[#203754]">
            Company
            <input
              type="text"
              name="company"
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="Your company name"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-[#203754]">
            Team Size
            <select
              name="team_size"
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
            >
              <option value="1-5">1-5</option>
              <option value="6-20">6-20</option>
              <option value="21-50">21-50</option>
              <option value="51+">51+</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-[#203754]">
            Demo Focus
            <input
              type="text"
              name="title"
              required
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="Example: UK FIG timeline and payroll transition"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-[#203754]">
            Context
            <textarea
              name="details"
              rows={5}
              required
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="Tell us about your tax workflow, current blockers, and target timeline."
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
          >
            Submit Demo Request
          </button>
        </form>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Need Immediate Contact?</h2>
        <div className="mt-3 grid gap-2 text-sm">
          <Link href={`mailto:${siteConfig.contactEmail}`} className="text-[#17467f] hover:text-[#0f3364]">
            Email: {siteConfig.contactEmail}
          </Link>
          {siteConfig.contactPhone && siteConfig.contactPhoneDial ? (
            <Link href={`tel:${siteConfig.contactPhoneDial}`} className="text-[#17467f] hover:text-[#0f3364]">
              Phone: {siteConfig.contactPhone}
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
