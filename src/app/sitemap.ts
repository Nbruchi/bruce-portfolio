import type { MetadataRoute } from "next";

import { getAllPosts, getAllWork } from "@/lib/content";
import { SITE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((work) => ({
    url: `${SITE_URL}/work/${work.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    lastModified: post.frontmatter.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...workRoutes, ...postRoutes];
}
