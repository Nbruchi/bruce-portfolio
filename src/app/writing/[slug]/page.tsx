import type { Metadata } from "next";
import type { ReactElement } from "react";

import { mdxComponents } from "@/components/content/mdx-components";
import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PostHeader } from "@/components/writing/PostHeader";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";

export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getPostBySlug(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: { title: frontmatter.title, description: frontmatter.description },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ReactElement> {
  const { slug } = await params;
  const { frontmatter, content, readingTime } = await getPostBySlug(slug, mdxComponents);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: { "@type": "Person", name: SITE_NAME },
    url: `${SITE_URL}/writing/${slug}`,
  };

  return (
    <main className="py-section-gap">
      <Container size="prose">
        <ArrowLink href="/writing" direction="back">
          All writing
        </ArrowLink>
        <article className="mt-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
          />
          <PostHeader frontmatter={frontmatter} readingTime={readingTime} />
          {content}
        </article>
      </Container>
    </main>
  );
}
