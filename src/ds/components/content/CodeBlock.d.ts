import * as React from "react";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Source to render (Move/Rust-ish highlighting of keywords + comments). */
  code?: string;
  /** Optional mono label bar above the code. */
  label?: string;
  /** Dark rounded panel treatment. */
  panel?: boolean;
  /** Show a copy button in the bar. */
  copyable?: boolean;
}

/** Decorative Move code block used across hero / "Start Building" panels. */
export declare function CodeBlock(props: CodeBlockProps): React.JSX.Element;
