import Link from "next/link";
import type { ReactElement } from "react";

type ArrowLinkProps = {
  href: string;
  external?: boolean;
  direction?: "forward" | "back";
  children: string;
};

const linkClassName =
  "group inline-flex items-center gap-2 text-text-primary transition-colors duration-150 ease-out hover:text-accent";

function arrowClassName(direction: "forward" | "back"): string {
  const translate = direction === "back" ? "group-hover:-translate-x-[3px]" : "group-hover:translate-x-[3px]";
  return `text-accent transition-transform duration-150 ease-out ${translate}`;
}

export function ArrowLink({
  href,
  external = false,
  direction = "forward",
  children,
}: ArrowLinkProps): ReactElement {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {children}
        <span aria-hidden="true" className={arrowClassName("forward")}>
          ↗
        </span>
      </a>
    );
  }

  if (direction === "back") {
    return (
      <Link href={href} className={linkClassName}>
        <span aria-hidden="true" className={arrowClassName("back")}>
          ←
        </span>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {children}
      <span aria-hidden="true" className={arrowClassName("forward")}>
        →
      </span>
    </Link>
  );
}
