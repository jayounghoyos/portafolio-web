import Reveal from "../ui/Reveal";
import StudyCard from "../ui/StudyCard";
import Folio from "../ui/Folio";
import { studies } from "../../lib/projects";
import { issue } from "../../lib/issue";

export default function Studies() {
  return (
    <section id="studies" className="relative bg-paper overflow-hidden">
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="06" total={issue.contents.length.toString().padStart(2, "0")} label="STUDIES" />
          <span className="kicker">Honest dating · lessons attached</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-10 lg:mb-16">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 06</p>
            <h2 className="article-title">
              Smaller artifacts from{" "}
              <span className="text-accent-deep">learning out loud</span>.
            </h2>
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              06
            </span>
          </div>
        </div>

        {studies.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <StudyCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
