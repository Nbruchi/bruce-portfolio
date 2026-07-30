import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
};

const VARIANT_CLASSES: Record<ButtonProps["variant"], string> = {
  primary: "bg-text-primary text-surface hover:bg-accent",
  secondary:
    "border border-text-primary text-text-primary hover:border-accent hover:bg-accent-wash",
};

export function Button({ href, variant, children }: ButtonProps): ReactElement {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-md px-6 py-3 font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </Link>
  );
}
