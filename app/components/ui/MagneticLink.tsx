"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type AnchorHTMLAttributes,
} from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function MagneticLink({
  children,
  strength = 0.3,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const animating = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.2;
      current.current.y += dy * 0.2;
      node.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
      if (
        Math.abs(dx) < 0.05 &&
        Math.abs(dy) < 0.05 &&
        target.current.x === 0 &&
        target.current.y === 0
      ) {
        animating.current = false;
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.current.x = (e.clientX - cx) * strength;
      target.current.y = (e.clientY - cy) * strength;
      if (!animating.current) {
        animating.current = true;
        raf.current = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      if (!animating.current) {
        animating.current = true;
        raf.current = requestAnimationFrame(tick);
      }
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return (
    <a
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
