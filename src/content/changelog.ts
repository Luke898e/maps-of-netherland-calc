export interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  details: ReadonlyArray<string>;
}

export const changelogEntries: ReadonlyArray<ChangelogEntry> = [
  {
    date: "April 15, 2026",
    version: "v1.11.0",
    title: "UK FIG Deep-Dive Rewrite",
    details: [
      "Rewrote the UK lead article to cover FIG basics, HMRC-facing evidence requirements, timeline boundaries, and operational controls in plain language.",
      "Expanded People Also Ask coverage with direct answers for UK FIG regime 2026 HMRC and related foreign income and gains queries.",
      "Aligned examples and FAQ content to the tool's four-year expiry logic and ten-year residency gate."
    ]
  },
  {
    date: "April 15, 2026",
    version: "v1.10.0",
    title: "Nigeria CIT Deep-Dive Rewrite",
    details: [
      "Rewrote the Nigeria lead article with expanded coverage of 0% threshold workflow, rates, minimum tax, penalties, and exempt-income handling.",
      "Added explicit Q-and-A coverage for salary tax example, foreign-currency interest withholding, and 2026 law-document sourcing workflow.",
      "Expanded People Also Ask FAQ set for the Nigeria post and preserved FAQ schema output."
    ]
  },
  {
    date: "April 15, 2026",
    version: "v1.9.0",
    title: "Long-Form Nigeria and UK Blog Expansion",
    details: [
      "Expanded the first two jurisdiction articles to 1500+ words each with practical decision workflows.",
      "Added detailed People Also Ask sections on both long-form posts.",
      "Added FAQPage JSON-LD generation for posts that include FAQ entries."
    ]
  },
  {
    date: "April 15, 2026",
    version: "v1.8.0",
    title: "Homepage Navigation and FAQ Schema Upgrade",
    details: [
      "Added section-level jump links and per-section anchor IDs for faster content navigation.",
      "Added Guide Contents links for long-form homepage sections.",
      "Added visible homepage FAQ block and FAQPage JSON-LD structured data."
    ]
  },
  {
    date: "April 15, 2026",
    version: "v1.7.0",
    title: "Homepage Long-Form Guidance Expansion",
    details: [
      "Added a 2500+ word homepage guide for Nigeria and UK tax workflows.",
      "Added practical question-and-answer sections, institution references, and source-check guidance.",
      "Expanded educational depth with clearer reader-facing explanations."
    ]
  },
  {
    date: "April 15, 2026",
    version: "v1.6.0",
    title: "Blog Section Launch",
    details: [
      "Added a dedicated /blog route with curated technical and policy implementation articles.",
      "Added static blog post routes with per-post metadata and BlogPosting structured data.",
      "Integrated blog discoverability into global navigation, footer links, homepage, and sitemap."
    ]
  },
  {
    date: "April 14, 2026",
    version: "v1.5.0",
    title: "Trust Surface Upgrade: Structured Data, Disclaimer, Status, and OG Coverage",
    details: [
      "Added site-wide Organization, Person, and WebSite JSON-LD.",
      "Published dedicated Disclaimer and Status pages and added global discoverability links.",
      "Added shared Open Graph and Twitter preview image metadata for improved cross-platform presentation."
    ]
  },
  {
    date: "April 14, 2026",
    version: "v1.4.0",
    title: "AdSense Readiness Hardening and Trust Surface Expansion",
    details: [
      "Published a 50+ point public readiness checklist page with pass/fix/pending tracking.",
      "Added global discoverability links for Terms, Editorial Policy, and Readiness Checklist.",
      "Hardened site URL normalization to avoid runtime metadata failures from malformed env values."
    ]
  },
  {
    date: "April 14, 2026",
    version: "v1.3.0",
    title: "Support Loop and Product Feedback Layer",
    details: [
      "Added dedicated Support page with structured bug-report and feature-request forms.",
      "Published Updates page with dated changelog entries for transparency and release cadence.",
      "Embedded support action cards directly on both tool pages for fast user feedback."
    ]
  },
  {
    date: "April 13, 2026",
    version: "v1.2.1",
    title: "PWA Skeleton and Technical Trust Signals",
    details: [
      "Added manifest.json, service-worker.js, and production-safe service worker registration.",
      "Added installable icon assets and theme-color metadata for modern app readiness.",
      "Verified manifest and service-worker endpoints are publicly accessible."
    ]
  },
  {
    date: "April 12, 2026",
    version: "v1.2.0",
    title: "Author and Methodology Expansion",
    details: [
      "Added detailed author biography card with verifiable profile links.",
      "Added methodology sections explaining each tool's logic and formulas.",
      "Rewrote About page with editorial process, source references, and trust boundaries."
    ]
  },
  {
    date: "April 10, 2026",
    version: "v1.1.1",
    title: "Cross-Device Functional Parity Hardening",
    details: [
      "Improved mobile action layout with full-width call-to-action buttons.",
      "Optimized timeline controls for smaller screens and touch interactions.",
      "Added overflow safeguards to prevent clipped controls in constrained viewports."
    ]
  },
  {
    date: "April 7, 2026",
    version: "v1.1.0",
    title: "Nigeria Auditor Upgrade",
    details: [
      "Introduced dedicated Assessable Profit input for more accurate Development Levy estimates.",
      "Aligned PDF outputs and logic messaging with explicit assessable profit computation.",
      "Removed proxy-language ambiguity from tool and documentation narratives."
    ]
  },
  {
    date: "March 31, 2026",
    version: "v1.0.0",
    title: "Initial Public Release",
    details: [
      "Launched Next.js 15 App Router platform with global navigation and base metadata.",
      "Released 2026 Nigeria Zero-Tax Auditor and UK FIG Eligibility tools with Zod validation.",
      "Published long-form technical documentation sections for both jurisdictions."
    ]
  }
];
