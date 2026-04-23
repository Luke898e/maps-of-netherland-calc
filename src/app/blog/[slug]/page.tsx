import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSenseScript } from "@/components/adsense-script";
import { blogEnhancements } from "@/content/blog-enhancements";
import { blogEnhancementsAdvanced } from "@/content/blog-enhancements-advanced";
import { getAllBlogPosts, getBlogPostBySlug } from "@/content/blog-posts";
import { blogMarkdownOverrides } from "@/content/blog-markdown-overrides";
import { authorProfile } from "@/content/author-profile";
import { siteConfig } from "@/lib/site-config";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function renderTextWithLinks(text: string): React.ReactNode {
  // Markdown authoring rules for blog overrides:
  // - [label](url) => link
  // - **text** => bold text
  const inlinePattern = /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^\s)]+)\)|\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlinePattern.exec(text)) !== null) {
    const [fullMatch, linkLabel, linkHref, boldText] = match;
    const matchStart = match.index;

    if (matchStart > lastIndex) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    if (linkLabel && linkHref) {
      const isExternal = linkHref.startsWith("http://") || linkHref.startsWith("https://");

      parts.push(
        isExternal ? (
          <a
            key={`${linkHref}-${matchStart}`}
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
          >
            {linkLabel}
          </a>
        ) : (
          <Link
            key={`${linkHref}-${matchStart}`}
            href={linkHref}
            className="link-inline"
          >
            {linkLabel}
          </Link>
        )
      );
    } else if (boldText) {
      parts.push(
        <strong key={`bold-${matchStart}`} className="font-semibold text-[#0f3364]">
          {boldText}
        </strong>
      );
    }

    lastIndex = matchStart + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  if (parts.length === 0) {
    return text;
  }

  return <>{parts}</>;
}

