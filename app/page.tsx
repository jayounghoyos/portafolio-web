import Nav from "./components/ui/Nav";
import PaperGrain from "./components/ui/PaperGrain";
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
      <PaperGrain />

      <main className="bg-paper text-ink relative z-[2] min-h-screen">
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
