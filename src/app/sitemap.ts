import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/content/blog-posts";
import { changelogEntries } from "@/content/changelog";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();

  const staticRouteSettings: ReadonlyArray<{
    route: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }> = [
    { route: "", changeFrequency: "daily", priority: 1 },
    { route: "/blog", changeFrequency: "daily", priority: 0.95 },
    { route: "/tools/nigeria-zero-tax-auditor", changeFrequency: "weekly", priority: 0.9 },
    { route: "/tools/uk-fig-regime-eligibility", changeFrequency: "weekly", priority: 0.9 },
    { route: "/sitemap", changeFrequency: "weekly", priority: 0.85 },
    { route: "/sitemap.xml", changeFrequency: "daily", priority: 0.9 },
    { route: "/feed.xml", changeFrequency: "daily", priority: 0.75 },
    { route: "/case-studies", changeFrequency: "weekly", priority: 0.8 },
    { route: "/about", changeFrequency: "monthly", priority: 0.7 },
    { route: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { route: "/privacy-policy", changeFrequency: "monthly", priority: 0.7 },
    { route: "/cookie-policy", changeFrequency: "monthly", priority: 0.7 },
    { route: "/consent", changeFrequency: "monthly", priority: 0.65 },
    { route: "/disclaimer", changeFrequency: "monthly", priority: 0.7 },
    { route: "/support", changeFrequency: "weekly", priority: 0.75 },
    { route: "/updates", changeFrequency: "weekly", priority: 0.8 },
    { route: "/status", changeFrequency: "weekly", priority: 0.7 },
    { route: "/editorial-policy", changeFrequency: "monthly", priority: 0.65 },
    { route: "/terms-of-use", changeFrequency: "monthly", priority: 0.65 }
  ];

  const latestReleaseDate = changelogEntries[0]?.date;
  const staticPageLastModified = latestReleaseDate ? new Date(latestReleaseDate) : new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRouteSettings.map((item) => ({
    url: `${siteConfig.siteUrl}${item.route}`,
    lastModified: staticPageLastModified,
    changeFrequency: item.changeFrequency,
    priority: item.priority
  }));

  const now = Date.now();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const updatedAt = new Date(post.updatedAt ?? `${post.updatedDate}T00:00:00.000Z`);
    const isFresh = now - updatedAt.getTime() <= thirtyDaysInMs;

    return {
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      lastModified: updatedAt,
      changeFrequency: isFresh ? "weekly" : "monthly",
      priority: isFresh ? 0.88 : 0.8,
      images: post.featuredImage ? [`${siteConfig.siteUrl}${post.featuredImage.src}`] : undefined
    };
  });

  return [...staticEntries, ...blogEntries];
}
