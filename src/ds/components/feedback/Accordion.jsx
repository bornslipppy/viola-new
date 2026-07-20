'use client';
import React from "react";
import { Icon } from "../foundations/Icon.jsx";

const CSS = `
.apt-acc{ border-top:1px solid var(--border); }
.apt-acc__item{ border-bottom:1px solid var(--border); }
.apt-acc__trigger{
  width:100%; display:flex; align-items:center; justify-content:space-between; gap:20px;
  padding:22px 4px; background:none; border:0; cursor:pointer; text-align:left;
  font-family:var(--font-serif); font-size:var(--text-xl); font-weight:400; color:var(--inverted-100);
}
.apt-acc__icon{ flex-shrink:0; display:inline-flex; transition:transform var(--duration-base) var(--ease-in-out); color:var(--text-secondary); }
.apt-acc__item[data-open="true"] .apt-acc__icon{ transform:rotate(45deg); }
.apt-acc__panel{ overflow:hidden; display:grid; grid-template-rows:0fr; transition:grid-template-rows var(--duration-base) var(--ease-in-out); }
.apt-acc__item[data-open="true"] .apt-acc__panel{ grid-template-rows:1fr; }
.apt-acc__inner{ min-height:0; }
.apt-acc__body{
  font-family:var(--font-sans); font-size:var(--text-base); line-height:1.5;
  color:var(--text-secondary); padding:0 4px 24px; max-width:60ch;
}
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "accordion");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Accordion — bordered rows with serif triggers and a rotating + glyph. */
export function Accordion({ items = [], allowMultiple = false, className = "", ...rest }) {
  useStyle();
  const [open, setOpen] = React.useState(() => new Set());
  const toggle = (i) => setOpen((prev) => {
    const next = new Set(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  return (
    <div className={["apt-acc", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((it, i) => (
        <div className="apt-acc__item" key={i} data-open={open.has(i)}>
          <button className="apt-acc__trigger" type="button" aria-expanded={open.has(i)} onClick={() => toggle(i)}>
            <span>{it.title}</span>
            <span className="apt-acc__icon"><Icon name="add-2" size={20} /></span>
          </button>
          <div className="apt-acc__panel">
            <div className="apt-acc__inner">
              <div className="apt-acc__body">{it.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
