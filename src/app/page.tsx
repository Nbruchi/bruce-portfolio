import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { Ledger } from "@/components/home/Ledger";
import { personJsonLd } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Ledger />
    </main>
  );
}
