import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrls = [`${siteConfig.siteUrl}/sitemap.xml`, `${siteConfig.siteUrl}/feed.xml`];
  const host = siteConfig.siteUrl.replace(/^https?:\/\//, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/adsense-readiness"]
    },
    sitemap: sitemapUrls,
    host
  };
}
