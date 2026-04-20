import type { Metadata } from "next";
import Link from "next/link";

import { changelogEntries } from "@/content/changelog";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "Editorial and quality control policy for tax content and tool logic.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/editorial-policy`
  }
};

export default function EditorialPolicyPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Editorial Policy</h1>
        <p className="leading-7 text-[#203754]">
          Effective date: <span className="font-semibold">20 April 2026</span>. This project follows an evidence-first
          workflow. Policy references are mapped into explicit logic branches, and every release is documented in a
          dated changelog.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Source Hierarchy and Review Model
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-[#203754]">
          <li>Primary authority publications are preferred over secondary summaries.</li>
          <li>Rule changes are versioned with release notes and publication dates.</li>
          <li>Long-form explanations are updated alongside calculator logic to prevent drift.</li>
          <li>Known limitations are disclosed in methodology and policy pages.</li>
        </ul>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Corrections, Complaints, and Conflicts
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-[#203754]">
          <li>Factual correction requests are triaged through the support workflow.</li>
          <li>Accepted corrections are logged in the public changelog with a release date.</li>
          <li>Editorial complaints can be escalated through the formal contact path.</li>
          <li>This site does not publish sponsored tax opinions presented as neutral analysis.</li>
        </ul>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Current Maintenance Signal
        </h2>
        <p className="leading-7 text-[#203754]">
          Most recent logged release: <span className="font-semibold">{changelogEntries[0]?.date}</span> (
          {changelogEntries[0]?.version}).
        </p>
        <p className="leading-7 text-[#203754]">
          View
          <span> </span>
          <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Updates
          </Link>
          <span> </span>
          or submit feedback through
          <span> </span>
          <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Support
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