function renderMarkdownBody(markdown: string): React.ReactNode {
  const lines = markdown.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let bulletItems: string[] = [];
  let skippedPrimaryH1 = false;

  const flushBullets = (): void => {
    if (bulletItems.length === 0) {
      return;
    }

    blocks.push(
      <ul key={`bullets-${blocks.length}`} className="list-disc space-y-2 pl-5 text-[#203754]">
        {bulletItems.map((item, index) => (
          <li key={`bullet-${blocks.length}-${index}`}>{renderTextWithLinks(item)}</li>
        ))}
      </ul>
    );

    bulletItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.length === 0) {
      flushBullets();
      continue;
    }

    if (line.startsWith("* ")) {
      bulletItems.push(line.slice(2));
      continue;
    }

    flushBullets();

    if (line === "---") {
      continue;
    }

    if (line.startsWith("# ")) {
      if (!skippedPrimaryH1) {
        skippedPrimaryH1 = true;
        continue;
      }

      blocks.push(
        <h1 key={`h1-${blocks.length}`} className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">
          {renderTextWithLinks(line.slice(2))}
        </h1>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
          {renderTextWithLinks(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="font-[var(--font-heading)] text-xl font-semibold text-[#0f3364]">
          {renderTextWithLinks(line.slice(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={`quote-${blocks.length}`}
          className="border-l-4 border-[#c8dbf4] bg-[#f7fbff] px-4 py-3 italic text-[#1f3b61]"
        >
          {renderTextWithLinks(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-7 text-[#203754]">
        {renderTextWithLinks(line)}
      </p>
    );
  }

  flushBullets();

  return <div className="space-y-4">{blocks}</div>;
}

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

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  const featureImageUrl = post.featuredImage ? `${siteConfig.siteUrl}${post.featuredImage.src}` : undefined;
  const publishedTime = post.publishedAt ?? post.publishedDate;
  const modifiedTime = post.updatedAt ?? post.updatedDate;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteConfig.siteUrl}/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime,
      modifiedTime,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      images: featureImageUrl
        ? [
            {
              url: featureImageUrl,
              alt: post.featuredImage?.alt
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: featureImageUrl ? [featureImageUrl] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const markdownOverride = blogMarkdownOverrides[post.slug];
  const hasMarkdownOverride = typeof markdownOverride === "string" && markdownOverride.trim().length > 0;
  const enhancementMarkdown = blogEnhancements[post.slug];
  const hasEnhancement = typeof enhancementMarkdown === "string" && enhancementMarkdown.trim().length > 0;
  const advancedEnhancementMarkdown = blogEnhancementsAdvanced[post.slug];
  const hasAdvancedEnhancement =
    typeof advancedEnhancementMarkdown === "string" && advancedEnhancementMarkdown.trim().length > 0;
  const mergedMarkdown = hasMarkdownOverride
    ? `${markdownOverride}${hasEnhancement ? `\n\n${enhancementMarkdown}` : ""}${
        hasAdvancedEnhancement ? `\n\n${advancedEnhancementMarkdown}` : ""
      }`
    : undefined;

  const postStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteConfig.siteUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt ?? post.publishedDate,
    dateModified: post.updatedAt ?? post.updatedDate,
    author: {
      "@id": `${siteConfig.siteUrl}#author`
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}#organization`
    },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    citation: post.references?.map((reference) => reference.url) ?? [],
    image: post.featuredImage ? `${siteConfig.siteUrl}${post.featuredImage.src}` : undefined
  };

  const faqStructuredData =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer
            }
          }))
        }
      : null;

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <AdSenseScript />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postStructuredData)
        }}
      />
      {faqStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData)
          }}
        />
      ) : null}

      <header className="surface-hero space-y-4 p-8 sm:p-10">
        <p className="section-kicker">{post.category}</p>
        <h1 className="text-3xl font-semibold text-[#0f3364] sm:text-4xl">{post.title}</h1>
        <p className="body-copy">{post.description}</p>
        {post.featuredImage ? (
          <div className="relative mt-2 aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#d4e3f8]">
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#486789]">
          <span>By {authorProfile.name}</span>
          <span aria-hidden="true">|</span>
          <span>Published: {formatDate(post.publishedAt ?? post.publishedDate)}</span>
          <span aria-hidden="true">|</span>
          <span>Updated: {formatDate(post.updatedAt ?? post.updatedDate)}</span>
          <span aria-hidden="true">|</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="space-y-8 surface-panel p-8 sm:p-10">
        {hasMarkdownOverride
          ? renderMarkdownBody(mergedMarkdown ?? markdownOverride)
          : post.sections.map((section, sectionIndex) => (
              <section key={`${section.heading}-${sectionIndex}`} className="space-y-4">
                {section.heading.trim().length > 0 ? (
                  <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="leading-7 text-[#203754]">
                    {renderTextWithLinks(paragraph)}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-5 text-[#203754]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
        {!hasMarkdownOverride && hasEnhancement ? (
          <section className="space-y-4">
            {renderMarkdownBody(enhancementMarkdown)}
          </section>
        ) : null}
        {!hasMarkdownOverride && hasAdvancedEnhancement ? (
          <section className="space-y-4">
            {renderMarkdownBody(advancedEnhancementMarkdown)}
          </section>
        ) : null}
      </div>

      {!hasMarkdownOverride && post.faqs && post.faqs.length > 0 ? (
        <section className="space-y-5 surface-panel p-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">
            People Also Ask
          </h2>
          <div className="space-y-4">
            {post.faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-[#dce8f9] bg-[#f7fbff] p-4">
                <h3 className="text-lg font-semibold text-[#0f3364]">{faq.question}</h3>
                <p className="mt-2 leading-7 text-[#203754]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {!hasMarkdownOverride && post.references && post.references.length > 0 ? (
        <section className="space-y-5 surface-panel p-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#0f3364]">Sources and References</h2>
          <ul className="space-y-2">
            {post.references.map((reference) => (
              <li key={reference.url}>
                <Link href={reference.url} target="_blank" rel="noopener noreferrer" className="link-inline">
                  {reference.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="surface-panel p-6">
        <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[#0f3364]">Continue reading</h2>
        <p className="mt-2 leading-7 text-[#203754]">
          Explore other implementation notes in the blog or return to the tool suite.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[linear-gradient(180deg,#1a5696_0%,#13457f_100%)] px-4 py-2 text-sm font-medium text-white shadow-[0_12px_26px_-18px_rgba(15,63,121,0.8)] transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-105 sm:w-auto"
          >
            Back to Blog
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
          >
            Open Tool Suite
          </Link>
        </div>
      </section>
    </article>
  );
}

