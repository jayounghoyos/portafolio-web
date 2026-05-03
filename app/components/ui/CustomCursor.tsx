"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], .cursor-grow, input, textarea';

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);
  const ready = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    document.documentElement.classList.add("has-cursor");
    const dot = ref.current!;
    if (!dot) return;

    const move = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!ready.current) {
        ready.current = true;
        dot.classList.add("is-ready");
        current.current.x = e.clientX;
        current.current.y = e.clientY;
      }
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.(HOVER_SELECTOR)) {
        dot.classList.add("is-hover");
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.(HOVER_SELECTOR)) {
        dot.classList.remove("is-hover");
      }
    };
    const onDown = () => dot.classList.add("is-press");
    const onUp = () => dot.classList.remove("is-press");
    const onLeave = () => dot.classList.remove("is-ready");
    const onEnter = () => ready.current && dot.classList.add("is-ready");

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.22;
      current.current.y += dy * 0.22;
      dot.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden />;
}
