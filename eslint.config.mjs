import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  ...coreWebVitals,
  {
    // R3F components mutate three.js objects inside useFrame by design —
    // the scene graph is an imperative external system, not React state.
    files: ["app/components/three/**"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
];

export default config;
