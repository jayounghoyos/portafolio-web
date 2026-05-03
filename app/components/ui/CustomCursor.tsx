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
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const closest = t.closest?.(HOVER_SELECTOR);
      if (closest) {
        dot.classList.add("is-hover");
        const labelText =
          (closest as HTMLElement).dataset?.cursorLabel ?? "";
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

    const tick = () => {
      // Dot follows tightly
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.28;
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.28;
      dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;

      // Label trails behind, offset diagonally
      const offsetX = 28;
      const offsetY = 28;
      labelPos.current.x +=
        (target.current.x + offsetX - labelPos.current.x) * 0.16;
      labelPos.current.y +=
        (target.current.y + offsetY - labelPos.current.y) * 0.16;
      label.style.transform = `translate3d(${labelPos.current.x}px, ${labelPos.current.y}px, 0)`;

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

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  );
}
