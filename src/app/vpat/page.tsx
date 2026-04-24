import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "VPAT",
  description:
    "Voluntary Product Accessibility Template summary and conformance notes for the Global Mobility and Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/vpat`
  }
};

export default function VpatPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 surface-panel p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
          VPAT (Accessibility Conformance Summary)
        </h1>
        <p className="leading-7 text-[#203754]">
          Effective date: <span className="font-semibold">24 April 2026</span>. This page summarizes accessibility
          conformance expectations for this product using a VPAT-style format.
        </p>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Product Scope</h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Homepage and global navigation components</li>
          <li>Nigeria and UK tax screening tools</li>
          <li>Blog pages and content templates</li>
          <li>Support, legal, and policy pages</li>
        </ul>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Conformance Overview</h2>
        <div className="overflow-x-auto rounded-lg border border-[#dbe7f8]">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[#f3f8ff] text-[#123f76]">
              <tr>
                <th className="px-4 py-3 font-semibold">Standard</th>
                <th className="px-4 py-3 font-semibold">Target Level</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#203754]">
              <tr className="border-t border-[#e2ecfa]">
                <td className="px-4 py-3">WCAG 2.2</td>
                <td className="px-4 py-3">Level AA</td>
                <td className="px-4 py-3">Supported with ongoing remediation cycle</td>
              </tr>
              <tr className="border-t border-[#e2ecfa]">
                <td className="px-4 py-3">Keyboard Navigation</td>
                <td className="px-4 py-3">Full interactive path</td>
                <td className="px-4 py-3">Supported</td>
              </tr>
              <tr className="border-t border-[#e2ecfa]">
                <td className="px-4 py-3">Alternative Text</td>
                <td className="px-4 py-3">Informative imagery</td>
                <td className="px-4 py-3">Supported</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Request Full Detail</h2>
        <p className="leading-7 text-[#203754]">
          For procurement or enterprise review, you can request a detailed accessibility response package by contacting
          us through the channels below.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>
            Email:{" "}
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              {siteConfig.contactEmail}
            </Link>
          </li>
          <li>
            Phone:{" "}
            <Link
              href={`tel:${siteConfig.contactPhoneDial}`}
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              {siteConfig.contactPhone}
            </Link>
          </li>
          <li>
            Accessibility statement:{" "}
            <Link
              href="/accessibility-statement"
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              /accessibility-statement
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
