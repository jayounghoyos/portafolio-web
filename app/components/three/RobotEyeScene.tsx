"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { installThreeConsoleFilter } from "../../lib/threeConsole";

installThreeConsoleFilter();

type DetectionTarget = {
  id: string;
  label: string;
  conf: number;
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
};

const TARGETS: DetectionTarget[] = [
  {
    id: "vehicle",
    label: "VEHICLE_PLATFORM_v0.3",
    conf: 0.99,
    position: [0, 0.18, 0],
    size: [1.2, 0.45, 0.7],
    color: "#C8D958",
  },
  {
    id: "tool",
    label: "TOOL · CALIPER",
    conf: 0.92,
    position: [-2.0, 0.05, -0.5],
    size: [0.55, 0.08, 0.18],
  },
  {
    id: "shelf",
    label: "WORKBENCH",
    conf: 0.88,
    position: [2.4, 0.6, -1.4],
    size: [1.6, 1.2, 0.6],
  },
  {
    id: "stool",
    label: "STOOL",
    conf: 0.84,
    position: [-1.8, 0.3, 1.6],
    size: [0.5, 0.6, 0.5],
  },
  {
    id: "spool",
    label: "FILAMENT · 1.75mm",
    conf: 0.78,
    position: [1.6, 0.18, 1.4],
    size: [0.4, 0.36, 0.4],
  },
];

function DetectionBox({ target }: { target: DetectionTarget }) {
  const color = target.color ?? "#C8D958";
  const { position, size, label, conf } = target;

  // Build a wireframe edge box matching size
  const edges = useMemo(() => {
    const g = new THREE.BoxGeometry(size[0], size[1], size[2]);
    return new THREE.EdgesGeometry(g);
  }, [size]);

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 }),
    [color]
  );

  return (
    <group position={position}>
      <lineSegments geometry={edges} material={mat} />
      <Html
        position={[size[0] / 2, size[1] / 2 + 0.05, size[2] / 2]}
        center={false}
        distanceFactor={6}
        zIndexRange={[10, 0]}
      >
        <div className="select-none pointer-events-none translate-x-2 -translate-y-1">
          <div
            className="font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 whitespace-nowrap"
            style={{
              color: "#16130E",
              background: color,
            }}
          >
            {label}
          </div>
          <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] mt-0.5 text-[#C8D958]/90 whitespace-nowrap">
            CONF {conf.toFixed(2)}
          </div>
        </div>
      </Html>
    </group>
  );
}

function FloorGrid() {
  const grid = useMemo(() => new THREE.GridHelper(40, 40, "#3A3530", "#2A251D"), []);
  return <primitive object={grid} position={[0, 0, 0]} />;
}

function CameraRig() {
  const { camera } = useThree();
  const t = useRef(0);

  useFrame((state, delta) => {
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

  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={0.9}
        color="#FFE9C7"
      />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#C8D958" />
      <pointLight position={[3, 2, -3]} intensity={0.35} color="#7AC5D8" />
    </>
  );
}

function WorkshopProps() {
  return (
    <>
      {/* Floor disc */}
      <mesh position={[0, -0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial color="#1F1B16" metalness={0.1} roughness={0.95} />
      </mesh>

      {/* Solid mesh "props" living inside detection boxes */}
      {TARGETS.map((t) => (
        <mesh key={`prop-${t.id}`} position={t.position}>
          <boxGeometry args={t.size} />
          <meshStandardMaterial
            color={t.id === "vehicle" ? "#2D2A24" : "#3A3530"}
            metalness={0.4}
            roughness={0.55}
          />
        </mesh>
      ))}
    </>
  );
}

export default function RobotEyeScene({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [4.2, 1.2, 4.2], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
        style={{ background: "#16130E" }}
      >
        <fog attach="fog" args={["#16130E", 8, 22]} />
        <Lighting />
        <CameraRig />
        <FloorGrid />
        <WorkshopProps />
        {TARGETS.map((t) => (
          <DetectionBox key={t.id} target={t} />
        ))}
      </Canvas>
    </div>
  );
}
