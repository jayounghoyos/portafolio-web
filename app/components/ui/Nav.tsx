"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#chassis", label: "Chassis" },
  { href: "#about", label: "Byline" },
];

const SECTION_IDS = ["top", "about", "now", "work", "stack", "chassis", "studies", "experiments", "contact"];

function useActiveSection(): string {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const handler = () => {
      let current = "top";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

export default function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero is dark — invert nav text while in hero
  const inHero = active === "top";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled && !inHero
          ? "bg-paper/85 backdrop-blur-md border-b border-rule"
          : inHero
          ? "bg-deep/40 backdrop-blur-sm border-b border-warm/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-12 flex items-center justify-between">
        <a
          href="#top"
          data-cursor-label="To top"
          className={`cursor-grow font-serif italic text-lg flex items-baseline gap-1 ${
            inHero ? "text-warm" : "text-ink"
          }`}
          aria-label="Home"
        >
          JYH
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const isActive = `#${active}` === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                data-cursor-label={`Go to ${l.label}`}
                className={`cursor-grow font-mono uppercase text-[10.5px] tracking-[0.22em] transition-colors ${
                  isActive
                    ? inHero
                      ? "text-accent"
                      : "text-accent-deep"
                    : inHero
                    ? "text-warm/55 hover:text-warm"
                    : "text-mute hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="#contact"
            data-cursor-label="Letter"
            className={`cursor-grow px-3 py-1.5 font-mono uppercase text-[10.5px] tracking-[0.22em] transition-colors ${
              inHero
                ? "bg-accent text-deep hover:bg-accent-soft"
                : "bg-ink text-paper hover:bg-accent hover:text-deep"
            }`}
          >
            Get in touch ↗
          </a>
        </nav>

        <button
          type="button"
          className={`md:hidden font-mono uppercase text-[11px] tracking-[0.22em] ${
            inHero ? "text-warm" : "text-ink"
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-rule bg-paper"
        >
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
            {[...links, { href: "#contact", label: "Letter" }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink py-1.5"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
