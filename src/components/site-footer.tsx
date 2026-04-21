import Link from "next/link";

import { ConsentPreferencesButton } from "@/components/consent-preferences-button";

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="mt-14 border-t border-[#d9e5f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,255,0.94))]">
      <div className="mx-auto grid w-full max-w-[86rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-[var(--font-heading)] text-lg font-semibold text-[#0f3364]">2026 Global Mobility & Tax Suite</p>
          <p className="max-w-md text-sm leading-6 text-[#35577f]">
            Professional screening tools and technical tax documentation for Nigeria and UK cross-border planning.
            Compliance content is educational and not legal advice.
          </p>
          <p className="text-xs uppercase tracking-[0.12em] text-[#567396]">Updated continuously with public changelog records</p>
        </div>

        <nav aria-label="Product links" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4a688e]">Product</p>
          <div className="grid gap-2 text-sm">
            <Link href="/" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Home</Link>
            <Link href="/tools/nigeria-zero-tax-auditor" className="text-[#17467f] transition-colors hover:text-[#0f3364]">
              Nigeria Tool
            </Link>
            <Link href="/tools/uk-fig-regime-eligibility" className="text-[#17467f] transition-colors hover:text-[#0f3364]">
              UK FIG Tool
            </Link>
            <Link href="/blog" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Blog</Link>
            <Link href="/case-studies" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Case Studies</Link>
            <Link href="/support" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Support</Link>
            <Link href="/updates" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Updates</Link>
            <Link href="/status" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Status</Link>
          </div>
        </nav>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4a688e]">Trust and Legal</p>
          <div className="grid gap-2 text-sm">
            <Link href="/about" className="text-[#17467f] transition-colors hover:text-[#0f3364]">About</Link>
            <Link href="/contact" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Contact</Link>
            <Link href="/privacy-policy" className="text-[#17467f] transition-colors hover:text-[#0f3364]">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-[#17467f] transition-colors hover:text-[#0f3364]">
              Cookie Policy
            </Link>
            <Link href="/consent" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Consent</Link>
            <Link href="/disclaimer" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Disclaimer</Link>
            <Link href="/terms-of-use" className="text-[#17467f] transition-colors hover:text-[#0f3364]">Terms</Link>
            <Link href="/editorial-policy" className="text-[#17467f] transition-colors hover:text-[#0f3364]">
              Editorial Policy
            </Link>
            <Link href="/sitemap" className="text-[#17467f] transition-colors hover:text-[#0f3364]">HTML Sitemap</Link>
          </div>
          <ConsentPreferencesButton />
        </div>
      </div>
      <div className="border-t border-[#dfebfa] bg-white/70">
        <p className="mx-auto w-full max-w-[86rem] px-4 py-3 text-xs text-[#567396] sm:px-6 lg:px-8">
          © 2026 Global Mobility & Tax Suite. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
