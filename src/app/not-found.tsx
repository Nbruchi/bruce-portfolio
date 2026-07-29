import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-[50vh] items-center">
      <Container>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-body-lg text-text-primary">
            {"That page doesn't exist."}
          </h1>
          <Link
            href="/"
            className="text-accent underline decoration-1 underline-offset-[0.2em] hover:decoration-2"
          >
            Back home
          </Link>
        </div>
      </Container>
    </main>
  );
}
