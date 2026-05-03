import Reveal from "../ui/Reveal";
import Folio from "../ui/Folio";
import { now, nowUpdated } from "../../lib/now";
import { issue } from "../../lib/issue";

export default function Now() {
  return (
    <section id="now" className="relative bg-paper overflow-hidden">
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="01" total={issue.contents.length.toString().padStart(2, "0")} label="CURRENTLY" />
          <span className="kicker">Last edit · {nowUpdated}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-20 lg:pb-32">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8">
          {/* Article opener — cols 1-7 */}
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 01</p>
            <h2 className="article-title">
              What I&apos;m{" "}
              <span className="text-accent-deep">building</span>,{" "}
              studying, and reading
              <span className="text-accent">.</span>
            </h2>
          </div>

          {/* Numeral on the right */}
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              01
            </span>
          </div>
        </div>

        <div className="hair-rule mt-12 lg:mt-16 mb-12 lg:mb-16" />

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {now.map((entry, i) => (
            <Reveal key={entry.label} delay={i * 70}>
              <div className="flex flex-col">
                <span className="font-serif italic text-2xl lg:text-3xl text-accent-deep mb-3">
                  &mdash; {String(i + 1).padStart(2, "0")}
                </span>
                <p className="kicker mb-4">{entry.label}</p>
                <p className="text-ink/90 text-[16px] leading-[1.7] text-pretty">
                  {entry.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
