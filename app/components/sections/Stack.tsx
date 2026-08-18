import Reveal from "../motion/Reveal";
import LogHeader from "../ui/LogHeader";
import { stack } from "../../lib/stack";

export default function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden">
      <LogHeader
        id="stack"
        title={
          <>
            Tools currently{" "}
            <span className="text-accent">mounted</span>.
          </>
        }
        meta="In order of how often I reach for them"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-16 lg:pb-24">
        <Reveal>
          <div className="border border-rule bg-panel">
            {stack.map((row, i) => (
              <div
                key={row.category}
                className="grid grid-cols-12 items-baseline border-b border-rule last:border-b-0"
              >
                <div className="col-span-3 lg:col-span-2 px-4 lg:px-6 py-5 lg:py-6 border-r border-rule">
                  <p className="font-mono uppercase text-[10px] tracking-[0.22em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="col-span-9 lg:col-span-3 px-4 lg:px-6 py-5 lg:py-6 lg:border-r border-rule">
                  <h3 className="font-serif italic text-2xl lg:text-3xl leading-[1.0] tracking-[-0.01em]">
                    {row.category}
                  </h3>
                </div>
                <div className="col-span-12 lg:col-span-7 px-4 lg:px-6 py-5 lg:py-6">
                  <p className="font-mono text-[13px] lg:text-[14px] text-dim leading-[1.7]">
                    {row.items.map((item, j) => (
                      <span key={item}>
                        {item}
                        {j < row.items.length - 1 && (
                          <span className="text-mute mx-3">·</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 kicker">
          ◆ Comfort across the stack varies — happy to go deep on any of these
          on request.
        </p>
      </div>
    </section>
  );
}
