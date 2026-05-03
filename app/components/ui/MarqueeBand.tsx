type Props = {
  items: string[];
  variant?: "ink" | "accent" | "cream";
  size?: "md" | "lg";
};

export default function MarqueeBand({
  items,
  variant = "cream",
  size = "lg",
}: Props) {
  const trackItems = [...items, ...items];
  const surface =
    variant === "ink"
      ? "panel-deep border-y border-warm/15"
      : variant === "accent"
      ? "panel-accent border-y border-ink/15"
      : "bg-paper border-y border-rule";

  const fontSize =
    size === "lg"
      ? "text-[clamp(2.5rem,6vw,5rem)]"
      : "text-[clamp(1.4rem,3vw,2.4rem)]";

  return (
    <div className={`marquee w-full ${surface} py-3 lg:py-5`}>
      <div
        className={`marquee-track font-serif italic ${fontSize} leading-none`}
      >
        {trackItems.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6">
            <span className="text-ink/85">{item}</span>
            <span aria-hidden className="text-accent text-[0.55em] -translate-y-[0.15em]">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
