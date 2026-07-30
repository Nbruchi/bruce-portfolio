import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  size?: "content" | "prose";
};

const SIZE_CLASSES: Record<NonNullable<ContainerProps["size"]>, string> = {
  content: "max-w-content",
  prose: "max-w-prose",
};

export function Container({ children, size = "content" }: ContainerProps) {
  return <div className={`mx-auto w-full px-gutter ${SIZE_CLASSES[size]}`}>{children}</div>;
}
