import { getAllBlogPosts } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site-config";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const posts = getAllBlogPosts();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(`${post.publishedDate}T00:00:00.000Z`).toUTCString();
      const description = escapeXml(post.description);
      const title = escapeXml(post.title);

      return `
        <item>
          <title>${title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${description}</description>
        </item>`;
    })
    .join("");

  const latestUpdated = posts[0]?.updatedDate ?? new Date().toISOString().slice(0, 10);
  const lastBuildDate = new Date(`${latestUpdated}T00:00:00.000Z`).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.siteName)} Blog</title>
    <link>${siteConfig.siteUrl}/blog</link>
    <description>${escapeXml("Latest long-form tax guidance, implementation notes, and compliance explainers.")}</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}

