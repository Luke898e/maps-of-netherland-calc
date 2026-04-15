export type ChecklistStatus = "pass" | "fixed" | "pending";

export interface ChecklistItem {
  id: string;
  category: string;
  check: string;
  status: ChecklistStatus;
  note: string;
}

export const adsenseChecklist: ReadonlyArray<ChecklistItem> = [
  {
    id: "id-01",
    category: "Identity & E-E-A-T",
    check: "About page includes named maintainer and role context.",
    status: "fixed",
    note: "Author bio and methodology sections are now published."
  },
  {
    id: "id-02",
    category: "Identity & E-E-A-T",
    check: "About page includes verifiable profile links.",
    status: "fixed",
    note: "GitHub profile link is included."
  },
  {
    id: "id-03",
    category: "Identity & E-E-A-T",
    check: "Editorial workflow is disclosed.",
    status: "fixed",
    note: "Editorial policy and methodology pages document update flow."
  },
  {
    id: "id-04",
    category: "Identity & E-E-A-T",
    check: "Tool logic is explained in plain language.",
    status: "fixed",
    note: "Methodology cards added on both tool pages."
  },
  {
    id: "id-05",
    category: "Identity & E-E-A-T",
    check: "Source references are linked from trust pages.",
    status: "fixed",
    note: "Government and policy references are listed on About."
  },
  {
    id: "id-06",
    category: "Identity & E-E-A-T",
    check: "Release cadence is transparent.",
    status: "fixed",
    note: "Updates page includes dated changelog entries."
  },
  {
    id: "id-07",
    category: "Identity & E-E-A-T",
    check: "Users can submit corrections.",
    status: "fixed",
    note: "Support form routes bug and feature reports."
  },
  {
    id: "id-08",
    category: "Identity & E-E-A-T",
    check: "Explicit educational-use boundary is stated.",
    status: "pass",
    note: "Legal-disclaimer language appears across policy pages."
  },
  {
    id: "lp-01",
    category: "Legal & Policy Pages",
    check: "Privacy policy exists and is discoverable from global nav/footer.",
    status: "pass",
    note: "Footer link and dedicated route implemented."
  },
  {
    id: "lp-02",
    category: "Legal & Policy Pages",
    check: "Terms of use page exists.",
    status: "fixed",
    note: "Terms page added."
  },
  {
    id: "lp-03",
    category: "Legal & Policy Pages",
    check: "Editorial policy page exists.",
    status: "fixed",
    note: "Editorial policy page added."
  },
  {
    id: "lp-04",
    category: "Legal & Policy Pages",
    check: "Contact page exists with actionable path.",
    status: "pass",
    note: "Contact + support route links are present."
  },
  {
    id: "lp-05",
    category: "Legal & Policy Pages",
    check: "Cookie/consent management entry point visible.",
    status: "fixed",
    note: "Manage Consent control added globally."
  },
  {
    id: "lp-06",
    category: "Legal & Policy Pages",
    check: "Runtime error path includes support escalation.",
    status: "fixed",
    note: "Global error page added with support link."
  },
  {
    id: "lp-07",
    category: "Legal & Policy Pages",
    check: "404 page preserves navigation and support path.",
    status: "fixed",
    note: "Custom not-found page with recovery links added."
  },
  {
    id: "lp-08",
    category: "Legal & Policy Pages",
    check: "Consent status can be audited in privacy docs.",
    status: "fixed",
    note: "Privacy page now includes CMP status indicators."
  },
  {
    id: "lp-09",
    category: "Legal & Policy Pages",
    check: "AdSense readiness checklist is publicly available.",
    status: "fixed",
    note: "Checklist page added."
  },
  {
    id: "cp-01",
    category: "Consent & Data Controls",
    check: "Google Funding Choices script hook exists.",
    status: "fixed",
    note: "Environment-driven script loader implemented."
  },
  {
    id: "cp-02",
    category: "Consent & Data Controls",
    check: "Consent revocation control exists.",
    status: "fixed",
    note: "Manage Consent button integrated with googlefc revocation API."
  },
  {
    id: "cp-03",
    category: "Consent & Data Controls",
    check: "TCF/CMP environment setup is documented.",
    status: "fixed",
    note: ".env.example and README setup instructions added."
  },
  {
    id: "cp-04",
    category: "Consent & Data Controls",
    check: "CMP script configured with real production message ID.",
    status: "pending",
    note: "Requires setting NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL from AdSense."
  },
  {
    id: "cp-05",
    category: "Consent & Data Controls",
    check: "AdSense client ID configured.",
    status: "pending",
    note: "Requires NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT in deployment."
  },
  {
    id: "cp-06",
    category: "Consent & Data Controls",
    check: "Consent messaging shown for EEA/UK/CH in live deployment.",
    status: "pending",
    note: "Requires publishing a Privacy & Messaging campaign in AdSense."
  },
  {
    id: "cp-07",
    category: "Consent & Data Controls",
    check: "No user-entered PII is required to use calculators.",
    status: "pass",
    note: "Only computation inputs are collected client-side."
  },
  {
    id: "cr-01",
    category: "Crawlability & Indexing",
    check: "robots.txt exists.",
    status: "fixed",
    note: "robots metadata route added."
  },
  {
    id: "cr-02",
    category: "Crawlability & Indexing",
    check: "sitemap.xml exists and includes core pages.",
    status: "fixed",
    note: "sitemap route added with key URLs."
  },
  {
    id: "cr-03",
    category: "Crawlability & Indexing",
    check: "Canonical URLs are not placeholders.",
    status: "fixed",
    note: "Canonical now derives from NEXT_PUBLIC_SITE_URL."
  },
  {
    id: "cr-04",
    category: "Crawlability & Indexing",
    check: "Site URL is configured for production canonicalization.",
    status: "pending",
    note: "Set NEXT_PUBLIC_SITE_URL to your real domain."
  },
  {
    id: "cr-05",
    category: "Crawlability & Indexing",
    check: "Metadata titles/descriptions exist for key pages.",
    status: "pass",
    note: "App routes include page-level metadata."
  },
  {
    id: "cr-06",
    category: "Crawlability & Indexing",
    check: "SoftwareApplication schema exists for tools.",
    status: "pass",
    note: "JSON-LD included on both calculators."
  },
  {
    id: "cr-07",
    category: "Crawlability & Indexing",
    check: "ads.txt endpoint exists.",
    status: "fixed",
    note: "ads.txt route added."
  },
  {
    id: "cr-08",
    category: "Crawlability & Indexing",
    check: "ads.txt includes live publisher ID.",
    status: "pending",
    note: "Requires NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT."
  },
  {
    id: "cq-01",
    category: "Content Quality",
    check: "Homepage explains product value clearly.",
    status: "pass",
    note: "Hero content and tool summaries exist."
  },
  {
    id: "cq-02",
    category: "Content Quality",
    check: "Tool pages include substantial educational context.",
    status: "pass",
    note: "Long-form technical sections exceed lightweight calculator patterns."
  },
  {
    id: "cq-03",
    category: "Content Quality",
    check: "Methodology and formulas are disclosed.",
    status: "pass",
    note: "Methodology sections added to both tools."
  },
  {
    id: "cq-04",
    category: "Content Quality",
    check: "Policy boundaries and disclaimers are explicit.",
    status: "pass",
    note: "Terms, privacy, and in-tool notes include boundaries."
  },
  {
    id: "cq-05",
    category: "Content Quality",
    check: "Support and updates loop exists.",
    status: "pass",
    note: "Support form and updates changelog are live."
  },
  {
    id: "cq-06",
    category: "Content Quality",
    check: "Author transparency is present.",
    status: "pass",
    note: "Author profile and verification links included."
  },
  {
    id: "cq-07",
    category: "Content Quality",
    check: "Duplicate/thin policy pages avoided.",
    status: "pass",
    note: "Each policy page has unique content scope."
  },
  {
    id: "cq-08",
    category: "Content Quality",
    check: "Clear user-intent paths are available from every page.",
    status: "fixed",
    note: "Footer and header now provide persistent trust/support links."
  },
  {
    id: "ux-01",
    category: "UX & Accessibility",
    check: "Mobile navigation remains usable without overlap.",
    status: "fixed",
    note: "Responsive mobile menu implemented."
  },
  {
    id: "ux-02",
    category: "UX & Accessibility",
    check: "Primary action buttons remain visible on small screens.",
    status: "fixed",
    note: "Buttons are full-width on small devices."
  },
  {
    id: "ux-03",
    category: "UX & Accessibility",
    check: "Tap targets are large enough for touch devices.",
    status: "fixed",
    note: "Mobile controls and touch-action handling improved."
  },
  {
    id: "ux-04",
    category: "UX & Accessibility",
    check: "Keyboard focus path exists for main content skip.",
    status: "fixed",
    note: "Skip-to-content link added."
  },
  {
    id: "ux-05",
    category: "UX & Accessibility",
    check: "Error states guide users to recovery paths.",
    status: "fixed",
    note: "Custom error and not-found pages provide navigation/support."
  },
  {
    id: "ux-06",
    category: "UX & Accessibility",
    check: "No horizontal overflow on standard mobile widths.",
    status: "fixed",
    note: "Global overflow safeguards applied."
  },
  {
    id: "ux-07",
    category: "UX & Accessibility",
    check: "Forms include clear labels and validation feedback.",
    status: "pass",
    note: "All tool and support forms use labelled fields and error text."
  },
  {
    id: "te-01",
    category: "Technical Stability",
    check: "Type checking passes in production build.",
    status: "pass",
    note: "Build validation completed."
  },
  {
    id: "te-02",
    category: "Technical Stability",
    check: "Linting passes.",
    status: "pass",
    note: "ESLint pass confirmed."
  },
  {
    id: "te-03",
    category: "Technical Stability",
    check: "PWA manifest and service worker skeleton exist.",
    status: "pass",
    note: "Manifest and service worker are published."
  },
  {
    id: "te-04",
    category: "Technical Stability",
    check: "Runtime error fallback exists.",
    status: "fixed",
    note: "Global error boundary page added."
  },
  {
    id: "te-05",
    category: "Technical Stability",
    check: "No hard dependency on unavailable APIs at build time.",
    status: "pass",
    note: "CMP scripts are env-guarded."
  },
  {
    id: "te-06",
    category: "Technical Stability",
    check: "Critical pages are statically prerendered where possible.",
    status: "pass",
    note: "Current route map renders static pages successfully."
  },
  {
    id: "ms-01",
    category: "Monetization Safety",
    check: "Ad placement guardrails are documented before ads go live.",
    status: "fixed",
    note: "Readiness page includes ad-UX checks."
  },
  {
    id: "ms-02",
    category: "Monetization Safety",
    check: "No deceptive or accidental-click-prone CTA mimicry.",
    status: "pass",
    note: "UI components are clearly labeled as navigation/tool actions."
  },
  {
    id: "ms-03",
    category: "Monetization Safety",
    check: "Support and policy pages are reachable without ad interaction.",
    status: "pass",
    note: "Global nav/footer links are persistent."
  },
  {
    id: "ms-04",
    category: "Monetization Safety",
    check: "Adsense account-level policy setup complete.",
    status: "pending",
    note: "Requires account-side configuration in AdSense console."
  },
  {
    id: "ms-05",
    category: "Monetization Safety",
    check: "Ad code is only activated with real publisher credentials.",
    status: "pending",
    note: "Requires NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT."
  },
  {
    id: "ms-06",
    category: "Monetization Safety",
    check: "Final pre-submit QA run completed on production domain.",
    status: "pending",
    note: "Run full QA after deploying with real domain + CMP."
  }
] as const;
