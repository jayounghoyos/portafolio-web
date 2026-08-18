import Nav from "./components/ui/Nav";
import TelemetryRail from "./components/ui/TelemetryRail";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Now from "./components/sections/Now";
import Work from "./components/sections/Work";
import Stack from "./components/sections/Stack";
import ChassisCaseStudy from "./components/sections/ChassisCaseStudy";
import Studies from "./components/sections/Studies";
import Experiments from "./components/sections/Experiments";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <TelemetryRail />

      <main className="relative min-h-screen lg:pl-14">
        <Hero />
        <About />
        <Now />
        <Work />
        <Stack />
        <ChassisCaseStudy />
        <Studies />
        <Experiments />
        <Contact />
      </main>
    </>
  );
}
