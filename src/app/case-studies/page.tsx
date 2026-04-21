import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { externalReferences } from "@/content/references";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Worked tax-screening scenarios for Nigeria and UK FIG workflows with assumptions, control checks, and follow-up actions.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/case-studies`
  }
};

const scenarios = [
  {
    title: "Nigeria SME Threshold Screening",
    summary:
      "A trading company with NGN 86 million turnover and NGN 18 million assessable profit wants to confirm whether it stays in the 0% CIT screening branch.",
    assumptions: [
      "Annual turnover is validated from reviewed management accounts.",
      "Sector is not Professional Services.",
      "No unresolved classification dispute exists for bundled contracts."
    ],
    controlChecks: [
      "Run threshold check with validated turnover and sector.",
      "Archive report with supporting schedules and sign-off date.",
      "Set a quarterly trigger to rerun if turnover exceeds the planning band."
    ],
    outcome:
      "Outcome remains in the zero-CIT screening branch under this tool model, with documentation retained for audit defensibility.",
    toolHref: "/tools/nigeria-zero-tax-auditor"
  },
  {
    title: "Nigeria Levy Exposure Planning",
    summary:
      "A services company with NGN 148 million turnover needs an estimate of development levy exposure for board cash planning.",
    assumptions: [
      "Assessable profit provided by finance is NGN 42 million.",
      "Input data reflects the same reporting period as turnover.",
      "Estimate is for planning and not a final filing computation."
    ],
    controlChecks: [
      "Apply levy branch only after turnover threshold is exceeded.",
      "Test sensitivity band with +10% and -10% assessable-profit scenarios.",
      "Record uncertainty notes for adviser escalation before filing."
    ],
    outcome:
      "Estimated development levy is NGN 1.68 million in the base case under the current tool formula.",
    toolHref: "/tools/nigeria-zero-tax-auditor"
  },
  {
    title: "UK FIG Eligibility Timeline Check",
    summary:
      "A founder arriving in the UK on 12 July 2026 needs to confirm whether a full 10-year non-resident history triggers 4-year FIG relief in the tool.",
    assumptions: [
      "Arrival date is captured from verified travel/legal records.",
      "All ten prior years are supported by residency evidence.",
      "No unresolved split-year or treaty complexity is pending."
    ],
    controlChecks: [
      "Complete all ten timeline years explicitly before submission.",
      "Confirm arrival date is on/after 6 April 2026 in this model.",
      "Archive outcome with timeline evidence for adviser review."
    ],
    outcome:
      "Tool returns eligibility with an exact relief-end date, supporting payroll and compensation timeline planning.",
    toolHref: "/tools/uk-fig-regime-eligibility"
  },
  {
    title: "Cross-Border Planning Pack",
    summary:
      "A globally active operator needs one board-ready pack combining Nigeria company screening and UK personal timeline screening.",
    assumptions: [
      "Both tools use data from the same reporting window.",
      "Open legal questions are explicitly marked as unresolved.",
      "Outputs are used as briefing artifacts before final advisory sign-off."
    ],
    controlChecks: [
      "Run both tools and export PDF reports on the same date.",
      "Attach assumptions log and unresolved issue register.",
      "Route high-impact uncertainties to external adviser review."
    ],
    outcome:
      "Leadership receives a single traceable decision pack with clearer risk boundaries and next actions.",
    toolHref: "/"
  }
] as const;

export default function CaseStudiesPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-4 surface-panel p-8">
        <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">Practical Implementation Library</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Worked Case Studies</h1>
        <p className="leading-7 text-[#203754]">
          These worked scenarios show how screening outputs should be used in real decision workflows. Each case
          includes assumptions, control checks, and follow-up actions so teams can move from numbers to defensible
          decisions.
        </p>
      </section>

      <section className="grid gap-5">
        {scenarios.map((scenario) => (
          <Card key={scenario.title} className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0f3364]">{scenario.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-7 text-[#203754]">{scenario.summary}</p>

              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Assumptions</p>
                <ul className="list-disc space-y-2 pl-5 text-[#203754]">
                  {scenario.assumptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Control Checks</p>
                <ul className="list-disc space-y-2 pl-5 text-[#203754]">
                  {scenario.controlChecks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border border-[#dbe7f8] bg-[#f7fbff] p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Outcome</p>
                <p className="mt-2 leading-7 text-[#203754]">{scenario.outcome}</p>
              </div>

              <Link
                href={scenario.toolHref}
                className="inline-flex items-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
              >
                Open Related Tool
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4 surface-panel p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Primary Source Set</h2>
        <p className="leading-7 text-[#203754]">
          These cases are educational examples and should be validated against primary institutional materials before
          final filing decisions.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {externalReferences.nigeria.map((ref) => (
            <Link
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
            >
              {ref.label}
            </Link>
          ))}
          {externalReferences.uk.map((ref) => (
            <Link
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
            >
              {ref.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

