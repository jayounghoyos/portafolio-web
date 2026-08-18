"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { createScope, createTimeline, cubicBezier } from "animejs";
import MagneticLink from "../ui/MagneticLink";
import { operator } from "../../lib/log";

const RobotEyeScene = dynamic(() => import("../three/RobotEyeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-void">
      <span className="kicker animate-pulse">initializing sensor…</span>
    </div>
  ),
});

const LOG_LINES = [
  "[T+00.00] BOOT · sensor array online",
  "[T+00.04] CALIBRATE · IMU drift 0.012",
  "[T+00.07] LOCK · OBJECTIVE CHASSIS_v0.4 → LOG 05",
  "[T+00.09] DET · HIGIEA · MAGNETO_ADS · CLAW_ROBOT · XBOX_CAR",
  "[T+00.12] CONF check pass · 5/5 targets → LOG 03",
  "[T+00.18] STATUS · standing by · uplink open → LOG 08",
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
  const rootRef = useRef<HTMLElement>(null);

  // Boot sequence — one timeline, HUD elements power on in order.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope({ root: node }).add(() => {
      createTimeline({
        defaults: { ease: cubicBezier(0.2, 0.6, 0.2, 1), duration: 600 },
      })
        .add("[data-boot='hud-top']", { opacity: [0, 1], translateY: [-10, 0] }, 200)
        .add("[data-boot='reticle']", { opacity: [0, 1], scale: [1.15, 1] }, "-=350")
        .add("[data-boot='side-l']", { opacity: [0, 1], translateX: [-8, 0] }, "-=300")
        .add("[data-boot='side-r']", { opacity: [0, 1], translateX: [8, 0] }, "-=550")
        .add("[data-boot='kicker']", { opacity: [0, 1] }, "-=250")
        .add("[data-boot='headline']", { opacity: [0, 1], translateY: [18, 0], duration: 750 }, "-=150")
        .add("[data-boot='tagline']", { opacity: [0, 1], translateY: [12, 0] }, "-=450")
        .add("[data-boot='bio']", { opacity: [0, 1] }, "-=300")
        .add("[data-boot='cta']", { opacity: [0, 1], translateY: [8, 0] }, "-=350")
        .add("[data-boot='feed']", { opacity: [0, 1] }, "-=200");
    });
    return () => scope.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative w-full overflow-hidden h-screen min-h-[680px] bg-void text-ink"
    >
      {/* POV scene fills the section */}
      <div className="absolute inset-0 lg:-ml-14">
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
      <div
        data-boot="reticle"
        className="absolute inset-0 grid place-items-center pointer-events-none z-10"
      >
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
      <div
        data-boot="hud-top"
        className="absolute inset-x-0 top-0 z-20 border-b border-rule bg-void/40 backdrop-blur-sm"
      >
        <div className="px-6 lg:px-12 py-3 mt-12 flex items-baseline justify-between font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute gap-3 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
            <span className="text-ink">SENSOR_01 · CHASSIS POV</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">FEED LIVE</span>
          </div>
          <div className="hidden md:flex items-baseline gap-3">
            <span>SCENE · workshop</span>
            <span>·</span>
            <span>LAT {operator.coordinates}</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-ink">{time}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">REC</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
          </div>
        </div>
      </div>

      {/* Side telemetry */}
      <div
        data-boot="side-l"
        className="hidden lg:flex flex-col gap-2 absolute left-6 top-1/2 -translate-y-1/2 z-20 font-mono uppercase text-[10px] tracking-[0.22em] text-mute"
      >
        <span>IMU</span>
        <span className="text-ink">0.012g</span>
        <span className="mt-3">BATT</span>
        <span className="text-accent">84%</span>
        <span className="mt-3">TEMP</span>
        <span className="text-ink">37 °C</span>
      </div>
      <div
        data-boot="side-r"
        className="hidden lg:flex flex-col gap-2 absolute right-6 top-1/2 -translate-y-1/2 z-20 font-mono uppercase text-[10px] tracking-[0.22em] text-mute text-right"
      >
        <span>TARGETS</span>
        <span className="text-ink">5 / 5</span>
        <span className="mt-3">FRAME</span>
        <span className="text-ink">042881</span>
        <span className="mt-3">UPLINK</span>
        <span className="text-accent">OK</span>
      </div>

      {/* Headline overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 lg:px-12 pb-24 lg:pb-28">
        <div className="max-w-5xl">
          <p
            data-boot="kicker"
            className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute mb-4"
          >
            ◆ Field of view · {operator.updated}
          </p>

          <h1
            data-boot="headline"
            className="font-serif text-ink text-balance leading-[0.92] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.6rem, 9.5vw, 9rem)" }}
          >
            Juan Andrés
            <br />
            <span className="italic">Young Hoyos</span>
            <span className="text-accent">.</span>
          </h1>

          <p
            data-boot="tagline"
            className="mt-5 lg:mt-7 font-serif italic text-dim text-balance max-w-[24ch]"
            style={{ fontSize: "clamp(1.3rem, 3.4vw, 2.6rem)", lineHeight: 1.1 }}
          >
            What the chassis sees, while I build the rest of it.
          </p>

          <div className="mt-8 lg:mt-10 grid grid-cols-12 gap-4 lg:gap-8 items-end">
            <div data-boot="bio" className="col-span-12 lg:col-span-7">
              <p className="text-base lg:text-[17px] text-dim max-w-[44ch] leading-[1.55] text-pretty">
                ML &amp; robotics engineer.
                <br />
                Building a four-motor vehicle platform from CAD to controller.
                <br />
                Every box in this feed is real work — click one.
              </p>
            </div>
            <div
              data-boot="cta"
              className="col-span-12 lg:col-span-5 flex flex-wrap gap-x-5 gap-y-3 lg:justify-end"
            >
              <MagneticLink
                href="#chassis"
                data-cursor-label="Inspect the machine"
                className="cursor-grow group inline-flex items-center gap-3 px-5 py-3 bg-accent text-paper-ink hover:bg-accent-soft transition-colors font-mono uppercase text-[10.5px] tracking-[0.22em]"
                strength={0.25}
              >
                Inspect the machine
                <span className="font-serif italic text-xl group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </MagneticLink>
              <MagneticLink
                href="#work"
                strength={0.18}
                data-cursor-label="Detected objects"
                className="cursor-grow font-mono uppercase text-[10.5px] tracking-[0.22em] text-ink hover:text-accent transition-colors inline-flex items-center gap-2 px-3 py-3"
              >
                Detected objects <span aria-hidden>↓</span>
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>

      {/* HUD bottom log feed */}
      <div
        data-boot="feed"
        className="absolute inset-x-0 bottom-0 z-20 border-t border-rule bg-void/65 backdrop-blur-sm"
      >
        <div className="px-6 lg:px-12 py-2.5 marquee">
          <div className="marquee-track font-mono uppercase text-[10px] tracking-[0.22em] text-mute">
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
