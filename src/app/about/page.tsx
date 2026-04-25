import type { Metadata } from "next";
import Link from "next/link";

import { AuthorBioCard } from "@/components/author-bio-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changelogEntries } from "@/content/changelog";
import { externalReferences } from "@/content/references";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Author profile, editorial methodology, and source policy for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`
  }
};

export default function AboutPage(): React.JSX.Element {
  const lastUpdated = changelogEntries[0]?.date ?? "Not available";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-3 surface-panel p-8">
        <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">About This Project</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Experience and Method</h1>
        <p className="leading-7 text-[#203754]">
          This website is intentionally built as an educational tax resource, not a black-box calculator. The two core
          tools expose each decision branch, each threshold, and each output assumption so users can review logic before
          acting on it. That design is deliberate: in tax compliance, explainability is a trust feature.
        </p>
      </section>

      <AuthorBioCard title="Author and Maintainer" />

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0f3364]">Methodology and Editorial Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 leading-7 text-[#203754]">
          <p>
            Every tool in this suite is developed with the same workflow. First, policy inputs are converted into
            explicit rule statements. Second, the rule statements are implemented as typed logic functions with strict
            Zod validation at the input boundary. Third, result messages are written to match the exact branch that was
            triggered so users can audit cause and effect without reading source code.
          </p>
          <p>
            The platform is versioned and build-tested using reproducible Next.js App Router builds. Documentation and
            calculators are maintained together so that logic and explanatory text do not drift. This prevents a common
            low-trust pattern where long-form content says one thing while the tool computes something else.
          </p>
          <p>
            We also maintain a transparent boundary policy. These tools are built for screening and educational use.
            They do not replace jurisdiction-specific tax advice, and they do not submit returns to any authority.
            Where facts are incomplete or edge-case heavy, users should treat outputs as a briefing artifact for a
            qualified adviser.
          </p>
          <p>
            Last editorial review: <span className="font-semibold">{lastUpdated}</span>.
          </p>
        </CardContent>
      </Card>

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0f3364]">Public Accountability and Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 leading-7 text-[#203754]">
          <p>
            Trust for this project is built through public artifacts, not ranking claims. Users can verify author identity,
            review dated releases, check source references, and submit correction requests through dedicated channels.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Author verification links and profile references are published on this site.</li>
            <li>
              Version changes are logged with release dates in
              <span> </span>
              <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
                Updates
              </Link>
              .
            </li>
            <li>
              Editorial standards and correction governance are documented in
              <span> </span>
              <Link
                href="/editorial-policy"
                className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
              >
                Editorial Policy
              </Link>
              .
            </li>
            <li>
              Users can submit factual corrections via
              <span> </span>
              <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
                Support
              </Link>
              <span> </span>
              and receive tracked follow-up.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0f3364]">Primary Sources and Verification Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-7 text-[#203754]">
            The links below are the baseline references used for policy context and continuous updates. We cite
            government-first sources where available and clearly label third-party summaries used for cross-checking.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">UK References</p>
            <ul className="space-y-1">
              {externalReferences.uk.map((reference) => (
                <li key={reference.url}>
                  <Link
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
                  >
                    {reference.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Nigeria References</p>
            <ul className="space-y-1">
              {externalReferences.nigeria.map((reference) => (
                <li key={reference.url}>
                  <Link
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
                  >
                    {reference.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0f3364]">Support and Update Cadence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 leading-7 text-[#203754]">
          <p>
            We treat this project as a maintained product. Bugs and feature requests are triaged through the support
            channel, and resolved work is published in the changelog with concrete release dates.
          </p>
          <p>
            Latest release in this log: <span className="font-semibold">{changelogEntries[0]?.date}</span> (
            {changelogEntries[0]?.version}).
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/support"
              className="inline-flex w-full items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968] sm:w-auto"
            >
              Open Support
            </Link>
            <Link
              href="/updates"
              className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
            >
              View Changelog
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

