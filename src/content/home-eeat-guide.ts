export interface HomeKnowledgeSection {
  title: string;
  paragraphs: ReadonlyArray<string>;
  bullets?: ReadonlyArray<string>;
}

export interface IntentPlaybookItem {
  intent: string;
  answer: string;
  actions: ReadonlyArray<string>;
  toolHref: string;
  toolLabel: string;
}

export interface EntityDirectoryItem {
  entity: string;
  role: string;
  whyItMatters: string;
}

export const homeGuideIntro: ReadonlyArray<string> = [
  "This page is written for people who need to make real tax decisions with limited time and imperfect data. That includes founders, finance leads, payroll managers, mobility teams, and advisers who are expected to explain not only what a result is, but also why it is reasonable and what should happen next. The goal here is simple: give you clear language, practical steps, and a structure you can use in meetings, reviews, and filing preparation.",
  "The suite focuses on two areas that regularly create confusion in 2026 planning. First, Nigeria corporate screening, where turnover thresholds, sector classification, and assessable profit can be mixed up in everyday reporting. Second, UK FIG screening, where arrival timing and residency history can be misunderstood when teams rely on memory or informal summaries. Both tools are built to turn those recurring pain points into auditable decisions.",
  "You can read this page in order or jump directly to the section that matches your current problem. Either way, treat it as a working guide. Run the relevant tool, save the output, pair it with evidence, and then escalate edge cases to a qualified professional. That sequence gives you speed without pretending that tax decisions are risk-free."
];

