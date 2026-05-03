"use client";

import { useAssemblyState, phaseLabel } from "../../lib/assemblyStore";

type Props = {
  variant?: "light" | "dark";
  showCount?: boolean;
};

export default function AssemblyHud({
  variant = "light",
  showCount = true,
}: Props) {
  const state = useAssemblyState();
  const dotColor =
    state.phase === "assembled"
      ? "bg-accent"
      : state.phase === "assembling"
      ? "bg-signal"
      : state.phase === "disassembling"
      ? "bg-signal/60"
      : "bg-mute";

  return (
    <>
      {/* Top-left status badge */}
      <div className="absolute top-4 left-5 z-20 flex items-center gap-2 pointer-events-none">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ambient-pulse`} />
        <span
          className={`font-mono uppercase text-[10.5px] tracking-[0.20em] ${
            variant === "dark" ? "text-warm" : "text-ink"
          }`}
        >
          STATE · {phaseLabel(state.phase)}
        </span>
      </div>

      {/* Top-right system identifier */}
      <div
        className={`absolute top-4 right-5 z-20 font-mono uppercase text-[10.5px] tracking-[0.20em] pointer-events-none ${
          variant === "dark" ? "text-warm/70" : "text-mute"
        }`}
      >
        SYS · ASSEMBLY-01
      </div>

      {/* Bottom-left progress + cycle */}
      <div
        className={`absolute bottom-4 left-5 z-20 font-mono uppercase text-[10.5px] tracking-[0.20em] pointer-events-none flex items-center gap-3 ${
          variant === "dark" ? "text-warm/70" : "text-mute"
        }`}
      >
        <span>
          PROG {String(Math.round(state.progress * 100)).padStart(3, "0")}%
        </span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">
          T+{state.cycleElapsed.toFixed(1)}s
        </span>
      </div>

      {/* Bottom-right part counter */}
      {showCount ? (
        <div
          className={`absolute bottom-4 right-5 z-20 font-mono uppercase text-[10.5px] tracking-[0.20em] pointer-events-none flex items-center gap-3 ${
            variant === "dark" ? "text-warm/70" : "text-mute"
          }`}
        >
          <span className="hidden sm:inline">59 INST</span>
          <span className="hidden sm:inline">·</span>
          <span>16 GEOM</span>
        </div>
      ) : null}
    </>
  );
}
