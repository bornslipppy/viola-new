'use client';
import React from "react";
import { Icon } from "../foundations/Icon.jsx";
import { Wordmark } from "../foundations/Wordmark.jsx";
import { Button } from "../actions/Button.jsx";

const CSS = `
.apt-nav{
  display:flex; align-items:center; gap:24px;
  height:60px; padding:8px 8px 8px 20px; width:100%; max-width:560px;
  background:var(--surface-100); border:1px solid var(--border);
  border-radius:var(--radius-full);
}
.apt-nav__logo{ display:flex; align-items:center; color:var(--inverted-100); flex-shrink:0; }
.apt-nav__links{ display:flex; align-items:center; gap:4px; margin:0; padding:0; list-style:none; }
.apt-nav__link{
  display:inline-flex; align-items:center; gap:4px; padding:6px 10px;
  font-family:var(--font-mono); font-size:var(--text-xs); letter-spacing:0.03em;
  color:var(--inverted-100); background:none; border:0; cursor:pointer;
  border-bottom:1px solid transparent; transition:border-color var(--duration-fast) var(--ease-in-out);
}
.apt-nav__link:hover{ border-bottom-color:var(--inverted-100); }
.apt-nav__spacer{ flex:1; }
.apt-nav--glass{
  background:color-mix(in oklab, var(--surface-100) 55%, transparent);
  -webkit-backdrop-filter:blur(16px) saturate(1.4); backdrop-filter:blur(16px) saturate(1.4);
  border-color:var(--border-subtle);
}
.apt-nav--fit{ width:auto; max-width:none; }
@media (max-width:640px){ .apt-nav__links{ display:none; } }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "nav");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const DEFAULT_ITEMS = ["Approach", "Portfolio", "Team"];

/** Floating pill navigation bar — the site's primary header. */
export function NavBar({ items = DEFAULT_ITEMS, ctaLabel = "Connect", ctaHref = "#", showCta = true, glass = false, fit = false, className = "", ...rest }) {
  useStyle();
  const cls = ["apt-nav", glass ? "apt-nav--glass" : "", fit ? "apt-nav--fit" : "", className].filter(Boolean).join(" ");
  return (
    <nav className={cls} {...rest}>
      <a className="apt-nav__logo" href="#" aria-label="Viola Ventures home">
        <Wordmark height={22} />
      </a>
      <ul className="apt-nav__links">
        {items.map((it) => (
          <li key={it}>
            <button className="apt-nav__link" type="button">
              {it}
              <Icon name="keyboard-arrow-down" size={14} />
            </button>
          </li>
        ))}
      </ul>
      <span className="apt-nav__spacer" />
      {showCta ? <Button variant="primary" size="sm" href={ctaHref}>{ctaLabel}</Button> : null}
    </nav>
  );
}
