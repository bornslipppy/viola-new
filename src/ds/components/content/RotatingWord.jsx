'use client';
import React from "react";

/* Signature Viola hero effect: a single word that cycles through a list with
   a left-to-right "sweep" wipe — the outgoing word clips away to the right
   while the incoming word is revealed from the left. Set in the display
   serif by default. (The brand's variable serif→sans axis morph needs the
   Season variable font; this ships the wipe with the design system's static
   Season faces.) */
const CSS = `
.apt-rot{ position:relative; display:inline-block; vertical-align:baseline; white-space:nowrap; }
.apt-rot__ghost{ visibility:hidden; }
.apt-rot__slot{ position:absolute; top:0; left:0; white-space:nowrap; }
@keyframes apt-rot-out{
  0%{ clip-path:polygon(0 0,110% 0,110% 200%,0 200%); transform:translateX(0); }
  100%{ clip-path:polygon(110% 0,110% 0,110% 200%,110% 200%); transform:translateX(50px); }
}
@keyframes apt-rot-in{
  0%{ clip-path:polygon(0 0,0 0,0 200%,0 200%); transform:translateX(0); }
  50%{ clip-path:polygon(0 0,110% 0,110% 200%,0 200%); transform:translateX(50px); }
  100%{ clip-path:polygon(0 0,110% 0,110% 200%,0 200%); transform:translateX(0); }
}
.apt-rot__out{ animation:apt-rot-out 1s forwards cubic-bezier(.76,0,.24,1); }
.apt-rot__in{ animation:apt-rot-in 2s forwards cubic-bezier(.76,0,.24,1); }
.apt-rot__hidden{ visibility:hidden; }
@media (prefers-reduced-motion:reduce){
  .apt-rot__out,.apt-rot__in{ animation:none; }
}
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "rotating-word");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Rotating headline word with the brand sweep-wipe.
 * @param words   list of words to cycle
 * @param interval ms each word holds before the next wipe (default 4000)
 * @param delay   ms before the first wipe (default 1500)
 */
export function RotatingWord({
  words = ["Moves", "Signals", "Customers", "Hires", "Partners"],
  interval = 4000,
  delay = 1500,
  className = "",
  style = {},
  ...rest
}) {
  useStyle();
  const curRef = React.useRef(null);
  const nextRef = React.useRef(null);
  const longest = React.useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [words]
  );

  React.useEffect(() => {
    let cur = curRef.current;
    let nxt = nextRef.current;
    if (!cur || !nxt || words.length < 2) return;
    const timers = [];
    let idx = 0;
    nxt.classList.add("apt-rot__hidden");
    const cycle = () => {
      const nextIdx = (idx + 1) % words.length;
      nxt.textContent = words[nextIdx];
      nxt.classList.remove("apt-rot__in", "apt-rot__out");
      nxt.classList.add("apt-rot__hidden");
      cur.classList.remove("apt-rot__in");
      cur.classList.add("apt-rot__out");
      timers.push(setTimeout(() => {
        nxt.classList.remove("apt-rot__hidden");
        void nxt.offsetWidth;
        nxt.classList.add("apt-rot__in");
      }, 150));
      timers.push(setTimeout(() => {
        cur.classList.remove("apt-rot__out");
        cur.classList.add("apt-rot__hidden");
        const tmp = cur; cur = nxt; nxt = tmp;
        idx = nextIdx;
      }, 1000));
    };
    const loop = () => { cycle(); timers.push(setTimeout(loop, interval)); };
    timers.push(setTimeout(loop, delay));
    return () => timers.forEach(clearTimeout);
  }, [words, interval, delay]);

  return (
    <span
      className={["apt-rot", className].filter(Boolean).join(" ")}
      style={{ fontFamily: "var(--font-serif)", ...style }}
      {...rest}
    >
      <span className="apt-rot__ghost" aria-hidden="true">{longest}</span>
      <span className="apt-rot__slot" ref={curRef}>{words[0]}</span>
      <span className="apt-rot__slot" ref={nextRef} aria-hidden="true" />
    </span>
  );
}
