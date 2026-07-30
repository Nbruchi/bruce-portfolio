import Image from "next/image";
import type { ReactElement } from "react";

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function Figure({ src, alt, width, height, caption }: FigureProps): ReactElement {
  return (
    <figure className="mb-6 rounded-lg border border-rule bg-surface-raised p-3">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full rounded-md" />
      {caption ? <figcaption className="mt-3 text-mono text-text-secondary">{caption}</figcaption> : null}
    </figure>
  );
}
