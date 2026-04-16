export const nigeriaGuideIntro =
  "This reference guide explains how the 2026 Nigeria Revenue Service (NRS) small-business tax framework is modeled in this auditor. It is designed for finance leads, founders, accountants, and mobility advisers who need a high-confidence screening view before preparing statutory filings. The guidance below does not replace legal advice, but it maps each key decision point so users can document assumptions, identify data gaps, and reduce filing risk.";

export const nigeriaGuideSections = [
  {
    title: "1. 2026 NRS policy context and filing intent",
    paragraphs: [
      "The 2026 NRS regime continues the policy objective of reducing compliance friction for growth-stage businesses while preserving stronger anti-avoidance controls for high-margin and advisory-heavy sectors. In practical terms, the NRS expects businesses to prove not only turnover size but also the character of income. The same turnover level can receive different treatment when facts suggest a professional-services profile rather than a trading or production profile.",
      "For digital-first companies, one recurring issue is that service contracts, software licensing, and embedded advisory support can be blended in one invoice stream. NRS audit teams generally evaluate substance over invoice labels, so documentation quality matters. This tool therefore asks for sector classification explicitly and highlights the exclusion risk attached to professional services. The objective is to prompt evidence gathering early, before annual returns are prepared.",
      "Governance teams should also align this outcome with management accounts and board reporting calendars. A common failure pattern is to run tax qualification checks only at year-end, when it is too late to adjust recordkeeping controls. Screening quarterly helps identify whether turnover trajectories are moving above the NGN 100,000,000 line and whether margins, contracts, and operating model changes could shift the compliance profile during the same fiscal cycle.",
      "The auditor output is intentionally conservative: it is a qualification signal, not a filing decision. A qualified tax professional should still validate timing rules, basis periods, transfer pricing exposure, and any federal or state-level overlays that affect final liability. Treat the result as a compliance checkpoint that structures internal discussion with finance, legal, and external advisers."
    ]
  },
  {
    title: "2. Zero-percent CIT eligibility test design",
    paragraphs: [
      "The tool applies the requested 2026 logic directly. If annual turnover is at or below NGN 100,000,000 and the selected business sector is not Professional Services, the business is flagged as ELIGIBLE FOR 0% CIT. This mirrors a screening interpretation often used in internal tax control frameworks: a threshold test plus a sector exclusion test. Both conditions must be true in the same assessment period.",
      "Why use both tests together? Turnover thresholds alone are easy to automate but can produce false positives when the underlying business model includes advisory, legal, accounting, consulting, or similar knowledge-led services. Sector testing reduces that risk and reflects how tax authorities typically evaluate eligibility when reviewing submissions. In this implementation, the sector list remains explicit so teams can track why a result changed from one run to another.",
      "When organizations operate in mixed activities, classify using dominant revenue and operational substance. If your business has material consulting revenue but also product sales, a segmented analysis is safer than a single blended classification. This is one reason the output should be archived with supporting notes. During review cycles, your team can demonstrate that classification decisions were deliberate, evidence-based, and consistent with documented policy.",
      "The output card reports turnover, asset value, and assessable profit inputs exactly as entered so users can verify no silent transformation occurred. This traceability supports internal control standards and makes PDF reports suitable for audit packs. Even when a case appears straightforward, preserving raw inputs and assumptions is essential for defensible compliance."
    ]
  },
  {
    title: "3. Development Levy application above NGN 100,000,000 turnover",
    paragraphs: [
      "When annual turnover exceeds NGN 100,000,000, the tool switches to the levy branch and computes Development Levy at 4% of assessable profit. The form therefore captures a dedicated assessable profit input so the estimate aligns with tax-working assumptions used by your finance team and advisers. The PDF output labels this value directly for audit traceability.",
      "In operational practice, your assessable profit base should come from validated accounting records, tax adjustments, and any applicable reliefs or disallowances. The objective is to ensure the levy estimate reflects filing-ready figures rather than blended operational metrics. Teams should align the entered value with statutory working papers before any return submission.",
      "A strong control pattern is to run the tool twice once with conservative and once with optimistic assessable-profit scenarios then compare outcomes in management reporting. Scenario ranges help treasury teams plan payment capacity and avoid year-end surprises. They also support board-level oversight by showing how sensitive the levy is to margin shifts, asset valuation assumptions, and accounting classification decisions.",
      "If your turnover is near the threshold, monitor month-by-month run rate and forecast confidence intervals. Crossing the threshold late in the year can still affect liability outcomes, and last-minute data remediation is expensive. Embedding this logic into quarterly compliance reviews improves resilience and reduces remediation costs."
    ]
  },
  {
    title: "4. Personal income tax context and the NGN 800,000 exemption point",
    paragraphs: [
      "Although this tool is focused on corporate screening logic, 2026 planning frequently requires a parallel view of personal tax treatment for founders, key employees, and mobile executives. The NGN 800,000 exemption point is important in workforce planning because payroll structuring, allowances, and variable compensation can unintentionally push taxable income into higher marginal bands if not modeled early.",
      "Where employer groups support remote and cross-border teams, payroll governance should map compensation components to taxability rules with full documentation. A recurring risk is inconsistent treatment of reimbursements, mobility allowances, or benefit-in-kind elements across departments. Consistency controls and periodic reconciliations reduce exposure, especially where state and federal reporting obligations overlap.",
      "For employees near the exemption line, communication quality matters as much as calculation accuracy. Staff should understand which items are exempt, which are deferred, and which are immediately taxable so payroll surprises do not become employee-relations issues. Tax communication packs aligned to payroll calendars can improve trust and reduce year-end disputes.",
      "The LaTeX table in this page is provided as a publication-ready template for policy documentation. Teams can copy it into internal memos or adviser notes and replace placeholder rates where legal updates require revision. This workflow helps preserve one controlled source of truth across finance, legal, and HR."
    ]
  },
  {
    title: "5. Evidence, controls, and audit-readiness",
    paragraphs: [
      "Eligibility outcomes are only as strong as the supporting evidence. Keep board-approved financial statements, turnover schedules, sector rationale notes, and contract summaries in the same compliance folder as the generated report. During NRS reviews, time-to-evidence is often as important as the evidence itself. Fast retrieval reduces audit friction and demonstrates mature governance.",
      "A recommended control matrix includes owner assignment, due dates, and evidentiary standards for each input field. For example, turnover should be tied to signed management accounts, sector classification should reference documented commercial activity, and assessable-profit entries should map to reviewable tax workings. This formalization turns a simple tool output into a reliable component of a broader tax-control framework.",
      "Versioning is another critical control. Regulatory updates, threshold changes, and interpretive guidance can alter outcomes quickly. Keep dated exports and annotate which policy version was used at run time. This is especially useful when historical decisions are reviewed under a newer legal framework. Without version context, retrospective analysis can become misleading or unfair.",
      "For larger groups, integrate this output into a compliance calendar that includes PIT reconciliations, CIT pre-close checks, and management review sign-off. The objective is not just correct arithmetic; it is repeatable, explainable governance that can withstand internal audit, external audit, and tax authority inquiry."
    ]
  },
  {
    title: "6. Practical implementation guidance for finance teams",
    paragraphs: [
      "Start by establishing a monthly tax data pack with standardized turnover extracts, sector activity notes, and preliminary profit estimates. Standardization reduces reconciliation time and makes quarter-end screening routine. If data quality is weak, fix chart-of-accounts mapping first. Most downstream tax errors begin as upstream classification inconsistencies in operational systems.",
      "Second, assign clear accountability. Finance operations can own data integrity, tax leads can own interpretive policy, and executive sponsors can approve high-impact assumptions. This separation of duties prevents concentration risk and improves decision quality. It also ensures that when assumptions change, updates are documented and approved rather than silently introduced into live reporting.",
      "Third, tie tax screening to decision moments, not just filing deadlines. Mergers, pricing changes, new product lines, and expansion into advisory services can all alter tax profile. Embedding the auditor into commercial approval workflows means the business sees tax consequences before contracts are signed. That is where tax governance delivers the highest strategic value.",
      "Finally, remember that this guide is a technical briefing layer for professional decision support. Use it as a policy explainer, not a substitute for jurisdiction-specific advice. With disciplined inputs, documented assumptions, and specialist review, the tool can materially improve planning quality and reduce compliance risk."
    ]
  }
] as const;

