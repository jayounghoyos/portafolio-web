import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
import PaperGrain from "./components/ui/PaperGrain";
import MarqueeBand from "./components/ui/MarqueeBand";
import Marginalia from "./components/ui/Marginalia";
import Hero from "./components/sections/Hero";
import Now from "./components/sections/Now";
import Work from "./components/sections/Work";
import ChassisCaseStudy from "./components/sections/ChassisCaseStudy";
import Studies from "./components/sections/Studies";
import Experiments from "./components/sections/Experiments";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <PaperGrain />
      <Marginalia side="left">
        Portafolio · 2026 · Juan Andrés Young Hoyos · Medellín
      </Marginalia>
      <Marginalia side="right">
        Instrument Serif Italic · Inter · JetBrains Mono
      </Marginalia>

      <main className="bg-paper text-ink relative z-[2]">
        <Hero />

        <MarqueeBand
          variant="cream"
          items={[
            "Currently — building, studying, reading",
            "Article 01",
            "Updated May 2026",
          ]}
        />

        <Now />

        <MarqueeBand
          variant="ink"
          items={[
            "Selected Work — 2021 to 2026",
            "Article 02",
            "Robots · models · interfaces",
          ]}
        />

        <Work />

        <MarqueeBand
          variant="accent"
          items={[
            "Feature 03 — The Chassis",
            "From CAD to controller",
            "Drag · orbit · examine",
          ]}
        />

        <ChassisCaseStudy />

        <MarqueeBand
          variant="cream"
          items={[
            "Studies — learning out loud",
            "Article 04",
            "Smaller artifacts",
          ]}
        />

        <Studies />

        <MarqueeBand
          variant="cream"
          items={[
            "Experiments — filed for the record",
            "Article 05",
            "Weekend energy",
          ]}
          size="md"
        />

        <Experiments />

        <MarqueeBand
          variant="ink"
          items={[
            "Byline — about the editor",
            "Article 06",
            "Short version, long if asked",
          ]}
        />

        <About />

        <MarqueeBand
          variant="accent"
          items={[
            "Letter — to the editor",
            "Article 07",
            "Open · receiving briefs",
          ]}
        />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
