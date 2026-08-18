"use client";

import { useEffect, useRef, type JSX, type ReactNode } from "react";
import { animate, createScope, onScroll, stagger } from "animejs";

type RevealProps = {
  children: ReactNode;
  /** Extra delay in ms on top of the scroll trigger. */
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /**
   * CSS selector — when set, direct matches inside the wrapper are staggered
   * individually instead of animating the wrapper as one block.
   */
  cascade?: string;
};

/**
 * Scroll-triggered entrance (anime.js ScrollObserver). One-shot: plays the
 * first time the element crosses ~10% above the viewport bottom.
 * CSS keeps content visible when JS or motion is unavailable.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  cascade,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope().add(() => {
      const targets = cascade
        ? Array.from(node.querySelectorAll(cascade))
        : [node];
      if (cascade) {
        node.style.opacity = "1"; // wrapper stays visible; children animate
        for (const t of targets) (t as HTMLElement).style.opacity = "0";
      }
      animate(targets.length ? targets : [node], {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 700,
        ease: "cubicBezier(0.2, 0.6, 0.2, 1)",
        delay: cascade ? stagger(70, { start: delay }) : delay,
        autoplay: onScroll({
          target: node,
          enter: "bottom-=10% top",
          repeat: false,
        }),
      });
    });
    return () => scope.revert();
  }, [delay, cascade]);

  const Component = Tag as any;
  return (
    <Component ref={ref} data-reveal className={className}>
      {children}
    </Component>
  );
}
