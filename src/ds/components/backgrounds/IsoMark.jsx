'use client';
import React from "react";

/* Isometric wireframe "sector marks" — line-art solids drawn on a 200x200
   grid. Optional behaviours: draw-on-hover (staggered stroke reveal), a
   subtle pointer-tilt, a breathing core, and ghosted hidden edges. */
const MARKS = {
  cyber: "<g data-part=\"frame\">\n                <path d=\"M166.01 135.96L100.0 174.07\" pathLength=\"1\" style=\"--i:0\"></path>\n                <path d=\"M100.0 50.46L100.0 174.07\" pathLength=\"1\" style=\"--i:1\"></path>\n                <path d=\"M100.0 97.85L166.01 135.96\" pathLength=\"1\" style=\"--i:2\"></path>\n                <path d=\"M129.85 33.23L166.01 135.96\" pathLength=\"1\" style=\"--i:3\"></path>\n                <path d=\"M100.0 97.85L33.99 135.96\" pathLength=\"1\" style=\"--i:4\"></path>\n                <path d=\"M100.0 97.85L100.0 16.0\" pathLength=\"1\" style=\"--i:5\"></path>\n                <path d=\"M33.99 135.96L100.0 174.07\" pathLength=\"1\" style=\"--i:6\"></path>\n                <path d=\"M33.99 135.96L70.15 33.23\" pathLength=\"1\" style=\"--i:7\"></path>\n              </g>\n              <g data-part=\"core\">\n                <path d=\"M129.85 33.23L100.0 50.46\" pathLength=\"1\" style=\"--i:8\"></path>\n                <path d=\"M100.0 16.0L129.85 33.23\" pathLength=\"1\" style=\"--i:9\"></path>\n                <path d=\"M100.0 16.0L70.15 33.23\" pathLength=\"1\" style=\"--i:10\"></path>\n                <path d=\"M70.15 33.23L100.0 50.46\" pathLength=\"1\" style=\"--i:11\"></path>\n              </g>\n              <g data-part=\"ring\">\n                <path d=\"M16.8 135.96A83.2 48.04 0 1 0 183.2 135.96A83.2 48.04 0 1 0 16.8 135.96Z\" pathLength=\"1\" style=\"--i:12\"></path>\n              </g>",
  fintech: "<g data-part=\"frame\">\n                <path d=\"M142.24 124.39L79.66 160.52\" pathLength=\"1\" style=\"--i:0\"></path>\n                <path d=\"M79.66 16.0L17.09 52.13\" pathLength=\"1\" style=\"--i:1\"></path>\n                <path d=\"M142.24 52.13L79.66 88.26\" pathLength=\"1\" style=\"--i:2\"></path>\n                <path d=\"M142.24 124.39L142.24 52.13\" pathLength=\"1\" style=\"--i:3\"></path>\n                <path d=\"M17.09 124.39L17.09 52.13\" pathLength=\"1\" style=\"--i:4\"></path>\n                <path d=\"M79.66 160.52L79.66 88.26\" pathLength=\"1\" style=\"--i:5\"></path>\n                <path d=\"M79.66 88.26L17.09 124.39\" pathLength=\"1\" style=\"--i:6\"></path>\n                <path d=\"M79.66 88.26L79.66 16.0\" pathLength=\"1\" style=\"--i:7\"></path>\n              </g>\n              <g data-part=\"core\">\n                <path d=\"M17.09 124.39L120.34 184.0\" pathLength=\"1\" style=\"--i:8\"></path>\n                <path d=\"M79.66 16.0L182.91 75.61\" pathLength=\"1\" style=\"--i:9\"></path>\n                <path d=\"M17.09 52.13L120.34 111.74\" pathLength=\"1\" style=\"--i:10\"></path>\n                <path d=\"M79.66 88.26L182.91 147.87\" pathLength=\"1\" style=\"--i:11\"></path>\n                <path d=\"M182.91 147.87L120.34 184.0\" pathLength=\"1\" style=\"--i:12\"></path>\n                <path d=\"M120.34 39.48L57.76 75.61\" pathLength=\"1\" style=\"--i:13\"></path>\n                <path d=\"M182.91 75.61L120.34 111.74\" pathLength=\"1\" style=\"--i:14\"></path>\n                <path d=\"M182.91 147.87L182.91 75.61\" pathLength=\"1\" style=\"--i:15\"></path>\n                <path d=\"M57.76 147.87L57.76 75.61\" pathLength=\"1\" style=\"--i:16\"></path>\n                <path d=\"M120.34 184.0L120.34 111.74\" pathLength=\"1\" style=\"--i:17\"></path>\n                <path d=\"M120.34 111.74L57.76 147.87\" pathLength=\"1\" style=\"--i:18\"></path>\n                <path d=\"M120.34 111.74L120.34 39.48\" pathLength=\"1\" style=\"--i:19\"></path>\n              </g>",
  infrastructure: "<g data-part=\"guide\" stroke-dasharray=\"3 4\" opacity=\"0.55\">\n                <path d=\"M100.0 137.78L100.0 170.08\" pathLength=\"1\" style=\"--i:0\"></path>\n                <path d=\"M181.79 90.56L181.79 122.86\" pathLength=\"1\" style=\"--i:1\"></path>\n                <path d=\"M18.21 90.56L18.21 122.86\" pathLength=\"1\" style=\"--i:2\"></path>\n              </g>\n              <g data-part=\"frame\">\n                <path d=\"M181.79 63.22L100.0 110.44\" pathLength=\"1\" style=\"--i:3\"></path>\n                <path d=\"M100.0 16.0L181.79 63.22\" pathLength=\"1\" style=\"--i:4\"></path>\n                <path d=\"M100.0 16.0L18.21 63.22\" pathLength=\"1\" style=\"--i:5\"></path>\n                <path d=\"M18.21 63.22L100.0 110.44\" pathLength=\"1\" style=\"--i:6\"></path>\n                <path d=\"M181.79 90.56L100.0 137.78\" pathLength=\"1\" style=\"--i:7\"></path>\n                <path d=\"M18.21 90.56L100.0 137.78\" pathLength=\"1\" style=\"--i:8\"></path>\n                <path d=\"M100.0 184.0L100.0 170.08\" pathLength=\"1\" style=\"--i:9\"></path>\n                <path d=\"M100.0 137.78L100.0 110.44\" pathLength=\"1\" style=\"--i:10\"></path>\n                <path d=\"M181.79 136.78L181.79 122.86\" pathLength=\"1\" style=\"--i:11\"></path>\n                <path d=\"M181.79 90.56L181.79 63.22\" pathLength=\"1\" style=\"--i:12\"></path>\n                <path d=\"M18.21 136.78L18.21 122.86\" pathLength=\"1\" style=\"--i:13\"></path>\n                <path d=\"M18.21 90.56L18.21 63.22\" pathLength=\"1\" style=\"--i:14\"></path>\n                <path d=\"M181.79 122.86L100.0 170.08\" pathLength=\"1\" style=\"--i:15\"></path>\n                <path d=\"M18.21 122.86L100.0 170.08\" pathLength=\"1\" style=\"--i:16\"></path>\n                <path d=\"M181.79 136.78L100.0 184.0\" pathLength=\"1\" style=\"--i:17\"></path>\n                <path d=\"M18.21 136.78L100.0 184.0\" pathLength=\"1\" style=\"--i:18\"></path>\n              </g>\n              <g data-part=\"core\">\n                <path d=\"M122.81 63.22L100.0 76.39\" pathLength=\"1\" style=\"--i:19\"></path>\n                <path d=\"M100.0 50.05L122.81 63.22\" pathLength=\"1\" style=\"--i:20\"></path>\n                <path d=\"M100.0 50.05L77.19 63.22\" pathLength=\"1\" style=\"--i:21\"></path>\n                <path d=\"M77.19 63.22L100.0 76.39\" pathLength=\"1\" style=\"--i:22\"></path>\n                <path d=\"M100.0 77.38L100.0 50.05\" pathLength=\"1\" style=\"--i:23\"></path>\n              </g>",
  vertical: "<g data-part=\"hidden\">\n                <path d=\"M100.0 110.96L163.26 147.48\" pathLength=\"1\" style=\"--i:0\"></path>\n                <path d=\"M100.0 110.96L36.74 147.48\" pathLength=\"1\" style=\"--i:1\"></path>\n                <path d=\"M100.0 110.96L100.0 32.53\" pathLength=\"1\" style=\"--i:2\"></path>\n              </g>\n              <g data-part=\"frame\">\n                <path d=\"M36.74 147.48L100.0 184.0\" pathLength=\"1\" style=\"--i:3\"></path>\n                <path d=\"M100.0 32.53L163.26 69.05\" pathLength=\"1\" style=\"--i:4\"></path>\n                <path d=\"M36.74 69.05L100.0 105.57\" pathLength=\"1\" style=\"--i:5\"></path>\n                <path d=\"M163.26 147.48L100.0 184.0\" pathLength=\"1\" style=\"--i:6\"></path>\n                <path d=\"M100.0 32.53L36.74 69.05\" pathLength=\"1\" style=\"--i:7\"></path>\n                <path d=\"M163.26 69.05L100.0 105.57\" pathLength=\"1\" style=\"--i:8\"></path>\n                <path d=\"M163.26 147.48L163.26 69.05\" pathLength=\"1\" style=\"--i:9\"></path>\n                <path d=\"M36.74 147.48L36.74 69.05\" pathLength=\"1\" style=\"--i:10\"></path>\n                <path d=\"M100.0 184.0L100.0 105.57\" pathLength=\"1\" style=\"--i:11\"></path>\n              </g>\n              <g data-part=\"core\">\n                <path d=\"M63.38 132.1L100.0 153.24\" pathLength=\"1\" style=\"--i:12\"></path>\n                <path d=\"M100.0 16.0L136.62 37.14\" pathLength=\"1\" style=\"--i:13\"></path>\n                <path d=\"M63.38 37.14L100.0 58.29\" pathLength=\"1\" style=\"--i:14\"></path>\n                <path d=\"M136.62 132.1L100.0 153.24\" pathLength=\"1\" style=\"--i:15\"></path>\n                <path d=\"M100.0 16.0L63.38 37.14\" pathLength=\"1\" style=\"--i:16\"></path>\n                <path d=\"M136.62 37.14L100.0 58.29\" pathLength=\"1\" style=\"--i:17\"></path>\n                <path d=\"M136.62 132.1L136.62 37.14\" pathLength=\"1\" style=\"--i:18\"></path>\n                <path d=\"M63.38 132.1L63.38 37.14\" pathLength=\"1\" style=\"--i:19\"></path>\n                <path d=\"M100.0 153.24L100.0 58.29\" pathLength=\"1\" style=\"--i:20\"></path>\n                <path d=\"M100.0 110.96L136.62 132.1\" pathLength=\"1\" style=\"--i:21\"></path>\n                <path d=\"M100.0 110.96L63.38 132.1\" pathLength=\"1\" style=\"--i:22\"></path>\n                <path d=\"M100.0 110.96L100.0 16.0\" pathLength=\"1\" style=\"--i:23\"></path>\n              </g>",
  defense: "<g data-part=\"hidden\">\n                <path d=\"M100.0 100.0L172.75 142.0\" pathLength=\"1\" style=\"--i:0\"></path>\n                <path d=\"M100.0 100.0L27.25 142.0\" pathLength=\"1\" style=\"--i:1\"></path>\n                <path d=\"M100.0 100.0L100.0 16.0\" pathLength=\"1\" style=\"--i:2\"></path>\n              </g>\n              <g data-part=\"strut\">\n                <path d=\"M27.25 58.0L65.45 80.05\" pathLength=\"1\" style=\"--i:5\"></path>\n                <path d=\"M134.55 119.95L172.75 142.0\" pathLength=\"1\" style=\"--i:6\"></path>\n                <path d=\"M27.25 142.0L65.45 119.95\" pathLength=\"1\" style=\"--i:7\"></path>\n                <path d=\"M134.55 80.05L172.75 58.0\" pathLength=\"1\" style=\"--i:8\"></path>\n                <path d=\"M100.0 16.0L100.0 60.1\" pathLength=\"1\" style=\"--i:9\"></path>\n                <path d=\"M100.0 139.9L100.0 184.0\" pathLength=\"1\" style=\"--i:10\"></path>\n              </g>\n              <g data-part=\"frame\">\n                <path d=\"M27.25 142.0L100.0 184.0\" pathLength=\"1\" style=\"--i:11\"></path>\n                <path d=\"M100.0 16.0L172.75 58.0\" pathLength=\"1\" style=\"--i:12\"></path>\n                <path d=\"M27.25 58.0L100.0 100.0\" pathLength=\"1\" style=\"--i:13\"></path>\n                <path d=\"M172.75 142.0L100.0 184.0\" pathLength=\"1\" style=\"--i:14\"></path>\n                <path d=\"M100.0 16.0L27.25 58.0\" pathLength=\"1\" style=\"--i:15\"></path>\n                <path d=\"M172.75 58.0L100.0 100.0\" pathLength=\"1\" style=\"--i:16\"></path>\n                <path d=\"M172.75 142.0L172.75 58.0\" pathLength=\"1\" style=\"--i:17\"></path>\n                <path d=\"M27.25 142.0L27.25 58.0\" pathLength=\"1\" style=\"--i:18\"></path>\n                <path d=\"M100.0 184.0L100.0 100.0\" pathLength=\"1\" style=\"--i:19\"></path>\n              </g>\n              <g data-part=\"core\">\n                <path d=\"M65.45 119.95L100.0 139.9\" pathLength=\"1\" style=\"--i:20\"></path>\n                <path d=\"M100.0 60.1L134.55 80.05\" pathLength=\"1\" style=\"--i:21\"></path>\n                <path d=\"M65.45 80.05L100.0 100.0\" pathLength=\"1\" style=\"--i:22\"></path>\n                <path d=\"M134.55 119.95L100.0 139.9\" pathLength=\"1\" style=\"--i:23\"></path>\n                <path d=\"M100.0 60.1L65.45 80.05\" pathLength=\"1\" style=\"--i:24\"></path>\n                <path d=\"M134.55 80.05L100.0 100.0\" pathLength=\"1\" style=\"--i:25\"></path>\n                <path d=\"M134.55 119.95L134.55 80.05\" pathLength=\"1\" style=\"--i:26\"></path>\n                <path d=\"M65.45 119.95L65.45 80.05\" pathLength=\"1\" style=\"--i:27\"></path>\n                <path d=\"M100.0 139.9L100.0 100.0\" pathLength=\"1\" style=\"--i:28\"></path>\n                <path d=\"M100.0 100.0L134.55 119.95\" pathLength=\"1\" style=\"--i:29\"></path>\n                <path d=\"M100.0 100.0L65.45 119.95\" pathLength=\"1\" style=\"--i:30\"></path>\n                <path d=\"M100.0 100.0L100.0 60.1\" pathLength=\"1\" style=\"--i:31\"></path>\n              </g>"
};

