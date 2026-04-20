import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/terms-of-use`
  }
};

export default function TermsOfUsePage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Terms of Use</h1>
        <p className="leading-7 text-[#203754]">
          Effective date: <span className="font-semibold">20 April 2026</span>. By using this site, you agree to use
          the calculators and documentation for educational and planning purposes only.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Scope of Service</h2>
        <p className="leading-7 text-[#203754]">
          Outputs are generated from user-provided inputs and predefined rule logic. The service is designed for
          screening and educational clarity. It does not file tax returns, submit data to authorities, or replace
          licensed professional advice.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">User Responsibilities</h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Provide accurate and lawful input data.</li>
          <li>Verify outputs against primary authority sources and adviser guidance before filing decisions.</li>
          <li>Do not use the service for unlawful automation, abuse, or security testing without permission.</li>
        </ul>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Jurisdiction and Disputes
        </h2>
        <p className="leading-7 text-[#203754]">
          This site is operated from Lagos, Nigeria. These terms are interpreted under the laws of the Federal
          Republic of Nigeria, except where mandatory consumer protection laws apply in your jurisdiction.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Corrections and Complaints
        </h2>
        <p className="leading-7 text-[#203754]">
          Support requests, corrections, and complaints can be submitted through
          <span> </span>
          <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Support
          </Link>
          . For formal editorial complaints, use the contact path described on
          <span> </span>
          <Link href="/contact" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Contact
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
