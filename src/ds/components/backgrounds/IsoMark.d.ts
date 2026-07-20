import * as React from "react";

export type IsoMarkName = "cyber" | "fintech" | "infrastructure" | "vertical" | "defense";

export interface IsoMarkProps extends React.SVGProps<SVGSVGElement> {
  /** Which sector solid to draw. */
  mark?: IsoMarkName;
  /** Staggered stroke-draw reveal on hover/focus. Default true. */
  draw?: boolean;
  /** Subtle 3D pointer-tilt. Default true. */
  tilt?: boolean;
  /** Breathing (opacity pulse) on the core edges. Default true. */
  breathe?: boolean;
  /** Ghost the hidden back edges at low opacity. Default true. */
  ghost?: boolean;
  /** Stroke width in the 200x200 viewBox. Default 1.4. */
  strokeWidth?: number;
  /** Accessible label. Defaults to the mark name. */
  title?: string;
}

/**
 * Isometric wireframe "sector mark" — line-art solids used to represent the
 * verticals Viola invests in, with draw-on-hover, tilt and breathe motion.
 * @dsCard group="Components"
 */
export declare function IsoMark(props: IsoMarkProps): React.JSX.Element;
