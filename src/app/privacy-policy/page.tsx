import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/privacy-policy`
  }
};

export default function PrivacyPolicyPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Privacy Policy</h1>
        <p className="leading-7 text-[#203754]">
          This platform is built to support privacy-first tax tooling and ad policy readiness. For users in the EEA,
          UK, and Switzerland, consent messaging is managed through a Google-certified consent workflow when advertising
          controls are active.
        </p>
        <p className="text-sm text-[#4b6890]">Effective date: 20 April 2026</p>
      </section>

      <section id="consent-settings" className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">TCF and Consent Framework</h2>
        <p className="leading-7 text-[#203754]">
          Consent controls are available via the global
          <span> </span>
          <span className="font-semibold">Manage Consent</span>
          <span> </span>
          action in the footer. Users can reopen and update choices at any time.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Consent messaging is implemented through Google Privacy and Messaging tooling.</li>
          <li>Ad delivery controls are configured to respect consent choices in applicable regions.</li>
          <li>Non-essential ad personalization is not intended to run without consent where required by law.</li>
        </ul>
        <p className="leading-7 text-[#203754]">
          For implementation details from Google, see
          <span> </span>
          <Link
            href="https://support.google.com/adsense/answer/13554116"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
          >
            CMP requirements for EEA, UK, and Switzerland
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Data Handling Summary</h2>
        <p className="leading-7 text-[#203754]">
          The calculators process user inputs client-side for immediate output and PDF generation. Do not enter
          sensitive personal identifiers unless your organization has approved the workflow under its own governance
          controls.
        </p>
        <p className="leading-7 text-[#203754]">
          Product issues and data requests can be submitted through the
          <span> </span>
          <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Support Page
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Data Categories and Purpose</h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Technical logs: used for security monitoring, uptime checks, and abuse prevention.</li>
          <li>Support submissions: used to investigate bugs, answer questions, and track release fixes.</li>
          <li>Consent preferences: used to honor ad and privacy choices in supported jurisdictions.</li>
          <li>Calculator inputs: processed in the browser for instant results and PDF exports.</li>
        </ul>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Cookies, Advertising, and Consent</h2>
        <p className="leading-7 text-[#203754]">
          Where advertising is enabled, this site uses Google AdSense scripts only when publisher and consent
          configuration are active. For EEA, UK, and Switzerland traffic, consent is managed through Google Funding
          Choices / Privacy and Messaging. Users can reopen the consent panel at any time via the Manage Consent action
          in the site footer.
        </p>
        <p className="leading-7 text-[#203754]">
          Essential site functions may still use minimal technical storage required for security and session continuity.
          Non-essential ad personalization should depend on consent status in configured regions.
        </p>
        <p className="leading-7 text-[#203754]">
          See also:
          <span> </span>
          <Link
            href="https://support.google.com/adsense/answer/9804260"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
          >
            Google consent and TCF guidance
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Retention, Rights, and Requests</h2>
        <p className="leading-7 text-[#203754]">
          Operational logs and support records are retained only as long as needed for service reliability, bug
          investigation, legal obligations, and audit accountability. You may request access, correction, or deletion of
          support-submitted personal data by contacting <span className="font-semibold">{siteConfig.contactEmail}</span>.
        </p>
        <p className="leading-7 text-[#203754]">
          We respond to privacy-related requests within a reasonable period and may ask for verification details before
          processing sensitive changes.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Policy Updates</h2>
        <p className="leading-7 text-[#203754]">
          Cookie-specific controls and categories are documented in the
          <span> </span>
          <Link href="/cookie-policy" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Cookie Policy
          </Link>
          .
        </p>
        <p className="leading-7 text-[#203754]">
          This policy is updated when legal requirements, advertising controls, or product data flows change. Material
          changes are reflected in the public
          <span> </span>
          <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Updates Changelog
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
