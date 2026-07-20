'use client';

import { useEffect, useRef } from 'react';

/**
 * Viola — Three C rings. Tilted concentric rings (Clarity / Customers / Capital)
 * on an auto-playing loop. Self-contained SVG. Ported from the original
 * ViolaRings.jsx (imperative build inside an effect).
 */
export function ViolaRings() {
	const rootRef = useRef(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const NS = 'http://www.w3.org/2000/svg';
		const el = (t, a) => {
			const e = document.createElementNS(NS, t);
			for (const k in a) e.setAttribute(k, a[k]);
			return e;
		};

		const CX = 320, CY = 250;
		const INK = '#0F0E0B', GREY = '#a6a6a6';
		const MONO = 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
		const VBMIN = 6, VBMAX = 634;
		const SW = 1.8;
		const TILT = 0.72;

		const ORDER = ['clarity', 'customers', 'capital'];
		const RX = { clarity: 90, customers: 155, capital: 220 };
		const RY = {}; ORDER.forEach((k) => (RY[k] = RX[k] * TILT));
		const COLORS = { clarity: '#CCFBC9', customers: '#AED2EA', capital: '#BEFF30' };
		const NAME = { clarity: 'Clarity', customers: 'Customers', capital: 'Capital' };
		const TAGS = {
			clarity: ['PMF', 'ICP', 'GTM', 'Wedge'],
			customers: ['Buyers', 'Partners', 'Operators', 'Validation'],
			capital: ['Syndicate', 'Talent', 'Advisors', 'Next round'],
		};
		const ANG = [225, 315, 45, 135];

		const LEAD = 520, STAGGER = 430, HOLD = 2300, FADE = 800, GAP = 800, RESUME = 900;

		root.innerHTML =
			'<svg class="vr-svg" viewBox="0 0 640 520" role="img" aria-label="Clarity, Customers and Capital rings" style="width:100%;height:auto;display:block;overflow:visible"></svg>';
		const svg = root.querySelector('.vr-svg');

		const defs = el('defs', {});
		svg.appendChild(defs);
		ORDER.forEach((k) => {
			const g1 = el('linearGradient', { id: `vr-rest-${k}`, gradientUnits: 'userSpaceOnUse', x1: CX, y1: CY - RY[k], x2: CX, y2: CY + RY[k] });
			g1.appendChild(el('stop', { offset: '0%', 'stop-color': GREY }));
			g1.appendChild(el('stop', { offset: '100%', 'stop-color': '#ffffff' }));
			defs.appendChild(g1);
			const g2 = el('linearGradient', { id: `vr-act-${k}`, gradientUnits: 'userSpaceOnUse', x1: CX, y1: CY - RY[k], x2: CX, y2: CY + RY[k] });
			[['0%', '#b0b0b0'], ['30%', '#8a8a8a'], ['55%', '#4a4a4a'], ['80%', INK], ['100%', INK]]
				.forEach(([offset, c]) => g2.appendChild(el('stop', { offset, 'stop-color': c })));
			defs.appendChild(g2);
		});

		const rings = {};
		ORDER.forEach((k) => {
			const base = el('ellipse', { cx: CX, cy: CY, rx: RX[k], ry: RY[k], fill: 'none', stroke: `url(#vr-rest-${k})`, 'stroke-width': SW, opacity: 1 });
			const hi = el('ellipse', { cx: CX, cy: CY, rx: RX[k], ry: RY[k], fill: 'none', stroke: `url(#vr-act-${k})`, 'stroke-width': SW, opacity: 0 });
			svg.appendChild(base); svg.appendChild(hi);
			rings[k] = { base, hi, baseOp: 1, hiOp: 0, labOp: 1 };
		});
		ORDER.forEach((k) => {
			const t = el('text', { x: CX, y: CY + RY[k] - 18, 'text-anchor': 'middle', 'font-family': MONO, 'font-size': '13', 'font-weight': '500', 'letter-spacing': '1', fill: INK });
			t.textContent = NAME[k];
			svg.appendChild(t);
			rings[k].label = t;
		});

		const tokLayer = el('g', {}); svg.appendChild(tokLayer);
		const SQ = 15;
		const NODES = [];
		ORDER.forEach((k) => {
			TAGS[k].forEach((txt, i) => {
				const a = (ANG[i] * Math.PI) / 180;
				const x = CX + RX[k] * Math.cos(a), y = CY + RY[k] * Math.sin(a);
				const depth = (Math.sin(a) + 1) / 2;
				const s = (0.88 + 0.12 * depth).toFixed(3);
				const w = txt.length * 7.9 + 22;
				let dir = x >= CX ? 1 : -1;
				if (dir === 1 && x + 13 + w > VBMAX) dir = -1;
				if (dir === -1 && x - 13 - w < VBMIN) dir = 1;
				const bx = dir === 1 ? 13 : -13 - w;

				const g = el('g', { transform: `translate(${x.toFixed(1)},${y.toFixed(1)})`, opacity: 0 });
				g.appendChild(el('rect', { x: -SQ / 2, y: -SQ / 2, width: SQ, height: SQ, fill: COLORS[k], stroke: '#ffffff', 'stroke-width': 2, transform: `rotate(45) scale(${s})` }));
				g.appendChild(el('rect', { x: bx, y: -13, width: w, height: 26, rx: 2, fill: '#ffffff', stroke: INK, 'stroke-width': 1.2 }));
				const tx = el('text', { x: bx + w / 2, y: 4, 'text-anchor': 'middle', 'font-family': MONO, 'font-size': '12', 'font-weight': '500', 'letter-spacing': '1', fill: INK });
				tx.textContent = txt;
				g.appendChild(tx);
				tokLayer.appendChild(g);
				NODES.push({ layer: k, idx: i, g, cur: 0, target: 0 });
			});
		});

		ORDER.forEach((k) => {
			const h = el('ellipse', { cx: CX, cy: CY, rx: RX[k], ry: RY[k], fill: 'none', stroke: 'transparent', 'stroke-width': 32, class: 'vr-hit' });
			h.addEventListener('mouseenter', () => onHover(k));
			svg.appendChild(h);
		});
		svg.addEventListener('mouseleave', () => onLeave());

		let active = null, hovering = false, timers = [];
		const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
		const T = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
		const showTag = (k, i) => NODES.forEach((n) => { if (n.layer === k && n.idx === i) n.target = 1; });
		const showAll = (k) => NODES.forEach((n) => { n.target = n.layer === k ? 1 : 0; });
		const hideAll = () => NODES.forEach((n) => (n.target = 0));

		function runAuto(startIdx) {
			clearTimers();
			(function step(i) {
				const k = ORDER[i % ORDER.length];
				active = k;
				hideAll();
				TAGS[k].forEach((_, j) => T(() => showTag(k, j), LEAD + j * STAGGER));
				const revealEnd = LEAD + (TAGS[k].length - 1) * STAGGER;
				T(() => hideAll(), revealEnd + HOLD);
				T(() => { active = null; }, revealEnd + HOLD + FADE);
				T(() => step(i + 1), revealEnd + HOLD + FADE + GAP);
			})(startIdx);
		}
		function onHover(k) { hovering = true; clearTimers(); active = k; showAll(k); }
		function onLeave() {
			if (!hovering) return;
			hovering = false;
			const from = ORDER.indexOf(active);
			clearTimers(); hideAll(); active = null;
			T(() => runAuto((from + 1) % ORDER.length), RESUME);
		}

		let last = performance.now(), raf = 0;
		const frame = (now) => {
			const dt = Math.min(0.05, (now - last) / 1000); last = now;
			const kr = Math.min(1, dt * 3.2);
			const kt = Math.min(1, dt * 5.5);
			ORDER.forEach((k) => {
				const r = rings[k];
				const isA = active === k, other = active && !isA;
				const tHi = isA ? 1 : 0;
				const tBase = isA ? 0 : other ? 0.28 : 1;
				const tLab = isA ? 1 : other ? 0.18 : 1;
				r.hiOp += (tHi - r.hiOp) * kr;
				r.baseOp += (tBase - r.baseOp) * kr;
				r.labOp += (tLab - r.labOp) * kr;
				r.hi.setAttribute('opacity', r.hiOp.toFixed(3));
				r.base.setAttribute('opacity', r.baseOp.toFixed(3));
				r.label.setAttribute('opacity', r.labOp.toFixed(3));
			});
			NODES.forEach((n) => {
				n.cur += (n.target - n.cur) * kt;
				n.g.setAttribute('opacity', n.cur.toFixed(3));
			});
			raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);

		runAuto(0);

		return () => {
			cancelAnimationFrame(raf);
			clearTimers();
			root.innerHTML = '';
		};
	}, []);

	return <div ref={rootRef} style={{ width: '100%', display: 'block' }} />;
}
