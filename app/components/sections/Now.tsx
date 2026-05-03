import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { now, nowUpdated } from "../../lib/now";

export default function Now() {
  return (
    <section id="now" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="01"
          kicker="Currently"
          title={
            <>
              What I&apos;m{" "}
              <span className="italic text-signal">building</span>,{" "}
              <span className="italic text-signal">studying</span>, and{" "}
              <span className="italic text-signal">reading</span>.
            </>
          }
          meta={`Last edit · ${nowUpdated}`}
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {now.map((entry, i) => (
            <Reveal key={entry.label} delay={i * 80} as="div">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-signal text-[10px]">◆</span>
                <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-ink">
                  {String(i + 1).padStart(2, "0")} &nbsp;/&nbsp; {entry.label}
                </p>
              </div>
              <p className="text-ink/90 text-[16px] leading-[1.7] text-pretty">
                {entry.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
