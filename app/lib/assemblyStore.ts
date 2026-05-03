"use client";

import { useEffect, useState } from "react";

export type AssemblyPhase =
  | "assembling"
  | "assembled"
  | "disassembling"
  | "idle";

export type AssemblyState = {
  phase: AssemblyPhase;
  progress: number; // 0..1
  cycleElapsed: number;
  totalCycle: number;
};

let current: AssemblyState = {
  phase: "idle",
  progress: 0,
  cycleElapsed: 0,
  totalCycle: 12,
};

const listeners = new Set<(s: AssemblyState) => void>();

export function setAssemblyState(next: AssemblyState) {
  current = next;
  listeners.forEach((fn) => fn(next));
}

export function getAssemblyState() {
  return current;
}

export function useAssemblyState(throttleMs = 90): AssemblyState {
  const [state, setState] = useState<AssemblyState>(current);
  useEffect(() => {
    let lastEmit = 0;
    const handler = (s: AssemblyState) => {
      const now = performance.now();
      if (now - lastEmit < throttleMs) return;
      lastEmit = now;
      setState({ ...s });
    };
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, [throttleMs]);
  return state;
}

export function phaseLabel(phase: AssemblyPhase): string {
  switch (phase) {
    case "assembling":
      return "ASSEMBLING";
    case "assembled":
      return "ASSEMBLED";
    case "disassembling":
      return "DISASSEMBLING";
    default:
      return "STANDBY";
  }
}
