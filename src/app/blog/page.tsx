import type { Metadata } from "next";
import Link from "next/link";

import { AdSenseScript } from "@/components/adsense-script";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical tax guidance and implementation notes for the 2026 Global Mobility & Tax Suite."
};

function formatDate(dateInput: string): string {
  const parsed = new Date(dateInput);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
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
      datePublished: post.publishedDate,
      dateModified: post.updatedDate,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`
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

      <section className="space-y-3 rounded-xl border border-[#d4e3f8] bg-white p-8">
        <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">Editorial Hub</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
          Global Mobility Tax Blog
        </h1>
        <p className="leading-7 text-[#203754]">
          Practical implementation notes, policy explainers, and product methodology updates for tax teams using our
          Nigeria and UK compliance tools.
        </p>
      </section>

      <section className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.slug} className="border-[#d4e3f8]">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#4b6890]">
                <span>{post.category}</span>
                <span aria-hidden="true">|</span>
                <span>{formatDate(post.publishedDate)}</span>
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
                  <span
                    key={tag}
                    className="rounded-full border border-[#c8dbf4] bg-[#f3f8ff] px-3 py-1 text-xs font-medium text-[#20497b]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
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
