import type { ReactNode } from "react";
import { logEntry } from "../../lib/log";

type Props = {
  /** Section id from the log registry (also the anchor id). */
  id: string;
  /** Display title — may contain accent spans. */
  title: ReactNode;
  /** Optional intro paragraph under the title. */
  lede?: ReactNode;
  /** Right-hand label in the marker strip. */
  meta?: ReactNode;
};

/**
 * Shared section opener: marker strip (`◆ LOG 03 / 08 — OBJECTS`),
 * serif display title, oversized entry numeral.
 */
export default function LogHeader({ id, title, lede, meta }: Props) {
  const entry = logEntry(id);

  return (
    <>
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between gap-4">
          <span className="log-marker inline-flex items-baseline gap-3">
            <span className="text-accent" aria-hidden>◆</span>
            <span>
              LOG {entry.num}
              <span className="opacity-50"> / {entry.total}</span>
            </span>
            <span className="opacity-60">— {entry.code}</span>
          </span>
          {meta ? <span className="kicker text-right">{meta}</span> : null}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-10 lg:pb-16">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">
              Entry {entry.num} · {entry.title}
            </p>
            <h2 className="article-title" data-split-title>
              {title}
            </h2>
            {lede ? (
              <p className="mt-5 text-base lg:text-lg text-dim max-w-[54ch] leading-[1.55] text-pretty">
                {lede}
              </p>
            ) : null}
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span
              aria-hidden
              className="entry-numeral font-serif italic text-[clamp(6rem,12vw,11rem)] leading-[0.85] select-none"
            >
              {entry.num}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
