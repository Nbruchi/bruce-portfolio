import type { Metadata } from "next";
import Image from "next/image";
import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack engineer in Kigali, Rwanda — how I got into building systems where every part has to agree with the others.",
  alternates: { canonical: "/about" },
};

const PARAGRAPHS: string[] = [
  "I'm Bruce, a full-stack engineer based in Kigali, Rwanda.",
  "I spend my days as the sole engineer on a multi-tenant restaurant management SaaS — the kind of system where nothing lives alone. An order placed at a till deducts inventory through an append-only movement log, posts to a double-entry ledger, generates a tax-compliant fiscal receipt signed with Rwanda's revenue authority in real time, and settles through mobile money, card, or cash. I own that whole stack — backend, web dashboard, and the staff mobile app — plus the architectural decisions behind it, working directly with the client on where the system goes next.",
  "That's the work I love: systems where the parts have to agree with each other, and where getting the model wrong in one place makes every other module lie. Being the only engineer on something that handles real money meant I had no safety net, so I built one — append-only financial records, invariants enforced at the ORM layer instead of hoped for in review, and audits that treat \"it seems to work\" as an unproven claim.",
  "That experience shapes how I build outside of it, too: a single source of truth behind one API, explicit contracts between the parts of a system, versioned migrations from the first commit, and verification at every step — because I've seen what happens in a real business when those things are afterthoughts.",
  "I got into engineering in high school, studying software engineering and embedded systems at Rwanda Coding Academy. Embedded work was fine, but software is what I fell in love with — I liked that it kept giving, that I could keep shaping something instead of it being locked to whatever hardware it shipped on.",
  "Outside my main role I've shipped as part of a distributed remote team: WithinTech Learn (learn.withintech.org), a live e-learning platform serving 750+ students, where I built the course progression and quiz system, the automated email engagement that keeps students moving, and the translation layer that took the platform from English-only to three languages — working async with two other developers split between the US and Rwanda. I also build and write in public. My current side project is SubTrack, a subscription tracker with web and mobile clients on one Nest.js API — multi-currency, scheduled renewal jobs, cached exchange-rate conversion — built solo end to end and documented as I go, including how I keep a long AI-assisted build disciplined across dozens of sessions.",
  "Right now I'm deep in Nest.js and, more than that, in how to use AI coding tools well on a codebase where a mistake costs money — keeping an agent inside real scope and real invariants instead of letting it drift toward something that merely compiles. That's part of what I write about.",
];

export default function AboutPage(): ReactElement {
  return (
    <main className="py-section-gap">
      <Container size="prose">
        <h1 className="text-h2 font-display text-text-primary">About</h1>
        <div className="mt-4">
          <ArrowLink href="/resume.pdf" external>
            Download résumé
          </ArrowLink>
        </div>
        <div className="mt-8">
          {PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className="mb-6 text-body-lg">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Image
              src="/bruce-image.jpg"
              alt="Bruce Nkundabagenzi"
              width={1080}
              height={1080}
              className="h-40 w-40 shrink-0 rounded-lg border border-rule object-cover"
            />
            <p className="text-body-lg">
              Outside of code I listen to a lot of classical music — symphonies especially, and
              film scores. It started in church and never really stopped: something about a piece
              that has to hold together across forty minutes and a dozen instrument sections isn&apos;t
              so far from the systems I spend my days on.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
