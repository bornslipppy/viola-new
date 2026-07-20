import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono eyebrow above the title. */
  eyebrow?: string;
  /** Serif title. */
  title?: React.ReactNode;
  /** Body copy. */
  description?: React.ReactNode;
  /** Media / illustration slot (rendered between copy and link). */
  children?: React.ReactNode;
  href?: string;
  /** Mono footer link label with circular arrow. */
  linkLabel?: string;
  /** Surface treatment. */
  variant?: "light" | "dark" | "fill-mint" | "fill-blue" | "fill-lime";
}

/**
 * Editorial content card. The dark variant is the site's use-case card.
 * @dsCard group="Components"
 * @startingPoint section="Content" subtitle="Use-case & editorial cards" viewport="760x360"
 */
export declare function Card(props: CardProps): React.JSX.Element;
