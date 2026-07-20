import * as React from "react";

export interface RotatingWordProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Words to cycle through. */
  words?: string[];
  /** Ms each word holds before the next wipe. Default 4000. */
  interval?: number;
  /** Ms before the first wipe. Default 1500. */
  delay?: number;
}

/**
 * Rotating headline word with the brand left-to-right sweep-wipe.
 * @dsCard group="Components"
 */
export declare function RotatingWord(props: RotatingWordProps): React.JSX.Element;
