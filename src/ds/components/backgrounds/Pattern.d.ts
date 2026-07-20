import * as React from "react";

export type PatternPreset =
  | "lens-column"
  | "arc-banner"
  | "diamond-banner"
  | "side-cut"
  | "side-cut-mobile"
  | "horizontal-twin"
  | "side-arc-mobile"
  | "left-arc-mobile";

export type PatternColor = "blue" | "beige" | "coral" | "mint" | "tan" | "black";

export interface PatternFigure {
  shape: "circle" | "diamond";
  /** Diameter, in grid cells. */
  size: number;
  /** Centre offset from container centre, in grid cells. */
  x: number;
  y: number;
  /** Stripe phase inside the figure: "odd" inverts, "even" restores. */
  phase: "odd" | "even";
}

export interface PatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Named layout scanned from the brand site. Default "arc-banner". */
  preset?: PatternPreset;
  /** Override the preset's stripe accent (the other stripe is always black). */
  color?: PatternColor;
  /** Override the grid column count. */
  columns?: number;
  /** Override the grid row count (proportional presets only). */
  rows?: number;
  /** Fully replace the figure list for a custom composition. */
  figures?: PatternFigure[];
}

/** Preset configuration table, keyed by preset id. */
export declare const PATTERN_PRESETS: Record<PatternPreset, {
  label: string;
  orientation: "vertical" | "horizontal";
  proportional?: boolean;
  columns: number;
  rows?: number;
  color: PatternColor;
  figures: PatternFigure[];
}>;

/**
 * Decorative striped-inversion background pattern (arc / diamond / lens).
 * Absolute-fills its nearest positioned ancestor; proportional presets
 * self-size from their aspect ratio and flow in normal layout instead.
 */
export declare function Pattern(props: PatternProps): React.JSX.Element;
