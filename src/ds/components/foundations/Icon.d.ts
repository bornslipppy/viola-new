import * as React from "react";

export type IconName =
  | "arrow-forward" | "arrow-back" | "arrow-outward" | "arrow-downward" | "arrow-upward"
  | "keyboard-arrow-down" | "keyboard-arrow-up" | "close" | "check"
  | "menu" | "search" | "add-2" | "remove" | "download" | "terminal"
  | "copy" | "ios-share" | "location-on" | "lock"
  | "discord" | "github" | "x" | "youtube" | "linkedin" | "telegram";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Glyph name from the icon sprite set. */
  name: IconName;
  /** Square size in px. Default 20. */
  size?: number;
  className?: string;
}

/** Icon — Material-Symbols line glyphs + brand social marks. */
export declare function Icon(props: IconProps): React.JSX.Element | null;

export declare const ICONS: Record<string, string | { box: string; path: string }>;
