import Reveal from "../motion/Reveal";
import LogHeader from "../ui/LogHeader";
import { experiments } from "../../lib/projects";

export default function Experiments() {
  return (
    <section id="experiments" className="relative overflow-hidden">
      <LogHeader
        id="experiments"
        title={
          <>
            Side quests,{" "}
            <span className="text-accent">filed for the record</span>.
          </>
        }
        meta="Weekend energy · archived"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-16 lg:pb-24">
        <ul className="border-t border-rule">
          {experiments.map((p, i) => {
            const link = p.href ?? p.repo;
            return (
              <Reveal as="li" key={p.id} delay={i * 50}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="Open repo"
                  className="cursor-grow group grid grid-cols-12 gap-x-4 items-baseline py-5 border-b border-rule"
                >
                  <span className="col-span-2 lg:col-span-1 font-serif italic text-2xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 lg:col-span-5 font-serif italic text-2xl lg:text-3xl text-ink group-hover:text-accent transition-colors">
                    {p.title}
                  </span>
                  <span className="col-span-12 lg:col-span-4 text-sm text-dim text-pretty mt-2 lg:mt-0">
                    {p.blurb}
                  </span>
                  <span className="col-span-12 lg:col-span-2 lg:text-right kicker">
                    [ {p.year} ] &middot; ↗
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
