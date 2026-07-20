import * as React from "react";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono field label. */
  label?: string;
  /** Helper / error text below the field. */
  hint?: string;
  error?: boolean;
  /** Render a <textarea> instead of <input>. */
  multiline?: boolean;
}

/**
 * Text input / textarea with mono label and hairline border.
 * @dsCard group="Components"
 */
export declare function TextField(props: TextFieldProps): React.JSX.Element;
