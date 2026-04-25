"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const primaryNavItems = [
  { href: "/", label: "Home" },
  { href: "/tools/nigeria-zero-tax-auditor", label: "Zero-Tax Auditor" },
  { href: "/tools/uk-fig-regime-eligibility", label: "FIG Eligibility" },
  { href: "/pricing", label: "Pricing" },
  { href: "/book-demo", label: "Book Demo" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" }
];

const utilityNavItems = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

const policyNavItems = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/cookie-policy", label: "Cookies" },
  { href: "/consent", label: "Consent" }
];

const mobileNavGroups = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Home" },
      { href: "/tools/nigeria-zero-tax-auditor", label: "Zero-Tax Auditor" },
      { href: "/tools/uk-fig-regime-eligibility", label: "FIG Eligibility" },
      { href: "/pricing", label: "Pricing" },
      { href: "/book-demo", label: "Book Demo" },
      { href: "/blog", label: "Blog" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/support", label: "Support" },
      { href: "/updates", label: "Updates" },
      { href: "/status", label: "Status" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/sitemap", label: "HTML Sitemap" },
      { href: "/sitemap.xml", label: "XML Sitemap" },
      { href: "/feed.xml", label: "RSS Feed" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/consent", label: "Consent" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/terms-of-use", label: "Terms" },
      { href: "/editorial-policy", label: "Editorial Policy" },
      { href: "/accessibility-statement", label: "Accessibility Statement" },
      { href: "/vpat", label: "VPAT" }
    ]
  }
] as const;

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] border-b border-[#d8e5f7] bg-white/90 backdrop-blur-xl transition-[box-shadow,background-color]",
        isScrolled ? "shadow-[0_10px_32px_-18px_rgba(11,45,90,0.32)]" : "shadow-none"
      )}
    >
      <div className="mx-auto w-full max-w-[86rem] px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <SiteLogo />
          <nav aria-label="Utility navigation" className="hidden items-center gap-1 xl:flex">
            {utilityNavItems.map((item) => {
              const active = isActiveRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                    active ? "bg-[#e9f2ff] text-[#0f3364]" : "text-[#285382] hover:bg-[#eef5ff] hover:text-[#0f3364]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-[#c7daf3] bg-white p-2 text-[#153f77] shadow-[0_8px_22px_-18px_rgba(15,63,121,0.75)] transition-colors hover:bg-[#eaf2ff] lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {siteConfig.contactPhone && siteConfig.contactPhoneDial ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#cfe0f7] bg-[#f5f9ff] px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#426188]">UK support line</p>
            <Link
              href={`tel:${siteConfig.contactPhoneDial}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f3364] underline decoration-[#8ab0df] underline-offset-2 hover:text-[#0b2d55]"
            >
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.contactPhone}
            </Link>
          </div>
        ) : null}

        <nav aria-label="Main navigation" className="mt-3 hidden flex-wrap gap-2 lg:flex">
          {primaryNavItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-[#bed5f2] bg-[#eaf3ff] text-[#0f3364]"
                    : "border-[#d5e3f7] bg-white/95 text-[#17467f] hover:border-[#bed5f2] hover:bg-[#eef5ff] hover:text-[#0f3364]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-2 hidden flex-wrap gap-2 lg:flex xl:hidden">
          {utilityNavItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                  active ? "bg-[#eaf2ff] text-[#0f3364]" : "text-[#285382] hover:bg-[#eef5ff] hover:text-[#0f3364]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

      </div>
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-[#c9dbf3] to-transparent" />
      {mobileOpen ? (
        <div className="fixed inset-0 z-[1100] lg:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-nav-title">
          <button
            type="button"
            aria-label="Close mobile navigation"
            className="absolute inset-0 bg-[#07172c]/45 backdrop-blur-[1px]"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            id="mobile-nav"
            className="absolute right-0 top-0 h-full w-[86vw] max-w-sm border-l border-[#cfdef3] bg-white p-5 shadow-[-24px_0_56px_-36px_rgba(7,34,70,0.8)]"
          >
            <div className="flex items-center justify-between">
              <p id="mobile-nav-title" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#294f79]">
                Menu
              </p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-md border border-[#c7daf3] bg-white p-1.5 text-[#153f77] hover:bg-[#eaf2ff]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {siteConfig.contactPhone && siteConfig.contactPhoneDial ? (
              <div className="mt-4 rounded-md border border-[#d5e3f7] bg-[#f6faff] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#355b86]">UK support</p>
                <Link
                  href={`tel:${siteConfig.contactPhoneDial}`}
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#0f3364]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {siteConfig.contactPhone}
                </Link>
              </div>
            ) : null}

            <div className="mt-4 max-h-[calc(100vh-11.5rem)] space-y-4 overflow-y-auto pr-1">
              {mobileNavGroups.map((group) => (
                <nav key={group.title} aria-label={`Mobile ${group.title} navigation`} className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3a5f8a]">{group.title}</p>
                  <div className="grid gap-2">
                    {group.links.map((item) => {
                      const active = isActiveRoute(pathname, item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "rounded-md border px-3 py-2.5 text-sm transition-colors",
                            active
                              ? "border-[#bed5f2] bg-[#eaf2ff] font-semibold text-[#0f3364]"
                              : "border-[#d4e3f8] bg-white text-[#17467f] hover:bg-[#eaf2ff] hover:text-[#0f3364]"
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              ))}
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
