import Link from "next/link";

import { ConsentPreferencesButton } from "@/components/consent-preferences-button";

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="border-t border-[#d9e5f7] bg-white/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-[#35577f] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>2026 Global Mobility & Tax Suite. Compliance content is educational and not legal advice.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/about" className="text-[#17467f] hover:text-[#0f3364]">
            About
          </Link>
          <Link href="/contact" className="text-[#17467f] hover:text-[#0f3364]">
            Contact
          </Link>
          <Link href="/privacy-policy" className="text-[#17467f] hover:text-[#0f3364]">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="text-[#17467f] hover:text-[#0f3364]">
            Cookie Policy
          </Link>
          <Link href="/consent" className="text-[#17467f] hover:text-[#0f3364]">
            Consent
          </Link>
          <Link href="/blog" className="text-[#17467f] hover:text-[#0f3364]">
            Blog
          </Link>
          <Link href="/disclaimer" className="text-[#17467f] hover:text-[#0f3364]">
            Disclaimer
          </Link>
          <Link href="/terms-of-use" className="text-[#17467f] hover:text-[#0f3364]">
            Terms
          </Link>
          <Link href="/editorial-policy" className="text-[#17467f] hover:text-[#0f3364]">
            Editorial Policy
          </Link>
          <Link href="/support" className="text-[#17467f] hover:text-[#0f3364]">
            Support
          </Link>
          <Link href="/updates" className="text-[#17467f] hover:text-[#0f3364]">
            Updates
          </Link>
          <Link href="/status" className="text-[#17467f] hover:text-[#0f3364]">
            Status
          </Link>
          <ConsentPreferencesButton />
        </div>
      </div>
    </footer>
  );
}
