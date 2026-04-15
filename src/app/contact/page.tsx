import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page for the 2026 Global Mobility & Tax Suite."
};

export default function ContactPage(): React.JSX.Element {
  return (
    <section className="mx-auto max-w-3xl space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
      <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Contact</h1>
      <p className="leading-7 text-[#203754]">
        For advisory partnerships, implementation support, or compliance workflow questions, contact the platform team
        at <span className="font-semibold">{siteConfig.contactEmail}</span>.
      </p>
      <p className="leading-7 text-[#203754]">
        For product feedback, use the dedicated support workflow so reports are tracked:
        <span> </span>
        <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
          Support Page
        </Link>
        <span> </span>and
        <span> </span>
        <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
          Updates Changelog
        </Link>
        .
      </p>
    </section>
  );
}
