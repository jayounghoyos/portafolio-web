"use client";

import { useState } from "react";
import { projects, type Project } from "../../lib/projects";

type Station = {
  id: string;
  x: number;
  y: number;
  lines: ("ml" | "robotics" | "fullstack")[];
  project?: Project;
  isInterchange?: boolean;
  isCurrent?: boolean;
  label?: string;
};

const LINE_COLORS = {
  ml: "#0E0E0C",
  robotics: "#16130E",
  fullstack: "#9CAB3F",
};

const LINE_NAMES = {
  ml: "ML / Deep Learning",
  robotics: "Robotics",
  fullstack: "Fullstack",
};

const findProject = (id: string) => projects.find((p) => p.id === id);

const STATIONS: Station[] = [
  // Robotics line — top
  { id: "claw-robot", x: 120, y: 110, lines: ["robotics"], project: findProject("claw-robot") },
  { id: "higiea", x: 270, y: 110, lines: ["robotics"], project: findProject("higiea") },
  { id: "xbox-car", x: 420, y: 180, lines: ["robotics"], project: findProject("xbox-car"), isInterchange: true },
  { id: "chassis", x: 600, y: 180, lines: ["robotics"], isCurrent: true, label: "CHASSIS · in work" },

  // ML line — middle
  { id: "celsius-nn", x: 120, y: 290, lines: ["ml"], project: findProject("celsius-nn") },
  { id: "game-recs", x: 270, y: 290, lines: ["ml"], project: findProject("game-recs") },
  { id: "magneto-ads", x: 420, y: 290, lines: ["ml"], project: findProject("magneto-ads"), isInterchange: true },

  // Fullstack line — bottom
  { id: "rickrollprinter", x: 270, y: 400, lines: ["fullstack"], project: findProject("rickrollprinter") },

  // Diagonal connection station — interchange between robotics and ML
  // (xbox-car already serves as interchange via diagonal)
];

// Lines drawn as paths between station coordinates
const LINES: Array<{ key: string; line: keyof typeof LINE_COLORS; path: [number, number][] }> = [
  // Robotics line — top horizontal then dipping down to xbox-car and continuing
  {
    key: "robotics-1",
    line: "robotics",
    path: [
      [80, 110],
      [120, 110],
      [270, 110],
      [380, 110],
      [420, 180],
      [600, 180],
      [680, 180],
    ],
  },
  // ML line — middle horizontal
  {
    key: "ml-1",
    line: "ml",
    path: [
      [80, 290],
      [120, 290],
      [270, 290],
      [380, 290],
      [420, 290],
    ],
  },
  // Fullstack line — bottom L-shape, rises to interchange w/ xbox-car & magneto
  {
    key: "fs-1",
    line: "fullstack",
    path: [
      [80, 400],
      [270, 400],
      [380, 400],
      [420, 290],
      [420, 180],
      [460, 110],
      [680, 110],
    ],
  },
];

function pathString(points: [number, number][]) {
  return points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
}

export default function MetroMap() {
  const [hovered, setHovered] = useState<Station | null>(null);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-6 lg:mb-10">
        <div className="col-span-12 lg:col-span-6">
          <p className="kicker mb-3">Map · Selected Work</p>
          <h3 className="font-serif italic text-2xl lg:text-3xl leading-[1.0]">
            Three lines &middot; nine stations &middot; one in development.
          </h3>
        </div>
        {/* Legend */}
        <div className="col-span-12 lg:col-span-6 flex flex-wrap gap-x-6 gap-y-2 lg:justify-end items-end">
          {(Object.keys(LINE_NAMES) as Array<keyof typeof LINE_NAMES>).map(
            (k) => (
              <div key={k} className="flex items-center gap-2">
                <span
                  className="w-6 h-1 rounded-full"
                  style={{ background: LINE_COLORS[k] }}
                />
                <span className="font-mono uppercase text-[10.5px] tracking-[0.18em] text-mute">
                  {LINE_NAMES[k]}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="hair-rule mb-6" />

      <div className="relative bg-paper">
        <svg
          viewBox="0 0 760 470"
          className="w-full h-auto"
          aria-label="Project network map"
        >
          {/* Faint grid background */}
          <defs>
            <pattern id="metroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="0.6" cy="0.6" r="0.6" fill="#D9D2C4" opacity="0.55" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="760" height="470" fill="url(#metroGrid)" />

          {/* Lines */}
          {LINES.map((l) => (
            <path
              key={l.key}
              d={pathString(l.path)}
              stroke={LINE_COLORS[l.line]}
              strokeWidth={6}
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {/* Stations */}
          {STATIONS.map((s) => {
            const link = s.project?.href ?? s.project?.repo;
            const isHovered = hovered?.id === s.id;
            const ringSize = s.isCurrent ? 14 : s.isInterchange ? 12 : 9;

            return (
              <g key={s.id}>
                {/* Station marker */}
                <a
                  href={link ?? "#chassis"}
                  target={link?.startsWith("http") ? "_blank" : undefined}
                  rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor-label={s.project?.title ?? s.label ?? "View"}
                  className="cursor-grow"
                >
                  {/* Hit area */}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={20}
                    fill="transparent"
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {/* Outer ring */}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={ringSize}
                    fill="#F5F1EA"
                    stroke={s.isCurrent ? "#9CAB3F" : "#16130E"}
                    strokeWidth={s.isCurrent ? 3 : 2.5}
                    style={{ pointerEvents: "none" }}
                  />
                  {/* Inner dot for current */}
                  {s.isCurrent ? (
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={4}
                      fill="#C8D958"
                      style={{ pointerEvents: "none" }}
                    >
                      <animate
                        attributeName="r"
                        values="4;6;4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  ) : null}
                </a>

                {/* Label */}
                <text
                  x={s.x}
                  y={s.y - ringSize - 8}
                  textAnchor="middle"
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fill: s.isCurrent ? "#9CAB3F" : "#16130E",
                    fontWeight: isHovered || s.isCurrent ? 600 : 400,
                    pointerEvents: "none",
                  }}
                >
                  {s.project?.title ?? s.label ?? s.id}
                </text>
                {/* Year */}
                {s.project?.year ? (
                  <text
                    x={s.x}
                    y={s.y + ringSize + 14}
                    textAnchor="middle"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fill: "#6E665B",
                      pointerEvents: "none",
                    }}
                    className="font-mono"
                  >
                    [ {s.project.year} ]
                  </text>
                ) : null}
              </g>
            );
          })}

          {/* "You are here" pointer to chassis */}
          <g>
            <text
              x={600}
              y={140}
              textAnchor="middle"
              className="font-serif italic"
              style={{
                fontSize: 13,
                fill: "#9CAB3F",
                pointerEvents: "none",
              }}
            >
              you are here
            </text>
            <line
              x1={600}
              y1={147}
              x2={600}
              y2={163}
              stroke="#9CAB3F"
              strokeWidth={1.5}
            />
          </g>
        </svg>

        {/* Hover detail card (desktop) */}
        {hovered?.project ? (
          <div className="hidden md:block absolute bottom-4 left-4 max-w-md bg-deep text-warm p-4 pointer-events-none">
            <p className="font-mono uppercase text-[10px] tracking-[0.22em] text-warm/60 mb-1">
              {hovered.project.domain} &middot; [ {hovered.project.year} ]
            </p>
            <p className="font-serif italic text-xl">{hovered.project.title}</p>
            <p className="text-sm text-warm/85 mt-1.5 max-w-[42ch]">
              {hovered.project.blurb}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
