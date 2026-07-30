import type { ReactElement } from "react";

type StackChipsProps = {
  stack: string[];
};

export function StackChips({ stack }: StackChipsProps): ReactElement {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-sm bg-accent-wash px-2 py-[0.2rem] text-mono text-text-primary"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
