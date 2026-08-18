"use client";

import dynamic from "next/dynamic";
import Reveal from "../motion/Reveal";
import LogHeader from "../ui/LogHeader";

const ChassisCanvas = dynamic(() => import("../three/ChassisCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center">
      <span className="kicker animate-pulse">streaming chassis…</span>
    </div>
  ),
});

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
      "Onshape exports the full assembly tree — 123 nodes with baked transforms. A build-time pipeline welds, merges, and compresses it 43× down to a 0.6 MB binary; the browser classifies parts by name, tints them by role, and animates each occurrence along its drive unit's own axis.",
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
  return (
    <section id="chassis" className="relative overflow-hidden">
      <LogHeader
        id="chassis"
        title={
          <>
            The machine,
            <br />
            <span className="text-accent">in pieces</span>.
          </>
        }
        lede={
          <>
            This is the actual assembly the hero was looking at — streamed in
            from Onshape as a compressed binary. Drag to orbit; scroll to
            read.
          </>
        }
        meta="Drag · orbit · examine"
      />

      {/* Featured model band */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative w-full aspect-[16/10] lg:aspect-[21/9] border border-rule bg-panel/60">
          <ChassisCanvas interactive lazy />

          <div className="absolute bottom-3 left-4 z-10 flex items-baseline gap-3 font-mono uppercase text-[10px] tracking-[0.22em] text-mute pointer-events-none">
            <span className="text-accent">FIG. 02</span>
            <span>—</span>
            <span>4-motor drivetrain · live assembly</span>
          </div>

          <div className="absolute top-3 right-4 z-10 inline-flex items-center gap-2 font-mono uppercase text-[9.5px] tracking-[0.22em] text-dim bg-void/65 backdrop-blur-sm px-2 py-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
            Streaming · interactive
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
            <p className="kicker py-3 border-b border-rule">
              ◆ Specs · abridged
            </p>
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
