'use client';
import React from "react";
import { Icon } from "../foundations/Icon.jsx";

/* Inject component CSS once. Keeps the pill + hover-sweep self-contained
   while styling entirely through design tokens. */
const CSS = `
.apt-btn{
  --_fill: var(--inverted-400);
  position:relative; overflow:hidden; isolation:isolate;
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  height:45px; padding:0 20px; border-radius:var(--radius-full);
  font-family:var(--font-mono); font-size:var(--text-xs); text-transform:uppercase;
  letter-spacing:0.03em; line-height:1; white-space:nowrap; cursor:pointer;
  border:1px solid transparent; transition:color var(--duration-fast) var(--ease-in-out);
  text-decoration:none;
}
.apt-btn__sweep{
  position:absolute; inset:0; z-index:-1; border-radius:inherit;
  transform:scaleX(0); transform-origin:right center;
  transition:transform var(--duration-fast) var(--ease-in-out);
  background:var(--accent-blue);
}
/* Signature sweep: fills LIME on hover (slower), retracts in BLUE (faster).
   Text flips to warm black on every variant while the lime is showing. */
.apt-btn:hover .apt-btn__sweep{
  transform:scaleX(1); transform-origin:left center;
  background:var(--accent-lime); transition:transform var(--duration-base) var(--ease-in-out);
}
.apt-btn:hover{ color:var(--color-black); }
.apt-btn:focus-visible{ outline:2px solid var(--inverted-100); outline-offset:2px; }

.apt-btn--primary{ background:var(--inverted-100); color:var(--surface-100); }
.apt-btn--secondary{ background:transparent; color:var(--inverted-100); border-color:var(--border); }
.apt-btn--ghost{ background:transparent; color:var(--inverted-100); }

.apt-btn--sm{ height:36px; padding:0 16px; }
.apt-btn--lg{ height:52px; padding:0 26px; font-size:var(--text-sm); }

.apt-btn[aria-disabled="true"], .apt-btn:disabled{
  background:color-mix(in oklab,var(--inverted-100) 12%,transparent);
  color:var(--text-muted); border-color:transparent; cursor:default; pointer-events:none;
}
.apt-btn__circle{
  display:inline-flex; align-items:center; justify-content:center;
  width:36px; height:36px; margin-right:-17px; border-radius:var(--radius-full);
  border:1px solid var(--border);
}
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "button");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Pill button with the signature left-to-right hover sweep.
 * Renders as <a> when `href` is set, otherwise <button>.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  trailingCircle = false,
  disabled = false,
  className = "",
  ...rest
}) {
  useStyle();
  const Tag = href ? "a" : "button";
  const cls = [
    "apt-btn",
    `apt-btn--${variant}`,
    size !== "md" ? `apt-btn--${size}` : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <Tag
      className={cls}
      href={href}
      aria-disabled={disabled || undefined}
      disabled={!href && disabled ? true : undefined}
      {...rest}
    >
      <span className="apt-btn__sweep" aria-hidden="true" />
      {icon && !trailingCircle ? <Icon name={icon} size={16} /> : null}
      <span>{children}</span>
      {trailingCircle ? (
        <span className="apt-btn__circle" aria-hidden="true">
          <Icon name={icon || "arrow-forward"} size={15} />
        </span>
      ) : null}
    </Tag>
  );
}
