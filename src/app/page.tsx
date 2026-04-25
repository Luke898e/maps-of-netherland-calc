import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, FileCheck2, ShieldCheck, Workflow } from "lucide-react";

import { AdSenseScript } from "@/components/adsense-script";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts } from "@/content/blog-posts";
import {
  entityDirectory,
  homeGuideIntro,
  homeKnowledgeSections,
  intentPlaybook as commonQuestions,
  sourceIntegrityChecklist
} from "@/content/home-eeat-guide";
import { externalReferences } from "@/content/references";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "UK & Nigeria Tax Compliance Tools | London and Lagos",
  description:
    "Tax compliance tools for London, Manchester, Birmingham, Lagos, Abuja, and Port Harcourt teams. Run UK FIG and Nigeria CIT checks in minutes.",
  alternates: {
    canonical: siteConfig.siteUrl
  }
};

const toolCards = [
  {
    href: "/tools/nigeria-zero-tax-auditor",
    title: "2026 Nigeria Zero-Tax Auditor",
    description:
      "Assess 0% CIT qualification and 4% development levy exposure using structured 2026 screening logic and a downloadable briefing report."
  },
  {
    href: "/tools/uk-fig-regime-eligibility",
    title: "2026 UK FIG Regime Eligibility Tool",
    description:
      "Evaluate 10-year non-residency timelines, confirm FIG relief eligibility, and compute exact 4-year relief expiry dates."
  }
];

const heroHighlights = [
  {
    icon: FileCheck2,
    title: "Structured Validation",
    detail: "Typed inputs and deterministic outputs reduce avoidable filing errors."
  },
  {
    icon: Workflow,
    title: "Audit-Ready Reports",
    detail: "Exportable PDF summaries support adviser handoff and internal approvals."
  },
  {
    icon: ShieldCheck,
    title: "Policy-First Workflow",
    detail: "Logic branches map directly to declared thresholds and timeline checks."
  }
] as const;

interface HomeFaqItem {
  question: string;
  answer: string;
}

interface PersonaStory {
  persona: string;
  intro: string;
  focus: string;
  payoff: string;
}

interface NigeriaWorkedExample {
  persona: string;
  turnover: string;
  sector: string;
  assessableProfit: string;
  citScreeningBranch: string;
  levyEstimate: string;
  nextAction: string;
}

interface UkWorkedExample {
  persona: string;
  ukArrivalDate: string;
  priorYearsNonResident: string;
  figScreeningResult: string;
  reliefEndDate: string;
  immediateAction: string;
}

const homepageFaqs: ReadonlyArray<HomeFaqItem> = [
  {
    question: "How do I screen 0% CIT eligibility for Nigeria in 2026?",
    answer:
      "Use the Nigeria tool with three validated inputs: annual turnover, sector, and assessable profit. In this suite, a screening eligibility signal appears when turnover is at or below NGN 100 million and the sector is not Professional Services."
  },
  {
    question: "When does the Nigeria development levy apply in this tool?",
    answer:
      "The levy branch activates when annual turnover exceeds NGN 100 million. The tool then computes an estimate at four percent of assessable profit and includes that figure in the downloadable PDF report."
  },
  {
    question: "What is the core eligibility test for UK FIG relief in this model?",
    answer:
      "The model requires a valid UK arrival date and ten consecutive prior years marked as non-resident. If any year is resident, the tool returns an ineligible branch and prompts deeper advisory review."
  },
  {
    question: "How is the UK 4-year FIG relief end date calculated?",
    answer:
      "The tool computes an exact date from the user-entered arrival date by adding four years and subtracting one day. This supports payroll planning and timeline-sensitive compensation decisions."
  },
  {
    question: "Does this site replace legal or tax advice?",
    answer:
      "No. This site is an educational and screening resource. It is designed to improve data quality and decision readiness before users consult qualified professionals for jurisdiction-specific filing positions."
  },
  {
    question: "Which sources should users trust first for policy interpretation?",
    answer:
      "Primary institutional sources should come first, including UK government policy publications and HMRC manuals for UK topics, plus official Nigerian authority sources for Nigeria topics. Secondary summaries are helpful for context but not a substitute for primary verification."
  }
];