const CSS = `
.apt-iso{ overflow:visible; color:inherit; display:block; width:100%; height:auto;
  --apt-iso-draw-dur:700ms; --apt-iso-stagger:26ms; --apt-iso-tilt-max:8deg;
  --apt-iso-ease:cubic-bezier(0.22,1,0.36,1); }
@keyframes apt-iso-draw{ from{ stroke-dashoffset:1; } to{ stroke-dashoffset:0; } }
.apt-iso--draw path{ stroke-dasharray:1; stroke-dashoffset:0; }
.apt-iso--draw:hover path, .apt-iso--draw:focus-visible path{
  animation:apt-iso-draw var(--apt-iso-draw-dur) var(--apt-iso-ease) both;
  animation-delay:calc(var(--i,0) * var(--apt-iso-stagger)); }
.apt-iso--tilt{ transform:perspective(900px)
  rotateX(calc(var(--my,0) * var(--apt-iso-tilt-max) * -1))
  rotateY(calc(var(--mx,0) * var(--apt-iso-tilt-max)));
  transition:transform 180ms var(--apt-iso-ease); will-change:transform; }
@keyframes apt-iso-breathe{ 0%,100%{ opacity:1; } 50%{ opacity:0.42; } }
.apt-iso--breathe [data-part="core"]{ animation:apt-iso-breathe 2.6s ease-in-out infinite; }
.apt-iso--ghost [data-part="hidden"]{ opacity:0.3; transition:opacity 320ms var(--apt-iso-ease); }
@media (prefers-reduced-motion:reduce){
  .apt-iso--draw:hover path, .apt-iso--breathe [data-part="core"]{ animation:none; }
  .apt-iso--tilt{ transform:none; }
}
`;
let injected = false;
function useStyle(){
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt","isomark");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Isometric wireframe sector mark.
 * @param mark one of: cyber | fintech | infrastructure | vertical | defense
 */
export function IsoMark({
  mark = "cyber",
  draw = true,
  tilt = true,
  breathe = true,
  ghost = true,
  strokeWidth = 1.4,
  title,
  className = "",
  style = {},
  ...rest
}) {
  useStyle();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5) * 2);
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const leave = () => { el.style.setProperty("--mx", 0); el.style.setProperty("--my", 0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [tilt]);
  const inner = MARKS[mark] || MARKS.cyber;
  const cls = ["apt-iso",
    draw ? "apt-iso--draw" : "",
    tilt ? "apt-iso--tilt" : "",
    breathe ? "apt-iso--breathe" : "",
    ghost ? "apt-iso--ghost" : "",
    className].filter(Boolean).join(" ");
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
      role="img"
      aria-label={title || mark}
      tabIndex={draw ? 0 : undefined}
      style={style}
      dangerouslySetInnerHTML={{ __html: inner }}
      {...rest}
    />
  );
}
