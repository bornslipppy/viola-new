import * as React from "react";

export type SegOption = string | { value: string; label: string };

export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  options: SegOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

/** Segmented control / toggle group — pill container of mono options. */
export declare function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;
