import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NavLinks } from "@/components/layout/NavLinks";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 bg-surface">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="shrink-0 font-display text-lg font-semibold text-text-primary"
          >
            <span className="sm:hidden">BN</span>
            <span className="hidden sm:inline">Bruce Nkundabagenzi</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
