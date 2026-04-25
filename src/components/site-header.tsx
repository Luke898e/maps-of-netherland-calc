"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

const primaryNavItems = [
  { href: "/", label: "Home" },
  { href: "/tools/nigeria-zero-tax-auditor", label: "Nigeria Auditor" },
  { href: "/tools/uk-fig-regime-eligibility", label: "UK FIG Tool" },
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

        {mobileOpen ? (
          <div
            id="mobile-nav"
            className="mt-4 grid gap-4 rounded-xl border border-[#d5e3f7] bg-white/95 p-4 shadow-[0_16px_36px_-28px_rgba(16,62,121,0.65)] lg:hidden"
          >
            <nav aria-label="Mobile primary navigation" className="grid gap-2">
              {primaryNavItems.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm font-semibold transition-colors",
                      active
                        ? "border-[#bed5f2] bg-[#eaf2ff] text-[#0f3364]"
                        : "border-[#d4e3f8] bg-white text-[#17467f] hover:bg-[#eaf2ff] hover:text-[#0f3364]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <nav aria-label="Mobile utility navigation" className="grid gap-2">
              {[...utilityNavItems, ...policyNavItems].map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      active ? "bg-[#eaf2ff] font-semibold text-[#0f3364]" : "text-[#285382] hover:bg-[#f2f7ff]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-[#c9dbf3] to-transparent" />
    </header>
  );
}
