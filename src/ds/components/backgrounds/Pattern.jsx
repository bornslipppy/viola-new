'use client';
import React from "react";

/* Striped-inversion mask engine — the Aptos-style arc / diamond / lens
   background motif. Two-colour stripes, inverted inside circle or diamond
   figures to carve concentric bands. Also shipped as a standalone
   stylesheet at patterns/aptos-patterns.css for non-React consumers. */
const CSS = `
.apt-pattern.pattern-root{
  position:absolute; inset:0; overflow:hidden;
  --aptos-black:var(--color-black,#0f0e0b);
  --aptos-beige:var(--color-sand,#ccc5a3);
  --aptos-blue:var(--color-blue,#badbee);
  --aptos-coral:#ff8866;
  --aptos-mint:var(--color-mint,#d5fad3);
  --aptos-tan:var(--color-tan,#9d937c);
}
.apt-pattern .pattern-container{
  position:relative; width:100%; height:100%; container-type:size;
  --columns:16; --rows:8; --color:var(--aptos-beige);
}
.apt-pattern.pattern-root:has(> .proportional){ position:relative; height:auto; }
.apt-pattern .pattern-container.proportional{ height:auto; aspect-ratio:var(--columns)/var(--rows); }
.apt-pattern .pattern-layer{
  position:absolute; inset:0;
  --cell:calc(100cqw / var(--columns));
  --cell-h:calc(100cqh / var(--rows));
}
.apt-pattern .pattern-layer.vertical.even{ background:repeating-linear-gradient(to right,var(--color) 0 var(--cell),var(--aptos-black) var(--cell) calc(2*var(--cell))); }
.apt-pattern .pattern-layer.vertical.odd{ background:repeating-linear-gradient(to right,var(--aptos-black) 0 var(--cell),var(--color) var(--cell) calc(2*var(--cell))); }
.apt-pattern .pattern-layer.horizontal.even{ background:repeating-linear-gradient(to bottom,var(--color) 0 var(--cell-h),var(--aptos-black) var(--cell-h) calc(2*var(--cell-h))); }
.apt-pattern .pattern-layer.horizontal.odd{ background:repeating-linear-gradient(to bottom,var(--aptos-black) 0 var(--cell-h),var(--color) var(--cell-h) calc(2*var(--cell-h))); }
.apt-pattern .pattern-figure-mask{
  --fig-r:calc(var(--size) / 2 * var(--cell));
  --fig-cx:calc(50cqw + var(--x) * var(--cell));
  --fig-cy:calc(50cqh + var(--y) * var(--cell));
  --figure-circle:circle(var(--fig-r) at var(--fig-cx) var(--fig-cy));
  --figure-diamond:polygon(var(--fig-cx) calc(var(--fig-cy) - var(--fig-r)),calc(var(--fig-cx) + var(--fig-r)) var(--fig-cy),var(--fig-cx) calc(var(--fig-cy) + var(--fig-r)),calc(var(--fig-cx) - var(--fig-r)) var(--fig-cy));
  clip-path:var(--figure);
}
`;
let injected = false;
function useStyle() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-apt", "pattern");
  el.textContent = CSS;
  document.head.appendChild(el);
}

// f(shape, size, x, y, phase) — one figure layer
const f = (shape, size, x, y, phase) => ({ shape, size, x, y, phase });

/* The eight scanned layouts. columns/rows/orientation/proportional set the
   grid; figures paint the inversions in source order (later = on top). */
export const PATTERN_PRESETS = {
  "lens-column": {
    label: "Lens Column", orientation: "vertical", columns: 8, color: "blue",
    figures: [f("circle",20,0,-10,"odd"),f("circle",20,0,-18,"even"),f("circle",20,0,10,"odd"),f("circle",20,0,18,"even")],
  },
  "arc-banner": {
    label: "Arc Banner", orientation: "vertical", proportional: true, columns: 32, rows: 10, color: "beige",
    figures: [f("circle",20,0,5,"odd"),f("circle",10,0,5,"even")],
  },
  "diamond-banner": {
    label: "Diamond Banner", orientation: "vertical", proportional: true, columns: 32, rows: 10, color: "beige",
    figures: [f("diamond",24,0,-6,"odd"),f("diamond",8,0,-5,"even")],
  },
  "side-cut": {
    label: "Side Cut", orientation: "vertical", columns: 4, color: "beige",
    figures: [f("circle",32,12,-16,"odd"),f("circle",32,12,16,"odd")],
  },
  "side-cut-mobile": {
    label: "Side Cut (mobile)", orientation: "vertical", columns: 16, color: "beige",
    figures: [f("circle",30,0,-15,"odd"),f("circle",30,0,15,"odd")],
  },
  "horizontal-twin": {
    label: "Horizontal Twin", orientation: "horizontal", proportional: true, columns: 16, rows: 8, color: "beige",
    figures: [f("circle",36,-18,3,"odd"),f("circle",29,-22,3,"even"),f("circle",36,18,3,"odd"),f("circle",29,22,3,"even")],
  },
  "side-arc-mobile": {
    label: "Side Arc (mobile)", orientation: "vertical", columns: 16, color: "blue",
    figures: [f("circle",20,7,0,"odd"),f("circle",10,8,0,"even")],
  },
  "left-arc-mobile": {
    label: "Left Arc (mobile)", orientation: "vertical", proportional: true, columns: 16, rows: 6, color: "blue",
    figures: [f("circle",20,-7,0,"odd"),f("circle",8,-8,0,"even")],
  },
};

const COLOR_VAR = {
  blue: "var(--aptos-blue)", beige: "var(--aptos-beige)", coral: "var(--aptos-coral)",
  mint: "var(--aptos-mint)", tan: "var(--aptos-tan)", black: "var(--aptos-black)",
};

/**
 * Decorative striped-inversion background pattern (arc / diamond / lens).
 * Absolute-fills its nearest positioned ancestor (proportional presets
 * self-size and flow instead). Purely decorative — aria-hidden.
 */
export function Pattern({
  preset = "arc-banner",
  color,
  columns,
  rows,
  figures,
  className = "",
  style,
  ...rest
}) {
  useStyle();
  const cfg = PATTERN_PRESETS[preset] || PATTERN_PRESETS["arc-banner"];
  const orient = cfg.orientation;
  const cols = columns ?? cfg.columns;
  const rws = rows ?? cfg.rows;
  const figs = figures ?? cfg.figures;
  const accent = COLOR_VAR[color || cfg.color] || COLOR_VAR.beige;

  const containerStyle = { "--color": accent, "--columns": cols };
  if (cfg.proportional) containerStyle["--rows"] = rws;

  return (
    <div className={["apt-pattern", "pattern-root", className].filter(Boolean).join(" ")} aria-hidden="true" style={style} {...rest}>
      <div className={["pattern-container", cfg.proportional ? "proportional" : ""].filter(Boolean).join(" ")} style={containerStyle}>
        <div className={`pattern-layer even ${orient}`}></div>
        {figs.map((fig, i) => (
          <div
            key={i}
            className={`pattern-layer pattern-figure-mask ${orient} ${fig.phase}`}
            style={{
              "--figure": fig.shape === "diamond" ? "var(--figure-diamond)" : "var(--figure-circle)",
              "--size": fig.size,
              "--x": fig.x,
              "--y": fig.y,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
