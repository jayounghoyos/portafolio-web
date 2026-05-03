import type { ReactNode } from "react";

type Props = {
  index: string;
  kicker: string;
  title: ReactNode;
  meta?: string;
  description?: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  watermark?: boolean;
};

export default function SectionHeader({
  index,
  kicker,
  title,
  meta,
  description,
  variant = "light",
  className = "",
  watermark = true,
}: Props) {
  return (
    <header className={`relative flex flex-col ${className}`}>
      {watermark ? (
        <span
          className="watermark-num"
          style={{ right: "-0.5rem", top: "-3rem" }}
          aria-hidden
        >
          {index}
        </span>
      ) : null}

      <div className="relative flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span
            className={`font-mono text-xs ${
              variant === "dark" ? "text-warm/70" : "text-mute"
            }`}
          >
            §
          </span>
          <span
            className={`font-mono uppercase text-[11px] tracking-[0.22em] ${
              variant === "dark" ? "text-warm" : "text-ink"
            }`}
          >
            {index} &nbsp;/&nbsp; {kicker}
          </span>
        </div>
        {meta ? (
          <span
            className={`font-mono uppercase text-[11px] tracking-[0.22em] ${
              variant === "dark" ? "text-warm/60" : "text-mute"
            }`}
          >
            {meta}
          </span>
        ) : null}
      </div>

      <h2 className="relative display-lg text-balance max-w-measure mt-6">
        {title}
      </h2>

      {description ? (
        <p
          className={`relative mt-5 max-w-measure text-pretty leading-[1.65] ${
            variant === "dark" ? "text-warm/85" : "text-ink/80"
          }`}
        >
          {description}
        </p>
      ) : null}

      <div className="relative datum-line mt-8" aria-hidden />
    </header>
  );
}