export const homeKnowledgeSections: ReadonlyArray<HomeKnowledgeSection> = [
  {
    title: "1) What most teams need before using a calculator",
    paragraphs: [
      "In tax work, people often ask for a number when they actually need a decision they can defend. A number without context may look useful at first, but it rarely survives serious review. Leadership wants to know what assumptions were used. Advisers want to know whether facts were complete. Audit teams want to see where each input came from. If those questions are unanswered, even a correct formula can lead to a weak outcome.",
      "The most common breakdown is not arithmetic. It is sequencing. Teams collect documents too late, merge fields that should stay separate, or treat one screen result as final when it is only a first pass. For example, a company might estimate Nigeria exposure from revenue alone and skip sector analysis, or a mobility team might discuss UK eligibility before confirming a full ten-year residency record. In both cases, the risk comes from process gaps rather than difficult math.",
      "A useful tax tool should therefore do three things clearly. It should apply a stable rule set. It should expose the branch logic in plain language. It should make the next action obvious. When a case appears straightforward, the next action is documentation and archiving. When a case is unclear, the next action is escalation with evidence. This guide follows that same pattern so you can move from question to action without guesswork."
    ],
    bullets: [
      "Be clear about the decision you need today.",
      "Collect the right inputs before running any scenario.",
      "Treat outputs as explainable checkpoints, not final legal conclusions.",
      "Document assumptions while facts are still fresh."
    ]
  },
  {
    title: "2) Nigeria corporate screening in practical terms",
    paragraphs: [
      "Nigeria corporate screening is often discussed in headline form, but day-to-day compliance is more specific. In this suite, the first branch checks whether annual turnover is at or below NGN 100 million and whether the business is outside Professional Services. If both conditions are true, the result shows eligibility for the zero-percent CIT screening branch. If turnover is above NGN 100 million, the tool moves to development levy estimation using assessable profit.",
      "That distinction matters because many teams combine turnover and assessable profit in one spreadsheet narrative. They are related, but they do different jobs in this model. Turnover determines branch direction. Assessable profit determines levy size once the high-turnover branch is active. Keeping those fields separate makes the output easier to explain and less likely to be challenged later.",
      "Classification quality is just as important as numeric accuracy. If commercial activity changes during the year, a classification that once made sense may no longer fit. Advisory-heavy contracts, bundled services, and mixed revenue streams deserve extra care. The practical answer is to rerun screening when business facts change, not only at year-end. That turns compliance into an ongoing control, rather than a last-minute scramble before filing."
    ],
    bullets: [
      "Use turnover to select the correct branch.",
      "Use assessable profit to quantify levy exposure where needed.",
      "Record why you selected a sector classification.",
      "Recheck whenever revenue mix or delivery model changes."
    ]
  },
  {
    title: "3) UK FIG screening and timeline discipline",
    paragraphs: [
      "For UK FIG cases, reliability starts with timeline discipline. The tool asks for an exact UK arrival date and a year-by-year residency history covering the prior ten years. In this implementation, all ten years must be non-resident for the relief branch to activate. That strictness is deliberate. It prevents accidental overstatement and keeps screening consistent across users.",
      "The second benefit of timeline discipline is communication. A clear date-based result can be shared with payroll, mobility, and advisory teams without rewriting the same explanation in different formats. This is especially useful for compensation events that depend on timing, such as vesting schedules, bonuses, and cross-border income recognition. A vague statement like \"likely eligible\" is hard to operationalize; a dated result is much easier to plan around.",
      "The tool also calculates a concrete four-year end date once eligibility is triggered, using arrival date plus four years minus one day. That gives teams a calendar anchor for planning the period after relief ends. It does not replace professional advice for complex cases, but it does reduce confusion early in the process. When the timeline is clear, advisory time can focus on genuine edge cases instead of basic chronology disputes."
    ],
    bullets: [
      "Start with a verified arrival date, not an estimate.",
      "Complete the full ten-year history before discussing outcomes.",
      "Use the calculated end date in payroll and planning calendars.",
      "Escalate split-year or treaty-heavy situations early."
    ]
  },
  {
    title: "4) Using Nigeria and UK outputs together",
    paragraphs: [
      "Many users are dealing with both corporate and personal exposure at the same time. A founder may be reviewing Nigeria corporate obligations while planning a UK move. A finance team may need to brief board members on both business-level and individual-level implications in one meeting. Running the two tools separately is useful, but the real value comes from combining the outputs into a single decision pack.",
      "A practical cross-border workflow is straightforward. First, run the Nigeria screen with validated turnover, sector, and assessable profit assumptions. Second, run the UK timeline screen with verified arrival and residency data. Third, compare the two outputs against planned cash events, payroll cycles, and advisory deadlines. This side-by-side view helps teams decide where professional review is most urgent and where current data is already strong.",
      "This approach also improves communication quality. Instead of presenting isolated numbers, you can show decision branches, key dates, known uncertainties, and next steps in one place. That structure reduces friction in leadership discussions and makes it easier for advisers to provide targeted input quickly. In practice, that usually saves time and lowers rework across finance, legal, and mobility teams."
    ],
    bullets: [
      "Run both tools with data from the same reporting window.",
      "List assumptions and unresolved issues next to each output.",
      "Prioritize adviser review where financial impact and uncertainty are highest.",
      "Archive both PDF reports in a shared compliance folder."
    ]
  },
  {
    title: "5) Sources, language, and evidence quality",
    paragraphs: [
      "Good tax guidance depends on careful sourcing. Primary institutions should be the starting point whenever possible, because they define policy language and implementation expectations. Secondary publications can still be useful for context, but they should support, not replace, primary verification in high-stakes decisions.",
      "Precise wording also matters. Terms like turnover, assessable profit, residency history, and treaty credit are not interchangeable. When teams use loose synonyms, misunderstandings spread quickly across reports and meetings. The tools on this site keep variables explicit to reduce that risk, and this guide follows the same principle in plain language.",
      "Evidence quality is the final piece. If a result cannot be traced back to records, it is difficult to defend under review. A strong working file includes source documents, notes on assumptions, the date of assessment, and the generated output. That package supports better decisions now and clearer explanations later if facts are revisited."
    ],
    bullets: [
      "Start from primary authority materials when available.",
      "Use consistent variable names across teams and reports.",
      "Store evidence with the result, not in separate ad hoc folders.",
      "Capture the date and context of each assessment."
    ]
  },
  {
    title: "6) What we have learned from day-to-day use",
    paragraphs: [
      "The clearest feedback from users is that confidence matters as much as speed. People want to know whether a result can be explained to leadership and defended in front of advisers. That is why we put so much weight on transparency: inputs are visible, branch logic is explicit, and exports are easy to archive and share.",
      "Another pattern is time pressure. Teams usually arrive here because a deadline is close, a relocation decision is pending, or a reporting pack is being finalized. In those moments, abstract commentary is not helpful. What helps is a clear path: gather the right data, run the screen, identify uncertainty, and escalate where necessary. This guide is written to support exactly that flow.",
      "A final pattern is overconfidence in early outputs. Even when a result looks favorable, it still needs context and documentation. The most resilient teams treat a tool output as a briefing artifact, not a substitute for professional judgment. That mindset keeps decisions grounded and reduces the chance of avoidable surprises."
    ]
  },
  {
    title: "7) A practical workflow you can repeat every quarter",
    paragraphs: [
      "Begin with a focused question. Are you checking a threshold, an eligibility timeline, a levy estimate, or filing readiness. Name the question clearly before you run anything. Then collect only the inputs needed for that question, and validate where each number or status comes from. This keeps the process clean and prevents speculation from entering the model.",
      "Run the relevant tool and save the output immediately. Add a short note describing assumptions, open issues, and confidence level. Pair the output with supporting records while details are fresh. If any branch depends on uncertain facts, mark the case for escalation. Clear escalation criteria are especially important for mixed-sector business models, incomplete residency records, and high-value events near policy boundaries.",
      "Close the loop with version and follow-up discipline. Record assessment date, store the output in a shared location, and schedule a rerun when major business facts change. Repeat this cycle each quarter. Consistency is what turns a useful calculator into a reliable decision process."
    ],
    bullets: [
      "Define the question first.",
      "Validate inputs before running scenarios.",
      "Save outputs with assumptions and evidence.",
      "Escalate edge cases without delay.",
      "Repeat on a fixed review cadence."
    ]
  }
] as const;

