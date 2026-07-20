import * as React from "react";

export interface WordmarkProps extends React.SVGProps<SVGSVGElement> {
  /** Rendered height in px; width follows the artwork's aspect ratio. Default 24. */
  height?: number;
  /** Accessible label. Default "Viola Ventures". */
  title?: string;
  /** Render only the animated "V" block-mark, without the wordmark text. */
  markOnly?: boolean;
}

/**
 * Viola Ventures logo lockup: the "V" block-mark (diagonal band slides on
 * hover) plus the wordmark. Inherits text color via currentColor.
 * @dsCard group="Components"
 */
export declare function Wordmark(props: WordmarkProps): React.JSX.Element;
