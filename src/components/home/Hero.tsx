import type { ReactElement } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function Hero(): ReactElement {
  return (
    <section className="flex min-h-[72vh] flex-col justify-center">
      <Container>
        <p className="font-mono text-mono text-text-secondary">
          Kigali, Rwanda · Available for remote roles
        </p>
        <h1 className="hero-headline mt-6 max-w-3xl text-hero font-display text-text-primary">
          I build systems where every part has to agree with the others.
        </h1>
        <p className="hero-subhead mt-6 max-w-2xl text-body-lg text-text-secondary">
          I&apos;m the sole engineer on a restaurant management platform that handles
          inventory, double-entry accounting, multi-channel payments, and real-time tax
          compliance — where one wrong number in one module makes every other module lie.
          Full-stack, web and mobile, with a lot of that depth on the backend.
        </p>
        <div className="hero-ctas mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/#ledger" variant="primary">
            See the work
          </Button>
          <Button href="/writing" variant="secondary">
            Read the writing
          </Button>
          <a
            href="mailto:brucenkundabagenzi@gmail.com"
            className="text-accent underline decoration-1 underline-offset-[0.2em] transition-[text-decoration-thickness] duration-150 ease-out hover:decoration-2"
          >
            brucenkundabagenzi@gmail.com
          </a>
        </div>
      </Container>
    </section>
  );
}
