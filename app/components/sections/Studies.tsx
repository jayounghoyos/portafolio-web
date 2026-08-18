import Reveal from "../motion/Reveal";
import StudyCard from "../ui/StudyCard";
import LogHeader from "../ui/LogHeader";
import { studies } from "../../lib/projects";

export default function Studies() {
  return (
    <section id="studies" className="relative overflow-hidden">
      <LogHeader
        id="studies"
        title={
          <>
            Training runs,{" "}
            <span className="text-accent">lessons attached</span>.
          </>
        }
        meta="Honest dating · loss curves included"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="border-t border-rule">
          {studies.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <StudyCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
