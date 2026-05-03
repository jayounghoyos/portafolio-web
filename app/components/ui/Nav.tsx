"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#chassis", label: "Chassis" },
  { href: "#about", label: "Byline" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-12 flex items-center justify-between">
        <a
          href="#top"
          className="cursor-grow font-serif italic text-lg flex items-baseline gap-1.5"
          aria-label="Home"
          data-cursor-label="To cover"
        >
          Portafolio
          <span className="text-accent text-sm">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor-label={`Jump to ${l.label}`}
              className="cursor-grow font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            data-cursor-label="Letter"
            className="cursor-grow px-3 py-1.5 font-mono uppercase text-[10.5px] tracking-[0.22em] bg-accent text-ink hover:bg-accent-soft transition-colors"
          >
            Get in touch ↗
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden font-mono uppercase text-[11px] tracking-[0.22em] text-ink"
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
