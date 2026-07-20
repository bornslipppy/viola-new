'use client';

import { useEffect, useRef } from 'react';
import { sectorMarks } from '@/lib/sectorMarks';
import { investmentFocus } from '@/lib/homeContent';

// Resolve each sector's isometric SVG (design, kept in code) by matching its
// name to the extracted marks — so CMS sectors only carry name + description.
function resolveMarks(sectors) {
	const list = sectors && sectors.length ? sectors : sectorMarks;
	return list.map((s) => {
		const mark = sectorMarks.find((m) => m.name === s.name);
		return { name: s.name, description: s.description ?? s.desc ?? '', svgInner: s.svgInner || mark?.svgInner || '', editable: s.editable };
	});
}

const eyebrow = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 10,
	fontFamily: 'var(--font-mono)',
	fontSize: 'var(--text-xs)',
	textTransform: 'uppercase',
	letterSpacing: '0.04em',
	color: 'var(--text-secondary)',
	marginBottom: 24,
};

const arrowSvg = (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M22.5 12H1.5" />
		<path d="M22.5 12C18.64 12 15.5 8.86 15.5 5" />
		<path d="M22.5 12C18.64 12 15.5 15.14 15.5 19" />
	</svg>
);

export default function InvestmentFocus({ content = investmentFocus, sectors, editable }) {
	const gridRef = useRef(null);
	const marks = resolveMarks(sectors);

	// Pointer-driven parallax tilt on each mark (ported from initSectorMarks).
	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;
		const tiles = [...grid.querySelectorAll('.vv-mark-tile')];
		const cleanups = tiles.map((tile) => {
			const mark = tile.querySelector('.vv-mark');
			if (!mark) return () => {};
			const move = (e) => {
				const r = tile.getBoundingClientRect();
				mark.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5) * 2);
				mark.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5) * 2);
			};
			const leave = () => {
				mark.style.setProperty('--mx', 0);
				mark.style.setProperty('--my', 0);
			};
			tile.addEventListener('pointermove', move);
			tile.addEventListener('pointerleave', leave);
			return () => {
				tile.removeEventListener('pointermove', move);
				tile.removeEventListener('pointerleave', leave);
			};
		});
		return () => cleanups.forEach((c) => c());
	}, []);

	return (
		<section {...editable} style={{ padding: '80px var(--content-gutter) 110px', background: 'var(--color-white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
			<div style={{ textAlign: 'center', maxWidth: '62ch', margin: '0 auto 56px' }}>
				<span style={eyebrow}>
					<span style={{ width: 9, height: 9, background: 'var(--color-black)', transform: 'rotate(45deg)', display: 'inline-block' }} />
					{content.eyebrow}
				</span>
				<h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.75rem, calc(1.4rem + 5vw), 4.75rem)', lineHeight: 1.06, letterSpacing: '-0.02em', margin: 0 }}>
					{content.heading}
				</h2>
				<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: '24px auto 0' }}>
					{content.intro}
				</p>
			</div>

			<div ref={gridRef} className="viola-marks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 8 }}>
				{marks.map((s, i) => (
					<a key={s.name || i} {...s.editable} href="#" className="deep-card vv-mark-tile" tabIndex={0} style={{ textDecoration: 'none', color: 'var(--color-black)', display: 'flex', flexDirection: 'column', aspectRatio: 1, background: 'var(--color-white)', border: '1px solid var(--border)', padding: 24, transition: 'background 0.15s cubic-bezier(.4,0,.2,1)' }}>
						<div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 18 }}>
							{s.svgInner && (
								<div style={{ width: 118, maxWidth: '56%' }}>
									<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="vv-mark vv-draw-hover vv-tilt vv-breathe vv-ghost" role="img" aria-label={s.name} dangerouslySetInnerHTML={{ __html: s.svgInner }} />
								</div>
							)}
						</div>
						<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 4 }}>
								<span style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-2xl)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>{s.name}</span>
								<span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 1.5, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.description}</span>
							</div>
							<span className="deep-arrow" style={{ position: 'relative', overflow: 'hidden', zIndex: 0, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: 1, height: 36, border: '1px solid var(--border)', borderRadius: 999, transition: 'color 0.15s' }}>
								<span className="deep-arrow__sweep" style={{ display: 'block', zIndex: -1, position: 'absolute', inset: 0, borderRadius: 999, transform: 'scaleX(0)', transformOrigin: 'right', transition: 'transform 0.15s cubic-bezier(.4,0,.2,1)', background: 'var(--color-black)' }} />
								{arrowSvg}
							</span>
						</div>
					</a>
				))}
				<p style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'flex-end', fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0, padding: 24, boxSizing: 'border-box' }}>
					{content.closing}
				</p>
			</div>
		</section>
	);
}
