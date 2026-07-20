import * as React from "react";

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The metric (e.g. "160ms", "$2.1B"). */
  value: React.ReactNode;
  /** Mono caption under the figure. */
  label?: string;
  description?: string;
  size?: "sm" | "md";
}

/** Big serif metric + mono label — the site's stat/figure block. */
export declare function StatBlock(props: StatBlockProps): React.JSX.Element;
