import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import WorkCard from "../ui/WorkCard";
import { selected } from "../../lib/projects";

export default function Work() {
  return (
    <section id="work" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dotted opacity-50 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="02"
          kicker="Selected Work"
          title={
            <>
              Robots, models, and the
              <br />
              <span className="italic text-signal">interfaces between them</span>.
            </>
          }
          meta={`${selected.length} entries · 2021–26`}
        />

        <div className="mt-12">
          {selected.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <WorkCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
