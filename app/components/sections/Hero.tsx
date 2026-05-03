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
  "[T+00.12] OBJECT detection: TOOL · CALIPER",
  "[T+00.15] CONF check pass · 5/5 targets",
  "[T+00.18] WAIT · operator presence detected",
  "[T+00.20] STATUS · standing by",
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
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.0) 0, rgba(255,255,255,0.0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.0) 4px)",
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

      {/* Reticle in dead-center */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none z-10">
        <div className="relative w-32 h-32 lg:w-40 lg:h-40">
          <span className="absolute top-1/2 left-0 w-3 h-px bg-accent/70" />
          <span className="absolute top-1/2 right-0 w-3 h-px bg-accent/70" />
          <span className="absolute left-1/2 top-0 h-3 w-px bg-accent/70" />
          <span className="absolute left-1/2 bottom-0 h-3 w-px bg-accent/70" />
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/70" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/70" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/70" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/70" />
        </div>
      </div>

      {/* HUD top strip */}
      <div className="absolute inset-x-0 top-0 z-20 border-b border-warm/10">
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

      {/* Side telemetry left */}
      <div className="hidden lg:flex flex-col gap-2 absolute left-6 top-1/2 -translate-y-1/2 z-20 font-mono uppercase text-[10px] tracking-[0.22em] text-warm/60">
        <span>IMU</span>
        <span className="text-warm">0.012g</span>
        <span className="mt-3">VOLT</span>
        <span className="text-warm">12.4 V</span>
        <span className="mt-3">BATT</span>
        <span className="text-accent">84%</span>
        <span className="mt-3">TEMP</span>
        <span className="text-warm">37 °C</span>
      </div>

      {/* Side telemetry right */}
      <div className="hidden lg:flex flex-col gap-2 absolute right-6 top-1/2 -translate-y-1/2 z-20 font-mono uppercase text-[10px] tracking-[0.22em] text-warm/60 text-right">
        <span>HEADING</span>
        <span className="text-warm">142°</span>
        <span className="mt-3">DEPTH MAP</span>
        <span className="text-warm">SYNCED</span>
        <span className="mt-3">FRAME</span>
        <span className="text-warm">042881</span>
        <span className="mt-3">UPLINK</span>
        <span className="text-accent">OK</span>
      </div>

      {/* Big headline overlay (centered, text reads against vignette) */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 lg:px-12 pb-28 lg:pb-32">
        <div className="max-w-4xl">
          <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/65 mb-4">
            ◆ Field of view · 06.2026
          </p>
          <h1 className="cover-title text-warm text-balance">
            What the chassis
            <br />
            <span className="text-accent">would see,</span>
            <br />
            <span className="italic text-warm/85">if it had eyes yet.</span>
          </h1>

          <div className="mt-8 lg:mt-10 grid grid-cols-12 gap-4 lg:gap-8 items-end">
            <div className="col-span-12 lg:col-span-7">
              <p className="text-base lg:text-lg text-warm/75 max-w-[44ch] leading-[1.55] text-pretty">
                Engineering student at EAFIT. Building a four-motor vehicle
                platform from CAD to controller — plus the perception stack
                that will eventually drive it. Full-stack when the model
                needs an interface.
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
                See the network <span aria-hidden>↓</span>
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
