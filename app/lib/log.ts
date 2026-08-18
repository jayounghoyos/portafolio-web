/**
 * The site reads as the operator console / engineering log of one machine —
 * the chassis. Every section is a numbered log entry; this registry is the
 * single source for navigation, the telemetry rail, and section headers.
 */

export const operator = {
  name: "Juan Andrés Young Hoyos",
  callsign: "JYH",
  role: "ML & Robotics Engineer",
  city: "MEDELLÍN — CO",
  coordinates: "06°14′N 75°34′W",
  updated: "AUG 2026",
  motto: "Machine learning, robotics, and what holds them up.",
};

export type LogSection = {
  /** Anchor id — stable, never rename (bookmarks). */
  id: string;
  /** Short console code shown in nav, rail, and headers. */
  code: string;
  /** Human title used in the hero index and section headers. */
  title: string;
  /** Shown in the main nav bar. */
  nav?: boolean;
};

export const logSections: LogSection[] = [
  { id: "top", code: "BOOT", title: "Field of view" },
  { id: "about", code: "OPERATOR", title: "Who is driving", nav: true },
  { id: "now", code: "TASKS", title: "Running processes" },
  { id: "work", code: "OBJECTS", title: "Detected work", nav: true },
  { id: "stack", code: "TOOLCHAIN", title: "Mounted tools", nav: true },
  { id: "chassis", code: "MACHINE", title: "The machine itself", nav: true },
  { id: "studies", code: "TRAINING", title: "Training log" },
  { id: "experiments", code: "SIDE-QUESTS", title: "Filed curiosities" },
  { id: "contact", code: "UPLINK", title: "Open channel" },
];

export const totalEntries = logSections.length - 1; // hero is entry 00

export function logEntry(id: string) {
  const index = logSections.findIndex((s) => s.id === id);
  const section = logSections[index];
  return {
    ...section,
    num: String(index).padStart(2, "0"),
    total: String(totalEntries).padStart(2, "0"),
  };
}
