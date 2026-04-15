import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPostRoutes = getAllBlogPosts().map((post) => `/blog/${post.slug}`);

  const routes = [
    "",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
    "/support",
    "/updates",
    "/editorial-policy",
    "/terms-of-use",
    "/tools/nigeria-zero-tax-auditor",
    "/tools/uk-fig-regime-eligibility",
    ...blogPostRoutes
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/tools") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/tools") ? 0.9 : 0.7
  }));
}
