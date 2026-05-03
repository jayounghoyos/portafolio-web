import Reveal from "../ui/Reveal";
import WorkCard from "../ui/WorkCard";
import Folio from "../ui/Folio";
import { selected } from "../../lib/projects";
import { issue } from "../../lib/issue";

export default function Work() {
  return (
    <section id="work" className="relative bg-paper overflow-hidden">
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="02" total={issue.contents.length.toString().padStart(2, "0")} label="SELECTED WORK" />
          <span className="kicker">{selected.length} entries · 2021–26</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-12 lg:pb-20">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-12 lg:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 02</p>
            <h2 className="article-title">
              Robots, models &amp;{" "}
              <span className="text-accent-deep">interfaces between them</span>.
            </h2>
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              02
            </span>
          </div>
        </div>

        {selected.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <WorkCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
