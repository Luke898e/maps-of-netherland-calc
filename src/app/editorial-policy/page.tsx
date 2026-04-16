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
    <div className="mx-auto max-w-4xl space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-8">
      <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Editorial Policy</h1>
      <p className="leading-7 text-[#203754]">
        This project follows an evidence-first editorial workflow. Policy references are mapped into explicit logic
        branches, and every release is documented in a dated changelog.
      </p>
      <ul className="list-disc space-y-2 pl-5 leading-7 text-[#203754]">
        <li>Rule changes are versioned with release notes.</li>
        <li>Long-form explanations are updated alongside calculator logic to avoid drift.</li>
        <li>Known limitations are disclosed in methodology sections and policy pages.</li>
        <li>User-reported issues are triaged through the support workflow.</li>
      </ul>
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
        <span> </span>or submit feedback through
        <span> </span>
        <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
          Support
        </Link>
        .
      </p>
    </div>
  );
}
