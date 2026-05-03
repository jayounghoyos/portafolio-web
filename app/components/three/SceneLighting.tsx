"use client";

export default function SceneLighting() {
  return (
    <>
      {/* Soft ambient base */}
      <ambientLight intensity={0.35} />
      {/* Strong cinematic key from upper-right */}
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.6}
        color="#FFE9C7"
      />
      {/* Bold signal-orange rim from lower-left */}
      <directionalLight
        position={[-6, -2, -3]}
        intensity={1.2}
        color="#E25822"
      />
      {/* Subtle teal counter-rim for separation */}
      <directionalLight
        position={[-3, 4, -5]}
        intensity={0.5}
        color="#0F766E"
      />
      {/* Warm fill from below to lift the underside */}
      <pointLight position={[0, -2, 2]} intensity={0.5} color="#F08A5D" />
    </>
  );
}
