import type { Metadata } from "next";
import Link from "next/link";

import { ChangelogTimeline } from "@/components/changelog-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changelogEntries } from "@/content/changelog";

export const metadata: Metadata = {
  title: "Updates and Changelog",
  description:
    "Version history and release notes for the 2026 Global Mobility & Tax Suite, including bug fixes and feature improvements."
};

export default function UpdatesPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-3 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">Product Maintenance Log</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Updates and Changelog</h1>
        <p className="leading-7 text-[#203754]">
          This page tracks product changes over time so users can verify active maintenance. We publish dated release
          entries for new features, policy alignment work, and bug-fix cycles.
        </p>
      </section>

      <ChangelogTimeline entries={changelogEntries} />

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-xl text-[#0f3364]">Need a Fix or Improvement?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="leading-7 text-[#203754]">
            Share bug reports and feature requests through the support channel so we can include them in the next
            release cycle.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
          >
            Open Support Page
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
