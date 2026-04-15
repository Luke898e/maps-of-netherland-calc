"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function GlobalErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  return (
    <div className="mx-auto max-w-3xl space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
      <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">Runtime Error</p>
      <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Something went wrong</h1>
      <p className="leading-7 text-[#203754]">
        This error has been isolated to protect page stability. You can retry the page or submit an issue report.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button type="button" className="bg-[#12447d] text-white hover:bg-[#0f3968]" onClick={() => reset()}>
          Retry
        </Button>
        <Link
          href="/support"
          className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
        >
          Open Support
        </Link>
      </div>
    </div>
  );
}
