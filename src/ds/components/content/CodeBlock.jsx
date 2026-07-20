'use client';
import React from "react";
import { Icon } from "../foundations/Icon.jsx";

const CSS = `
.apt-code{
  font-family:var(--font-mono); font-size:var(--text-sm); line-height:1.6;
  color:var(--inverted-100); white-space:pre; overflow:auto;
  background:transparent; padding:0; margin:0; tab-size:2;
}
.apt-code--panel{
  background:var(--color-black); color:var(--color-white);
  padding:24px 28px; border-radius:var(--radius-md);
}
.apt-code__bar{
  display:flex; align-items:center; justify-content:space-between;
  font-family:var(--font-mono); font-size:var(--text-2xs); text-transform:uppercase;
  letter-spacing:0.03em; color:var(--text-muted); margin-bottom:14px;
}
.apt-code__copy{ display:inline-flex; align-items:center; gap:6px; cursor:pointer; background:none; border:0; color:inherit; font:inherit; text-transform:inherit; letter-spacing:inherit; }
.apt-code .cmt{ opacity:0.45; }
.apt-code .kw{ color:var(--accent-lime); }
.apt-code--panel .kw{ color:var(--accent-mint); }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "code");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* Minimal Move/Rust-ish highlighter: keywords + line comments. */
function highlight(code) {
  const kws = /\b(public|fun|let|module|struct|use|return|if|else|acquires|entry|const|move|has|copy|drop|store|key|bool|true|false)\b/g;
  return code.split("\n").map((line, i) => {
    const ci = line.indexOf("//");
    let codePart = ci >= 0 ? line.slice(0, ci) : line;
    let comment = ci >= 0 ? line.slice(ci) : "";
    const parts = [];
    let last = 0, m;
    while ((m = kws.exec(codePart))) {
      if (m.index > last) parts.push(codePart.slice(last, m.index));
      parts.push(<span className="kw" key={m.index}>{m[0]}</span>);
      last = m.index + m[0].length;
    }
    if (last < codePart.length) parts.push(codePart.slice(last));
    return (
      <div key={i}>
        {parts}
        {comment ? <span className="cmt">{comment}</span> : null}
        {line === "" ? "\u200b" : null}
      </div>
    );
  });
}

/**
 * Decorative Move code block — the syntax-tinted snippet the site scatters
 * across hero and "Start Building" panels. Set `panel` for the dark card.
 */
export function CodeBlock({ code = "", label, panel = false, copyable = false, className = "", ...rest }) {
  useStyle();
  const cls = ["apt-code", panel ? "apt-code--panel" : "", className].filter(Boolean).join(" ");
  return (
    <div {...rest}>
      {(label || copyable) ? (
        <div className="apt-code__bar">
          <span>{label}</span>
          {copyable ? (
            <button className="apt-code__copy" onClick={() => navigator.clipboard && navigator.clipboard.writeText(code)}>
              <Icon name="copy" size={13} /> Copy
            </button>
          ) : null}
        </div>
      ) : null}
      <pre className={cls}>{highlight(code)}</pre>
    </div>
  );
}
