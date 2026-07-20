import * as React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. Default "primary". */
  variant?: "primary" | "secondary" | "ghost";
  /** Control height. Default "md" (45px). */
  size?: "sm" | "md" | "lg";
  /** Render as a link to this URL instead of a <button>. */
  href?: string;
  /** Optional leading icon (or the glyph in the trailing circle). */
  icon?: string;
  /** Show a trailing circular icon badge (the "learn more →" pattern). */
  trailingCircle?: boolean;
  disabled?: boolean;
}

/**
 * Pill button with the signature left-to-right hover sweep.
 * @dsCard group="Components"
 * @startingPoint section="Actions" subtitle="Pill buttons + circular icon actions" viewport="700x220"
 */
export declare function Button(props: ButtonProps): React.JSX.Element;
