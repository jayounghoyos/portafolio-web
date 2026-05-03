"use client";

import dynamic from "next/dynamic";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
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

const notes = [
  {
    label: "01 · Subject",
    body:
      "Four-motor independently-driven chassis, modeled in Onshape. 16 unique geometries, 59 instances. Each corner cluster is a self-contained drive unit — motor, gear train, axle, housing, mount. The plates carry the electronics in between.",
  },
  {
    label: "02 · CAD → Web",
    body:
      "Modeled in Onshape, exported as a single glTF with the full assembly tree — 123 nodes, 16 unique meshes, 59 baked transforms. The browser scales it to scene units, classifies each part by name, applies role-tinted materials, and animates each occurrence radially around the assembly center.",
  },
  {
    label: "03 · Next",
    body:
      "Mounting an IMU and forward-facing camera, then a perception stack — vision-based lane following first, then a learned control policy trained in simulation before the platform ever touches the ground.",
  },
];

const callouts = [
  { label: "MOTOR ×4", coord: "[ FL · FR · RL · RR ]" },
  { label: "GEAR TRAIN", coord: "[ ENGRENAGE 1–4 ]" },
  { label: "CHASSIS PLATES", coord: "[ ×3 STACKED ]" },
  { label: "FASTENERS", coord: "[ M3 VIS ×8 ]" },
];

export default function ChassisCaseStudy() {
  return (
    <section
      id="chassis"
      className="panel-deep py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Faint grid background on dark panel */}
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          variant="dark"
          index="01"
          kicker="Case Study · Vehicle Chassis"
          title={
            <>
              From CAD to controller —{" "}
              <span className="italic text-signal">a working specimen</span>.
            </>
          }
          meta="In development · v0.3"
          description="Drag to orbit. The assembly cycles automatically: parts stream in, settle, and blow apart again on a 12-second loop."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-8 h-[68vh] lg:h-[82vh] w-full relative">
            <HudFrame className="w-full h-full">
              <AssemblyHud variant="dark" />
              <ChassisCanvas interactive />
              <div className="absolute bottom-4 right-5 z-10 hidden md:flex flex-col items-end gap-1 text-warm/70 font-mono text-[10px] uppercase tracking-[0.20em] pointer-events-none">
                <span>fig. 01 / 4-motor drivetrain</span>
                <span>drag · orbit</span>
              </div>
            </HudFrame>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-10">
            {notes.map((n, i) => (
              <Reveal key={n.label} delay={i * 80}>
                <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/70">
                  {n.label}
                </p>
                <p className="mt-3 text-warm/95 text-[15px] leading-[1.7] text-pretty">
                  {n.body}
                </p>
              </Reveal>
            ))}

            <Reveal delay={300}>
              <div className="datum-line mb-6" aria-hidden />
              <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/70 mb-4">
                Callouts
              </p>
              <ul className="grid grid-cols-1 gap-2.5">
                {callouts.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-baseline justify-between font-mono uppercase text-[11px] tracking-[0.18em]"
                  >
                    <span className="text-warm">
                      <span className="text-signal mr-2">◆</span>
                      {c.label}
                    </span>
                    <span className="text-warm/55 text-[10px]">{c.coord}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
