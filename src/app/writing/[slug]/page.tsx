import type { Metadata } from "next";
import type { ReactElement } from "react";

import { mdxComponents } from "@/components/content/mdx-components";
import { Container } from "@/components/layout/Container";
import { PostHeader } from "@/components/writing/PostHeader";
import { getAllPosts, getPostBySlug } from "@/lib/content";

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

  return (
    <main className="py-section-gap">
      <Container size="prose">
        <article>
          <PostHeader frontmatter={frontmatter} readingTime={readingTime} />
          {content}
        </article>
      </Container>
    </main>
  );
}