export const nigeriaLatexTables = [
  {
    title: "Illustrative 2026 PIT Band Table (includes NGN 800,000 exemption point)",
    code: String.raw`\[
\begin{array}{|l|l|l|}
\hline
\textbf{Band} & \textbf{Taxable Income (NGN)} & \textbf{Illustrative Rate} \\
\hline
1 & 0 - 800000 & 0\% \\
\hline
2 & 800001 - 3000000 & 7\% \\
\hline
3 & 3000001 - 7000000 & 11\% \\
\hline
4 & 7000001 - 15000000 & 15\% \\
\hline
5 & 15000001 - 25000000 & 19\% \\
\hline
6 & 25000001+ & 24\% \\
\hline
\end{array}
\]`
  },
  {
    title: "Corporate Screening Decision Matrix",
    code: String.raw`\[
\begin{array}{|l|l|l|}
\hline
\textbf{Condition} & \textbf{Test} & \textbf{Outcome} \\
\hline
Turnover \leq 100000000 & \text{Sector} \neq \text{Professional Services} & \text{ELIGIBLE FOR 0\% CIT} \\
\hline
Turnover > 100000000 & \text{Assessable Profit Known} & 0.04 \times \text{Assessable Profit} \\
\hline
\end{array}
\]`
  }
] as const;
