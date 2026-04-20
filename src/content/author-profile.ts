import { siteConfig } from "@/lib/site-config";

const profileLinks = [
  {
    label: "GitHub Profile",
    url: siteConfig.githubProfile
  },
  siteConfig.linkedInProfile
    ? {
        label: "LinkedIn Profile",
        url: siteConfig.linkedInProfile
      }
    : null,
  siteConfig.professionalProfile
    ? {
        label: "Professional Profile",
        url: siteConfig.professionalProfile
      }
    : null,
  {
    label: "Contact Email",
    url: `mailto:${siteConfig.contactEmail}`
  },
  {
    label: "Editorial Policy",
    url: `${siteConfig.siteUrl}/editorial-policy`
  },
  {
    label: "Updates Changelog",
    url: `${siteConfig.siteUrl}/updates`
  }
].filter((link): link is { label: string; url: string } => Boolean(link));

export const authorProfile = {
  name: "Lukmon Isiaq",
  role: "Software Architect and Tax Tooling Maintainer",
  location: "Lagos, Nigeria",
  photoSrc: "/authors/lukmon-isiaq.jpg",
  photoAlt: "Portrait of Lukmon Isiaq, maintainer of the Global Tax Suite",
  mission:
    "I build practical tax-compliance products that convert dense policy language into transparent, testable decision tools for founders, finance teams, and cross-border professionals.",
  bioParagraphs: [
    "My focus is the space between policy and implementation: where tax rules are clear on paper but hard to apply consistently inside real operations. This suite was built as a working reference for teams that need quick screening outputs without losing the underlying audit trail.",
    "Instead of publishing opaque calculators, I document assumptions, expose formulas, and keep validation strict. Every tool output is traceable to explicit input fields and deterministic logic so that users can challenge, verify, or improve each decision branch.",
    "I maintain this project in public with a versioned codebase, reproducible builds, and update notes tied to source documents. That approach is intentional: trust in tax software should come from visible process, not marketing language."
  ],
  profileLinks
} as const;