const personaStories: ReadonlyArray<PersonaStory> = [
  {
    persona: "Payroll Lead in Lagos, Q1 transition",
    intro:
      "You have just moved payroll ownership from a founder to an in-house finance lead. The first deadline is close and everyone needs one clear answer, not five competing spreadsheets.",
    focus: "Use the Nigeria threshold table first, then run one controlled levy scenario.",
    payoff: "You leave the meeting with a documented branch result and a single follow-up list."
  },
  {
    persona: "Founder moving to the UK in July 2026",
    intro:
      "You are planning compensation events and equity vesting, but your tax timeline still feels uncertain. A one-week date slip could change filing decisions and payroll treatment.",
    focus: "Run the UK FIG timeline table with exact arrival date and full 10-year history.",
    payoff: "You get a dated screening output that payroll, legal, and advisers can read in one pass."
  },
  {
    persona: "CFO preparing a board pack",
    intro:
      "The board wants Nigeria and UK exposure in one brief. They do not want abstract commentary, they want numbers, dates, and control checks.",
    focus: "Combine one Nigeria row and one UK row in the comparison matrix below.",
    payoff: "You present a defensible summary with assumptions, outputs, and next actions."
  }
];

const nigeriaWorkedExamples: ReadonlyArray<NigeriaWorkedExample> = [
  {
    persona: "SME importer",
    turnover: "NGN 82,500,000",
    sector: "General Trading",
    assessableProfit: "NGN 18,200,000",
    citScreeningBranch: "0% CIT branch (screening)",
    levyEstimate: "NGN 0 (threshold not exceeded)",
    nextAction: "Rerun quarterly; keep turnover evidence with export."
  },
  {
    persona: "Services operator",
    turnover: "NGN 142,300,000",
    sector: "Business Services",
    assessableProfit: "NGN 39,500,000",
    citScreeningBranch: "Levy branch active",
    levyEstimate: "NGN 1,580,000 (4% x NGN 39,500,000)",
    nextAction: "Run downside/upside scenarios before cash planning sign-off."
  },
  {
    persona: "Fast-growth distributor",
    turnover: "NGN 101,200,000",
    sector: "Distribution",
    assessableProfit: "NGN 26,400,000",
    citScreeningBranch: "Levy branch active",
    levyEstimate: "NGN 1,056,000 (4% x NGN 26,400,000)",
    nextAction: "Review classification and threshold triggers monthly."
  }
];

const ukWorkedExamples: ReadonlyArray<UkWorkedExample> = [
  {
    persona: "New UK arrival founder",
    ukArrivalDate: "12 Jul 2026",
    priorYearsNonResident: "10/10 years",
    figScreeningResult: "Eligible branch",
    reliefEndDate: "11 Jul 2030",
    immediateAction: "Add end date to payroll and vesting calendar now."
  },
  {
    persona: "Split-history remote earner",
    ukArrivalDate: "01 Oct 2026",
    priorYearsNonResident: "9/10 years",
    figScreeningResult: "Ineligible branch",
    reliefEndDate: "Not available in screening model",
    immediateAction: "Escalate for adviser review before compensation planning."
  }
];

