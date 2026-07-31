import Link from "next/link";
import type { ReactElement } from "react";

import type { PostItem } from "@/lib/content";

type WritingListProps = {
  posts: PostItem[];
};

// ISO dates sort and slice safely as strings; parsing with an explicit UTC
// timezone avoids the off-by-one-day shift a local-timezone read would cause.
function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  })
    .format(new Date(date))
    .toUpperCase();
}

function groupByYear(posts: PostItem[]): { year: string; posts: PostItem[] }[] {
  const groups: { year: string; posts: PostItem[] }[] = [];

  for (const post of posts) {
    const year = post.frontmatter.date.slice(0, 4);
    const currentGroup = groups.at(-1);
    if (currentGroup?.year === year) {
      currentGroup.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }

  return groups;
}

export function WritingList({ posts }: WritingListProps): ReactElement {
  if (posts.length === 0) {
    return <p className="text-body-lg text-text-secondary">First post is being written.</p>;
  }

  return (
    <div className="flex flex-col gap-12">
      {groupByYear(posts).map(({ year, posts: yearPosts }) => (
        <section key={year}>
          <div className="flex items-center gap-4">
            <h2 className="font-display text-h3 font-medium text-text-primary">{year}</h2>
            <span aria-hidden="true" className="h-px flex-1 bg-rule" />
          </div>
          <ul className="mt-4">
            {yearPosts.map((post) => (
              <li key={post.slug} className="border-b border-rule first:border-t">
                <Link
                  href={`/writing/${post.slug}`}
                  className="flex flex-col gap-1 px-2 py-4 transition-colors duration-150 ease-out hover:bg-accent-wash sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="shrink-0 font-mono text-mono text-text-secondary sm:w-[8ch]">
                    {formatPostDate(post.frontmatter.date)}
                  </span>
                  <span className="flex-1 font-medium text-text-primary">
                    {post.frontmatter.title}
                  </span>
                  <span className="shrink-0 font-mono text-mono text-text-secondary">
                    {post.readingTime} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
