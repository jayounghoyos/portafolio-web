import Footer from "./components/ui/Footer";
import PaperGrain from "./components/ui/PaperGrain";
import FeatureTree from "./components/ui/FeatureTree";
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
      <FeatureTree />
      <PaperGrain />

      <main className="lg:ml-[260px] bg-paper text-ink relative z-[2] min-h-screen">
        <Hero />
        <Now />
        <Work />
        <ChassisCaseStudy />
        <Studies />
        <Experiments />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
