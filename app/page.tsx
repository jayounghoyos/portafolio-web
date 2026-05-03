import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
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
      <main className="bg-paper text-ink">
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
