"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MODEL_URL, prepareChassis } from "./chassisShared";

useGLTF.preload(MODEL_URL);

type Props = {
  position?: [number, number, number];
  /** Bounding-box diagonal in scene units. */
  size?: number;
  spin?: boolean;
};

/**
 * The assembled chassis as the hero scene's centerpiece — same model, same
 * role materials as the case study, no per-part animation. Plants the
 * thread the MACHINE section pays off.
 */
export default function HeroChassis({
  position = [0, 0, 0],
  size = 1.6,
  spin = true,
}: Props) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);

  const root = useMemo(() => prepareChassis(scene, size).root, [scene, size]);

  useFrame((_, delta) => {
    if (!spin || !group.current) return;
    group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group} position={position}>
      <primitive object={root} />
    </group>
  );
}
