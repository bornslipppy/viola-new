import * as React from "react";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  /** "serif" (large editorial) or "mono" (small uppercase ticker). */
  variant?: "serif" | "mono";
  /** Full loop duration in seconds. */
  speed?: number;
  gap?: number;
  /** Character between items ("—" default; pass "" to omit). */
  separator?: string;
}

/** Infinite horizontal marquee — scrolling ticker / logo wall. */
export declare function Marquee(props: MarqueeProps): React.JSX.Element;
