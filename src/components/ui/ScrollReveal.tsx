"use client";

import { useLayoutEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
};

export function ScrollReveal({ children }: ScrollRevealProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Already on screen at mount: leave it visible, matching the
    // no-gating-above-the-fold rule in motion-spec.md.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      return;
    }

    // Hide with no transition class yet, so this initial flip is instant,
    // not an animated fade-out. The transition is only turned on for the
    // reveal step below.
    setHidden(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          setHidden(false);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const transitionClass = animate ? "transition-[opacity,translate] duration-400 ease-out" : "";

  return (
    <div
      ref={ref}
      className={`${transitionClass} ${hidden ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"}`}
    >
      {children}
    </div>
  );
}
