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
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 surface-panel p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Disclaimer</h1>
        <p className="leading-7 text-[#203754]">
          Effective date: <span className="font-semibold">20 April 2026</span>. The calculators and written material
          on this website are provided for education and preliminary screening only.
        </p>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">No Professional Advice</h2>
        <p className="leading-7 text-[#203754]">
          Nothing on this site constitutes legal, tax, accounting, or investment advice. Outputs are generated from
          user-entered values and predefined rule logic, and may not reflect all statutory updates, treaty interactions,
          filing exceptions, or case-specific evidence requirements.
        </p>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Limitation and Reliance
        </h2>
        <p className="leading-7 text-[#203754]">
          You remain responsible for validating inputs, assumptions, and interpretation against primary authority
          guidance and licensed adviser review. We do not warrant regulator acceptance, filing outcomes, or suitability
          for your specific circumstances.
        </p>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Correction and Clarification Requests
        </h2>
        <p className="leading-7 text-[#203754]">
          To report a potential issue or request clarification, use the
          <span> </span>
          <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Support Page
          </Link>
          <span> </span>
          and reference the exact URL and sentence requiring review.
        </p>
      </section>
    </div>
  );
}

