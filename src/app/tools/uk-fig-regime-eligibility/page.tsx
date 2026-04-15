import type { Metadata } from "next";

import { AdSenseScript } from "@/components/adsense-script";
import { AuthorBioCard } from "@/components/author-bio-card";
import { DocumentationArticle } from "@/components/documentation-article";
import { SupportLoopCard } from "@/components/support-loop-card";
import { UkFigRegimeToolForm } from "@/components/tools/uk-fig-regime-tool-form";
import { ToolMethodology } from "@/components/tool-methodology";
import { ukFigGuideIntro, ukFigGuideSections, ukFigLatexTables } from "@/content/uk-fig-guide";
import { externalReferences } from "@/content/references";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "UK FIG Regime Eligibility Tool",
  description:
    "Evaluate 2026 UK Foreign Income and Gains regime eligibility, 10-year non-residency history, and exact relief expiry dates."
};

const ukFigJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "2026 UK FIG Regime Eligibility Tool",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  description:
    "A timeline-based tool for post-6 April 2026 UK FIG regime screening with exact 4-year relief expiry calculations.",
  url: `${siteConfig.siteUrl}/tools/uk-fig-regime-eligibility`,
  featureList: [
    "10-year residency timeline capture",
    "Eligibility checks aligned to post-6 April 2026 regime",
    "Automatic 4-year FIG relief expiry date",
    "Downloadable PDF report"
  ]
};

export default function UkFigRegimeEligibilityPage(): React.JSX.Element {
  const methodologySteps = [
    "Validate the arrival date and confirm that a full 10-year residency timeline has been supplied.",
    "Check transition timing: the arrival date must be on or after 6 April 2026 in this tool's policy model.",
    "Check residency condition: all 10 historical years must be marked non-resident.",
    "If both conditions pass, compute the exact relief end date using arrival date + 4 years - 1 day.",
    "Generate a deterministic result and exportable PDF summary for adviser review and record retention."
  ] as const;

  return (
    <div className="space-y-8">
      <AdSenseScript />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ukFigJsonLd) }} />
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.15em] text-[#2f5f9d]">UK Compliance Tool</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-[#0f3364]">
          2026 UK FIG Regime Eligibility
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[#233d5d]">
          Apply the post-Non-Dom 2026 eligibility conditions, check 10-year residency history, and compute exact
          dates for the 4-year foreign income and gains relief window.
        </p>
      </section>

      <UkFigRegimeToolForm />

      <SupportLoopCard toolName="2026 UK FIG Regime Eligibility Tool" toolPath="/tools/uk-fig-regime-eligibility" />

      <ToolMethodology
        title="Methodology: UK FIG Eligibility Logic"
        summary="This tool applies a strict timeline method so each eligibility decision can be audited. The objective is to make the decision path easy to verify before formal filing or treaty-credit analysis."
        steps={methodologySteps}
        formula="FIG End Date = (Arrival Date + 4 years) - 1 day"
        references={externalReferences.uk}
      />

      <AuthorBioCard title="Who Built This Tool" />

      <DocumentationArticle
        heading="FIG Regime Transition, IHT Tail, and Treaty Credit Guidance"
        intro={ukFigGuideIntro}
        sections={ukFigGuideSections}
        latexTables={ukFigLatexTables}
      />
    </div>
  );
}
