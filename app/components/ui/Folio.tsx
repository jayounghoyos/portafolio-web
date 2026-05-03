type Props = {
  current: string;
  total?: string;
  label?: string;
  className?: string;
};

export default function Folio({ current, total, label, className = "" }: Props) {
  return (
    <span className={`folio inline-flex items-baseline gap-3 ${className}`}>
      <span className="text-accent">◆</span>
      <span>
        {current}
        {total ? <span className="opacity-50"> / {total}</span> : null}
      </span>
      {label ? <span className="opacity-60">— {label}</span> : null}
    </span>
  );
}
