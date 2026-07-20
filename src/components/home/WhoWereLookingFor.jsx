'use client';

import { useEffect, useRef } from 'react';
import { Tag } from '@/ds/components/content/Tag';
import { lookingFor } from '@/lib/homeContent';

const eyebrow = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 10,
	fontFamily: 'var(--font-mono)',
	fontSize: 'var(--text-xs)',
	textTransform: 'uppercase',
	letterSpacing: '0.04em',
	color: 'rgba(15,14,11,0.65)',
	marginBottom: 24,
};

// Scroll-driven "stackable" shrink: each media panel maps its own scroll
// progress to scale(1 -> 0.8), derived from a stable document-space top so it
// keeps animating even while stuck under the next panel. (Ported from the
// original initStackable().)
function useStackableScale(refs) {
	useEffect(() => {
		let raf = null;
		const layoutTopOf = (slide, scrollY) => {
			const section = slide.closest('section');
			if (!section) return slide.getBoundingClientRect().top + scrollY;
			const secTop = section.getBoundingClientRect().top + scrollY;
			let acc = 0;
			for (const child of section.children) {
				if (child === slide) return secTop + acc;
				acc += child.offsetHeight;
			}
			return secTop + acc;
		};
		const update = () => {
			const scrollY = window.scrollY || window.pageYOffset;
			const vh = window.innerHeight;
			for (const el of refs.current) {
				if (!el) continue;
				const slide = el.closest('[data-stackable-slide]') || el.parentElement;
				if (!slide) continue;
				const layoutTop = layoutTopOf(slide, scrollY);
				const layoutH = slide.offsetHeight;
				const start = layoutTop - vh;
				const end = layoutTop + layoutH;
				const p = end <= start ? 0 : Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
				el.style.scale = (1 - p * 0.2).toFixed(4);
			}
		};
		const onScroll = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = null;
				update();
			});
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [refs]);
}

export default function WhoWereLookingFor({ content = lookingFor, editable }) {
	const mediaRefs = useRef([]);
	useStackableScale(mediaRefs);
	const people = content.people || [];

	return (
		<section {...editable} style={{ background: 'var(--accent-blue)', color: 'var(--color-black)' }}>
			<div style={{ padding: '56px var(--content-gutter)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
				<span style={eyebrow}>
					<span style={{ width: 9, height: 9, background: 'var(--color-black)', transform: 'rotate(45deg)', display: 'inline-block' }} />
					{content.eyebrow}
				</span>
				<h2
					style={{
						fontFamily: 'var(--font-serif)',
						fontWeight: 300,
						fontSize: 'clamp(2.75rem, calc(1.4rem + 5vw), 4.75rem)',
						lineHeight: 1.06,
						letterSpacing: '-0.02em',
						margin: 0,
					}}
				>
					{content.heading[0]}
					<br />
					{content.heading[1]}
				</h2>
			</div>

			{people.map((p, i) => (
				<div
					key={p.title}
					{...p.editable}
					data-stackable-slide
					style={{
						position: 'sticky',
						top: 0,
						background: 'var(--accent-blue)',
						minHeight: '100vh',
						padding: '0 var(--content-gutter)',
						boxSizing: 'border-box',
					}}
				>
					<div
						style={{
							borderTop: '1px solid rgba(15,14,11,0.2)',
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: 56,
							alignItems: 'start',
							padding: '64px 0 90px',
						}}
					>
						<div style={{ position: 'sticky', top: 64 }}>
							<span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'rgba(15,14,11,0.6)' }}>
								{p.num}
							</span>
							<h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(2.25rem,3.6vw,3.5rem)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: '22px 0 0', maxWidth: '14ch' }}>
								{p.title}
							</h3>
							<span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'rgba(15,14,11,0.65)', marginTop: 18 }}>
								{p.tagline}
							</span>
							{p.status && (
								<div style={{ marginTop: 14 }}>
									<Tag variant="lime">{p.status}</Tag>
								</div>
							)}
							<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', lineHeight: 1.55, color: 'rgba(15,14,11,0.72)', margin: '26px 0 0', maxWidth: '38ch' }}>
								{p.desc}
							</p>
						</div>
						<div style={{ position: 'relative', overflow: 'hidden', background: '#2E5C82', height: 'calc(100vh - 154px)', maxHeight: 760 }}>
							<div
								ref={(el) => (mediaRefs.current[i] = el)}
								className="stackable-media"
								style={{ position: 'absolute', top: 0, left: 0, width: '125%', height: '125%', marginLeft: '-12.5%', scale: 1 }}
							>
								<img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)', display: 'block' }} />
							</div>
							<div className="viola-edge-glow" />
						</div>
					</div>
				</div>
			))}
		</section>
	);
}
