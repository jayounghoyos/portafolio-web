"use client";

import dynamic from "next/dynamic";
import Reveal from "../ui/Reveal";
import Folio from "../ui/Folio";
import { issue } from "../../lib/issue";

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
    title: "Four motors. Three plates. Fifty-nine instances.",
    body:
      "A four-motor independently-driven vehicle platform modeled in Onshape. Each corner cluster is a self-contained drive unit — motor, gear train, axle, housing, mount. The plates carry electronics in between.",
  },
  {
    eyebrow: "02 · CAD → Web",
    title: "From a single export to a live scene.",
    body:
      "Onshape exports the full assembly tree — 123 nodes, baked transforms, no extra metadata. The browser scales to scene units, classifies parts by name, applies role-tinted materials, and animates each occurrence radially around the assembly center.",
  },
  {
    eyebrow: "03 · What's next",
    title: "Mount the perception. Train the policy.",
    body:
      "An IMU and a forward-facing camera, then a small perception stack — vision-based lane following first, then a learned control policy trained in simulation before the platform ever touches the ground.",
  },
];

const specs = [
  { k: "Source", v: "Onshape (.gltf)" },
  { k: "Nodes", v: "123" },
  { k: "Unique meshes", v: "16" },
  { k: "Instances", v: "59" },
  { k: "Cycle", v: "12.0 s" },
  { k: "Status", v: "In development", accent: true },
];

export default function ChassisCaseStudy() {
  return (
    <section id="chassis" className="panel-deep relative overflow-hidden">
      {/* Folio strip */}
      <div className="border-b border-warm/15 bg-deep">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio
            current="05"
            total={issue.contents.length.toString().padStart(2, "0")}
            label="THE FEATURE"
          />
          <span className="kicker">Drag · orbit · examine</span>
        </div>
      </div>

      {/* Article opener — magazine title spread */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-10 lg:pb-16">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker text-accent mb-5">Article 05 &middot; Case study</p>
            <h2 className="article-title text-warm">
              The chassis,
              <br />
              <span className="italic text-accent">in pieces</span>.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
            <p className="text-warm/80 text-base lg:text-lg leading-[1.55] max-w-[42ch]">
              The piece below is the actual assembly streaming in from
              Onshape as glTF. It cycles every twelve seconds. Drag to
              orbit; scroll to read.
            </p>
          </div>
        </div>
      </div>

      {/* Featured model band — full-bleed within container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative w-full aspect-[16/10] lg:aspect-[21/9] border border-warm/15">
          <ChassisCanvas interactive lazy />

          {/* Caption strip overlaid bottom-left */}
          <div className="absolute bottom-3 left-4 z-10 flex items-baseline gap-3 font-mono uppercase text-[10px] tracking-[0.22em] text-warm/65 pointer-events-none">
            <span className="text-accent">FIG. 02</span>
            <span>—</span>
            <span>4-motor drivetrain · live cycle 12.0s</span>
          </div>

          {/* Top-right meta pill */}
          <div className="absolute top-3 right-4 z-10 inline-flex items-center gap-2 font-mono uppercase text-[9.5px] tracking-[0.22em] text-warm/70 bg-deep/65 backdrop-blur-sm px-2 py-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
            Streaming · interactive
          </div>
        </div>
      </div>

      {/* 3-column article body — equal weight, no scroll-imbalance */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-20 pb-10 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {articles.map((a, i) => (
            <Reveal key={a.eyebrow} delay={i * 80}>
              <article className="flex flex-col">
                <p className="kicker text-accent mb-4">{a.eyebrow}</p>
                <h3 className="font-serif italic text-2xl lg:text-3xl text-warm leading-[1.05] mb-4">
                  {a.title}
                </h3>
                <p className="text-warm/85 text-[15px] leading-[1.7] text-pretty">
                  {a.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Specs strip — horizontal table */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-14 lg:pb-20">
        <Reveal>
          <div className="border-y border-warm/15">
            <p className="kicker text-warm/55 py-3 border-b border-warm/15">
              ◆ Specs · abridged
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {specs.map((s, i) => (
                <div
                  key={s.k}
                  className={`py-5 lg:py-6 px-4 lg:px-5 border-warm/15 ${
                    i < specs.length - 1
                      ? "border-b md:border-b-0 md:border-r"
                      : ""
                  } ${i % 3 !== 0 ? "border-l md:border-l" : ""}`}
                >
                  <p className="kicker mb-2">{s.k}</p>
                  <p
                    className={`font-mono text-sm uppercase tracking-[0.10em] ${
                      s.accent ? "text-accent" : "text-warm"
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

      {/* Bottom strip */}
      <div className="border-t border-warm/15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="05" />
          <span className="kicker italic font-serif text-base">
            End of feature.
          </span>
        </div>
      </div>
    </section>
  );
}
