export const ukFigGuideIntro =
  "This technical guide explains the 2026 transition from the legacy remittance-basis framework to the 4-year Foreign Income and Gains (FIG) regime. It is written for globally mobile professionals, family offices, founders, and finance advisers who need a structured eligibility view before engaging detailed UK tax filing work. The material is policy-oriented and operationally practical, with explicit focus on evidence, timing, and governance controls.";

export const ukFigGuideSections = [
  {
    title: "1. Policy transition from Non-Dom status to the FIG framework",
    paragraphs: [
      "From 6 April 2026, the Non-Dom architecture is treated as abolished for new policy operation in this tool model, and eligibility is tested through residence history and arrival timing instead of domicile narrative. The design objective of the FIG system is to produce clearer, time-limited relief with more transparent compliance expectations. In practice, this means advisers must prioritize timeline evidence and source characterization.",
      "Under the legacy remittance-basis model, analysis often centered on whether offshore income was brought to the UK and how remittance definitions applied to complex banking flows. The FIG model reduces reliance on remittance mechanics by granting a defined period of foreign income and gains relief where strict conditions are met. That improves predictability, but only when arrival data and residence history are accurately documented.",
      "The transition has operational consequences for employers and mobility teams. Compensation structures, equity events, carried-interest timing, and investment distributions may need remapping to FIG-period windows. Failure to align payroll and advisory workflows can lead to inconsistent reporting between corporate records and personal filings. Good practice is to align legal, payroll, and tax teams around one controlled timeline per individual.",
      "This tool captures the threshold test in a transparent way so users can quickly see whether they appear to qualify for relief and when that relief period would end. It does not replace HMRC guidance or adviser review, but it helps teams identify data gaps early, which is often the difference between smooth filing and reactive remediation."
    ]
  },
  {
    title: "2. 10-year non-residency condition and timeline evidence",
    paragraphs: [
      "The core eligibility condition in this implementation is straightforward: the user must be non-resident for 10 consecutive years before UK arrival. The interface asks for a year-by-year timeline to make assumptions explicit and auditable. This structure also supports internal review because each year can be challenged or confirmed independently without rerunning an opaque model.",
      "Consecutive-year logic is strict because partial breaks can invalidate relief in many policy frameworks. If any year in the 10-year sequence is marked resident, the relief flag is denied in this model. That binary approach is intentional for risk control. If your fact pattern is complex, use this outcome as a prompt for deeper review rather than forcing a favorable interpretation into a simplistic tool.",
      "Evidence standards should include prior tax returns, treaty-position records, workday calendars, visa data, and housing evidence where relevant. Residence is a legal status informed by facts, so timeline confidence depends on records quality. Advisers should also reconcile timeline entries with payroll records and immigration milestones to detect contradictions before filing submissions are drafted.",
      "For organizations managing multiple assignees, a standardized timeline template can materially reduce error rates. Consistent data capture across individuals improves comparison, allows audit sampling, and supports group-level governance reporting. This is especially valuable where mobility decisions are made quickly and tax records are assembled later under time pressure."
    ]
  },
  {
    title: "3. 4-year FIG relief period and expiry-date mechanics",
    paragraphs: [
      "When eligibility is confirmed, the relief window in this tool is calculated as four years from arrival date, minus one day, to produce an exact end date for planning. Example: if arrival is 1 July 2026, the computed relief end date is 30 June 2030. Presenting a precise date supports payroll coding, withholding transitions, and advisory planning around income recognition events.",
      "Date precision matters because year-end assumptions can be misleading when arrival occurs mid-year. Without exact boundary handling, users may overstate relief duration and under-provision for post-relief liability. The tool therefore avoids vague wording and displays both the qualifying decision and the exact expiry date where relief applies.",
      "Arrival timing relative to 6 April 2026 is also enforced in this model. A pre-transition arrival is flagged as ineligible for this specific FIG test branch, even if prior non-residency appears strong. This helps prevent policy-mixing errors where teams accidentally apply new-regime assumptions to pre-transition facts without a formal bridging analysis.",
      "In practical deployments, teams often pair this date output with scenario planning for liquidity events, equity vesting, offshore distributions, and bonus cycles. A disciplined calendar view can prevent accidental timing inefficiencies and improve after-tax outcomes while staying within policy boundaries."
    ]
  },
  {
    title: "4. Inheritance tax and the 10-year tail risk lens",
    paragraphs: [
      "The FIG regime discussion is incomplete without inheritance tax (IHT) exposure analysis. Even where income and gains receive temporary relief, estate-related rules can continue to attach through tail mechanisms in many planning scenarios. The 10-year tail concept is commonly used as a governance shorthand for extended exposure risk after changes in residence profile.",
      "Why this matters operationally: clients may assume that FIG eligibility automatically resolves wider UK exposure, but estate and succession planning often follows different logic and time horizons. Advisers should segment analysis into at least three tracks income, gains, and estate exposure then reconcile strategy across all three. Cross-track inconsistency is a major source of long-term risk.",
      "Family office governance should include annual IHT risk reviews aligned with trust structures, gifting strategies, and treaty context. Even where immediate tax impact appears low, data gaps today can create high-cost disputes years later. A documented review cadence is often more valuable than trying to predict every edge case upfront.",
      "This tool does not compute IHT liabilities directly; instead, it highlights the need for tail-risk review in the accompanying documentation and PDF output. That design choice keeps eligibility logic clean while still promoting prudent advisory behavior."
    ]
  },
  {
    title: "5. Double taxation treaty credits and cross-border relief coordination",
    paragraphs: [
      "A key practical issue under FIG planning is whether overseas taxes paid can be relieved effectively through treaty mechanisms once UK filing obligations arise. Double taxation treaty (DTT) credits can materially change effective tax burden, but only where source characterization, timing, and documentation align with treaty terms and domestic rules. Early mapping is essential.",
      "In many cases, the challenge is not lack of entitlement but weak evidence chains. Missing tax vouchers, inconsistent withholding records, or ambiguous source definitions can delay or reduce credit utilization. Advisers should establish a credit-readiness checklist well before filing season and coordinate with foreign tax preparers to secure documents in compatible formats.",
      "Groups operating in multiple jurisdictions should maintain a centralized treaty matrix that tracks jurisdiction pairings, typical income categories, and known documentation requirements. This reduces repetitive analysis and improves consistency across client files. It also makes it easier to explain outcomes to stakeholders who need clear audit trails rather than informal advisory notes.",
      "The FIG eligibility output can be used as the starting trigger for treaty-credit workflows. Once relief status and expiry are known, teams can map expected foreign income streams to treaty treatment windows and sequence evidence gathering in advance."
    ]
  },
  {
    title: "6. Filing governance, control design, and advisory workflow",
    paragraphs: [
      "Professional-grade compliance requires a control framework, not just a calculator. Recommended controls include input ownership, reviewer sign-off, evidence retention standards, and versioned policy notes. Each run should be archived with timestamp, assumptions, and user attribution. This improves traceability and supports defensibility if outcomes are challenged later.",
      "For mobility programs, integrate FIG screening into assignment approval, onboarding, and annual tax briefings. If eligibility is assessed only near filing deadlines, teams often face compressed timelines and avoidable errors. Early-cycle screening allows better payroll setup, better communication with assignees, and better coordination with external advisers.",
      "The PDF report function in this tool is intentionally simple but operationally useful. It produces a portable case snapshot for governance meetings, adviser handoffs, and internal control archives. Over time, an archive of consistent reports becomes a valuable dataset for quality assurance and process improvement.",
      "As with all cross-border tax tools, final filing positions should be confirmed with qualified UK tax professionals and, where relevant, foreign counsel. This guide is structured to provide depth, context, and control discipline so teams approach that advice process with stronger data and clearer questions."
    ]
  }
] as const;

