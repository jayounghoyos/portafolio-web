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
          <Folio
            current="03"
            total={issue.contents.length.toString().padStart(2, "0")}
            label="SELECTED WORK"
          />
          <span className="kicker">{selected.length} entries · 2021–26</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 03</p>
            <h2 className="article-title">
              The work,{" "}
              <span className="text-accent-deep italic">
                filed as plates
              </span>
              .
            </h2>
            <p className="mt-5 text-base lg:text-lg text-ink/80 max-w-[54ch] leading-[1.55]">
              Each card is a working spec sheet — type, stage, stack, year.
              The featured plate is whatever I&apos;m currently shipping. The
              rest are filed in reverse-chronological order, more or less
              honestly.
            </p>
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              03
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-[minmax(0,auto)]">
          {selected.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <WorkCard project={p} index={i} big={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
