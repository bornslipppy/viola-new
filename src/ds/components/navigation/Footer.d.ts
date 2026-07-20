import * as React from "react";

export interface FooterColumn { heading: string; links: string[]; }

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  /** Social glyph names (Icon set). */
  socials?: string[];
  tagline?: string;
  /** Large serif closure line shown above the footer body. Empty by default (hidden); pass a string to show one. */
  signature?: string;
  /** Show the bottom legal + social row. Default true. */
  showBottom?: boolean;
}

/** Dark site footer with link columns, social row and legal line. */
export declare function Footer(props: FooterProps): React.JSX.Element;
