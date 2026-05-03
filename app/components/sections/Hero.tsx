"use client";

import dynamic from "next/dynamic";
import AssemblyHud from "../ui/AssemblyHud";
import MagneticLink from "../ui/MagneticLink";

const ChassisCanvas = dynamic(() => import("../three/ChassisCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center">
      <span className="kicker animate-pulse">streaming geometry…</span>
    </div>
  ),
});

export default function Hero() {
  return (
    <section
      id="top"
      className="panel-deep relative min-h-screen overflow-hidden"
    >
      {/* Full-bleed chassis canvas as background */}
      <div className="absolute inset-0 z-0">
        <ChassisCanvas />
      </div>

      {/* Faint grid overlay */}
      <div
        className="absolute inset-0 bg-grid-dotted pointer-events-none z-[1]"
        aria-hidden
      />

      {/* Gradient shade so text reads against the canvas */}
      <div
        className="absolute inset-0 hero-text-shade pointer-events-none z-[2]"
        aria-hidden
      />

      {/* HUD readouts (live state, sys id) */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <AssemblyHud variant="dark" />
      </div>

      {/* Watermark numeral */}
      <span
        className="watermark-num"
        style={{
          right: "-1rem",
          bottom: "2rem",
          color: "rgba(239, 231, 215, 0.05)",
        }}
        aria-hidden
      >
        00
      </span>

      {/* Vertical side label */}
      <span
        className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 z-[5] vertical-label font-mono uppercase text-[10px] tracking-[0.32em] text-warm/50 pointer-events-none"
        aria-hidden
      >
        EAFIT &middot; MEDELLÍN &middot; 2026
      </span>

      {/* Content */}
      <div className="relative z-[4] min-h-screen flex flex-col justify-end pb-20 lg:pb-24 pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 w-full">
          {/* Top-row meta */}
          <div className="flex items-baseline justify-between mb-12 lg:mb-20">
            <div className="flex items-center gap-3 text-warm/70">
              <span className="w-1.5 h-1.5 rounded-full bg-signal ambient-pulse" />
              <span className="font-mono uppercase text-[11px] tracking-[0.22em]">
                Portfolio · 2026 · v1.0
              </span>
            </div>
            <span className="hidden sm:inline font-mono uppercase text-[11px] tracking-[0.22em] text-warm/55">
              Juan Andrés Young Hoyos
            </span>
          </div>

          {/* Massive headline */}
          <h1 className="display-xl text-warm text-balance max-w-[16ch]">
            Machine learning,
            <br />
            <span className="text-warm/85">robotics,</span>
            <br />
            <span className="italic text-signal">and what holds them up.</span>
          </h1>

          {/* Sub-block */}
          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 lg:col-start-1">
              <p className="text-lg lg:text-xl text-warm/80 max-w-[44ch] text-pretty leading-[1.55]">
                Engineering student at EAFIT building a four-motor vehicle
                platform — from CAD to controller, with the perception stack
                that drives it.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex flex-wrap items-end gap-x-6 gap-y-4 self-end">
              <MagneticLink
                href="#chassis"
                className="cursor-grow group inline-flex items-center gap-3 px-5 py-3 bg-signal text-deep font-mono uppercase text-[11px] tracking-[0.22em] hover:bg-signal-soft transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-deep" />
                Inspect chassis
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </MagneticLink>
              <MagneticLink
                href="#work"
                strength={0.2}
                className="cursor-grow font-mono uppercase text-[11px] tracking-[0.22em] text-warm hover:text-signal transition-colors inline-flex items-center gap-2"
              >
                Selected work
                <span aria-hidden>↓</span>
              </MagneticLink>
            </div>
          </div>

          {/* Spec strip at very bottom */}
          <div className="mt-12 lg:mt-16 grid grid-cols-3 gap-6 max-w-2xl border-t border-warm/15 pt-6 font-mono text-[10.5px] uppercase tracking-[0.20em]">
            <div>
              <p className="text-warm/55 mb-1">Discipline</p>
              <p className="text-warm">ML × Robotics × Full-stack</p>
            </div>
            <div>
              <p className="text-warm/55 mb-1">Build</p>
              <p className="text-warm">v0.3 · 2026</p>
            </div>
            <div>
              <p className="text-warm/55 mb-1">Status</p>
              <p className="text-signal">Open · receiving briefs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono uppercase text-[10px] tracking-[0.32em] text-warm/55">
          Scroll
        </span>
        <span className="w-px h-10 bg-warm/40 ambient-pulse" />
      </div>
    </section>
  );
}
