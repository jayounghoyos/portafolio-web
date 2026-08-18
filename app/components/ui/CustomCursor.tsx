"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], .cursor-grow, input, textarea';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const labelPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);
  const running = useRef(false);
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
    const dot = dotRef.current!;
    const label = labelRef.current!;
    if (!dot || !label) return;

    const tick = () => {
      const dx = target.current.x - dotPos.current.x;
      const dy = target.current.y - dotPos.current.y;

      // Dot follows tightly
      dotPos.current.x += dx * 0.28;
      dotPos.current.y += dy * 0.28;
      dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;

      // Label trails behind, offset diagonally
      const offset = 28;
      const ldx = target.current.x + offset - labelPos.current.x;
      const ldy = target.current.y + offset - labelPos.current.y;
      labelPos.current.x += ldx * 0.16;
      labelPos.current.y += ldy * 0.16;
      label.style.transform = `translate3d(${labelPos.current.x}px, ${labelPos.current.y}px, 0)`;

      // Idle-stop: once everything has converged, park the loop.
      if (
        Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 &&
        Math.abs(ldx) < 0.05 && Math.abs(ldy) < 0.05
      ) {
        running.current = false;
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!running.current) {
        running.current = true;
        raf.current = requestAnimationFrame(tick);
      }
    };

    const move = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!ready.current) {
        ready.current = true;
        dot.classList.add("is-ready");
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
        labelPos.current.x = e.clientX + 22;
        labelPos.current.y = e.clientY + 22;
      }
      wake();
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const closest = t.closest?.(HOVER_SELECTOR);
      if (closest) {
        dot.classList.add("is-hover");
        const labelText = (closest as HTMLElement).dataset?.cursorLabel ?? "";
        if (labelText) {
          label.textContent = labelText;
          label.classList.add("is-active");
        }
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.(HOVER_SELECTOR)) {
        dot.classList.remove("is-hover");
        label.classList.remove("is-active");
      }
    };
    const onDown = () => dot.classList.add("is-press");
    const onUp = () => dot.classList.remove("is-press");
    const onLeave = () => dot.classList.remove("is-ready");
    const onEnter = () => ready.current && dot.classList.add("is-ready");

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
      running.current = false;
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  );
}
