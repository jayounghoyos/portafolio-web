import Reveal from "../motion/Reveal";
import WorkCard from "../ui/WorkCard";
import LogHeader from "../ui/LogHeader";
import { selected } from "../../lib/projects";

export default function Work() {
  return (
    <section id="work" className="relative overflow-hidden">
      <LogHeader
        id="work"
        title={
          <>
            Objects <span className="text-accent">detected</span>{" "}
            in the field.
          </>
        }
        lede={
          <>
            Everything the sensor flagged in the hero lives here, on file:
            type, stage, stack, year. The primary target is whatever is
            currently shipping; the rest are logged in the order they were
            sighted.
          </>
        }
        meta={`${selected.length} objects · 2021–24`}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-16 lg:pb-24">
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
