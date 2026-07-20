import * as React from "react";

export interface EdgeGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which edge the wash sits on. Default "right". */
  side?: "right" | "left" | "top" | "bottom";
  /** "lime" | "mint" | "blue", or any CSS color. Default "lime". */
  color?: string;
  /** Band thickness in px. Default 120. */
  size?: number;
}

/**
 * Accent gradient edge overlay — the recurring lime wash laid over grayscale
 * media. Place inside a position:relative container.
 * @dsCard group="Components"
 */
export declare function EdgeGlow(props: EdgeGlowProps): React.JSX.Element;
