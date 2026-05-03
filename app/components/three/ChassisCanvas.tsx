"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneLighting from "./SceneLighting";
import ChassisModel from "./ChassisModel";

type Props = {
  interactive?: boolean;
  className?: string;
  /**
   * When true, model renders in pre-assembled state with no per-part animation.
   * Used by the hero canvas to share the page with the case-study canvas without
   * paying for two parallel animation loops.
   */
  static?: boolean;
  /**
   * When true, the inner R3F Canvas only mounts once the wrapper enters the
   * viewport (IntersectionObserver). Prevents both canvases from initializing
   * + running on first paint.
   */
  lazy?: boolean;
};

export default function ChassisCanvas({
  interactive = false,
  className = "",
  static: isStatic = false,
  lazy = false,
}: Props) {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(!lazy);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (!lazy) return;
    if (mounted) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }
    const node = wrapperRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [lazy, mounted]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full ${className}`}
    >
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
          frameloop={isStatic ? "demand" : reduced ? "demand" : "always"}
          performance={{ min: 0.5 }}
          shadows={false}
          aria-label="3D chassis model"
        >
          <SceneLighting />
          <Suspense fallback={null}>
            <ChassisModel autoRotate={!reduced} static={isStatic} />
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
      ) : null}
    </div>
  );
}
