import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const hasFundingChoicesScript = Boolean(process.env.NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL);

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/cookie-policy`
  }
};

export default function CookiePolicyPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Cookie Policy</h1>
        <p className="leading-7 text-[#203754]">
          This page explains how cookies and related storage technologies are used on the 2026 Global Mobility & Tax
          Suite.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Cookie Categories</h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>
            Strictly necessary cookies: required for core security, navigation integrity, and basic service operation.
          </li>
          <li>
            Preference cookies: used to remember consent and related user choices where supported by configuration.
          </li>
          <li>
            Advertising cookies: used only when AdSense and consent configuration are active for the relevant region.
          </li>
        </ul>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Consent and Control</h2>
        <p className="leading-7 text-[#203754]">
          Consent preferences can be updated via the Manage Consent action in the footer.
          <span> </span>
          CMP script detected: <span className="font-semibold">{hasFundingChoicesScript ? "Yes" : "No"}</span>.
        </p>
        <p className="leading-7 text-[#203754]">
          For users in the EEA, UK, and Switzerland, consent collection should run through a configured Google-certified
          consent workflow before non-essential ad storage is used.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">More Information</h2>
        <p className="leading-7 text-[#203754]">
          For full data-handling details, see the
          <span> </span>
          <Link href="/privacy-policy" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Privacy Policy
          </Link>
          . Product maintenance and policy updates are posted on
          <span> </span>
          <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Updates
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
