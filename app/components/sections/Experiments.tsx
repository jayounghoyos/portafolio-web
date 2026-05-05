import Reveal from "../ui/Reveal";
import Folio from "../ui/Folio";
import { experiments } from "../../lib/projects";
import { issue } from "../../lib/issue";

export default function Experiments() {
  return (
    <section id="experiments" className="relative bg-paper overflow-hidden">
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="07" total={issue.contents.length.toString().padStart(2, "0")} label="EXPERIMENTS" />
          <span className="kicker">Weekend energy · filed</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-10 lg:mb-16">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 07</p>
            <h2 className="article-title">
              Curiosity, <span className="text-accent-deep">filed for the record</span>.
            </h2>
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              07
            </span>
          </div>
        </div>

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
                  <span className="col-span-2 lg:col-span-1 font-serif italic text-2xl text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 lg:col-span-5 font-serif italic text-2xl lg:text-3xl group-hover:text-accent-deep transition-colors">
                    {p.title}
                  </span>
                  <span className="col-span-12 lg:col-span-4 text-sm text-ink/75 text-pretty mt-2 lg:mt-0">
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
