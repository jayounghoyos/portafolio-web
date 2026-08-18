"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneLighting from "./SceneLighting";
import ChassisModel from "./ChassisModel";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { installThreeConsoleFilter } from "../../lib/threeConsole";

installThreeConsoleFilter();

type Props = {
  interactive?: boolean;
  className?: string;
  /** External assembly progress 0..1 (scroll scrub writes here). */
  progressRef: { current: number };
  /**
   * When true, the inner R3F Canvas only mounts once the wrapper nears the
   * viewport (IntersectionObserver), and rendering pauses entirely while
   * off-screen.
   */
  lazy?: boolean;
};

export default function ChassisCanvas({
  interactive = false,
  className = "",
  progressRef,
  lazy = false,
}: Props) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(!lazy);
  const [visible, setVisible] = useState(!lazy);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!lazy || !node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.isIntersecting);
          if (entry.isIntersecting) setMounted(true);
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [lazy]);

  return (
    <div ref={wrapperRef} className={`relative w-full h-full ${className}`}>
      {mounted ? (
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
          frameloop={visible ? "always" : "never"}
          performance={{ min: 0.5 }}
          shadows={false}
          aria-label="3D chassis model"
        >
          <SceneLighting />
          <ChassisModel autoRotate={!reduced} progressRef={progressRef} />
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
      ) : null}
    </div>
  );
}
