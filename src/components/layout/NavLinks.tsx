"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
};

const LINKS: NavLink[] = [
  { href: "/#ledger", label: "Work", isActive: (pathname) => pathname === "/" },
  {
    href: "/writing",
    label: "Writing",
    isActive: (pathname) => pathname.startsWith("/writing"),
  },
  { href: "/about", label: "About", isActive: (pathname) => pathname === "/about" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-6">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            link.isActive(pathname)
              ? "text-mono uppercase text-accent"
              : "text-mono uppercase text-text-secondary transition-colors duration-150 hover:text-accent"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
