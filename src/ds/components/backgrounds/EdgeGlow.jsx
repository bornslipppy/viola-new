'use client';
import React from "react";

/* Decorative accent wash that fades from one edge of a media frame — the
   recurring lime (or mint/blue) gradient edge laid over grayscale imagery.
   Drop it inside a `position:relative` container. */
const COLORS = {
  lime: "rgba(199,255,61,0.6)",
  mint: "rgba(213,250,211,0.6)",
  blue: "rgba(186,219,238,0.6)",
};
const DIR = { right: "to left", left: "to right", top: "to bottom", bottom: "to top" };

/**
 * Accent gradient edge overlay.
 * @param side  which edge the wash sits on: right | left | top | bottom
 * @param color lime | mint | blue, or any CSS color
 * @param size  band thickness in px (default 120)
 */
export function EdgeGlow({ side = "right", color = "lime", size = 120, className = "", style = {}, ...rest }) {
  const c = COLORS[color] || color;
  const vertical = side === "left" || side === "right";
  const pos = vertical
    ? { top: 0, bottom: 0, [side]: 0, width: size }
    : { left: 0, right: 0, [side]: 0, height: size };
  return (
    <div
      aria-hidden="true"
      className={["apt-edge-glow", className].filter(Boolean).join(" ")}
      style={{
        position: "absolute",
        pointerEvents: "none",
        background: `linear-gradient(${DIR[side]}, ${c}, transparent)`,
        ...pos,
        ...style,
      }}
      {...rest}
    />
  );
}
