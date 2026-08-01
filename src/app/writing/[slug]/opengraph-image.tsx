import { ImageResponse } from "next/og";

import { getAllPosts } from "@/lib/content";

export const alt = "Bruce Nkundabagenzi — writing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// OG images are generated at build time with no viewer theme preference, so
// per architecture.md they stay fixed to the light palette's raw hex values
// (Satori/ImageResponse can't read the CSS custom properties in globals.css).
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ImageResponse> {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);
  const title = post?.frontmatter.title ?? "Writing";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#EFEEEB",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#8A6323",
          }}
        >
          Writing
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: "#221A29",
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #D6D2CA",
            paddingTop: 32,
            fontSize: 28,
            color: "#574B5E",
          }}
        >
          Bruce Nkundabagenzi
        </div>
      </div>
    ),
    { ...size },
  );
}
