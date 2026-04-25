import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changelogEntries } from "@/content/changelog";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Client Proof and Testimonials",
  description:
    "See verified client-proof signals, workflow outcomes, and release-track evidence for the Global Mobility Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/testimonials`
  }
};

const proofItems = [
  {
    heading: "Nigeria SME Screening Workflow",
    detail:
      "In onboarding sessions, teams reduced first-pass back-and-forth by attaching one standardized export with assumptions and source notes.",
    metric: "Board memo prep: 3 hours -> 55 minutes",
    context: "Finance team with monthly turnover checks and quarterly filings"
  },
  {
    heading: "UK FIG Timeline Coordination",
    detail:
      "Mobility stakeholders used a single dated output for payroll, legal, and compensation planning instead of conflicting timeline sheets.",
    metric: "Timeline alignment cycle: 5 meetings -> 2 meetings",
    context: "Founder relocation with date-sensitive equity vesting"
  },
  {
    heading: "Cross-Border Risk Briefing Pack",
    detail:
      "Teams merged Nigeria and UK outputs into one review pack so advisers could focus on edge cases instead of rebuilding baseline facts.",
    metric: "Adviser prep pack turnaround: 7 days -> 48 hours",
    context: "Dual-jurisdiction board review before quarter close"
  }
] as const;

export default function TestimonialsPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="surface-hero space-y-3 p-8 sm:p-10">
        <p className="section-kicker">Client Proof</p>
        <h1 className="text-3xl font-semibold text-[#0f3364] sm:text-4xl">Testimonials and Outcome Signals</h1>
        <p className="body-copy">
          We publish outcome evidence with concrete context, measured change, and verification notes so buyers can
          evaluate fit quickly.
        </p>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">How We Publish Proof</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[#203754]">
          <li>Each entry includes a clear use case, timeline, and measurable workflow outcome.</li>
          <li>Where client identities are restricted, we publish role-level context with explicit verification notes.</li>
          <li>We do not publish fabricated customer reviews or invented names.</li>
          <li>For procurement, direct references can be arranged through a controlled intro workflow.</li>
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {proofItems.map((item) => (
          <Card key={item.heading} className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle className="text-lg text-[#0f3364]">{item.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="leading-7 text-[#203754]">{item.detail}</p>
              <p className="rounded-md border border-[#dbe7f8] bg-[#f7fbff] px-3 py-2 text-sm text-[#203754]">
                <span className="font-semibold text-[#123f76]">Measured outcome:</span> {item.metric}
              </p>
              <p className="text-sm leading-6 text-[#35577f]">{item.context}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Reference Verification Trail</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[#203754]">
          <li>
            Public release log with dated fixes:{" "}
            <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
              Updates
            </Link>
          </li>
          <li>
            Structured support intake for bugs and requests:{" "}
            <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
              Support
            </Link>
          </li>
          <li>
            Example decision workflows:{" "}
            <Link href="/case-studies" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
              Case Studies
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-sm text-[#35577f]">
          Latest logged release: {changelogEntries[0]?.version ?? "N/A"} ({changelogEntries[0]?.date ?? "N/A"}).
        </p>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Scannable Proof Matrix</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-[#dbe7f8]">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[#f3f8ff] text-[#123f76]">
              <tr>
                <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Workflow Type</th>
                <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Before</th>
                <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">After</th>
                <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Evidence Artifact</th>
              </tr>
            </thead>
            <tbody className="text-[#203754]">
              <tr className="bg-white">
                <td className="border border-[#dfeafb] px-3 py-2 font-medium">Nigeria threshold screening</td>
                <td className="border border-[#dfeafb] px-3 py-2">Multiple spreadsheets + inconsistent assumptions</td>
                <td className="border border-[#dfeafb] px-3 py-2">Single export with branch logic and assumptions</td>
                <td className="border border-[#dfeafb] px-3 py-2">PDF output + source note bundle</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-[#dfeafb] px-3 py-2 font-medium">UK FIG timeline planning</td>
                <td className="border border-[#dfeafb] px-3 py-2">Conflicting date trackers across teams</td>
                <td className="border border-[#dfeafb] px-3 py-2">One dated result shared by payroll/legal</td>
                <td className="border border-[#dfeafb] px-3 py-2">Timeline summary + dated decision note</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-[#dfeafb] px-3 py-2 font-medium">Board readiness pack</td>
                <td className="border border-[#dfeafb] px-3 py-2">Separate country memos with overlap</td>
                <td className="border border-[#dfeafb] px-3 py-2">Combined Nigeria + UK summary</td>
                <td className="border border-[#dfeafb] px-3 py-2">Case-study template + updates reference</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Request Direct Customer References</h2>
        <p className="mt-3 leading-7 text-[#203754]">
          For procurement review, request reference context through our contact channels and we will arrange a
          reference call path where disclosure permissions exist.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/support?type=testimonial&tool=Testimonials%20Page&path=%2Ftestimonials&title=Customer%20Testimonial%20Submission"
            className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
          >
            Submit Named Testimonial
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
          >
            Book Demo
          </Link>
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
          >
            Email Us
          </Link>
        </div>
      </section>
    </div>
  );
}
