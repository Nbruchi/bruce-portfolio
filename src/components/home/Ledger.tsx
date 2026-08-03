import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllWork, type WorkItem } from "@/lib/content";

export function Ledger(): ReactElement {
  const entries = getAllWork();

  return (
    <section id="ledger" className="py-section-gap">
      <Container>
        <h2 className="text-h2 font-display text-text-primary">The Ledger</h2>
        <div className="mt-12 flex flex-col gap-16">
          {entries.map((entry, index) => (
            <LedgerEntry key={entry.slug} entry={entry} number={index + 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function LedgerEntry({ entry, number }: { entry: WorkItem; number: number }): ReactElement {
  const { frontmatter, slug } = entry;
  const entryNumber = String(number).padStart(2, "0");

  return (
    <ScrollReveal>
      <article>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-rule" />
          <span className="font-mono text-mono text-accent">{entryNumber}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-rule" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[14ch_1fr_1fr] md:gap-12">
          <ul className="flex flex-row flex-wrap gap-x-6 gap-y-1 font-mono text-mono text-accent md:flex-col md:flex-nowrap md:gap-y-2">
            {frontmatter.figures.map((figure) => (
              <li key={figure}>{figure}</li>
            ))}
          </ul>
          <div>
            <p className="font-mono text-mono text-text-secondary uppercase">Built</p>
            <p className="mt-3 text-body text-text-primary">{frontmatter.built}</p>
          </div>
          <div>
            <p className="font-mono text-mono text-text-secondary uppercase">Proves</p>
            <p className="mt-3 text-body text-text-primary">{frontmatter.proves}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <ArrowLink href={`/work/${slug}`}>Read the case study</ArrowLink>
              {frontmatter.liveUrl && frontmatter.liveLinkLabel ? (
                <ArrowLink href={frontmatter.liveUrl} external>
                  {frontmatter.liveLinkLabel}
                </ArrowLink>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
