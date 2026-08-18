"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { onScroll } from "animejs";
import Reveal from "../motion/Reveal";
import LogHeader from "../ui/LogHeader";
import { useReducedMotion } from "../../lib/useReducedMotion";

const ChassisCanvas = dynamic(() => import("../three/ChassisCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center">
      <span className="kicker animate-pulse">streaming chassis…</span>
    </div>
  ),
});

/** Assembly stages, in ROLE_DELAY order — shown in the pinned readout. */
const STAGES: Array<[number, string]> = [
  [0.0, "PLATES · chassis structure"],
  [0.16, "MOTORS · four corner drives"],
  [0.3, "MOUNTS · housings seat"],
  [0.45, "AXLES · gear trains engage"],
  [0.65, "FASTENERS · everything locks"],
  [0.88, "ASSEMBLED · standing by"],
];

const articles = [
  {
    eyebrow: "01 · The subject",
    title: "Four motors. Three plates. Fifty-nine parts.",
    body:
      "A four-motor independently-driven vehicle platform modeled in Onshape. Each corner cluster is a self-contained drive unit — motor, gear train, axle, housing, mount. The plates carry electronics in between.",
  },
  {
    eyebrow: "02 · CAD → Web",
    title: "From a single export to a live scene.",
    body:
      "Onshape exports the full assembly tree — 123 nodes with baked transforms. A build-time pipeline welds, merges, and compresses it 43× down to a 0.6 MB binary; the browser classifies parts by name, tints them by role, and slides each one home along its drive unit's own axis.",
  },
  {
    eyebrow: "03 · What's next",
    title: "Mount the perception. Train the policy.",
    body:
      "An IMU and a forward-facing camera, then a small perception stack — vision-based lane following first, then a learned control policy trained in simulation before the platform ever touches the ground.",
  },
];

const specs = [
  { k: "Source", v: "Onshape (.glb)" },
  { k: "Payload", v: "0.6 MB · meshopt" },
  { k: "Unique meshes", v: "16" },
  { k: "Instances", v: "59" },
  { k: "Draw calls", v: "59" },
  { k: "Status", v: "In development", accent: true },
];

export default function ChassisCaseStudy() {
  const reduced = useReducedMotion();
  const progressRef = useRef(0);
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Scroll scrub: runway scroll position IS the assembly progress.
  useEffect(() => {
    if (reduced) {
      progressRef.current = 1;
      if (stageRef.current) stageRef.current.textContent = STAGES[STAGES.length - 1][1];
      if (pctRef.current) pctRef.current.textContent = "100%";
      if (barRef.current) barRef.current.style.width = "100%";
      return;
    }
    const node = runwayRef.current;
    if (!node) return;

    const observer = onScroll({
      target: node,
      enter: "top top",
      leave: "bottom bottom",
      onUpdate: (self) => {
        const p = Math.min(Math.max(self.progress, 0), 1);
        progressRef.current = p;
        const stage = [...STAGES].reverse().find(([at]) => p >= at) ?? STAGES[0];
        if (stageRef.current && stageRef.current.textContent !== stage[1]) {
          stageRef.current.textContent = stage[1];
        }
        if (pctRef.current)
          pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
        if (barRef.current) barRef.current.style.width = `${p * 100}%`;
      },
    });
    return () => {
      observer.revert();
    };
  }, [reduced]);

  return (
    <section id="chassis" className="relative overflow-visible">
      <LogHeader
        id="chassis"
        title={
          <>
            The machine,
            <br />
            <span className="text-accent">assembled by scroll</span>.
          </>
        }
        lede={
          <>
            This is the actual assembly the sensor locked in the hero,
            streamed from Onshape as a 0.6 MB binary. Your scroll drives the
            build: down assembles, up takes it apart again. Drag to orbit at
            any point.
          </>
        }
        meta="Scroll to assemble · drag to orbit"
      />

      {/* Scroll runway — the sticky viewport pins while progress scrubs */}
      <div ref={runwayRef} className={reduced ? "" : "h-[300vh]"}>
        <div className={reduced ? "relative" : "sticky top-0 h-screen"}>
          <div className="relative w-full h-full border-y border-rule bg-panel/40">
            <div className={reduced ? "relative w-full aspect-[16/10]" : "absolute inset-0"}>
              <ChassisCanvas interactive lazy progressRef={progressRef} />
            </div>

            {/* Stage readout — updated imperatively by the scrub */}
            <div className="absolute bottom-0 inset-x-0 z-10 border-t border-rule bg-void/70 backdrop-blur-sm pointer-events-none">
              <div className="relative h-px w-full bg-rule">
                <div
                  ref={barRef}
                  className="absolute left-0 top-0 h-full bg-accent"
                  style={{ width: "0%" }}
                />
              </div>
              <div className="px-6 lg:px-12 py-3 flex items-baseline justify-between font-mono uppercase text-[10px] tracking-[0.22em] text-mute gap-4 flex-wrap">
                <span className="inline-flex items-baseline gap-3">
                  <span className="text-accent">FIG. 02</span>
                  <span>—</span>
                  <span ref={stageRef} className="text-ink">
                    {STAGES[0][1]}
                  </span>
                </span>
                <span className="inline-flex items-baseline gap-3">
                  <span>ASSEMBLY</span>
                  <span ref={pctRef} className="text-accent">000%</span>
                </span>
              </div>
            </div>

            {/* Top-right meta pill */}
            <div className="absolute top-3 right-4 z-10 inline-flex items-center gap-2 font-mono uppercase text-[9.5px] tracking-[0.22em] text-dim bg-void/65 backdrop-blur-sm px-2 py-1 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
              Live · scroll-driven
            </div>
          </div>
        </div>
      </div>

      {/* 3-column article body */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-20 pb-10 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {articles.map((a, i) => (
            <Reveal key={a.eyebrow} delay={i * 80}>
              <article className="flex flex-col">
                <p className="kicker text-accent mb-4">{a.eyebrow}</p>
                <h3 className="font-serif italic text-2xl lg:text-3xl text-ink leading-[1.05] mb-4">
                  {a.title}
                </h3>
                <p className="text-dim text-[15px] leading-[1.7] text-pretty">
                  {a.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Specs strip */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-14 lg:pb-20">
        <Reveal>
          <div className="border-y border-rule">
            <p className="kicker py-3 border-b border-rule">◆ Specs · abridged</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {specs.map((s, i) => (
                <div
                  key={s.k}
                  className={`py-5 lg:py-6 px-4 lg:px-5 border-rule ${
                    i < specs.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
                  }`}
                >
                  <p className="kicker mb-2">{s.k}</p>
                  <p
                    className={`font-mono text-sm uppercase tracking-[0.10em] ${
                      s.accent ? "text-accent" : "text-ink"
                    }`}
                  >
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
