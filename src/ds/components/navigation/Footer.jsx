'use client';
import React from "react";
import { Icon } from "../foundations/Icon.jsx";
import { Wordmark } from "../foundations/Wordmark.jsx";

const CSS = `
.apt-footer{
  background:var(--color-black); color:var(--color-white);
  padding:60px var(--content-gutter) 40px;
  font-family:var(--font-sans);
}
.apt-footer__signature{
  font-family:var(--font-serif); font-weight:400;
  font-size:clamp(2.75rem, 7vw, 6rem); line-height:0.98; letter-spacing:-0.02em;
  margin:0 0 64px; max-width:16ch; text-wrap:balance;
}
.apt-footer__top{ display:flex; flex-wrap:wrap; gap:60px; justify-content:space-between; }
.apt-footer__brand{ max-width:320px; }
.apt-footer__brand svg{ color:var(--color-white); }
.apt-footer__tag{ font-family:var(--font-sans); font-size:var(--text-sm); color:rgba(249,249,240,0.6); margin-top:18px; line-height:1.5; }
.apt-footer__cols{ display:flex; flex-wrap:wrap; gap:48px; }
.apt-footer__col h4{
  font-family:var(--font-mono); font-size:var(--text-2xs); text-transform:uppercase;
  letter-spacing:0.03em; color:rgba(249,249,240,0.5); margin:0 0 16px; font-weight:400;
}
.apt-footer__col ul{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }
.apt-footer__col a{ color:var(--color-white); font-size:var(--text-sm); text-decoration:none; opacity:0.85; }
.apt-footer__col a:hover{ opacity:0.55; }
.apt-footer__bottom{
  display:flex; flex-wrap:wrap; gap:20px; align-items:center; justify-content:space-between;
  margin-top:56px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.15);
}
.apt-footer__social{ display:flex; gap:8px; }
.apt-footer__social a{
  display:inline-flex; align-items:center; justify-content:center;
  width:40px; height:40px; border-radius:var(--radius-full); border:1px solid rgba(255,255,255,0.2);
  color:var(--color-white); transition:background var(--duration-fast) var(--ease-in-out), color var(--duration-fast) var(--ease-in-out);
}
.apt-footer__social a:hover{ background:var(--color-white); color:var(--color-black); }
.apt-footer__legal{ font-family:var(--font-mono); font-size:var(--text-2xs); text-transform:uppercase; letter-spacing:0.03em; color:rgba(249,249,240,0.5); }
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "footer");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const DEFAULT_COLS = [
  { heading: "Firm", links: ["Approach", "Team", "News", "Contact"] },
  { heading: "Founders", links: ["Portfolio", "Process", "Design partners", "Get in touch"] },
  { heading: "More", links: ["Careers", "Perspectives", "Co-investors", "Ecosystem"] },
];
const DEFAULT_SOCIALS = ["x", "linkedin"];

/** Site footer — dark, with link columns, social row and legal line. */
export function Footer({ columns = DEFAULT_COLS, socials = DEFAULT_SOCIALS, tagline = "In it. Together.", signature = "", showBottom = true, className = "", ...rest }) {
  useStyle();
  return (
    <footer className={["apt-footer", className].filter(Boolean).join(" ")} {...rest}>
      {signature ? <p className="apt-footer__signature">{signature}</p> : null}
      <div className="apt-footer__top">
        <div className="apt-footer__brand">
          <Wordmark height={26} />
          <p className="apt-footer__tag">{tagline}</p>
        </div>
        <div className="apt-footer__cols">
          {columns.map((c) => (
            <div className="apt-footer__col" key={c.heading}>
              <h4>{c.heading}</h4>
              <ul>{c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      {showBottom ? (
        <div className="apt-footer__bottom">
          <span className="apt-footer__legal">© {new Date().getFullYear()} Viola Ventures</span>
          <div className="apt-footer__social">
            {socials.map((s) => (
              <a key={s} href="#" aria-label={s}><Icon name={s} size={16} /></a>
            ))}
          </div>
        </div>
      ) : null}
    </footer>
  );
}
