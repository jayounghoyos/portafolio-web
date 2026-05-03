import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function DropCap({ children, className = "" }: Props) {
  return <p className={`dropcap ${className}`}>{children}</p>;
}
