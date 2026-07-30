import type { Metadata } from "next";
import type { ReactElement } from "react";

import { mdxComponents } from "@/components/content/mdx-components";
import { Container } from "@/components/layout/Container";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { getAllWork, getWorkBySlug } from "@/lib/content";

export function generateStaticParams(): { slug: string }[] {
  return getAllWork().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getWorkBySlug(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: { title: frontmatter.title, description: frontmatter.summary },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ReactElement> {
  const { slug } = await params;
  const { frontmatter, content } = await getWorkBySlug(slug, mdxComponents);

  return (
    <main className="py-section-gap">
      <Container size="prose">
        <article>
          <CaseStudyHeader frontmatter={frontmatter} />
          {content}
        </article>
      </Container>
    </main>
  );
}
