"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MODEL_URL, easeInOutCubic, prepareChassis } from "./chassisShared";

useGLTF.preload(MODEL_URL);

type Props = {
  /**
   * External assembly progress, 0 (exploded) → 1 (assembled). The scroll
   * scrub writes here every frame without re-rendering React.
   */
  progressRef: { current: number };
};

/**
 * The real Onshape assembly, driven by an external progress value.
 * Per-part stagger, cluster-axis explode, gear/axle spin-up, and a subtle
 * breathe once a part has seated.
 */
export default function RealAssembly({ progressRef }: Props) {
  const { scene } = useGLTF(MODEL_URL);

  const { root, animatedNodes } = useMemo(() => prepareChassis(scene, 2.6), [scene]);

  const tmpQuat = useMemo(() => new THREE.Quaternion(), []);
  const tmpAxisQuat = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const progress = Math.min(Math.max(progressRef.current, 0), 1);

    for (let i = 0; i < animatedNodes.length; i++) {
      const a = animatedNodes[i];
      const adjusted = progress * (1 + a.delay * 0.4) - a.delay * 0.4;
      const partProgress = adjusted < 0 ? 0 : adjusted > 1 ? 1 : adjusted;
      const eased = easeInOutCubic(partProgress);
      const partInv = 1 - eased;

      a.node.position.x = a.initialPos.x + a.explodeOffset.x * partInv;
      a.node.position.y = a.initialPos.y + a.explodeOffset.y * partInv;
      a.node.position.z = a.initialPos.z + a.explodeOffset.z * partInv;

      if (eased > 0.95) {
        a.node.position.y += Math.sin(t * 0.9 + a.breatheSeed) * 0.004;
      }

      if (a.spinSpeed !== 0 && eased > 0.6) {
        const angle = t * a.spinSpeed * (eased - 0.6) * 2.5;
        tmpAxisQuat.setFromAxisAngle(a.spinAxis, angle);
        tmpQuat.copy(a.initialQuat).multiply(tmpAxisQuat);
        a.node.quaternion.copy(tmpQuat);
      } else {
        a.node.quaternion.copy(a.initialQuat);
      }
    }

    root.position.y = Math.sin(t * 0.6) * 0.018 * progress;
  });

  return <primitive object={root} />;
}
