import Reveal from "../motion/Reveal";
import LogHeader from "../ui/LogHeader";
import { now, nowUpdated } from "../../lib/now";

export default function Now() {
  return (
    <section id="now" className="relative overflow-hidden">
      <LogHeader
        id="now"
        title={
          <>
            Processes currently{" "}
            <span className="text-accent">running</span>.
          </>
        }
        meta={`Last checkpoint · ${nowUpdated}`}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-20 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {now.map((entry, i) => (
            <Reveal key={entry.label} delay={i * 70}>
              <article className="h-full border border-rule bg-panel p-6 lg:p-7 flex flex-col">
                <p className="font-mono uppercase text-[10px] tracking-[0.22em] text-accent mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent ambient-pulse" />
                  PROC {String(i + 1).padStart(2, "0")} · RUNNING
                </p>
                <h3 className="font-serif italic text-2xl lg:text-3xl leading-[1.05] mb-4">
                  {entry.label}
                </h3>
                <p className="text-dim text-[15px] leading-[1.7] text-pretty">
                  {entry.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
