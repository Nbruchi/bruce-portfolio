import type { Metadata } from "next";
import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { WritingList } from "@/components/writing/WritingList";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on the things that were hard.",
  alternates: { canonical: "/writing" },
};

export default function WritingIndexPage(): ReactElement {
  const posts = getAllPosts();

  return (
    <main className="py-section-gap">
      <Container size="prose">
        <h1 className="text-h2 font-display text-text-primary">Writing</h1>
        <p className="mt-4 text-body-lg text-text-secondary">Notes on the things that were hard.</p>
        <div className="mt-12">
          <WritingList posts={posts} />
        </div>
      </Container>
    </main>
  );
}
