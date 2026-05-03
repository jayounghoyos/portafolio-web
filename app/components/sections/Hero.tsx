"use client";

import dynamic from "next/dynamic";
import MagneticLink from "../ui/MagneticLink";
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

export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-paper overflow-hidden border-b border-rule"
    >
      {/* Cover masthead row */}
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-3">
            <span className="kicker-strong">{issue.publication}</span>
            <span className="text-accent text-[10px]">◆</span>
            <span className="kicker">VOL.{issue.vol} / ISSUE {issue.number}</span>
          </div>
          <span className="kicker hidden sm:block">
            {issue.date} &middot; {issue.city}
          </span>
        </div>
      </div>

      {/* Cover spread */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 pt-10 lg:pt-16 pb-20 lg:pb-28">
        {/* Top-row label */}
        <div className="flex items-baseline justify-between mb-8 lg:mb-12">
          <Folio current={issue.contents.length.toString().padStart(2, "0")} total="cover" label="THE COVER" />
          <span className="kicker hidden md:block">
            By {issue.editor}
          </span>
        </div>

        {/* Main asymmetric grid: chassis + title */}
        <div className="relative grid grid-cols-12 gap-x-4 lg:gap-x-8">
          {/* Chassis canvas — cols 1–7 desktop, full width mobile */}
          <div className="col-span-12 lg:col-span-7 relative">
            <div className="relative aspect-[5/4] lg:aspect-[4/3] w-full">
              <ChassisCanvas static lazy />
            </div>
            {/* Caption strip below canvas */}
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <p className="kicker">
                Fig. 01 &mdash; Vehicle chassis, four-motor drivetrain
              </p>
              <p className="kicker hidden md:block">
                Onshape &rarr; gltf
              </p>
            </div>
            {/* Chartreuse anchor rule */}
            <div className="hair-rule-accent mt-2" />
          </div>

          {/* Title — cols 6–12, overlapping the canvas on the right edge */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:-ml-12 lg:-mt-8 relative z-10 pointer-events-none">
            <h1 className="cover-title text-balance pointer-events-auto">
              <span className="block">Machine</span>
              <span className="block">learning,</span>
              <span className="block">robotics,</span>
              <span className="block text-mute">&amp; what holds</span>
              <span className="block">
                them <span className="text-accent">up</span>.
              </span>
            </h1>
          </div>
        </div>

        {/* Subtitle row */}
        <div className="mt-12 lg:mt-20 grid grid-cols-12 gap-x-4 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-5 lg:col-start-1">
            <p className="kicker mb-3">Editor&apos;s note</p>
            <p className="text-lg lg:text-xl text-ink/85 max-w-[40ch] text-pretty leading-[1.55]">
              Engineering student at EAFIT &mdash; building a four-motor
              vehicle platform from CAD to controller, plus the perception
              stack that drives it. Full-stack when the model needs an
              interface.
            </p>
          </div>
          <div className="hidden lg:block col-span-1 col-start-7" />
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-6 lg:mt-0 flex flex-col gap-4 self-end">
            <MagneticLink
              href="#chassis"
              data-cursor-label="Inspect →"
              className="cursor-grow group inline-flex items-center justify-between gap-3 px-5 py-4 bg-ink text-paper hover:bg-accent hover:text-ink transition-colors duration-200"
              strength={0.25}
            >
              <span className="font-mono uppercase text-[11px] tracking-[0.22em]">
                Inspect chassis
              </span>
              <span className="font-serif italic text-2xl group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </MagneticLink>
            <div className="flex items-baseline justify-between gap-3 pt-4 border-t border-rule">
              <span className="kicker">07 features inside</span>
              <a
                href="#now"
                data-cursor-label="Read on"
                className="cursor-grow font-mono uppercase text-[11px] tracking-[0.22em] text-ink hover:text-accent-deep"
              >
                Begin reading ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 grid grid-cols-12 items-baseline gap-3">
          <div className="col-span-3">
            <Folio current="00" total={issue.contents.length.toString().padStart(2, "0")} />
          </div>
          <div className="hidden md:block col-span-6 text-center">
            <span className="font-serif italic text-base">
              {issue.motto}
            </span>
          </div>
          <div className="col-span-9 md:col-span-3 text-right">
            <span className="kicker">{issue.coordinates}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
