import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import StudyCard from "../ui/StudyCard";
import { studies } from "../../lib/projects";

export default function Studies() {
  return (
    <section id="studies" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="03"
          kicker="Studies"
          title={
            <>
              Smaller artifacts from{" "}
              <span className="italic text-signal">learning out loud</span>.
            </>
          }
          meta="Honest dating · lessons attached"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {studies.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <StudyCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
