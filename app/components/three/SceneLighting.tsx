"use client";

export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.0}
        color="#FFE9C7"
      />
      <directionalLight
        position={[-4, 3, -3]}
        intensity={0.45}
        color="#C2410C"
      />
    </>
  );
}
