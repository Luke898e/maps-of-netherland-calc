import type { Metadata } from "next";
import Link from "next/link";

import { getAllBlogPosts } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "HTML Sitemap",
  description:
    "Human-friendly HTML sitemap for the 2026 Global Mobility & Tax Suite with tools, blog posts, trust pages, and support resources.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/sitemap`
  }
};

const corePages = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/tools/nigeria-zero-tax-auditor", label: "2026 Nigeria Zero-Tax Auditor" },
  { href: "/tools/uk-fig-regime-eligibility", label: "2026 UK FIG Regime Eligibility Tool" },
  { href: "/sitemap.xml", label: "XML Sitemap" },
  { href: "/feed.xml", label: "RSS Feed" }
] as const;

const productPages = [
  { href: "/support", label: "Support" },
  { href: "/updates", label: "Updates / Changelog" },
  { href: "/status", label: "Status" }
] as const;

const trustPages = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/consent", label: "Consent" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/disclaimer", label: "Disclaimer" }
] as const;

function formatDate(dateInput: string): string {
  const parsed = new Date(dateInput);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(parsed);
}

export default function HtmlSitemapPage(): React.JSX.Element {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="surface-hero space-y-3 p-8 sm:p-10">
        <p className="section-kicker">Site Index</p>
        <h1 className="text-3xl font-semibold text-[#0f3364] sm:text-4xl">HTML Sitemap</h1>
        <p className="body-copy">
          This page lists all major sections so users and crawlers can reach tools, legal pages, and long-form guides
          from one place.
        </p>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="section-title">Core Pages</h2>
        <ul className="mt-4 space-y-2">
          {corePages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="link-inline text-sm sm:text-base">
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="section-title">Product and Support</h2>
        <ul className="mt-4 space-y-2">
          {productPages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="link-inline text-sm sm:text-base">
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="section-title">Trust and Legal</h2>
        <ul className="mt-4 space-y-2">
          {trustPages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="link-inline text-sm sm:text-base">
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-panel p-6 sm:p-8">
        <h2 className="section-title">Blog Posts</h2>
        <p className="mt-3 text-sm text-[#486789]">{blogPosts.length} published articles indexed below.</p>
        <ul className="mt-4 space-y-3">
          {blogPosts.map((post) => (
            <li key={post.slug} className="rounded-lg border border-[#dbe7f8] bg-[#f8fbff] p-3">
              <Link href={`/blog/${post.slug}`} className="link-inline block text-sm font-semibold sm:text-base">
                {post.title}
              </Link>
              <p className="mt-1 text-xs text-[#5b7597]">
                Updated {formatDate(post.updatedDate)} | {post.category}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
