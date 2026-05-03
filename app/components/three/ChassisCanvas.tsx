"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneLighting from "./SceneLighting";
import ChassisModel from "./ChassisModel";

type Props = {
  interactive?: boolean;
  className?: string;
};

export default function ChassisCanvas({
  interactive = false,
  className = "",
}: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [3.4, 1.8, 3.4], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        frameloop={reduced ? "demand" : "always"}
        performance={{ min: 0.5 }}
        shadows={false}
        aria-label="3D chassis model"
      >
        <SceneLighting />
        <Suspense fallback={null}>
          <ChassisModel autoRotate={!reduced} />
        </Suspense>
        {interactive ? (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.9}
            autoRotate={!reduced}
            autoRotateSpeed={0.6}
          />
        ) : null}
      </Canvas>
    </div>
  );
}
