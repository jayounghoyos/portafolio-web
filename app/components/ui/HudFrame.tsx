"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  className?: string;
};

export default function HudFrame({
  children,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  className = "",
}: Props) {
  return (
    <div className={`hud-frame ${className}`}>
      <span className="hud-tr" aria-hidden />
      <span className="hud-bl" aria-hidden />

      {topLeft ? (
        <div className="absolute top-3 left-4 z-10 kicker pointer-events-none">
          {topLeft}
        </div>
      ) : null}
      {topRight ? (
        <div className="absolute top-3 right-4 z-10 kicker pointer-events-none">
          {topRight}
        </div>
      ) : null}
      {bottomLeft ? (
        <div className="absolute bottom-3 left-4 z-10 kicker pointer-events-none">
          {bottomLeft}
        </div>
      ) : null}
      {bottomRight ? (
        <div className="absolute bottom-3 right-4 z-10 kicker pointer-events-none">
          {bottomRight}
        </div>
      ) : null}

      {children}
    </div>
  );
}
