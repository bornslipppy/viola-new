'use client';
import React from "react";

const CSS = `
.apt-seg{
  display:inline-flex; padding:4px; gap:2px; background:var(--surface-200);
  border:1px solid var(--border); border-radius:var(--radius-full);
}
.apt-seg__opt{
  appearance:none; border:0; cursor:pointer; background:transparent;
  padding:8px 18px; border-radius:var(--radius-full);
  font-family:var(--font-mono); font-size:var(--text-xs); text-transform:uppercase;
  letter-spacing:0.03em; color:var(--text-secondary);
  transition:background var(--duration-fast) var(--ease-in-out), color var(--duration-fast) var(--ease-in-out);
}
.apt-seg__opt:hover{ color:var(--inverted-100); }
.apt-seg__opt[aria-selected="true"]{ background:var(--inverted-100); color:var(--surface-100); }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "seg");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Segmented control / toggle group — pill container of mono options. */
export function SegmentedControl({ options = [], value, defaultValue, onChange, className = "", ...rest }) {
  useStyle();
  const [internal, setInternal] = React.useState(defaultValue ?? (options[0] && (options[0].value ?? options[0])));
  const current = value !== undefined ? value : internal;
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div className={["apt-seg", className].filter(Boolean).join(" ")} role="tablist" {...rest}>
      {opts.map((o) => (
        <button
          key={o.value}
          role="tab"
          type="button"
          className="apt-seg__opt"
          aria-selected={current === o.value}
          onClick={() => { if (value === undefined) setInternal(o.value); onChange && onChange(o.value); }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
