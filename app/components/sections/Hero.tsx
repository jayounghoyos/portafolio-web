"use client";

import dynamic from "next/dynamic";
import HudFrame from "../ui/HudFrame";
import AssemblyHud from "../ui/AssemblyHud";

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
      className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Blueprint grid layer */}
      <div
        className="absolute inset-0 bg-grid-dotted pointer-events-none"
        aria-hidden
      />

      {/* Edge ruler ticks */}
      <div
        className="hidden lg:block absolute left-6 top-32 bottom-32 w-px ruler-y opacity-60 pointer-events-none"
        aria-hidden
      />
      <div
        className="hidden lg:block absolute right-6 top-32 bottom-32 w-px ruler-y opacity-60 pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-7 relative z-10">
          {/* Stamped index */}
          <div className="flex items-center gap-4">
            <span className="font-mono uppercase text-[11px] tracking-[0.22em] text-mute">
              § 00 &nbsp;/&nbsp; INDEX
            </span>
            <span className="h-px flex-1 bg-rule" />
            <span className="font-mono uppercase text-[11px] tracking-[0.22em] text-mute">
              MEDELLÍN · CO
            </span>
          </div>

          <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink">
            Juan Andrés Young Hoyos
          </p>

          <h1 className="font-serif text-balance leading-[1.0]">
            Machine learning,
            <br />
            robotics, and the
            <br />
            <span className="italic text-signal">systems around them.</span>
          </h1>

          <p className="text-lg lg:text-xl text-ink/85 max-w-measure text-pretty">
            Engineering student at EAFIT. I design, model, and program physical
            machines that learn — currently a 4-motor vehicle platform and the
            perception stack to drive it. Full-stack when the model needs an
            interface.
          </p>

          <div className="datum-line mt-1" aria-hidden />

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="#chassis"
              className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink hover:text-signal inline-flex items-center gap-2"
            >
              <span aria-hidden>↗</span> Inspect chassis
            </a>
            <a
              href="#work"
              className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink hover:text-signal inline-flex items-center gap-2"
            >
              <span aria-hidden>↓</span> Selected work
            </a>
            <a
              href="#now"
              className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink hover:text-signal inline-flex items-center gap-2"
            >
              <span aria-hidden>→</span> Currently
            </a>
          </div>

          {/* Spec strip */}
          <dl className="mt-4 grid grid-cols-3 gap-6 max-w-md font-mono text-[11px] uppercase tracking-[0.18em]">
            <div>
              <dt className="text-mute">Discipline</dt>
              <dd className="text-ink mt-1">ML × Robotics</dd>
            </div>
            <div>
              <dt className="text-mute">Build</dt>
              <dd className="text-ink mt-1">v0.3 · 2026</dd>
            </div>
            <div>
              <dt className="text-mute">Status</dt>
              <dd className="text-signal mt-1">In dev</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5 h-[60vh] lg:h-[78vh] w-full relative z-10">
          <HudFrame className="w-full h-full">
            <AssemblyHud />
            <ChassisCanvas />
          </HudFrame>
        </div>
      </div>
    </section>
  );
}
