import * as React from "react";

export interface AccordionItem { title: React.ReactNode; content: React.ReactNode; }

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Allow more than one row open at a time. */
  allowMultiple?: boolean;
}

/**
 * Accordion — bordered rows with serif triggers and a rotating + glyph.
 * @dsCard group="Components"
 */
export declare function Accordion(props: AccordionProps): React.JSX.Element;
