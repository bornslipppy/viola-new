'use client';
import React from "react";

const CSS = `
.apt-field{ display:flex; flex-direction:column; gap:8px; font-family:var(--font-sans); }
.apt-field__label{
  font-family:var(--font-mono); font-size:var(--text-2xs); text-transform:uppercase;
  letter-spacing:0.03em; color:var(--text-secondary);
}
.apt-field__input{
  width:100%; height:48px; padding:0 16px; font-family:var(--font-sans); font-size:var(--text-base);
  color:var(--inverted-100); background:var(--surface-100);
  border:1px solid var(--border); border-radius:var(--radius-sm);
  transition:border-color var(--duration-fast) var(--ease-in-out);
}
.apt-field__input::placeholder{ color:var(--text-muted); }
.apt-field__input:focus{ outline:none; border-color:var(--inverted-100); }
textarea.apt-field__input{ height:auto; min-height:110px; padding:12px 16px; resize:vertical; line-height:1.5; }
.apt-field--error .apt-field__input{ border-color:var(--color-error); }
.apt-field__hint{ font-size:var(--text-xs); color:var(--text-muted); }
.apt-field--error .apt-field__hint{ color:var(--color-error); }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "field");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Text input / textarea with mono label and hairline border. */
export function TextField({
  label, hint, error = false, multiline = false, id, className = "", ...rest
}) {
  useStyle();
  const fieldId = id || `f-${Math.random().toString(36).slice(2, 8)}`;
  const cls = ["apt-field", error ? "apt-field--error" : "", className].filter(Boolean).join(" ");
  const Input = multiline ? "textarea" : "input";
  return (
    <div className={cls}>
      {label ? <label className="apt-field__label" htmlFor={fieldId}>{label}</label> : null}
      <Input id={fieldId} className="apt-field__input" {...rest} />
      {hint ? <span className="apt-field__hint">{hint}</span> : null}
    </div>
  );
}
