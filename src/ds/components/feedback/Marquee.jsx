'use client';
import React from "react";

const CSS = `
@keyframes apt-marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
.apt-marquee{ overflow:hidden; width:100%; -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); }
.apt-marquee__track{ display:flex; width:max-content; animation:apt-marquee var(--apt-marquee-dur,24s) linear infinite; }
.apt-marquee:hover .apt-marquee__track{ animation-play-state:paused; }
.apt-marquee__group{ display:flex; align-items:center; gap:var(--apt-marquee-gap,48px); padding-right:var(--apt-marquee-gap,48px); }
.apt-marquee__item{
  font-family:var(--font-serif); font-size:var(--text-2xl); font-weight:400; color:var(--inverted-100);
  white-space:nowrap; display:inline-flex; align-items:center; gap:12px;
}
.apt-marquee--mono .apt-marquee__item{ font-family:var(--font-mono); font-size:var(--text-sm); text-transform:uppercase; letter-spacing:0.03em; color:var(--text-secondary); }
@media (prefers-reduced-motion: reduce){ .apt-marquee__track{ animation:none; } }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "marquee");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Infinite horizontal marquee — the site's scrolling ticker / logo wall. */
export function Marquee({ items = [], variant = "serif", speed = 24, gap = 48, separator = "—", className = "", style = {}, ...rest }) {
  useStyle();
  const group = (
    <div className="apt-marquee__group" aria-hidden="false">
      {items.map((it, i) => (
        <span className="apt-marquee__item" key={i}>
          {it}{separator ? <span aria-hidden="true" style={{ opacity: 0.4 }}>{separator}</span> : null}
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={["apt-marquee", variant === "mono" ? "apt-marquee--mono" : "", className].filter(Boolean).join(" ")}
      style={{ "--apt-marquee-dur": `${speed}s`, "--apt-marquee-gap": `${gap}px`, ...style }}
      {...rest}
    >
      <div className="apt-marquee__track">
        {group}
        <div className="apt-marquee__group" aria-hidden="true">
          {items.map((it, i) => (
            <span className="apt-marquee__item" key={i}>
              {it}{separator ? <span aria-hidden="true" style={{ opacity: 0.4 }}>{separator}</span> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
