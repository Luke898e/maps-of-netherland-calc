import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Educational-use disclaimer and liability boundary for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/disclaimer`
  }
};

export default function DisclaimerPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-8">
      <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Disclaimer</h1>
      <p className="leading-7 text-[#203754]">
        The calculators and written material on this website are provided for education and preliminary screening only.
        They are designed to help users understand policy logic and identify follow-up questions for qualified tax
        professionals.
      </p>
      <p className="leading-7 text-[#203754]">
        Nothing on this site constitutes legal, tax, accounting, or investment advice. Outputs are generated from
        user-entered values and predefined rule logic, and they may not reflect all legislative updates, treaty
        interactions, filing exceptions, or case-specific facts.
      </p>
      <p className="leading-7 text-[#203754]">
        Before making filing, structuring, or financial decisions, confirm your position with a licensed professional
        adviser in the relevant jurisdiction.
      </p>
      <p className="leading-7 text-[#203754]">
        To report a potential issue or request clarification, use the
        <span> </span>
        <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
          Support Page
        </Link>
        .
      </p>
    </div>
  );
}
