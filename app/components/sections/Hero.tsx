"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MagneticLink from "../ui/MagneticLink";
import { issue } from "../../lib/issue";

const RobotEyeScene = dynamic(() => import("../three/RobotEyeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-deep">
      <span className="kicker text-warm/55 animate-pulse">initializing sensor…</span>
    </div>
  ),
});

const LOG_LINES = [
  "[T+00.00] BOOT · sensor array online",
  "[T+00.04] CALIBRATE · IMU drift 0.012",
  "[T+00.07] OBJECT detection: VEHICLE_PLATFORM_v0.3",
  "[T+00.09] OBJECT detection: WORKBENCH",
  "[T+00.12] CONF check pass · 5/5 targets",
  "[T+00.18] STATUS · standing by",
];

function useTickingClock() {
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const time = useTickingClock();

  return (
    <section
      id="top"
      className="panel-deep relative w-full overflow-hidden h-screen min-h-[680px]"
    >
      {/* POV scene fills the section */}
      <div className="absolute inset-0">
        <RobotEyeScene />
      </div>

      {/* Scanline + vignette overlays */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0) 0, rgba(255,255,255,0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0) 4px)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden
      />

      {/* Reticle dead-center */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none z-10">
        <div className="relative w-28 h-28 lg:w-36 lg:h-36">
          <span className="absolute top-1/2 left-0 w-3 h-px bg-accent/60" />
          <span className="absolute top-1/2 right-0 w-3 h-px bg-accent/60" />
          <span className="absolute left-1/2 top-0 h-3 w-px bg-accent/60" />
          <span className="absolute left-1/2 bottom-0 h-3 w-px bg-accent/60" />
          <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/60" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent/60" />
          <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent/60" />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent/60" />
        </div>
      </div>

      {/* HUD top strip */}
      <div className="absolute inset-x-0 top-0 z-20 border-b border-warm/10 bg-deep/40 backdrop-blur-sm">
        <div className="px-6 lg:px-12 py-3 flex items-baseline justify-between font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/70 gap-3 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
            <span className="text-warm">SENSOR_01</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">FEED LIVE</span>
          </div>
          <div className="hidden md:flex items-baseline gap-3">
            <span>SCENE · workshop</span>
            <span>·</span>
            <span>LAT {issue.coordinates}</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-warm">{time}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">REC</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
          </div>
        </div>
      </div>

      {/* Side telemetry */}
      <div className="hidden lg:flex flex-col gap-2 absolute left-6 top-1/2 -translate-y-1/2 z-20 font-mono uppercase text-[10px] tracking-[0.22em] text-warm/55">
        <span>IMU</span>
        <span className="text-warm">0.012g</span>
        <span className="mt-3">BATT</span>
        <span className="text-accent">84%</span>
        <span className="mt-3">TEMP</span>
        <span className="text-warm">37 °C</span>
      </div>
      <div className="hidden lg:flex flex-col gap-2 absolute right-6 top-1/2 -translate-y-1/2 z-20 font-mono uppercase text-[10px] tracking-[0.22em] text-warm/55 text-right">
        <span>HEADING</span>
        <span className="text-warm">142°</span>
        <span className="mt-3">FRAME</span>
        <span className="text-warm">042881</span>
        <span className="mt-3">UPLINK</span>
        <span className="text-accent">OK</span>
      </div>

      {/* Headline overlay — name dominant, subtitle smaller, short bio */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 lg:px-12 pb-24 lg:pb-28">
        <div className="max-w-5xl">
          <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/65 mb-4">
            ◆ Field of view · 06.2026
          </p>

          <h1
            className="font-serif text-warm text-balance leading-[0.92] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.6rem, 9.5vw, 9rem)" }}
          >
            Juan Andrés
            <br />
            <span className="italic">Young Hoyos</span>
            <span className="text-accent">.</span>
          </h1>

          <p
            className="mt-5 lg:mt-7 font-serif italic text-warm/85 text-balance max-w-[24ch]"
            style={{ fontSize: "clamp(1.3rem, 3.4vw, 2.6rem)", lineHeight: 1.1 }}
          >
            What the chassis would see, if it had eyes yet.
          </p>

          <div className="mt-8 lg:mt-10 grid grid-cols-12 gap-4 lg:gap-8 items-end">
            <div className="col-span-12 lg:col-span-7">
              <p className="text-base lg:text-[17px] text-warm/80 max-w-[44ch] leading-[1.55] text-pretty">
                ML &amp; robotics engineer.
                <br />
                Building a four-motor vehicle platform from CAD to controller.
                <br />
                Full-stack when the model needs an interface.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-wrap gap-x-5 gap-y-3 lg:justify-end">
              <MagneticLink
                href="#chassis"
                data-cursor-label="View chassis"
                className="cursor-grow group inline-flex items-center gap-3 px-5 py-3 bg-accent text-deep hover:bg-accent-soft transition-colors font-mono uppercase text-[10.5px] tracking-[0.22em]"
                strength={0.25}
              >
                Mount the chassis
                <span className="font-serif italic text-xl group-hover:translate-x-1 transition-transform">↗</span>
              </MagneticLink>
              <MagneticLink
                href="#work"
                strength={0.18}
                data-cursor-label="View work"
                className="cursor-grow font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm hover:text-accent transition-colors inline-flex items-center gap-2 px-3 py-3"
              >
                Selected work <span aria-hidden>↓</span>
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>

      {/* HUD bottom log feed */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-warm/10 bg-deep/65 backdrop-blur-sm">
        <div className="px-6 lg:px-12 py-2.5 marquee">
          <div className="marquee-track font-mono uppercase text-[10px] tracking-[0.22em] text-warm/65">
            {[...LOG_LINES, ...LOG_LINES].map((line, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="text-accent">▸</span>
                <span>{line}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
