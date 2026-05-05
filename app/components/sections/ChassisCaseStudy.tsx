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
    title: "Four motors, three plates, fifty-nine instances.",
    body:
      "A four-motor independently-driven vehicle platform modeled in Onshape. Each corner cluster is a self-contained drive unit — motor, gear train, axle, housing, mount. The plates carry electronics in between. 16 unique geometries instantiated 59 times.",
  },
  {
    eyebrow: "02 · CAD → Web",
    title: "From part-by-part export to a single live scene.",
    body:
      "Onshape exports the full assembly tree — 123 nodes, baked transforms, no extra metadata. The browser scales to scene units, classifies parts by name (Engrenage → gear, Vis → screw, Moteur → motor), applies role-tinted materials, and animates each occurrence radially around the assembly center. One file, no manual layout.",
  },
  {
    eyebrow: "03 · What's next",
    title: "Mount the perception. Train the policy.",
    body:
      "An IMU and a forward-facing camera, then a small perception stack — vision-based lane following first, then a learned control policy trained in simulation before the platform ever touches the ground.",
  },
];

export default function ChassisCaseStudy() {
  return (
    <section id="chassis" className="panel-deep relative overflow-hidden">
      {/* Eyebrow strip */}
      <div className="border-b border-warm/15 bg-deep">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="05" total={issue.contents.length.toString().padStart(2, "0")} label="THE FEATURE" />
          <span className="kicker">Drag · orbit · examine</span>
        </div>
      </div>

      {/* Sticky scroll layout: canvas pins on the left while text scrolls past */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Sticky canvas column */}
        <div className="lg:col-span-7 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center py-12 lg:py-0">
          <div className="relative aspect-square lg:aspect-[5/4] w-full">
            <ChassisCanvas interactive lazy />
          </div>
          <p className="kicker mt-3 hidden lg:block">
            FIG. 02 &mdash; Live assembly cycle &middot; cycles every ~12s
          </p>
        </div>

        {/* Scrolling text column */}
        <div className="lg:col-span-5 lg:py-32">
          {/* Big article opener */}
          <div className="border-b border-warm/15 pb-12 lg:pb-16 mb-12 lg:mb-20 lg:pt-24">
            <p className="kicker mb-5">Article 05 &middot; Case study</p>
            <h2 className="article-title text-warm">
              The chassis,
              <br />
              <span className="text-accent">in pieces</span>.
            </h2>
            <p className="mt-6 text-warm/80 text-lg leading-[1.6] text-pretty max-w-[42ch]">
              The piece you scroll past on the left is the actual assembly
              from Onshape, streaming in as gltf. Cycles automatically.
            </p>
          </div>

          {articles.map((a, i) => (
            <Reveal key={a.eyebrow} delay={i * 60}>
              <div className="mb-16 lg:mb-24">
                <p className="kicker text-accent mb-4">{a.eyebrow}</p>
                <h3 className="font-serif italic text-3xl lg:text-4xl text-warm leading-[1.05] mb-5">
                  {a.title}
                </h3>
                <p className="text-warm/85 text-base leading-[1.7] text-pretty max-w-[44ch]">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}

          {/* Spec table */}
          <Reveal>
            <div className="border-t border-warm/15 pt-8">
              <p className="kicker mb-5">Specs &middot; abridged</p>
              <dl className="grid grid-cols-2 gap-y-3 gap-x-6 font-mono text-[11px] uppercase tracking-[0.18em]">
                <dt className="text-warm/55">Source</dt>
                <dd className="text-warm">Onshape (.gltf)</dd>
                <dt className="text-warm/55">Nodes</dt>
                <dd className="text-warm">123</dd>
                <dt className="text-warm/55">Unique meshes</dt>
                <dd className="text-warm">16</dd>
                <dt className="text-warm/55">Instances</dt>
                <dd className="text-warm">59</dd>
                <dt className="text-warm/55">Cycle</dt>
                <dd className="text-warm">12.0 s</dd>
                <dt className="text-warm/55">Status</dt>
                <dd className="text-accent">In development</dd>
              </dl>
            </div>
          </Reveal>
        </div>
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