export const intentPlaybook: ReadonlyArray<IntentPlaybookItem> = [
  {
    intent: "How can I tell whether my Nigeria company falls into the 0% CIT screening branch in 2026?",
    answer:
      "Use the Nigeria tool as a two-part check. First confirm turnover at or below NGN 100 million. Then confirm the business is not classified as Professional Services. If both are true, the tool returns the eligibility branch.",
    actions: [
      "Validate turnover against management accounts or reviewed ledgers.",
      "Document the sector choice with contract and revenue context.",
      "Export the PDF and keep it with supporting evidence."
    ],
    toolHref: "/tools/nigeria-zero-tax-auditor",
    toolLabel: "Open Nigeria Zero-Tax Auditor"
  },
  {
    intent: "How do I estimate development levy with less confusion?",
    answer:
      "In this suite, levy is estimated only when turnover is above NGN 100 million. Once that branch is active, the calculation uses four percent of assessable profit. Use a reviewed assessable-profit figure, not a rough proxy.",
    actions: [
      "Prepare assessable-profit assumptions before running the estimate.",
      "Run at least two scenarios to test downside and upside outcomes.",
      "Flag uncertain profit inputs for adviser review."
    ],
    toolHref: "/tools/nigeria-zero-tax-auditor",
    toolLabel: "Estimate levy exposure"
  },
  {
    intent: "How do I screen UK FIG eligibility for an arrival in 2026?",
    answer:
      "Enter the arrival date and complete the ten-year residency timeline carefully. In this model, all ten years must be non-resident for the relief branch to apply. One resident year switches the outcome and signals the need for deeper review.",
    actions: [
      "Gather records before filling the timeline fields.",
      "Check each year against consistent evidence sources.",
      "Keep the output for adviser briefing and payroll planning."
    ],
    toolHref: "/tools/uk-fig-regime-eligibility",
    toolLabel: "Open UK FIG Tool"
  },
  {
    intent: "How do I plan around the end of the four-year FIG period?",
    answer:
      "Use the tool's exact end date as your planning anchor. That date helps coordinate payroll changes, compensation timing, and advisory work so there are fewer surprises near the boundary.",
    actions: [
      "Put the end date into payroll and tax review calendars.",
      "Review events near the boundary with a professional adviser.",
      "Align post-relief documentation tasks early."
    ],
    toolHref: "/tools/uk-fig-regime-eligibility",
    toolLabel: "Calculate FIG end date"
  },
  {
    intent: "What should I save so the result is easy to defend later?",
    answer:
      "Save the output, the inputs used, the source of each key assumption, and a short note on unresolved issues. A clear evidence chain is usually more persuasive than a long narrative summary.",
    actions: [
      "Add source notes to every run.",
      "Capture date and tool context in your records.",
      "Use the updates page to track product changes over time."
    ],
    toolHref: "/updates",
    toolLabel: "View product updates"
  },
  {
    intent: "Which sources should I trust first when policy details are unclear?",
    answer:
      "Start with primary authority materials whenever possible. For UK matters, use GOV.UK and HMRC guidance. For Nigeria matters, use official Nigerian authority sources. Use secondary references for context, not as your only basis for filing decisions.",
    actions: [
      "Cross-check important assumptions with at least one primary source.",
      "Record citation dates in your working notes.",
      "Escalate unresolved interpretation points before submission."
    ],
    toolHref: "/about",
    toolLabel: "See references and editorial policy"
  }
] as const;

