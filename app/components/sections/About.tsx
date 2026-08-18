import Reveal from "../motion/Reveal";
import LogHeader from "../ui/LogHeader";
import { education, coursework, awards } from "../../lib/cv";
import { operator } from "../../lib/log";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <LogHeader
        id="about"
        title={
          <>
            The <span className="text-accent">operator</span>,
            <br />
            on file.
          </>
        }
        meta="Personnel record · declassified"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12">
          {/* Narrative — on the console */}
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="text-[17px] leading-[1.75] text-ink/90 max-w-[60ch] text-pretty">
              I&apos;m a Systems Engineering student at EAFIT University,
              working at the intersection of machine learning and robotics.
              Most of what I build starts as a question — usually about how a
              physical thing should behave — and ends as code, a circuit, or
              something that rolls.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-dim max-w-[60ch] text-pretty">
              I came up through robotics competitions, picked up classical ML
              on the side, and now spend most of my time on deep learning,
              control, and the full-stack glue that makes a model actually
              useful to someone other than me.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-dim max-w-[60ch] text-pretty italic">
              I learn loudly. Notes turn into experiments, experiments turn
              into projects, and the projects in this log are the ones I still
              stand behind.
            </p>
            <a
              href="#contact"
              data-cursor-label="Open channel"
              className="cursor-grow mt-10 inline-flex items-center gap-3 px-5 py-3 border border-ink/60 text-ink hover:bg-accent hover:border-accent hover:text-paper-ink transition-colors font-mono uppercase text-[11px] tracking-[0.22em]"
            >
              Open the uplink
              <span className="font-serif italic text-xl">↗</span>
            </a>
          </Reveal>

          {/* Personnel dossier — same console surface as the rest of the log */}
          <Reveal className="col-span-12 lg:col-span-5" delay={120}>
            <div className="border border-rule bg-panel shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="flex items-baseline justify-between px-5 py-3 border-b border-rule bg-panel-2">
                <span className="log-marker"><span className="text-accent">◆</span> PERSONNEL FILE</span>
                <span className="kicker">{operator.callsign} · {operator.updated}</span>
              </div>

              <div className="px-5 py-6 space-y-8">
                <div>
                  <p className="kicker mb-3">Education</p>
                  <ul className="space-y-3 border-t border-rule pt-4">
                    {education.map((e) => (
                      <li key={e.school}>
                        <p className="font-serif italic text-2xl text-ink">{e.school}</p>
                        <p className="text-sm text-dim mt-0.5">
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
                        <span className="font-mono text-[10px] w-6 text-mute">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] text-dim">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="kicker mb-3">Field Awards</p>
                  <ul className="border-t border-rule">
                    {awards.map((a, i) => (
                      <li
                        key={a}
                        className="flex items-baseline gap-4 py-2 border-b border-rule"
                      >
                        <span className="font-mono text-[10px] w-6 text-mute">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] italic text-dim">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="kicker pt-2">
                  {operator.city} · {operator.coordinates}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
