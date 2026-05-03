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
        ink: "#16130E",
        deep: "#16130E",
        mute: "#6E665B",
        rule: "#D9D2C4",
        accent: "#C8D958",
        "accent-soft": "#DDE890",
        "accent-deep": "#9CAB3F",
        warm: "#EFE7D7",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        measure: "62ch",
      },
      letterSpacing: {
        kicker: "0.18em",
        "kicker-wide": "0.32em",
      },
    },
  },
  plugins: [],
};
