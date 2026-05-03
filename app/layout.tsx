import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Andrés Young Hoyos — ML & Robotics Engineer",
  description:
    "Engineering student at EAFIT building physical machines that learn — robotics, machine learning, and the systems around them.",
  metadataBase: new URL("https://jayoungh.dev"),
  openGraph: {
    title: "Juan Andrés Young Hoyos — ML & Robotics Engineer",
    description:
      "Robotics, machine learning, and the systems around them.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Andrés Young Hoyos",
    description: "ML & Robotics Engineer",
  },
};

import CustomCursor from "./components/ui/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
