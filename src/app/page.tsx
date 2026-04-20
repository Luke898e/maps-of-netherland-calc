import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

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
  title: "Home",
  description:
    "2026 Global Mobility & Tax Suite homepage with access to the Nigeria Zero-Tax Auditor and UK FIG Regime Eligibility Tool.",
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

interface HomeFaqItem {
  question: string;
  answer: string;
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

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\d+\)\s*/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function HomePage(): React.JSX.Element {
  const latestBlogPosts = getAllBlogPosts().slice(0, 2);
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

  return (
    <div className="space-y-10">
      <AdSenseScript />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />

      <section className="rounded-2xl border border-[#d7e4f8] bg-white/95 p-8 shadow-[0_25px_50px_-35px_rgba(15,63,121,0.45)] sm:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-[#2f5f9d]">Tax Help for Real Cases</p>
        <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-semibold leading-tight text-[#0e325f] sm:text-5xl">
          2026 Global Mobility & Tax Suite
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#233d5d]">
          Run expert-grade preliminary tax checks for Nigeria and the UK in one place. Each tool combines strict input
          validation, policy-linked logic, and downloadable reports that support adviser conversations and internal
          compliance workflows.
        </p>
      </section>

      <section className="rounded-xl border border-[#d4e3f8] bg-white p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Page Navigation</p>
        <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Jump to Section</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <a href="#tools" className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]">
            Tools
          </a>
          <a
            href="#knowledge-guide"
            className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]"
          >
            Practical Guide
          </a>
          <a
            href="#common-questions"
            className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]"
          >
            Common Questions
          </a>
          <a
            href="#worked-cases"
            className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]"
          >
            Worked Cases
          </a>
          <a
            href="#entity-directory"
            className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]"
          >
            Key Institutions
          </a>
          <a
            href="#sourcing-integrity"
            className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]"
          >
            Sources and Verification
          </a>
          <a href="#home-faq" className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]">
            FAQ
          </a>
          <a href="#maintenance" className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]">
            Maintenance
          </a>
          <a href="#latest-blog" className="rounded-md border border-[#d7e4f8] px-3 py-2 text-sm text-[#12447d] hover:bg-[#eef5ff]">
            Latest Blog
          </a>
        </div>
      </section>

      <section id="tools" className="grid gap-6 scroll-mt-28 lg:grid-cols-2">
        {toolCards.map((card) => (
          <Card key={card.href} className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle className="font-[var(--font-heading)] text-2xl text-[#0f3364]">{card.title}</CardTitle>
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

      <section id="knowledge-guide" className="space-y-8 rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
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
              <h3 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">{section.title}</h3>
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

      <section id="common-questions" className="space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Common Questions</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Direct Answers to Frequent Questions
        </h2>
        <div className="grid gap-4">
          {commonQuestions.map((item) => (
            <Card key={item.intent} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle className="text-xl text-[#0f3364]">{item.intent}</CardTitle>
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

      <section id="entity-directory" className="space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Key Institutions</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Institutions and Teams Referenced in This Suite
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {entityDirectory.map((entry) => (
            <Card key={entry.entity} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle className="text-lg text-[#0f3364]">{entry.entity}</CardTitle>
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

      <section id="sourcing-integrity" className="space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
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
              <CardTitle className="text-lg text-[#0f3364]">UK Primary References</CardTitle>
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
              <CardTitle className="text-lg text-[#0f3364]">Nigeria Primary References</CardTitle>
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

      <section id="home-faq" className="space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Frequently Asked Questions</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Quick Answers to Frequent Questions
        </h2>
        <div className="grid gap-4">
          {homepageFaqs.map((faq) => (
            <Card key={faq.question} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle className="text-lg text-[#0f3364]">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-[#203754]">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="worked-cases" className="space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
        <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Worked Cases</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          Real Decision Scenarios
        </h2>
        <p className="leading-7 text-[#203754]">
          Review worked examples showing how teams use these tools for threshold checks, levy planning, residency
          timelines, and cross-border briefing packs.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle className="text-lg text-[#0f3364]">Nigeria Threshold and Levy Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="leading-7 text-[#203754]">
                Includes practical assumptions, control checks, and defensibility notes for 0% CIT screening and levy
                exposure planning.
              </p>
              <Link href="/case-studies" className="text-sm font-medium text-[#12447d] hover:text-[#0f3968]">
                Open case library
              </Link>
            </CardContent>
          </Card>
          <Card className="border-[#d4e3f8]">
            <CardHeader>
              <CardTitle className="text-lg text-[#0f3364]">UK FIG Timeline Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="leading-7 text-[#203754]">
                Includes date-bound eligibility scenarios and governance workflow patterns for cross-team planning.
              </p>
              <Link href="/case-studies" className="text-sm font-medium text-[#12447d] hover:text-[#0f3968]">
                View worked scenarios
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="maintenance" className="rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
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

      <section id="latest-blog" className="space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-6 scroll-mt-28 sm:p-8">
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

        <div className="grid gap-4 md:grid-cols-2">
          {latestBlogPosts.map((post) => (
            <Card key={post.slug} className="border-[#d4e3f8]">
              <CardHeader>
                <CardTitle className="font-[var(--font-heading)] text-xl text-[#0f3364]">{post.title}</CardTitle>
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
      </section>
    </div>
  );
}
