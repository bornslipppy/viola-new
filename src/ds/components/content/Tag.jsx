'use client';
import React from "react";

const CSS = `
.apt-tag{
  display:inline-flex; align-items:center; gap:6px;
  font-family:var(--font-mono); font-size:var(--text-2xs); text-transform:uppercase;
  letter-spacing:0.03em; line-height:1; padding:6px 10px; border-radius:var(--radius-full);
  border:1px solid var(--border); color:var(--inverted-100); background:transparent;
  white-space:nowrap;
}
.apt-tag--mint{ background:var(--accent-mint); color:var(--color-black); border-color:transparent; }
.apt-tag--blue{ background:var(--accent-blue); color:var(--color-black); border-color:transparent; }
.apt-tag--lime{ background:var(--accent-lime); color:var(--color-black); border-color:transparent; }
.apt-tag--solid{ background:var(--inverted-100); color:var(--surface-100); border-color:transparent; }
.apt-tag__dot{ width:6px; height:6px; border-radius:50%; background:currentColor; }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "tag");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Mono pill label / eyebrow chip. Use for status, categories, eyebrows. */
export function Tag({ children, variant = "outline", dot = false, className = "", ...rest }) {
  useStyle();
  const cls = [
    "apt-tag",
    variant !== "outline" ? `apt-tag--${variant}` : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="apt-tag__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
