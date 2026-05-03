/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F1EA",
        ink: "#1A1814",
        mute: "#6E665B",
        rule: "#D9D2C4",
        signal: "#C2410C",
        accent: "#0F766E",
        warm: "#EFE7D7",
        deep: "#2D2A24",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        measure: "68ch",
      },
      letterSpacing: {
        kicker: "0.14em",
      },
    },
  },
  plugins: [],
};
