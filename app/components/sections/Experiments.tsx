import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { experiments } from "../../lib/projects";
import { ArrowUpRight } from "lucide-react";

export default function Experiments() {
  return (
    <section id="experiments" className="py-24 lg:py-32 relative">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="04"
          kicker="Experiments"
          title={
            <>
              Curiosity, <span className="italic text-signal">filed for the record</span>.
            </>
          }
          meta="Weekend energy"
        />

        <ul className="mt-12 divide-y divide-rule border-y border-rule">
          {experiments.map((p, i) => {
            const link = p.href ?? p.repo;
            return (
              <Reveal as="li" key={p.id} delay={i * 60}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-12 gap-4 items-baseline py-5 hover:bg-warm/40 transition-colors px-2 -mx-2"
                >
                  <span className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute col-span-2">
                    [ {p.year} ]
                  </span>
                  <span className="font-serif text-xl col-span-12 sm:col-span-5 group-hover:text-signal transition-colors flex items-start gap-2">
                    <span className="text-signal mt-1.5 text-[10px]">◆</span>
                    {p.title}
                  </span>
                  <span className="col-span-12 sm:col-span-4 text-sm text-ink/75 text-pretty">
                    {p.blurb}
                  </span>
                  <span className="col-span-12 sm:col-span-1 sm:justify-self-end">
                    <ArrowUpRight
                      size={16}
                      className="text-mute group-hover:text-signal transition-colors"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
