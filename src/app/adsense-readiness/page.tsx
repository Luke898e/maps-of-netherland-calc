import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adsenseChecklist } from "@/content/adsense-readiness-checklist";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "AdSense Readiness Checklist",
  description: "50+ point AdSense-style readiness checklist with pass/fix/pending status.",
  robots: {
    index: false,
    follow: false
  }
};

type ChecklistItem = (typeof adsenseChecklist)[number];
type ChecklistByCategory = Record<string, ChecklistItem[]>;

const statusLabel = {
  pass: "Pass",
  fixed: "Fix Applied",
  pending: "Pending Config"
} as const;

const statusClasses = {
  pass: "bg-[#e7f7ec] text-[#1c5e2d]",
  fixed: "bg-[#e8f1ff] text-[#13427c]",
  pending: "bg-[#fff3e2] text-[#8d5b16]"
} as const;

export default function AdsenseReadinessPage(): React.JSX.Element {
  const grouped = adsenseChecklist.reduce<ChecklistByCategory>((accumulator, item) => {
    if (!accumulator[item.category]) {
      accumulator[item.category] = [];
    }
    accumulator[item.category].push(item);
    return accumulator;
  }, {});
  const counts = {
    pass: adsenseChecklist.filter((item) => item.status === "pass").length,
    fixed: adsenseChecklist.filter((item) => item.status === "fixed").length,
    pending: adsenseChecklist.filter((item) => item.status === "pending").length
  };

  const pendingItems = adsenseChecklist.filter((item) => item.status === "pending");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-3 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">AdSense Review Track</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
          50+ Point Readiness Checklist
        </h1>
        <p className="leading-7 text-[#203754]">
          This page tracks a strict pre-review checklist spanning identity, content quality, consent, crawlability,
          technical stability, and monetization safety.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-[#dce8f9] bg-[#f7fbff] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4b6890]">Pass</p>
            <p className="text-2xl font-semibold text-[#0f3364]">{counts.pass}</p>
          </div>
          <div className="rounded-md border border-[#dce8f9] bg-[#f7fbff] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4b6890]">Fix Applied</p>
            <p className="text-2xl font-semibold text-[#0f3364]">{counts.fixed}</p>
          </div>
          <div className="rounded-md border border-[#dce8f9] bg-[#f7fbff] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4b6890]">Pending Config</p>
            <p className="text-2xl font-semibold text-[#0f3364]">{counts.pending}</p>
          </div>
        </div>
      </section>

      {Object.entries(grouped).map(([category, items]) => (
        <Card key={category} className="border-[#d4e3f8]">
          <CardHeader>
            <CardTitle className="text-xl text-[#0f3364]">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items?.map((item) => (
              <div key={item.id} className="rounded-md border border-[#e2ecfa] p-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <p className="font-medium text-[#153f77]">{item.check}</p>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClasses[item.status]}`}
                  >
                    {statusLabel[item.status]}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#466184]">{item.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card className="border-[#d4e3f8]">
        <CardHeader>
          <CardTitle className="text-xl text-[#0f3364]">Pending Before Submission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pendingItems.map((item) => (
            <p key={item.id} className="text-sm text-[#203754]">
              <span className="font-semibold">{item.check}</span>: {item.note}
            </p>
          ))}
          <p className="pt-2 text-sm text-[#203754]">
            Current site URL configuration: <span className="font-semibold">{siteConfig.siteUrl}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
