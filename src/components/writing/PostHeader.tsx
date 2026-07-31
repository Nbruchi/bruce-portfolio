import type { ReactElement } from "react";

import type { PostFrontmatter } from "@/lib/content";

type PostHeaderProps = {
  frontmatter: PostFrontmatter;
  readingTime: number;
};

function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function PostHeader({ frontmatter, readingTime }: PostHeaderProps): ReactElement {
  return (
    <header className="mb-12">
      <h1 className="text-h2 font-display text-text-primary">{frontmatter.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-mono text-text-secondary">
        <span>{formatPostDate(frontmatter.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{readingTime} min read</span>
      </div>
    </header>
  );
}
