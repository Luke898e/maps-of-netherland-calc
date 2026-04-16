import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adsenseChecklist } from "@/content/adsense-readiness-checklist";
import { changelogEntries } from "@/content/changelog";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Status",
  description: "Operational status, maintenance cadence, and latest release signals for this project.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/status`
  },
  robots: {
    index: true,
    follow: true
  }
};

function formatIsoDate(dateInput: Date): string {
  const year = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, "0");
  const day = String(dateInput.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function StatusPage(): React.JSX.Element {
  const now = new Date();
  const todayIso = formatIsoDate(now);
  const release = changelogEntries[0];

  const readiness = {
    pass: adsenseChecklist.filter((item) => item.status === "pass").length,
    fixed: adsenseChecklist.filter((item) => item.status === "fixed").length,
    pending: adsenseChecklist.filter((item) => item.status === "pending").length
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-3 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">System Status</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Operational Overview</h1>
        <p className="leading-7 text-[#203754]">
          This page provides a quick trust snapshot for users: release cadence, support-loop status, and current quality
          controls as of <span className="font-semibold">{todayIso}</span>.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-[#d4e3f8]">
          <CardHeader>
            <CardTitle className="text-lg text-[#0f3364]">Published Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-[#203754]">
            <p className="font-semibold text-[#12447d]">No active incident in latest release notes</p>
            <p className="text-sm">This page reflects published updates, not live synthetic monitoring.</p>
          </CardContent>
        </Card>

        <Card className="border-[#d4e3f8]">
          <CardHeader>
            <CardTitle className="text-lg text-[#0f3364]">Latest Release</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-[#203754]">
            <p className="font-semibold">{release?.version ?? "N/A"}</p>
            <p className="text-sm">{release?.date ?? "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="border-[#d4e3f8]">
          <CardHeader>
            <CardTitle className="text-lg text-[#0f3364]">Support Loop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-[#203754]">
            <p className="font-semibold text-[#12447d]">Active</p>
            <p className="text-sm">Bug reporting and feature request paths are open.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-xl text-[#0f3364]">Quality Control Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-[#dce8f9] bg-[#f7fbff] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4b6890]">Verified</p>
            <p className="text-2xl font-semibold text-[#0f3364]">{readiness.pass}</p>
          </div>
          <div className="rounded-md border border-[#dce8f9] bg-[#f7fbff] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4b6890]">Improvements Applied</p>
            <p className="text-2xl font-semibold text-[#0f3364]">{readiness.fixed}</p>
          </div>
          <div className="rounded-md border border-[#dce8f9] bg-[#f7fbff] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4b6890]">Operational Follow-ups</p>
            <p className="text-2xl font-semibold text-[#0f3364]">{readiness.pending}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
