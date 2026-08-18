"use client";

import { useEffect, useState } from "react";
import { logSections, operator } from "../../lib/log";
import { useActiveSection } from "../../lib/useActiveSection";

const navLinks = logSections.filter((s) => s.nav);

export default function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 border-b ${
        scrolled
          ? "bg-void/80 backdrop-blur-md border-rule"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-12 flex items-center justify-between lg:pl-16">
        <a
          href="#top"
          data-cursor-label="To top"
          className="cursor-grow font-serif italic text-lg flex items-baseline gap-1 text-ink"
          aria-label="Home"
        >
          {operator.callsign}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-cursor-label={l.title}
                className={`cursor-grow font-mono uppercase text-[10.5px] tracking-[0.22em] transition-colors ${
                  isActive ? "text-accent" : "text-mute hover:text-ink"
                }`}
              >
                {l.code}
              </a>
            );
          })}
          <a
            href="#contact"
            data-cursor-label="Open channel"
            className="cursor-grow px-3 py-1.5 font-mono uppercase text-[10.5px] tracking-[0.22em] bg-accent text-paper-ink hover:bg-accent-soft transition-colors"
          >
            Uplink ↗
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
        <div id="mobile-menu" className="md:hidden border-t border-rule bg-void">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
            {[...navLinks, logSections[logSections.length - 1]].map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink py-1.5"
              >
                {l.code} <span className="text-mute normal-case">— {l.title}</span>
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