const serviceAreaCities = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Bristol",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan"
] as const;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\d+\)\s*/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function HomePage(): React.JSX.Element {
  const allBlogPosts = getAllBlogPosts();
  const latestBlogPosts = allBlogPosts.slice(0, 10);
  const remainingBlogPosts = allBlogPosts.slice(10);
  const knowledgeSectionLinks = homeKnowledgeSections.map((section) => ({
    id: `knowledge-${slugify(section.title)}`,
    label: section.title
  }));

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.siteUrl
      }
    ]
  };

  return (
    <div className="space-y-10">
      <AdSenseScript />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />

      <section className="surface-hero p-8 sm:p-10 lg:p-12">
        <div className="grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <p className="section-kicker">Tax Help for Real Cases</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#0e325f] sm:text-5xl">
              UK and Nigeria Tax Compliance Tools for London and Lagos Teams
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#233d5d]">
              Run fast tax checks for Nigeria and the UK in one place. Each tool shows clear rules, validates your
              inputs, and gives you a report you can share with your adviser.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/tools/nigeria-zero-tax-auditor"
                className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
              >
                Start Free Tax Check in 60 Seconds
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
              >
                View Pricing
              </Link>
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
              >
                Book Demo
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-[#305178]">
              Free first screening, no signup wall, and a shareable output for adviser review.
            </p>
          </div>
          <div className="space-y-3 rounded-xl border border-[#d3e3f7] bg-white/85 p-4">
            {heroHighlights.map((item) => (
              <div key={item.title} className="rounded-lg border border-[#d9e6f8] bg-[#f8fbff] p-3">
                <div className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-4 w-4 text-[#1a5ca8]" />
                  <div>
                    <p className="text-sm font-semibold text-[#103865]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#2a486b]">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-areas" className="surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Areas We Serve</p>
        <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          UK and Nigeria Service Coverage
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#203754]">
          We support founders and finance teams operating across the United Kingdom and Nigeria, with workflows often
          centered on these cities.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {serviceAreaCities.map((city) => (
            <li
              key={city}
              className="rounded-md border border-[#d2e1f6] bg-[#f7fbff] px-3 py-2 text-sm font-medium text-[#173e73]"
            >
              {city}
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-panel-muted p-6 sm:p-8">
        <p className="section-kicker">Page Navigation</p>
        <h2 className="mt-2 section-title">Jump to Section</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <a href="#tools" className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]">
            Tools
          </a>
          <a
            href="#knowledge-guide"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Practical Guide
          </a>
          <a
            href="#common-questions"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Common Questions
          </a>
          <a
            href="#buyer-stages"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Buyer Stages
          </a>
          <a
            href="#persona-stories"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Story Scenarios
          </a>
          <a
            href="#worked-cases"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Worked Cases
          </a>
          <a
            href="#service-areas"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Service Areas
          </a>
          <a
            href="#entity-directory"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Key Institutions
          </a>
          <a
            href="#sourcing-integrity"
            className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]"
          >
            Sources and Verification
          </a>
          <a href="#home-faq" className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]">
            FAQ
          </a>
          <a href="#maintenance" className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]">
            Maintenance
          </a>
          <a href="#latest-blog" className="rounded-lg border border-[#d2e1f6] bg-white px-3 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eef5ff]">
            Latest Blog
          </a>
        </div>
      </section>

      <section id="tools" className="grid gap-6 scroll-mt-28 lg:grid-cols-2">
        {toolCards.map((card) => (
          <Card key={card.href} className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle as="p" className="font-[var(--font-heading)] text-2xl text-[#0f3364]">{card.title}</CardTitle>
              <CardDescription className="text-base leading-7">{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={card.href}
                className="inline-flex items-center gap-2 rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
              >
                Open Tool
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section id="buyer-stages" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Buyer Stage Paths</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Choose the Next Step That Matches Your Stage
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle as="p" className="text-lg text-[#0f3364]">Stage 1: Explore</CardTitle>
              <CardDescription className="text-base leading-7">
                Understand the method and compare example scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/blog" className="text-sm font-medium text-[#12447d] hover:text-[#0f3968]">
                Read Guides
              </Link>
            </CardContent>
          </Card>

          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle as="p" className="text-lg text-[#0f3364]">Stage 2: Evaluate</CardTitle>
              <CardDescription className="text-base leading-7">
                Compare plan options for your team size and workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pricing" className="text-sm font-medium text-[#12447d] hover:text-[#0f3968]">
                View Pricing
              </Link>
            </CardContent>
          </Card>

          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle as="p" className="text-lg text-[#0f3364]">Stage 3: Validate</CardTitle>
              <CardDescription className="text-base leading-7">
                Review proof signals from case workflows and release records.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/testimonials" className="text-sm font-medium text-[#12447d] hover:text-[#0f3968]">
                See Proof
              </Link>
            </CardContent>
          </Card>

          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle as="p" className="text-lg text-[#0f3364]">Stage 4: Decide</CardTitle>
              <CardDescription className="text-base leading-7">
                Book a guided demo and map rollout steps for your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/book-demo" className="text-sm font-medium text-[#12447d] hover:text-[#0f3968]">
                Book Demo
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="persona-stories" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Story Scenarios</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          What This Looks Like in Real Team Situations
        </h2>
        <p className="leading-7 text-[#203754]">
          These short scenarios mirror the situations we see most often. Use them to pick the right starting point
          before you run any tool inputs.
        </p>
        <div className="grid gap-4 lg:grid-cols-3">
          {personaStories.map((story) => (
            <Card key={story.persona} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle as="p" className="text-lg text-[#0f3364]">{story.persona}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-[#203754]">
                <p className="leading-7">{story.intro}</p>
                <p className="rounded-md border border-[#dbe7f8] bg-[#f7fbff] px-3 py-2 text-sm leading-6">
                  <span className="font-semibold text-[#123f76]">Focus:</span> {story.focus}
                </p>
                <p className="rounded-md border border-[#dbe7f8] bg-[#f7fbff] px-3 py-2 text-sm leading-6">
                  <span className="font-semibold text-[#123f76]">Payoff:</span> {story.payoff}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="knowledge-guide" className="space-y-8 surface-panel p-6 scroll-mt-28 sm:p-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Practical Guide</p>
          <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
            Comprehensive Guide for 2026 Nigeria and UK Tax Decisions
          </h2>
          {homeGuideIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 60)} className="leading-7 text-[#203754]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-3 rounded-md border border-[#d7e4f8] bg-[#f6faff] p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Guide Contents</p>
          <div className="grid gap-2 md:grid-cols-2">
            {knowledgeSectionLinks.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm text-[#12447d] hover:text-[#0f3968]">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {homeKnowledgeSections.map((section) => {
            const sectionId = `knowledge-${slugify(section.title)}`;

            return (
              <section
                id={sectionId}
                key={section.title}
                className="space-y-4 rounded-lg border border-[#dbe7f8] bg-[#f9fbff] p-5 scroll-mt-28"
              >
              <p className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">{section.title}</p>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 70)} className="leading-7 text-[#203754]">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5 text-[#203754]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              </section>
            );
          })}
        </div>
      </section>

      <section id="common-questions" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Common Questions</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Direct Answers to Frequent Questions
        </h2>
        <div className="grid gap-4">
          {commonQuestions.map((item) => (
            <Card key={item.intent} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle as="p" className="text-xl text-[#0f3364]">{item.intent}</CardTitle>
                <CardDescription className="text-base leading-7 text-[#203754]">{item.answer}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc space-y-2 pl-5 text-[#203754]">
                  {item.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
                <Link
                  href={item.toolHref}
                  className="inline-flex items-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
                >
                  {item.toolLabel}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="entity-directory" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Key Institutions</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Institutions and Teams Referenced in This Suite
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {entityDirectory.map((entry) => (
            <Card key={entry.entity} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle as="p" className="text-lg text-[#0f3364]">{entry.entity}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm leading-7 text-[#203754]">
                <p>
                  <span className="font-semibold text-[#153f77]">Role:</span> {entry.role}
                </p>
                <p>
                  <span className="font-semibold text-[#153f77]">Why it matters:</span> {entry.whyItMatters}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="sourcing-integrity" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Sources and Verification</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          How to Check Assumptions Before Filing
        </h2>
        <p className="leading-7 text-[#203754]">
          This platform is designed for educational clarity and professional preparation, not substitute legal advice.
          For any high-impact decision, validate assumptions against primary institutional sources before filing.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#203754]">
          {sourceIntegrityChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle as="p" className="text-lg text-[#0f3364]">UK Primary References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {externalReferences.uk.map((reference) => (
                <Link
                  key={reference.url}
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
                >
                  {reference.label}
                </Link>
              ))}
            </CardContent>
          </Card>
          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle as="p" className="text-lg text-[#0f3364]">Nigeria Primary References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {externalReferences.nigeria.map((reference) => (
                <Link
                  key={reference.url}
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
                >
                  {reference.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="home-faq" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Frequently Asked Questions</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Quick Answers to Frequent Questions
        </h2>
        <div className="grid gap-4">
          {homepageFaqs.map((faq) => (
            <Card key={faq.question} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle as="p" className="text-lg text-[#0f3364]">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-[#203754]">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="worked-cases" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Worked Cases</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Worked Examples with Real Numbers and Dates
        </h2>
        <p className="leading-7 text-[#203754]">
          These comparison tables are designed for quick review in finance meetings. They use concrete values so teams
          can test assumptions before they run live records through each calculator.
        </p>

        <div className="space-y-3 rounded-lg border border-[#dbe7f8] bg-[#f7fbff] p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">
            Nigeria Screening Comparison Table
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#edf5ff] text-[#123f76]">
                <tr>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Persona</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Turnover</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Sector</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Assessable Profit</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Branch</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Levy Estimate</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Next Action</th>
                </tr>
              </thead>
              <tbody className="text-[#203754]">
                {nigeriaWorkedExamples.map((example) => (
                  <tr key={example.persona} className="bg-white">
                    <td className="border border-[#dfeafb] px-3 py-2 font-medium">{example.persona}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.turnover}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.sector}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.assessableProfit}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.citScreeningBranch}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.levyEstimate}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-[#dbe7f8] bg-[#f7fbff] p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">
            UK FIG Timeline Comparison Table
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#edf5ff] text-[#123f76]">
                <tr>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Persona</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Arrival Date</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Prior Non-Resident Years</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Screening Result</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Relief End Date</th>
                  <th className="border border-[#d5e3f7] px-3 py-2 font-semibold">Immediate Action</th>
                </tr>
              </thead>
              <tbody className="text-[#203754]">
                {ukWorkedExamples.map((example) => (
                  <tr key={example.persona} className="bg-white">
                    <td className="border border-[#dfeafb] px-3 py-2 font-medium">{example.persona}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.ukArrivalDate}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.priorYearsNonResident}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.figScreeningResult}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.reliefEndDate}</td>
                    <td className="border border-[#dfeafb] px-3 py-2">{example.immediateAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
          >
            Open Full Case Library
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
          >
            Book Workflow Walkthrough
          </Link>
        </div>
      </section>

      <section id="maintenance" className="surface-panel p-6 scroll-mt-28 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Product Maintenance</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#203754]">
          This suite is actively maintained. Report bugs, request features, and review dated release notes through the
          support loop pages below.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/support"
            className="inline-flex w-full items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968] sm:w-auto"
          >
            Report a Bug or Request a Feature
          </Link>
          <Link
            href="/updates"
            className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
          >
            View Version Changelog
          </Link>
        </div>
      </section>

      <section id="quick-inquiry" className="surface-panel p-6 scroll-mt-28 sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Quick Inquiry Form</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#203754]">
          Start a support request directly from the homepage. This form pre-fills the support workflow so you can
          continue with full details on the dedicated support page.
        </p>
        <form action="/support" method="get" className="mt-5 grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="type" value="question" />
          <input type="hidden" name="path" value="/" />
          <input type="hidden" name="tool" value="Homepage Quick Inquiry" />
          <label htmlFor="home-inquiry-name" className="flex flex-col gap-1 text-sm text-[#203754]">
            Full Name
            <input
              id="home-inquiry-name"
              type="text"
              name="name"
              autoComplete="name"
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="Your full name"
            />
          </label>
          <label htmlFor="home-inquiry-email" className="flex flex-col gap-1 text-sm text-[#203754]">
            Work Email
            <input
              id="home-inquiry-email"
              type="email"
              name="email"
              autoComplete="email"
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="you@example.com"
            />
          </label>
          <label htmlFor="home-inquiry-topic" className="flex flex-col gap-1 text-sm text-[#203754] sm:col-span-2">
            Topic
            <input
              id="home-inquiry-topic"
              type="text"
              name="title"
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="What do you need help with?"
            />
          </label>
          <label htmlFor="home-inquiry-message" className="flex flex-col gap-1 text-sm text-[#203754] sm:col-span-2">
            Message
            <textarea
              id="home-inquiry-message"
              name="details"
              rows={4}
              className="rounded-md border border-[#c8dbf4] bg-white px-3 py-2 text-sm text-[#0f3364]"
              placeholder="Share brief context and we will carry this into the support form."
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968] sm:w-fit"
          >
            Continue to Support
          </button>
        </form>
      </section>

      <section id="latest-blog" className="space-y-6 surface-panel p-6 scroll-mt-28 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">From the Blog</p>
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Latest from the Blog</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
          >
            View all posts
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {latestBlogPosts.map((post) => (
            <Card key={post.slug} className="border-[#d4e3f8]">
              {post.featuredImage ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl border-b border-[#d4e3f8]">
                  <Image
                    src={post.featuredImage.src}
                    alt={post.featuredImage.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ) : null}
              <CardHeader>
                <CardTitle as="p" className="font-[var(--font-heading)] text-xl text-[#0f3364]">{post.title}</CardTitle>
                <CardDescription className="text-base leading-7">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-[#12447d] hover:text-[#0f3968]">
                  Read article
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {remainingBlogPosts.length > 0 ? (
          <div className="rounded-lg border border-[#dbe7f8] bg-[#f8fbff] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#4b6890]">All Article URLs</p>
            <p className="mt-1 text-sm text-[#35577f]">
              Direct link index to help users and crawlers discover every published post quickly.
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {remainingBlogPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-sm text-[#12447d] hover:text-[#0f3968]">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}


