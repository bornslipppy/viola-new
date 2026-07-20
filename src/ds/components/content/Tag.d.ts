import * as React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "solid" | "mint" | "blue" | "lime";
  /** Show a leading status dot. */
  dot?: boolean;
}

/** Mono pill label / eyebrow chip. */
export declare function Tag(props: TagProps): React.JSX.Element;