export const entityDirectory: ReadonlyArray<EntityDirectoryItem> = [
  {
    entity: "Federal Inland Revenue Service (FIRS)",
    role: "Primary authority context referenced in the Nigeria screening framework used on this site.",
    whyItMatters: "Authority interpretation influences threshold and classification decisions."
  },
  {
    entity: "Federal Inland Revenue Service (FIRS)",
    role: "Official Nigerian authority portal used for practical policy context.",
    whyItMatters: "Official publications help ground compliance assumptions."
  },
  {
    entity: "HM Revenue and Customs (HMRC)",
    role: "UK authority for residence and FIG-related guidance context.",
    whyItMatters: "Residency evidence and filing treatment should align with HMRC expectations."
  },
  {
    entity: "UK Government policy publications",
    role: "Source of transition context and formal policy statements.",
    whyItMatters: "Effective dates and framework changes depend on official policy wording."
  },
  {
    entity: "Corporate Affairs Commission (CAC)",
    role: "Nigerian corporate registry context for entity records and governance.",
    whyItMatters: "Company record consistency supports stronger compliance documentation."
  },
  {
    entity: "External Tax Adviser",
    role: "Licensed professional for edge-case interpretation and filing confirmation.",
    whyItMatters: "Complex cases require jurisdiction-specific legal and technical review."
  },
  {
    entity: "Payroll Team",
    role: "Operational owner of withholding and date-sensitive compensation handling.",
    whyItMatters: "Timeline mistakes often surface first in payroll execution."
  },
  {
    entity: "Global Mobility Team",
    role: "Owner of assignment records and cross-border timeline coordination.",
    whyItMatters: "Accurate movement history supports reliable residency analysis."
  },
  {
    entity: "Audit Committee",
    role: "Internal governance body reviewing tax control quality and assumptions.",
    whyItMatters: "Requires transparent outputs and an evidence-backed decision trail."
  },
  {
    entity: "Board Finance Committee",
    role: "Leadership forum for tax risk, cash planning, and compliance posture.",
    whyItMatters: "Needs clear summaries of outcomes, uncertainty, and next steps."
  }
] as const;

export const sourceIntegrityChecklist: ReadonlyArray<string> = [
  "Use primary authority materials as your starting point.",
  "Record citation dates and context in working notes.",
  "Separate confirmed facts from assumptions in your summaries.",
  "Re-check key assumptions after policy or business changes.",
  "Escalate unresolved legal interpretation to licensed professionals."
] as const;

