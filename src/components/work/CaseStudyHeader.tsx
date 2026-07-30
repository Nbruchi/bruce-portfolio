import type { ReactElement } from "react";

import { StackChips } from "@/components/content/StackChips";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { WorkFrontmatter } from "@/lib/content";

type CaseStudyHeaderProps = {
  frontmatter: WorkFrontmatter;
};

export function CaseStudyHeader({ frontmatter }: CaseStudyHeaderProps): ReactElement {
  const { title, summary, role, timeframe, stack, liveUrl, liveLinkLabel, repoUrl } = frontmatter;

  return (
    <header className="mb-12">
      <h1 className="text-h2 font-display text-text-primary">{title}</h1>
      <p className="mt-4 text-body-lg text-text-secondary">{summary}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-mono text-text-secondary">
        <span>{role}</span>
        <span aria-hidden="true">·</span>
        <span>{timeframe}</span>
      </div>
      <div className="mt-4">
        <StackChips stack={stack} />
      </div>
      {liveUrl || repoUrl ? (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {liveUrl ? (
            <ArrowLink href={liveUrl} external>
              {liveLinkLabel ?? "Visit the site"}
            </ArrowLink>
          ) : null}
          {repoUrl ? (
            <ArrowLink href={repoUrl} external>
              View the repo
            </ArrowLink>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
