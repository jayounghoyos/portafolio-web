"use client";

import { useEffect, useRef } from "react";
import { logSections } from "../../lib/log";
import { useActiveSection } from "../../lib/useActiveSection";

/**
 * Fixed left-edge instrument rail (desktop only): scroll-progress fill,
 * one jump dot per log entry, active section code readout.
 * Progress writes straight to the DOM inside one rAF-throttled scroll
 * listener — no React state per frame.
 */
export default function TelemetryRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const active = useActiveSection();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      if (pctRef.current)
        pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <aside
      aria-label="Section navigation"
      className="hidden lg:flex fixed left-0 inset-y-0 z-40 w-14 flex-col items-center justify-between py-6 border-r border-rule bg-void/70 backdrop-blur-sm"
    >
      {/* Progress track */}
      <div className="relative flex-1 w-px bg-rule my-4" aria-hidden>
        <div
          ref={fillRef}
          className="absolute top-0 left-0 w-full bg-accent"
          style={{ height: "0%" }}
        />
      </div>

      {/* Jump dots */}
      <nav className="flex flex-col items-center gap-3 py-4">
        {logSections.map((s) => {
          const isActive = s.id === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-cursor-label={s.code}
              aria-label={`${s.code} — ${s.title}`}
              aria-current={isActive ? "true" : undefined}
              className="cursor-grow group relative grid place-items-center w-4 h-4"
            >
              <span
                className={`block w-1.5 h-1.5 rotate-45 transition-all duration-300 ${
                  isActive
                    ? "bg-accent scale-125"
                    : "bg-mute/60 group-hover:bg-ink"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Readouts */}
      <div className="flex flex-col items-center gap-3 font-mono uppercase text-[9px] tracking-[0.2em] text-mute">
        <span
          className="text-ink"
          style={{ writingMode: "vertical-rl" }}
        >
          {logSections.find((s) => s.id === active)?.code ?? "BOOT"}
        </span>
        <span ref={pctRef} className="text-accent">000%</span>
      </div>
    </aside>
  );
}
