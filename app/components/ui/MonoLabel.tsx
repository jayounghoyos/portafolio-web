import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function MonoLabel({ children, className = "" }: Props) {
  return <span className={`kicker ${className}`}>{children}</span>;
}
