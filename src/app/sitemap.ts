import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/content/blog-posts";
import { changelogEntries } from "@/content/changelog";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();
  const blogPostRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

  const routes = [
    "",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/cookie-policy",
    "/disclaimer",
    "/support",
    "/updates",
    "/status",
    "/editorial-policy",
    "/terms-of-use",
    "/tools/nigeria-zero-tax-auditor",
    "/tools/uk-fig-regime-eligibility",
    ...blogPostRoutes
  ];

  const latestReleaseDate = changelogEntries[0]?.date;
  const staticPageLastModified = latestReleaseDate ? new Date(latestReleaseDate) : new Date();
  const blogLastModifiedMap = new Map(
    blogPosts.map((post) => [`/blog/${post.slug}`, new Date(`${post.updatedDate}T00:00:00.000Z`)])
  );

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: blogLastModifiedMap.get(route) ?? staticPageLastModified,
    changeFrequency: route.startsWith("/tools") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/tools") ? 0.9 : 0.7
  }));
}
