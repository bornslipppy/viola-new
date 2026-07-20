# Pattern

Decorative striped-inversion background — the brand's signature masked banner motif. Two-colour vertical or horizontal stripes, inverted inside circle or diamond figures to carve concentric arc / lens / diamond bands. Purely decorative (`aria-hidden`).

```jsx
// Absolute-fills a positioned ancestor — give the parent position + overflow:hidden
<div style={{ position: "relative", height: 320, overflow: "hidden" }}>
  <Pattern preset="lens-column" color="blue" />
</div>

// Proportional presets (arc-banner, diamond-banner, horizontal-twin, left-arc-mobile)
// self-size from their aspect ratio and flow in normal layout:
<Pattern preset="arc-banner" />
```

Presets: `arc-banner`, `diamond-banner`, `lens-column`, `side-cut`, `side-cut-mobile`, `horizontal-twin`, `side-arc-mobile`, `left-arc-mobile`. Recolour with `color` (`blue` / `beige` / `coral` / `mint` / `tan`). Tune with `columns` / `rows`, or fully replace `figures` for a custom composition. The other stripe is always brand black.

Non-React consumers can use the same markup + class API via `patterns/aptos-patterns.css` (see the "Background Patterns" specimen). Use behind heroes, section headers, and mobile strips — never over body copy.
