import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { education, coursework, awards, cvPdfPath } from "../../lib/cv";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative border-t border-rule">
      <div className="absolute inset-0 bg-grid-dotted opacity-50 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="05"
          kicker="About"
          title={
            <>
              A short version, until the
              <br />
              <span className="italic text-signal">long version is asked for</span>.
            </>
          }
          meta="Personal · 2026"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-5 text-[17px] leading-[1.75] text-ink/90 max-w-measure text-pretty">
              <p>
                I&apos;m a Systems Engineering student at EAFIT University,
                working at the intersection of machine learning and robotics.
                Most of what I build starts as a question — usually about how
                a physical thing should behave — and ends as code, a circuit,
                or something that rolls.
              </p>
              <p>
                I came up through robotics competitions, picked up classical
                ML on the side, and now spend most of my time on deep
                learning, control, and the full-stack glue that makes a model
                actually useful to someone other than me.
              </p>
              <p>
                I learn loudly. Notes turn into experiments, experiments turn
                into projects, and the projects on this page are the ones I
                still stand behind.
              </p>
            </div>
            <a
              href={cvPdfPath}
              className="mt-8 inline-flex items-center gap-2 font-mono uppercase text-[11px] tracking-[0.22em] text-ink hover:text-signal"
            >
              <span aria-hidden>↗</span> Download CV (PDF)
            </a>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <dl className="space-y-10">
              <div>
                <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute mb-3">
                  ◆ Education
                </p>
                <ul className="space-y-3">
                  {education.map((e) => (
                    <li key={e.school}>
                      <p className="font-serif text-xl">{e.school}</p>
                      <p className="text-sm text-ink/75 mt-0.5">
                        {e.detail} — {e.location}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute mb-3">
                  ◆ Selected Coursework
                </p>
                <ul className="space-y-1.5 text-ink/85">
                  {coursework.map((c, i) => (
                    <li key={c} className="flex items-baseline gap-3">
                      <span className="font-mono text-mute text-[10px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute mb-3">
                  ◆ Awards
                </p>
                <ul className="space-y-1.5 text-ink/85">
                  {awards.map((a, i) => (
                    <li key={a} className="flex items-baseline gap-3">
                      <span className="font-mono text-mute text-[10px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{a}</span>
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
