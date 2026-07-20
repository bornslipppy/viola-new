import * as React from "react";

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Top-level menu labels. */
  items?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Show the trailing pill CTA button. Default true. */
  showCta?: boolean;
  /** Translucent milky-glass pill with backdrop blur. Default false. */
  glass?: boolean;
  /** Shrink the pill to fit its contents instead of the 560px max. Default false. */
  fit?: boolean;
}

/**
 * Floating pill navigation bar — the site's primary header.
 * @dsCard group="Components"
 */
export declare function NavBar(props: NavBarProps): React.JSX.Element;
