import Link from "next/link";
import type { ReactElement } from "react";

type ArrowLinkProps = {
  href: string;
  external?: boolean;
  children: string;
};

const linkClassName =
  "group inline-flex items-center gap-2 text-text-primary transition-colors duration-150 ease-out hover:text-accent";
const arrowClassName =
  "text-accent transition-transform duration-150 ease-out group-hover:translate-x-[3px]";

export function ArrowLink({ href, external = false, children }: ArrowLinkProps): ReactElement {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {children}
        <span aria-hidden="true" className={arrowClassName}>
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {children}
      <span aria-hidden="true" className={arrowClassName}>
        →
      </span>
    </Link>
  );
}
