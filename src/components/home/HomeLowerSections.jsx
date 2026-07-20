'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/ds/components/actions/Button';
import { Pattern } from '@/ds/components/backgrounds/Pattern';
import { events, featured, newsletter } from '@/lib/homeContent';

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em' };
const serifQuote = { fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-2xl)', lineHeight: 1.32, letterSpacing: '-0.01em', margin: 0 };

const eventDiamond = [
	{ shape: 'diamond', size: 22, x: 0, y: 0, phase: 'odd' },
	{ shape: 'diamond', size: 8, x: 0, y: 0, phase: 'even' },
];

// Subtle scroll parallax for a testimonial image (ported from the source
// initParallax; applied to any card image).
function useParallax(refs) {
	useEffect(() => {
		let raf = null;
		const update = () => {
			const vh = window.innerHeight;
			for (const img of refs.current) {
				if (!img) continue;
				const wrap = img.parentElement;
				if (!wrap) continue;
				const rect = wrap.getBoundingClientRect();
				if (rect.bottom < -200 || rect.top > vh + 200) continue;
				const c = Math.max(0, Math.min(1, (vh - (rect.top + rect.height / 2)) / vh));
				const translate = (0.5 - c) * 34 + 18;
				const scale = 1.32 - c * 0.12;
				img.style.transform = `translate3d(0,${translate.toFixed(2)}px,0) scale(${scale.toFixed(3)})`;
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
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', update);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [refs]);
}

function MetaRow({ label, value }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px 0', borderTop: '1px solid var(--border)', ...mono }}>
			<span style={{ color: 'var(--text-secondary)' }}>{label}</span>
			<span style={{ textAlign: 'right' }}>{value}</span>
		</div>
	);
}

/* ---- Event / testimonial cards (horizontal scroll), CMS-driven ---- */
export function EventCards({ content = events, editable }) {
	const imgRefs = useRef([]);
	useParallax(imgRefs);
	const cardW = 'calc(100% - var(--content-gutter) - 60px)';
	const cards = content.cards || [];

	return (
		<section {...editable} style={{ padding: '110px 0 110px var(--content-gutter)' }}>
			<div className="vc-hidescroll" style={{ display: 'flex', gap: 24, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingRight: 'calc(var(--content-gutter) - 60px)' }}>
				{cards.map((card, i) => {
					const accent = card.accent === 'mint' ? 'var(--accent-mint)' : 'var(--accent-blue)';
					return (
						<div key={i} {...card.editable} style={{ scrollSnapAlign: 'start', flex: 'none', width: cardW, display: 'grid', gridTemplateColumns: '0.32fr 1.2fr 1.1fr', minHeight: 560, border: '1px solid var(--border)' }}>
							<div style={{ background: accent, color: 'var(--color-black)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 44px' }}>
								<h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>{card.title}</h3>
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<MetaRow label="Who" value={card.who} />
									<MetaRow label="Role" value={card.role} />
								</div>
							</div>
							<div style={{ background: accent, color: 'var(--color-black)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16, padding: '48px 44px' }}>
								<span style={{ ...mono, letterSpacing: '0.06em' }}>
									{card.eyebrow} <span style={{ color: 'rgba(15,14,11,0.55)' }}>- {card.category}</span>
								</span>
								<p style={{ ...serifQuote, whiteSpace: 'pre-line' }}>{card.quote}</p>
							</div>
							<div style={{ position: 'relative', overflow: 'hidden', background: card.image ? 'var(--color-black)' : accent }}>
								{card.image ? (
									<img ref={(el) => (imgRefs.current[i] = el)} src={card.image} alt={card.who} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', filter: 'grayscale(1)', willChange: 'transform', transform: 'scale(1.19)' }} />
								) : (
									<Pattern preset="lens-column" color="mint" columns={16} figures={eventDiamond} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
								)}
								{card.image && <div className="viola-edge-glow" />}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

/* ---- Featured perspective (blog cards), CMS-driven ---- */
export function FeaturedPerspective({ content = featured, editable }) {
	const posts = content.posts || [];
	return (
		<section {...editable} style={{ padding: '0 var(--content-gutter) 110px' }}>
			<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, borderBottom: '1px solid var(--border)', paddingBottom: 20, marginBottom: 48 }}>
				<h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-4xl)', letterSpacing: '-0.02em', margin: 0 }}>{content.heading}</h2>
				<span style={{ ...mono, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>{content.label}</span>
			</div>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, alignItems: 'stretch' }}>
				{posts.map((p, i) => (
					<article key={i} {...p.editable} className="deep-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--border)', background: 'linear-gradient(to left, var(--accent-mint) 0%, var(--color-white) 42%)' }}>
						<div style={{ position: 'relative', overflow: 'hidden', color: 'var(--color-black)', display: 'flex', flexDirection: 'column' }}>
							<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '22px 24px 0' }}>
								<span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.tag}</span>
							</div>
							<h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 33, lineHeight: 1, letterSpacing: '-0.02em', margin: 0, padding: '40px 24px 22px' }}>{p.title}</h3>
						</div>
						<div style={{ color: 'var(--color-black)', padding: '18px 24px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
							<h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 'var(--text-lg)', lineHeight: 1.55, color: 'rgba(15,14,11,0.66)', margin: 0 }}>{p.subtitle}</h4>
							<div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(15,14,11,0.66)' }}>
								<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
									<span>{p.readTime}</span>
								</span>
								<span className="deep-arrow" style={{ position: 'relative', overflow: 'hidden', zIndex: 0, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: 1, height: 36, border: '1px solid var(--border)', borderRadius: 999, transition: 'color 0.15s' }}>
									<span className="deep-arrow__sweep" style={{ display: 'block', zIndex: -1, position: 'absolute', inset: 0, borderRadius: 999, transform: 'scaleX(0)', transformOrigin: 'right', transition: 'transform 0.15s cubic-bezier(.4,0,.2,1)', background: 'var(--color-black)' }} />
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 12H1.5" /><path d="M22.5 12C18.64 12 15.5 8.86 15.5 5" /><path d="M22.5 12C18.64 12 15.5 15.14 15.5 19" /></svg>
								</span>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

/* ---- Newsletter (rotating 3D logo video), CMS-driven ---- */
export function Newsletter({ content = newsletter, editable }) {
	return (
		<section {...editable} style={{ padding: '56px var(--content-gutter)', background: 'linear-gradient(to right, var(--color-white) 65%, var(--accent-lime) 150%)', borderTop: '1px solid var(--border)' }}>
			<div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
				<video
					src="/viola-assets/logo-3d-rotate_1080_alpha.webm"
					poster="/viola-assets/logo-3d-rotate_poster.png"
					autoPlay
					muted
					loop
					playsInline
					aria-hidden="true"
					style={{ width: 240, aspectRatio: 1, display: 'block', margin: '-28px auto -28px', transform: 'rotate(-12deg)' }}
				/>
				<h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-4xl)', letterSpacing: '-0.02em', margin: 0 }}>{content.heading}</h2>
				<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', lineHeight: 1.5, color: 'var(--text-secondary)', margin: '18px 0 0' }}>
					{content.paragraph}
				</p>
				<form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-100)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: '8px 8px 8px 26px', maxWidth: 460, margin: '28px auto 0' }}>
					<input placeholder={content.inputPlaceholder} type="email" style={{ flex: 1, border: 0, background: 'none', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--inverted-100)', outline: 'none' }} />
					<Button variant="primary">{content.cta}</Button>
				</form>
			</div>
		</section>
	);
}
