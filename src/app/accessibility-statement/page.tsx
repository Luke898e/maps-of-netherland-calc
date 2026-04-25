import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility statement for the Global Mobility and Tax Suite, including WCAG approach, support channels, and remediation workflow.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/accessibility-statement`
  }
};

export default function AccessibilityStatementPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 surface-panel p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
          Accessibility Statement
        </h1>
        <p className="leading-7 text-[#203754]">
          Effective date: <span className="font-semibold">24 April 2026</span>. We are committed to making this
          website accessible for all visitors and continuously improving usability across devices and assistive
          technologies.
        </p>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Standards and Scope</h2>
        <p className="leading-7 text-[#203754]">
          Our goal is conformance with WCAG 2.2 Level AA for public-facing pages and core user journeys, including
          homepage navigation, calculator flows, blog pages, support form, and legal content.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Keyboard navigation is supported for all primary controls.</li>
          <li>Skip-link access is provided for direct jump to main content.</li>
          <li>Text alternatives are provided for informational images.</li>
          <li>Focus indicators are visible on interactive controls.</li>
        </ul>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Feedback and Support</h2>
        <p className="leading-7 text-[#203754]">
          If you experience an accessibility barrier, contact us and include the affected URL, browser/device details,
          and the action you were trying to complete.
        </p>
        <div className="rounded-md border border-[#d6e3f7] bg-[#f6faff] p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#2f527d]">Accessibility feedback channel</p>
          <p className="mt-2 leading-7 text-[#203754]">
            Primary accessibility contact:
            <span> </span>
            <Link
              href={`mailto:${siteConfig.accessibilityEmail}?subject=Accessibility%20Feedback`}
              className="font-semibold text-[#123f76] underline decoration-[#6f9ed8] underline-offset-2"
            >
              {siteConfig.accessibilityEmail}
            </Link>
            . We target an initial response within 2 business days.
          </p>
        </div>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>
            Email:{" "}
            <Link
              href={`mailto:${siteConfig.accessibilityEmail}?subject=Accessibility%20Feedback`}
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              {siteConfig.accessibilityEmail}
            </Link>
          </li>
          {siteConfig.contactPhone && siteConfig.contactPhoneDial ? (
            <li>
              Phone:{" "}
              <Link
                href={`tel:${siteConfig.contactPhoneDial}`}
                className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
              >
                {siteConfig.contactPhone}
              </Link>
            </li>
          ) : null}
          <li>
            Structured report form:{" "}
            <Link href="/contact#accessibility-feedback" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
              Contact accessibility form
            </Link>
          </li>
        </ul>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Remediation Process</h2>
        <p className="leading-7 text-[#203754]">
          Accessibility reports are triaged as priority quality issues. We track findings, validate fixes in staging,
          and publish user-visible changes through the public changelog.
        </p>
        <p className="leading-7 text-[#203754]">
          Latest update references are available on{" "}
          <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Updates
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
