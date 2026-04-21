import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Consent and Advertising Controls",
  description:
    "Consent framework and ad personalization controls for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/consent`
  }
};

export default function ConsentPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 surface-panel p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
          Consent and Advertising Controls
        </h1>
        <p className="leading-7 text-[#203754]">
          This page explains how consent is handled for advertising and non-essential storage where legally required.
          Users in the EEA, UK, and Switzerland can manage choices via the global Manage Consent control in the site
          footer.
        </p>
        <p className="text-sm text-[#4b6890]">Effective date: 20 April 2026</p>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          What this control covers
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Ad personalization and non-essential ad storage preferences.</li>
          <li>Consent updates and revocation where required by applicable law.</li>
          <li>Region-aware messaging for users in consent-regulated markets.</li>
        </ul>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Policy references
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>
            <Link
              href="https://support.google.com/adsense/answer/13554116"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              Google CMP requirements for EEA, UK, and Switzerland
            </Link>
          </li>
          <li>
            <Link
              href="https://support.google.com/adsense/answer/9804260"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              Google consent and TCF implementation guidance
            </Link>
          </li>
        </ul>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Related policies
        </h2>
        <p className="leading-7 text-[#203754]">
          For full data handling and cookie categories, see the
          <span> </span>
          <Link href="/privacy-policy" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Privacy Policy
          </Link>
          <span> </span>
          and
          <span> </span>
          <Link href="/cookie-policy" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Cookie Policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

