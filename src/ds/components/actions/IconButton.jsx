'use client';
import React from "react";
import { Icon } from "../foundations/Icon.jsx";

const CSS = `
.apt-iconbtn{
  position:relative; overflow:hidden; isolation:isolate;
  display:inline-flex; align-items:center; justify-content:center;
  width:45px; height:45px; border-radius:var(--radius-full);
  border:1px solid var(--border); background:transparent; color:var(--inverted-100);
  cursor:pointer; transition:color var(--duration-fast) var(--ease-in-out);
  flex-shrink:0;
}
.apt-iconbtn__sweep{
  position:absolute; inset:0; z-index:-1; border-radius:inherit;
  transform:scaleX(0); transform-origin:right center;
  transition:transform var(--duration-fast) var(--ease-in-out);
  background:var(--accent-blue);
}
/* Same signature sweep as Button: lime in (slower), blue retract (faster). */
.apt-iconbtn:hover .apt-iconbtn__sweep{
  transform:scaleX(1); transform-origin:left center;
  background:var(--accent-lime); transition:transform var(--duration-base) var(--ease-in-out);
}
.apt-iconbtn:hover{ color:var(--color-black); }
.apt-iconbtn:focus-visible{ outline:2px solid var(--inverted-100); outline-offset:2px; }
.apt-iconbtn--filled{ background:var(--inverted-100); color:var(--surface-100); border-color:transparent; }
.apt-iconbtn--sm{ width:36px; height:36px; }
.apt-iconbtn[aria-disabled="true"]{
  background:color-mix(in oklab,var(--inverted-100) 12%,transparent);
  color:var(--text-muted); border-color:transparent; pointer-events:none;
}
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "iconbutton");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Circular icon button — the round arrow control used across the site
 * (nav, cards, "back to top"). Fills with the sweep on hover.
 */
export function IconButton({
  icon = "arrow-forward",
  variant = "outline",
  size = "md",
  href,
  label,
  disabled = false,
  className = "",
  ...rest
}) {
  useStyle();
  const Tag = href ? "a" : "button";
  const cls = [
    "apt-iconbtn",
    variant === "filled" ? "apt-iconbtn--filled" : "",
    size === "sm" ? "apt-iconbtn--sm" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <Tag
      className={cls}
      href={href}
      aria-label={label}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className="apt-iconbtn__sweep" aria-hidden="true" />
      <Icon name={icon} size={size === "sm" ? 14 : 15} />
    </Tag>
  );
}
