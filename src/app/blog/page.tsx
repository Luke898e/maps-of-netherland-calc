import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { AdSenseScript } from "@/components/adsense-script";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical tax guidance and implementation notes for the 2026 Global Mobility & Tax Suite.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/blog`
  }
};

function formatDate(dateInput: string): string {
  const parsed = new Date(dateInput);
  const includeTime = dateInput.includes("T");

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(includeTime
      ? {
          hour: "2-digit" as const,
          minute: "2-digit" as const
        }
      : {})
  }).format(parsed);
}

export default function BlogPage(): React.JSX.Element {
  const posts = getAllBlogPosts();

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.siteUrl}/blog#blog`,
    url: `${siteConfig.siteUrl}/blog`,
    name: "Global Mobility & Tax Suite Blog",
    description: "Technical tax guidance and implementation notes for the 2026 Global Mobility & Tax Suite.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt ?? post.publishedDate,
      dateModified: post.updatedAt ?? post.updatedDate,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      image: post.featuredImage ? `${siteConfig.siteUrl}${post.featuredImage.src}` : undefined
    }))
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <AdSenseScript />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogStructuredData)
        }}
      />

      <section className="surface-hero space-y-3 p-8 sm:p-10">
        <p className="section-kicker">Editorial Hub</p>
        <h1 className="text-3xl font-semibold text-[#0f3364] sm:text-4xl">
          Global Mobility Tax Blog
        </h1>
        <p className="body-copy">
          Practical implementation notes, policy explainers, and product methodology updates for tax teams using our
          Nigeria and UK compliance tools.
        </p>
      </section>

      <section className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            {post.featuredImage ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl border-b border-[#d4e3f8]">
                <Image
                  src={post.featuredImage.src}
                  alt={post.featuredImage.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 768px, 100vw"
                />
              </div>
            ) : null}
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#4b6890]">
                <span>{post.category}</span>
                <span aria-hidden="true">|</span>
                <span>{formatDate(post.publishedAt ?? post.publishedDate)}</span>
                <span aria-hidden="true">|</span>
                <span>{post.readingTime}</span>
              </div>
              <CardTitle className="text-2xl text-[#0f3364]">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#12447d]">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-base leading-7">{post.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="chip-soft">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center rounded-lg bg-[linear-gradient(180deg,#1a5696_0%,#13457f_100%)] px-4 py-2 text-sm font-medium text-white shadow-[0_12px_26px_-18px_rgba(15,63,121,0.8)] transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-105"
              >
                Read article
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

