import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/writing/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();

      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Bruce Nkundabagenzi — Writing</title>
    <link>${siteUrl}/writing</link>
    <description>Notes on the things that were hard.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
