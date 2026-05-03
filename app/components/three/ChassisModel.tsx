"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import RealAssembly from "./RealAssembly";

type Props = {
  autoRotate?: boolean;
  assembleCycle?: boolean;
  static?: boolean;
};

export default function ChassisModel({
  autoRotate = true,
  assembleCycle = true,
  static: isStatic = false,
}: Props) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!autoRotate || !group.current) return;
    group.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={group}>
      <Suspense fallback={<PlaceholderChassis />}>
        <RealAssembly assembleCycle={assembleCycle} static={isStatic} />
      </Suspense>
    </group>
  );
}

function PlaceholderChassis() {
  const tubeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#16130E",
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

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C8D958",
        emissive: "#C8D958",
        emissiveIntensity: 0.25,
        metalness: 0.6,
        roughness: 0.35,
      }),
    []
  );

  return (
    <group rotation={[0.16, -0.35, 0]}>
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
          <mesh material={accentMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.22, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
