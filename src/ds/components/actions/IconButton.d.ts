import * as React from "react";
import type { IconName } from "../foundations/Icon";

export interface IconButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Glyph name. Default "arrow-forward". */
  icon?: IconName;
  /** "outline" (default, fills on hover) or "filled". */
  variant?: "outline" | "filled";
  size?: "sm" | "md";
  href?: string;
  /** Accessible label (required for icon-only controls). */
  label?: string;
  disabled?: boolean;
}

/** Circular icon button — the round arrow control used across the site. */
export declare function IconButton(props: IconButtonProps): React.JSX.Element;
