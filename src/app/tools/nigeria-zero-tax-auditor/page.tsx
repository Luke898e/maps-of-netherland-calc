import type { Metadata } from "next";

import { AdSenseScript } from "@/components/adsense-script";
import { AuthorBioCard } from "@/components/author-bio-card";
import { DocumentationArticle } from "@/components/documentation-article";
import { SupportLoopCard } from "@/components/support-loop-card";
import { NigeriaZeroTaxAuditorForm } from "@/components/tools/nigeria-zero-tax-auditor-form";
import { ToolMethodology } from "@/components/tool-methodology";
import { nigeriaGuideIntro, nigeriaGuideSections, nigeriaLatexTables } from "@/content/nigeria-guide";
import { externalReferences } from "@/content/references";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nigeria Zero-Tax Auditor",
  description:
    "Run 2026 Nigeria 0% CIT screening and development levy estimates with structured logic, PDF export, and technical compliance documentation."
};

const nigeriaJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "2026 Nigeria Zero-Tax Auditor",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  description:
    "A 2026 compliance screening tool for Nigeria zero-percent CIT eligibility and development levy planning calculations.",
  url: `${siteConfig.siteUrl}/tools/nigeria-zero-tax-auditor`,
  featureList: [
    "Zod-validated tax audit inputs",
    "Automatic eligibility outcome for 0% CIT",
    "Development levy estimate at 4% of assessable profit",
    "Downloadable PDF report"
  ]
};

export default function NigeriaZeroTaxAuditorPage(): React.JSX.Element {
  const methodologySteps = [
    "Validate annual turnover, asset value, assessable profit, and sector using Zod before any calculation runs.",
    "Apply the zero-CIT gate: turnover must be less than or equal to NGN 100,000,000 and sector must not be Professional Services.",
    "If the gate fails and turnover is above NGN 100,000,000, compute Development Levy using the assessable profit entered by the user.",
    "Return a deterministic result card and generate a PDF report with full inputs and outcomes for audit documentation.",
    "Display a compliance note that this output is a screening layer and should be confirmed with filing-ready working papers."
  ] as const;

  return (
    <div className="space-y-8">
      <AdSenseScript />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nigeriaJsonLd) }} />
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.15em] text-[#2f5f9d]">Nigeria Compliance Tool</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold text-[#0f3364]">
          2026 Nigeria Zero-Tax Auditor
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[#233d5d]">
          Validate whether a business qualifies for 0% CIT under the 2026 screening rule and estimate Development Levy
          impact where turnover crosses the statutory threshold.
        </p>
      </section>

      <NigeriaZeroTaxAuditorForm />

      <SupportLoopCard toolName="2026 Nigeria Zero-Tax Auditor" toolPath="/tools/nigeria-zero-tax-auditor" />

      <ToolMethodology
        title="Methodology: Nigeria Tool Logic"
        summary="This calculator is designed as a transparent rule engine. Every branch is visible, testable, and tied to a specific user input so finance teams can reproduce the same outcome during internal review."
        steps={methodologySteps}
        formula="Development Levy = 0.04 x Assessable Profit"
        references={externalReferences.nigeria}
      />

      <AuthorBioCard title="Who Built This Tool" />

      <DocumentationArticle
        heading="2026 NRS Technical Documentation and Filing Notes"
        intro={nigeriaGuideIntro}
        sections={nigeriaGuideSections}
        latexTables={nigeriaLatexTables}
      />
    </div>
  );
}
