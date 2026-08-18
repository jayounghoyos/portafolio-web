"use client";

import { useEffect } from "react";
import { animate, createScope, onScroll, stagger } from "animejs";
import { splitText } from "animejs";

/**
 * Global, restrained motion pass. Mounted once in the layout:
 *  - marks <html> as motion-capable (CSS keeps [data-reveal] visible otherwise)
 *  - splits every section title ([data-split-title]) into words and slides
 *    them in the first time the title scrolls into view
 * Individual reveals live in <Reveal>; scene-specific choreography lives
 * with its scene. Honors prefers-reduced-motion by doing nothing.
 */
export default function MotionOrchestrator() {
  useEffect(() => {
    document.documentElement.classList.add("js-motion");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope().add(() => {
      for (const el of document.querySelectorAll<HTMLElement>("[data-split-title]")) {
        const { words } = splitText(el, { words: true });
        if (!words.length) continue;
        animate(words, {
          opacity: [0, 1],
          translateY: ["0.35em", "0em"],
          duration: 650,
          ease: "cubicBezier(0.2, 0.6, 0.2, 1)",
          delay: stagger(45),
          autoplay: onScroll({
            target: el,
            enter: "bottom-=8% top",
            repeat: false,
          }),
        });
      }
    });

    return () => {
      scope.revert();
      document.documentElement.classList.remove("js-motion");
    };
  }, []);

  return null;
}
