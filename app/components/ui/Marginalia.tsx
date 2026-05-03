type Props = {
  side?: "left" | "right";
  children: React.ReactNode;
  position?: "fixed" | "absolute";
};

export default function Marginalia({
  side = "left",
  children,
  position = "fixed",
}: Props) {
  const sideClass =
    side === "left"
      ? "left-3 lg:left-5"
      : "right-3 lg:right-5";
  const posClass = position === "fixed" ? "fixed" : "absolute";
  return (
    <div
      className={`hidden lg:block ${posClass} top-1/2 ${sideClass} -translate-y-1/2 z-30 pointer-events-none`}
      aria-hidden
    >
      <span className="marginalia">{children}</span>
    </div>
  );
}
