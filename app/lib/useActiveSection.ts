"use client";

import { useEffect, useState } from "react";
import { logSections } from "./log";

/**
 * Single IntersectionObserver scroll-spy over the log sections.
 * A section is "active" while it crosses the 35–45% viewport band.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size > 0) {
          // Topmost visible section wins.
          const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
          setActive(next);
        }
      },
      // Narrow horizontal band around 40% viewport height.
      { rootMargin: "-35% 0px -55% 0px" }
    );
    for (const s of logSections) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return active;
}
