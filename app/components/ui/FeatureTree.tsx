"use client";

import { useEffect, useState } from "react";
import { selected, studies, experiments } from "../../lib/projects";
import { issue } from "../../lib/issue";

type Node = {
  label: string;
  href?: string;
  type?: "folder" | "leaf" | "active" | "meta";
  children?: Node[];
  badge?: string;
};

const tree: Node[] = [
  {
    label: "JYH-2026",
    type: "folder",
    children: [
      {
        label: "Origin",
        type: "folder",
        children: [
          { label: `Coordinates · ${issue.coordinates}`, type: "meta" },
          { label: `Issue · vol.${issue.vol} / ${issue.number}`, type: "meta" },
        ],
      },
      {
        label: "Career",
        type: "folder",
        children: [
          { label: "Currently", href: "#now", type: "leaf" },
          { label: "Byline", href: "#about", type: "leaf" },
        ],
      },
      {
        label: `Selected Work (${selected.length})`,
        type: "folder",
        children: selected.map((p) => ({
          label: p.title,
          href: `#work`,
          type: "leaf",
        })),
      },
      {
        label: `Studies (${studies.length})`,
        type: "folder",
        children: studies.map((p) => ({
          label: p.title,
          href: `#studies`,
          type: "leaf",
        })),
      },
      {
        label: `Experiments (${experiments.length})`,
        type: "folder",
        children: experiments.map((p) => ({
          label: p.title,
          href: `#experiments`,
          type: "leaf",
        })),
      },
      {
        label: "Chassis · in work",
        href: "#chassis",
        type: "active",
      },
      {
        label: "Letter",
        href: "#contact",
        type: "leaf",
      },
    ],
  },
];

const SECTION_IDS = ["top", "now", "work", "chassis", "studies", "experiments", "about", "contact"];

function useActiveSection(): string {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const handler = () => {
      let current = "top";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function TreeNode({
  node,
  depth = 0,
  activeHref,
}: {
  node: Node;
  depth?: number;
  activeHref: string;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.children?.length;
  const isActive = node.href && activeHref && `#${activeHref}` === node.href;

  if (node.type === "meta") {
    return (
      <div
        className="font-mono uppercase text-[9.5px] tracking-[0.18em] text-mute/70 py-0.5"
        style={{ paddingLeft: `${depth * 12}px` }}
      >
        {node.label}
      </div>
    );
  }

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-cursor-label={open ? "Collapse" : "Expand"}
          className="cursor-grow w-full flex items-center gap-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/85 hover:text-ink"
          style={{ paddingLeft: `${depth * 12}px` }}
        >
          <span
            className="inline-block transition-transform text-mute"
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              fontSize: "8px",
            }}
            aria-hidden
          >
            ▶
          </span>
          <span className="truncate">{node.label}</span>
        </button>
        {open ? (
          <div className="border-l border-rule ml-[10px]">
            {node.children!.map((c, i) => (
              <TreeNode
                key={i}
                node={c}
                depth={depth + 1}
                activeHref={activeHref}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  // leaf or active leaf
  const className = `cursor-grow flex items-center gap-2 py-1 font-mono text-[11px] tracking-[0.10em] truncate transition-colors ${
    node.type === "active"
      ? "text-accent-deep hover:text-accent"
      : isActive
      ? "text-accent-deep"
      : "text-ink/75 hover:text-ink"
  }`;

  return (
    <a
      href={node.href}
      data-cursor-label={`Jump to ${node.label}`}
      className={className}
      style={{ paddingLeft: `${depth * 12}px` }}
    >
      <span
        className={`w-1 h-1 ${node.type === "active" ? "bg-accent ambient-pulse" : "bg-mute/40 rounded-full"}`}
        aria-hidden
      />
      <span className="truncate">{node.label}</span>
    </a>
  );
}

export default function FeatureTree() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-rule">
        <div className="px-5 h-12 flex items-center justify-between">
          <a
            href="#top"
            className="font-serif italic text-base flex items-baseline gap-1"
          >
            JYH<span className="text-accent">.</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="font-mono uppercase text-[11px] tracking-[0.20em]"
            aria-label="Toggle navigation"
          >
            {open ? "Close" : "Tree"}
          </button>
        </div>
        {open ? (
          <div className="border-t border-rule bg-paper p-5 max-h-[70vh] overflow-y-auto">
            <FeatureTreeBody activeHref={active} onNavigate={() => setOpen(false)} />
          </div>
        ) : null}
      </header>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[260px] z-40 border-r border-rule bg-paper/85 backdrop-blur-md"
        aria-label="Feature tree navigation"
      >
        {/* App-style title bar */}
        <div className="px-5 py-3 border-b border-rule flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
            <span className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-ink">
              Portafolio · Studio
            </span>
          </div>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-mute/80">
            v1.0
          </span>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-2 border-b border-rule flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
          <span className="hover:text-ink cursor-pointer">File</span>
          <span className="hover:text-ink cursor-pointer">View</span>
          <span className="hover:text-ink cursor-pointer">Help</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <FeatureTreeBody activeHref={active} />
        </div>

        {/* Status bar */}
        <div className="px-5 py-2 border-t border-rule font-mono text-[9.5px] uppercase tracking-[0.18em] text-mute/80 flex items-center justify-between">
          <span>READY</span>
          <span className="text-accent-deep">{active.toUpperCase()}</span>
        </div>
      </aside>
    </>
  );
}

function FeatureTreeBody({
  activeHref,
  onNavigate,
}: {
  activeHref: string;
  onNavigate?: () => void;
}) {
  return (
    <div onClick={onNavigate} className="text-ink">
      {tree.map((node, i) => (
        <TreeNode key={i} node={node} activeHref={activeHref} />
      ))}
    </div>
  );
}
