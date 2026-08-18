"use client";

export default function SceneLighting() {
  return (
    <>
      {/* Soft ambient base */}
      <hemisphereLight args={["#EFE7D7", "#2A251D", 0.9]} />
      {/* Cinematic warm key */}
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.9}
        color="#FFF1D6"
      />
      {/* Chartreuse rim from lower-left for accent */}
      <directionalLight
        position={[-6, -2, -3]}
        intensity={0.85}
        color="#C8D958"
      />
      {/* Cool counter-fill for depth */}
      <directionalLight
        position={[-3, 4, -5]}
        intensity={0.4}
        color="#B8C4D6"
      />
      <pointLight position={[0, -2, 2]} intensity={0.35} color="#F0E9D6" />
    </>
  );
}
