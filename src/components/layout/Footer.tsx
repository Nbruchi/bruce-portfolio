import { Container } from "@/components/layout/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <Container>
        <div className="flex h-16 flex-wrap items-center justify-between gap-4 font-mono text-small text-text-secondary">
          <span>© {year} Bruce Nkundabagenzi</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Nbruchi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary transition-colors duration-150 hover:text-accent"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/bruce-nkundabagenzi-7218b83ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary transition-colors duration-150 hover:text-accent"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
