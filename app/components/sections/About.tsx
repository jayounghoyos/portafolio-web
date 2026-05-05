import Reveal from "../ui/Reveal";
import Folio from "../ui/Folio";
import DropCap from "../ui/DropCap";
import { education, coursework, awards } from "../../lib/cv";
import { issue } from "../../lib/issue";

export default function About() {
  return (
    <section id="about" className="relative bg-paper overflow-hidden">
      <div className="border-y border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="01" total={issue.contents.length.toString().padStart(2, "0")} label="BYLINE" />
          <span className="kicker">About the editor</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-12 lg:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 01 · Byline</p>
            <h2 className="article-title">
              A short version, until the
              <br />
              <span className="text-accent-deep">long version</span> is asked for.
            </h2>
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              01
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8">
          <Reveal className="col-span-12 lg:col-span-7">
            <DropCap className="text-[17px] leading-[1.75] text-ink/90 max-w-[60ch] text-pretty">
              I&apos;m a Systems Engineering student at EAFIT University,
              working at the intersection of machine learning and robotics.
              Most of what I build starts as a question — usually about how
              a physical thing should behave — and ends as code, a circuit,
              or something that rolls.
            </DropCap>
            <p className="mt-6 text-[17px] leading-[1.75] text-ink/90 max-w-[60ch] text-pretty">
              I came up through robotics competitions, picked up classical ML
              on the side, and now spend most of my time on deep learning,
              control, and the full-stack glue that makes a model actually
              useful to someone other than me.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-ink/90 max-w-[60ch] text-pretty italic">
              I learn loudly. Notes turn into experiments, experiments turn
              into projects, and the projects on this page are the ones I
              still stand behind.
            </p>
            <a
              href="#contact"
              data-cursor-label="Get in touch"
              className="cursor-grow mt-10 inline-flex items-center gap-3 px-5 py-3 border border-ink hover:bg-ink hover:text-paper transition-colors font-mono uppercase text-[11px] tracking-[0.22em]"
            >
              Letter to the editor
              <span className="font-serif italic text-xl">↗</span>
            </a>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-5 mt-12 lg:mt-0" delay={120}>
            <dl className="space-y-10">
              <div>
                <p className="kicker mb-3">Education</p>
                <ul className="space-y-3 border-t border-rule pt-4">
                  {education.map((e) => (
                    <li key={e.school}>
                      <p className="font-serif italic text-2xl">{e.school}</p>
                      <p className="text-sm text-ink/75 mt-0.5">
                        {e.detail} — {e.location}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="kicker mb-3">Selected Coursework</p>
                <ul className="border-t border-rule">
                  {coursework.map((c, i) => (
                    <li
                      key={c}
                      className="flex items-baseline gap-4 py-2 border-b border-rule"
                    >
                      <span className="font-mono text-mute text-[10px] w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink/90">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="kicker mb-3">Awards</p>
                <ul className="border-t border-rule">
                  {awards.map((a, i) => (
                    <li
                      key={a}
                      className="flex items-baseline gap-4 py-2 border-b border-rule"
                    >
                      <span className="font-mono text-mute text-[10px] w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink/90 italic">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
