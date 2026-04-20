"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/tools/nigeria-zero-tax-auditor", label: "Nigeria Tool" },
  { href: "/tools/uk-fig-regime-eligibility", label: "UK FIG Tool" },
  { href: "/updates", label: "Updates" },
  { href: "/status", label: "Status" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/cookie-policy", label: "Cookies" },
  { href: "/consent", label: "Consent" }
];

export function SiteHeader(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] border-b border-[#d9e5f7] bg-white/95 backdrop-blur transition-shadow",
        isScrolled ? "shadow-[0_6px_24px_rgba(11,45,90,0.10)]" : "shadow-none"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <SiteLogo />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-[#c7daf3] bg-white p-2 text-[#153f77] transition-colors hover:bg-[#eaf2ff] lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav aria-label="Main navigation" className="mt-4 hidden flex-wrap gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-[#153f77] transition-colors hover:bg-[#eaf2ff] hover:text-[#0f315f]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {mobileOpen ? (
          <nav id="mobile-nav" aria-label="Mobile navigation" className="mt-4 grid gap-2 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md border border-[#d4e3f8] bg-white px-3 py-2 text-sm font-medium text-[#153f77] transition-colors hover:bg-[#eaf2ff] hover:text-[#0f315f]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
