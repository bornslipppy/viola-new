'use client';
import React from "react";

const CSS = `
.apt-stat{ display:flex; flex-direction:column; gap:8px; }
.apt-stat__value{
  font-family:var(--font-serif); font-weight:400; line-height:0.95;
  letter-spacing:-0.03em; font-size:var(--text-5xl); color:var(--inverted-100);
}
.apt-stat__label{
  font-family:var(--font-mono); font-size:var(--text-xs); text-transform:uppercase;
  letter-spacing:0.03em; color:var(--text-secondary);
}
.apt-stat__desc{ font-family:var(--font-sans); font-size:var(--text-sm); color:var(--text-secondary); max-width:32ch; }
.apt-stat--sm .apt-stat__value{ font-size:var(--text-3xl); }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "stat");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Big serif metric + mono label — the site's stat/figure block. */
export function StatBlock({ value, label, description, size = "md", className = "", ...rest }) {
  useStyle();
  const cls = ["apt-stat", size === "sm" ? "apt-stat--sm" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="apt-stat__value">{value}</div>
      {label ? <div className="apt-stat__label">{label}</div> : null}
      {description ? <div className="apt-stat__desc">{description}</div> : null}
    </div>
  );
}
