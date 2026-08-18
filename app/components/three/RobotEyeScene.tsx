"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import HeroChassis from "./HeroChassis";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { installThreeConsoleFilter } from "../../lib/threeConsole";

installThreeConsoleFilter();

/**
 * The machine's POV. Every detection is REAL portfolio content — the boxes
 * are a live, clickable table of contents, and the centerpiece is the actual
 * chassis assembly the MACHINE section examines in detail.
 */

type DetectionTarget = {
  id: string;
  label: string;
  sub: string;
  conf: number;
  href: string;
  cursorLabel: string;
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  /** Render a generic prop mesh inside the box (the chassis brings its own). */
  prop?: boolean;
};

const TARGETS: DetectionTarget[] = [
  {
    id: "chassis",
    label: "OBJECTIVE · CHASSIS_v0.4",
    sub: "the machine · log 05",
    conf: 0.99,
    href: "#chassis",
    cursorLabel: "Inspect the machine",
    position: [0, 0.42, 0],
    size: [1.5, 0.8, 1.2],
    color: "#C8D958",
  },
  {
    id: "higiea",
    label: "DET · HIGIEA",
    sub: "uv-c robot · 2021",
    conf: 0.97,
    href: "#work",
    cursorLabel: "See detected work",
    position: [-2.1, 0.38, -0.9],
    size: [0.6, 0.76, 0.6],
    prop: true,
  },
  {
    id: "magneto",
    label: "DET · MAGNETO_ADS",
    sub: "ml recsys · 2024",
    conf: 0.93,
    href: "#work",
    cursorLabel: "See detected work",
    position: [2.4, 0.35, -1.35],
    size: [1.05, 0.62, 0.12],
    prop: true,
  },
  {
    id: "claw",
    label: "DET · CLAW_ROBOT",
    sub: "grabbing arm · 2022",
    conf: 0.9,
    href: "#work",
    cursorLabel: "See detected work",
    position: [-1.85, 0.26, 1.55],
    size: [0.52, 0.52, 0.52],
    prop: true,
  },
  {
    id: "xboxcar",
    label: "DET · XBOX_CAR",
    sub: "rpi platform · 2023",
    conf: 0.88,
    href: "#work",
    cursorLabel: "See detected work",
    position: [1.75, 0.16, 1.35],
    size: [0.58, 0.32, 0.42],
    prop: true,
  },
];

function DetectionBox({ target, index }: { target: DetectionTarget; index: number }) {
  const color = target.color ?? "#C8D958";
  const { position, size, label, sub, conf, href, cursorLabel } = target;

  const edges = useMemo(() => {
    const g = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const e = new THREE.EdgesGeometry(g);
    g.dispose();
    return e;
  }, [size]);

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }),
    [color]
  );

  return (
    <group position={position}>
      <lineSegments geometry={edges} material={mat} />
      <Html
        position={[size[0] / 2, size[1] / 2 + 0.05, size[2] / 2]}
        center={false}
        distanceFactor={2.2}
        zIndexRange={[30, 0]}
      >
        <a
          href={href}
          data-cursor-label={cursorLabel}
          className="cursor-grow det-label block select-none translate-x-2 -translate-y-1"
          style={{ animationDelay: `${900 + index * 260}ms` }}
        >
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 whitespace-nowrap"
            style={{ color: "#0D0C08", background: color }}
          >
            {label}
          </span>
          <span className="block font-mono text-[8.5px] uppercase tracking-[0.18em] mt-0.5 text-[#C8D958]/90 whitespace-nowrap">
            {sub} · conf {conf.toFixed(2)}
          </span>
        </a>
      </Html>
    </group>
  );
}

function FloorGrid() {
  const grid = useMemo(() => new THREE.GridHelper(40, 40, "#3A3530", "#26221B"), []);
  return <primitive object={grid} position={[0, 0, 0]} />;
}

function CameraRig({ animate }: { animate: boolean }) {
  const { camera } = useThree();
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!animate) return;
    t.current += delta * 0.08;
    const radius = 4.2;
    const angle = Math.sin(t.current) * 0.6 + Math.PI;
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.position.y = 1.1 + Math.sin(t.current * 0.7) * 0.08;
    camera.lookAt(0, 0.3, 0);
  });

  useEffect(() => {
    if (animate) return;
    // Reduced motion: one fixed, composed frame.
    camera.position.set(0, 1.15, -4.2);
    camera.lookAt(0, 0.3, 0);
  }, [animate, camera]);

  return null;
}

function Lighting() {
  return (
    <>
      <hemisphereLight args={["#EFE7D7", "#1B1812", 0.8]} />
      <directionalLight position={[6, 8, 4]} intensity={1.9} color="#FFE9C7" />
      <directionalLight position={[-4, 3, -6]} intensity={0.7} color="#B8C4D6" />
      <pointLight position={[-3, 2, 3]} intensity={0.9} color="#C8D958" />
      <pointLight position={[3, 2, -3]} intensity={0.35} color="#7AC5D8" />
    </>
  );
}

function WorkshopProps() {
  return (
    <>
      {/* Floor disc under the grid */}
      <mesh position={[0, -0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial color="#1B1812" metalness={0.1} roughness={0.95} />
      </mesh>

      {/* Generic props inside the non-chassis detection boxes */}
      {TARGETS.filter((t) => t.prop).map((t) => (
        <mesh key={`prop-${t.id}`} position={t.position}>
          <boxGeometry args={t.size.map((s) => s * 0.82) as [number, number, number]} />
          <meshStandardMaterial color="#332F27" metalness={0.4} roughness={0.55} />
        </mesh>
      ))}
    </>
  );
}

export default function RobotEyeScene({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Pause rendering entirely once the hero scrolls away.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setVisible(entry.isIntersecting);
      },
      { rootMargin: "80px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`relative w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [0, 1.15, -4.2], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
        frameloop={visible && !reduced ? "always" : "demand"}
        style={{ background: "#0D0C08" }}
      >
        <fog attach="fog" args={["#0D0C08", 8, 22]} />
        <Lighting />
        <CameraRig animate={!reduced} />
        <FloorGrid />
        <WorkshopProps />
        <Suspense fallback={null}>
          <HeroChassis position={[0, 0.42, 0]} size={1.6} spin={!reduced} />
        </Suspense>
        {TARGETS.map((t, i) => (
          <DetectionBox key={t.id} target={t} index={i} />
        ))}
      </Canvas>
    </div>
  );
}
