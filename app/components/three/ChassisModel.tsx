"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import RealAssembly from "./RealAssembly";

type Props = {
  autoRotate?: boolean;
  assembleCycle?: boolean;
};

export default function ChassisModel({
  autoRotate = true,
  assembleCycle = true,
}: Props) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!autoRotate || !group.current) return;
    group.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={group}>
      <Suspense fallback={<PlaceholderChassis />}>
        <RealAssembly assembleCycle={assembleCycle} />
      </Suspense>
    </group>
  );
}

function PlaceholderChassis() {
  const tubeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1A1814",
        metalness: 0.55,
        roughness: 0.35,
      }),
    []
  );

  const wheelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0E0E0C",
        metalness: 0.2,
        roughness: 0.85,
      }),
    []
  );

  const hubMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C2410C",
        emissive: "#C2410C",
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.3,
      }),
    []
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#0F766E",
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  const ringRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (ringRef.current) {
      const r = 1.0 + (Math.sin(time.current * 0.8) + 1) * 0.6;
      ringRef.current.scale.set(r, r, 1);
      const m = ringRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.35 * (1 - (r - 1) / 1.2);
    }
  });

  return (
    <group rotation={[0.16, -0.35, 0]}>
      <mesh
        ref={ringRef}
        position={[0, -0.85, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={ringMat}
      >
        <ringGeometry args={[0.95, 1.02, 64]} />
      </mesh>

      <mesh material={tubeMat}>
        <boxGeometry args={[2.2, 0.1, 1.0]} />
      </mesh>
      <mesh material={tubeMat} position={[0, 0.4, 0]}>
        <boxGeometry args={[1.0, 0.05, 0.8]} />
      </mesh>

      {[
        [-0.95, -0.5, 0.78] as [number, number, number],
        [0.95, -0.5, 0.78] as [number, number, number],
        [-0.95, -0.5, -0.78] as [number, number, number],
        [0.95, -0.5, -0.78] as [number, number, number],
      ].map((p, i) => (
        <group key={i} position={p}>
          <mesh material={wheelMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.34, 0.34, 0.2, 32]} />
          </mesh>
          <mesh material={hubMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.22, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
