'use client';
import React from "react";
import { Icon } from "../foundations/Icon.jsx";

const CSS = `
.apt-card{
  position:relative; display:flex; flex-direction:column;
  background:var(--surface-100); color:var(--inverted-100);
  border:1px solid var(--border); border-radius:var(--radius-none);
  padding:30px; min-height:300px; overflow:hidden;
  transition:background var(--duration-base) var(--ease-in-out);
}
.apt-card--dark{ background:var(--color-black); color:var(--color-white); border-color:transparent; }
.apt-card--dark .apt-card__desc{ color:rgba(249,249,240,0.6); }
.apt-card--fill-mint{ background:var(--accent-mint); color:var(--color-black); border-color:transparent; }
.apt-card--fill-blue{ background:var(--accent-blue); color:var(--color-black); border-color:transparent; }
.apt-card--fill-lime{ background:var(--accent-lime); color:var(--color-black); border-color:transparent; }
.apt-card__eyebrow{
  font-family:var(--font-mono); font-size:var(--text-xs); text-transform:uppercase;
  letter-spacing:0.03em; opacity:0.6; margin-bottom:14px;
}
.apt-card__title{
  font-family:var(--font-serif); font-size:var(--text-xl); font-weight:400;
  line-height:1.15; letter-spacing:-0.01em; margin:0 0 12px;
}
.apt-card__desc{
  font-family:var(--font-sans); font-size:var(--text-sm); line-height:1.45;
  color:var(--text-secondary); margin:0; max-width:42ch;
}
.apt-card__media{ flex:1; display:flex; align-items:center; justify-content:center; margin:24px 0; min-height:80px; }
.apt-card__footer{
  margin-top:auto; display:inline-flex; align-items:center; gap:12px;
  font-family:var(--font-mono); font-size:var(--text-xs); text-transform:uppercase;
  letter-spacing:0.03em; text-decoration:none; color:inherit; width:max-content;
}
.apt-card__footer .apt-card__circle{
  display:inline-flex; align-items:center; justify-content:center;
  width:40px; height:40px; border-radius:var(--radius-full); border:1px solid currentColor;
  position:relative; overflow:hidden; isolation:isolate; transition:color var(--duration-fast) var(--ease-in-out);
  opacity:0.5;
}
.apt-card a.apt-card__footer:hover .apt-card__circle{ opacity:1; }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "card");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Editorial content card. The dark variant with a fine-line illustration
 * slot is the site's use-case card; light/accent-fill variants also exist.
 */
export function Card({
  eyebrow,
  title,
  description,
  children,
  href,
  linkLabel,
  variant = "light",
  className = "",
  ...rest
}) {
  useStyle();
  const cls = [
    "apt-card",
    variant === "dark" ? "apt-card--dark" : "",
    variant.startsWith("fill-") ? `apt-card--${variant}` : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} {...rest}>
      {eyebrow ? <div className="apt-card__eyebrow">{eyebrow}</div> : null}
      {title ? <h3 className="apt-card__title">{title}</h3> : null}
      {description ? <p className="apt-card__desc">{description}</p> : null}
      {children ? <div className="apt-card__media">{children}</div> : null}
      {linkLabel ? (
        <a className="apt-card__footer" href={href || "#"}>
          <span className="apt-card__circle" aria-hidden="true">
            <Icon name="arrow-forward" size={15} />
          </span>
          {linkLabel}
        </a>
      ) : null}
    </div>
  );
}
