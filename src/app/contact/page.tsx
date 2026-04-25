import type { Metadata } from "next";
import Link from "next/link";

import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { authorProfile } from "@/content/author-profile";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact and publisher identity page for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/contact`
  }
};

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4 surface-panel p-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Contact</h1>
        <p className="leading-7 text-[#203754]">
          This site is maintained as an educational tax resource by <span className="font-semibold">{authorProfile.name}</span>.
          For partnerships, corrections, and compliance workflow questions, email
          <span> </span>
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
          >
            {siteConfig.contactEmail}
          </Link>
          .
        </p>
        {siteConfig.contactPhone && siteConfig.contactPhoneDial ? (
          <p className="leading-7 text-[#203754]">
            Phone support is available by appointment at
            <span> </span>
            <Link
              href={`tel:${siteConfig.contactPhoneDial}`}
              className="font-semibold text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              {siteConfig.contactPhone}
            </Link>
            .
          </p>
        ) : (
          <p className="leading-7 text-[#203754]">
            Phone support is available after an initial email request, so all inquiries begin with a documented
            support thread.
          </p>
        )}
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Publisher Identity</h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>
            Maintainer: <span className="font-semibold">{authorProfile.name}</span>
          </li>
          <li>
            Role: <span className="font-semibold">{authorProfile.role}</span>
          </li>
          <li>
            Operating location: <span className="font-semibold">{authorProfile.location}</span>
          </li>
          <li>
            Jurisdiction focus: UK and Nigeria tax education and screening tools.
          </li>
          <li>
            Publisher domain: <span className="font-semibold">{siteConfig.siteUrl}</span>
          </li>
          <li>
            Correspondence address:{" "}
            <span className="font-semibold">
              {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion},{" "}
              {siteConfig.address.postalCode}, {siteConfig.address.addressCountry}
            </span>
          </li>
          <li>
            Public maintainer profile:{" "}
            <Link
              href={siteConfig.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              {siteConfig.githubProfile}
            </Link>
          </li>
          <li>
            Security disclosure policy:{" "}
            <Link
              href={`${siteConfig.siteUrl}/.well-known/security.txt`}
              className="font-semibold text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
            >
              /.well-known/security.txt
            </Link>
          </li>
        </ul>
        <div className="space-y-2 rounded-md border border-[#dbe7f8] bg-[#f7fbff] p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Social Profiles</p>
          <div className="flex flex-wrap gap-3 text-sm">
            {siteConfig.socialProfiles.slice(0, 4).map((profile) => (
              <Link
                key={profile.url}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
              >
                {profile.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactInquiryForm />

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Response-Time Commitment</h2>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Bug reports: initial response target within 1 business day.</li>
          <li>Content correction requests: response target within 2 business days.</li>
          <li>General inquiries: response target within 3 business days.</li>
        </ul>
        <p className="leading-7 text-[#203754]">
          For tracked bug reports and feature requests, use the
          <span> </span>
          <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Support Page
          </Link>
          . Released fixes are recorded on
          <span> </span>
          <Link href="/updates" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
            Updates Changelog
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Corrections and Complaint Escalation
        </h2>
        <p className="leading-7 text-[#203754]">
          If you identify a factual error, outdated legal interpretation, or misleading wording, submit a correction
          request through Support and mark it as a compliance correction. We review correction requests against primary
          sources and publish accepted changes in the dated changelog.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          <li>Initial correction triage target: within 2 business days.</li>
          <li>If accepted, change publication target: within 5 business days.</li>
          <li>Complex legal interpretation issues may require external specialist review before publication.</li>
        </ul>
        <p className="leading-7 text-[#203754]">
          For unresolved process concerns, escalate via email to
          <span> </span>
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2"
          >
            {siteConfig.contactEmail}
          </Link>
          <span> </span>
          with subject line: <span className="font-semibold">Formal Editorial Complaint</span>.
        </p>
      </section>
    </div>
  );
}