export const ukFigLatexTables = [
  {
    title: "Remittance Basis vs 4-Year FIG Relief Comparison",
    code: String.raw`\[
\begin{array}{|l|l|l|}
\hline
\textbf{Feature} & \textbf{Legacy Remittance Basis} & \textbf{4-Year FIG Regime} \\
\hline
Primary Test & \text{Domicile and remittance treatment} & \text{Arrival date + 10-year non-residency} \\
\hline
Relief Horizon & \text{Potentially extended with conditions} & \text{Fixed 4-year window} \\
\hline
Main Compliance Focus & \text{Tracking remittances} & \text{Timeline and source evidence} \\
\hline
\end{array}
\]`
  },
  {
    title: "Illustrative IHT 10-Year Tail Monitoring Table",
    code: String.raw`\[
\begin{array}{|l|l|l|}
\hline
\textbf{Year Since Trigger Event} & \textbf{Monitoring Priority} & \textbf{Example Action} \\
\hline
0 - 2 & \text{Very High} & \text{Trust and succession review} \\
\hline
3 - 6 & \text{High} & \text{Annual estate exposure refresh} \\
\hline
7 - 10 & \text{Medium to High} & \text{Confirm tail-risk closure evidence} \\
\hline
\end{array}
\]`
  }
] as const;
