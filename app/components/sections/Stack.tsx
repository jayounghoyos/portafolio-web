import Reveal from "../ui/Reveal";
import Folio from "../ui/Folio";
import { stack } from "../../lib/stack";
import { issue } from "../../lib/issue";

export default function Stack() {
  return (
    <section id="stack" className="relative bg-paper overflow-hidden">
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio
            current="04"
            total={issue.contents.length.toString().padStart(2, "0")}
            label="THE TOOLBOX"
          />
          <span className="kicker">In order of how often I reach for them</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-10 lg:mb-14">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 04</p>
            <h2 className="article-title">
              Tools, in{" "}
              <span className="italic text-accent-deep">order</span> of how
              often I reach for them.
            </h2>
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              04
            </span>
          </div>
        </div>

        <Reveal>
          <div className="border border-rule bg-paper">
            {stack.map((row, i) => (
              <div
                key={row.category}
                className="grid grid-cols-12 items-baseline border-b border-rule last:border-b-0"
              >
                <div className="col-span-3 lg:col-span-2 px-4 lg:px-6 py-5 lg:py-6 border-r border-rule">
                  <p className="font-mono uppercase text-[10px] tracking-[0.22em] text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="col-span-9 lg:col-span-3 px-4 lg:px-6 py-5 lg:py-6 border-r border-rule">
                  <h3 className="font-serif italic text-2xl lg:text-3xl leading-[1.0] tracking-[-0.01em]">
                    {row.category}
                  </h3>
                </div>
                <div className="col-span-12 lg:col-span-7 px-4 lg:px-6 py-5 lg:py-6 lg:border-l border-rule">
                  <p className="font-mono text-[13px] lg:text-[14px] text-ink leading-[1.7]">
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

        {/* Footer caption */}
        <p className="mt-6 kicker text-mute">
          ◆ Comfort across the stack varies — happy to go deep on any of these
          on request.
        </p>
      </div>
    </section>
  );
}
