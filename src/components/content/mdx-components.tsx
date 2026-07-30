import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { Figure } from "@/components/content/Figure";
import { MobileScreenshotFrame } from "@/components/content/MobileScreenshotFrame";
import { StackChips } from "@/components/content/StackChips";

const linkClassName =
  "text-accent underline decoration-1 underline-offset-[0.2em] transition-[text-decoration-thickness] duration-150 ease-out hover:decoration-2";

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">): ReactElement => (
    <h2 className="mt-12 mb-4 text-h2 font-display font-semibold" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">): ReactElement => (
    <h3 className="mt-12 mb-4 text-h3 font-display font-medium" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">): ReactElement => (
    <h4 className="mt-12 mb-4 text-body-lg font-display font-medium" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">): ReactElement => (
    <p className="mb-6 text-body-lg" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">): ReactElement => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-body-lg" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">): ReactElement => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-body-lg" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">): ReactElement => (
    <blockquote
      className="mb-6 ml-0 border-l-2 border-accent pl-4 text-body-lg text-text-secondary"
      {...props}
    />
  ),
  a: ({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">): ReactElement => {
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return (
        <Link href={href} {...rest} className={linkClassName}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} {...rest} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {children}
      </a>
    );
  },
  Figure,
  StackChips,
  MobileScreenshotFrame,
};
