'use client';

import { NavBar } from '@/ds/components/navigation/NavBar';
import { Marquee } from '@/ds/components/feedback/Marquee';
import { Button } from '@/ds/components/actions/Button';
import { ViolaFunnel } from '@/components/home/ViolaFunnel';
import { ViolaRings } from '@/components/home/ViolaRings';
import { navItems, codeLogos, valueProp, statement, tickerText } from '@/lib/homeContent';

/* ---- Sticky pill header + investor login (page chrome, not a blok) ---- */
export function HomeNav() {
	return (
		<div style={{ position: 'sticky', top: 16, zIndex: 60, display: 'flex', justifyContent: 'center', padding: '0 var(--content-gutter)', pointerEvents: 'none' }}>
			<div style={{ pointerEvents: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
				<NavBar items={navItems} glass fit showCta={false} />
				<a href="#" className="nav-login" style={{ position: 'absolute', right: 0 }}>
					Investor Login
				</a>
			</div>
		</div>
	);
}

/* ---- Portfolio logo marquee, styled as code on a dark band ---- */
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace", fontSize: 15, letterSpacing: '0.02em', fontWeight: 400 };
function codeItem(name, i) {
	return (
		<span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 12, whiteSpace: 'nowrap' }}>
			<span style={{ ...mono, color: 'rgba(249,249,240,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
			<span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
				<span style={{ ...mono, color: 'var(--color-mint)' }}>{'{ '}</span>
				<span style={{ ...mono, color: 'var(--color-blue)' }}>firm</span>
				<span style={{ ...mono, color: 'rgba(249,249,240,0.5)' }}>: </span>
				<span style={{ ...mono, color: 'var(--color-lime)' }}>&quot;{name}&quot;</span>
				<span style={{ ...mono, color: 'var(--color-mint)' }}>{' }'}</span>
				<span style={{ ...mono, color: 'rgba(249,249,240,0.5)' }}>,</span>
			</span>
		</span>
	);
}

export function LogoMarquee({ logos = codeLogos, editable }) {
	return (
		<section {...editable} style={{ padding: '26px var(--content-gutter)', background: 'var(--color-black)', borderBottom: '1px solid var(--border)' }}>
			<Marquee items={logos.map(codeItem)} separator="" gap={56} speed={45} />
		</section>
	);
}

/* ---- Value proposition (dark band + funnel) ---- */
export function ValueProp({ content = valueProp, editable }) {
	return (
		<section {...editable} style={{ color: 'var(--color-black)', padding: 0 }}>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', position: 'relative' }}>
				<div style={{ position: 'absolute', top: 80, bottom: 80, left: '50%', width: 1, background: 'var(--border)', zIndex: 1 }} />
				<div style={{ background: '#F7F8EC', padding: '16px var(--content-gutter) 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.75rem, calc(1.4rem + 5vw), 4.75rem)', lineHeight: 1.06, letterSpacing: '-0.02em', color: 'rgb(15,14,11)', margin: 0, maxWidth: '12ch' }}>
						{content.heading}
					</h2>
					<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', lineHeight: 1.5, color: 'rgba(15,14,11,0.72)', margin: '32px 0 32px', maxWidth: '44ch' }}>
						{content.paragraph}
					</p>
					<Button variant="primary" trailingCircle icon="arrow-forward" style={{ width: 180, justifyContent: 'space-between' }}>
						{content.cta}
					</Button>
				</div>
				<div style={{ background: '#F7F8EC', padding: '16px var(--content-gutter) 36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<ViolaFunnel />
				</div>
			</div>
		</section>
	);
}

/* ---- Inner-circle ticker (oversized serif marquee) ---- */
function tickerItem(text) {
	return (
		<span style={{ fontFamily: 'var(--font-serif)', fontWeight: 335, fontSize: 120, lineHeight: '114px', letterSpacing: '-0.02em', color: 'var(--text-primary)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 60 }}>
			{text}
			<span style={{ width: 10, height: 10, borderRadius: '50%', background: 'currentColor', flex: 'none', display: 'block' }} />
		</span>
	);
}

export function Ticker({ text = tickerText, editable }) {
	return (
		<section {...editable} style={{ background: '#CCFBC9', padding: '60px 0', overflow: 'hidden' }}>
			<Marquee items={[0, 1, 2, 3].map(() => tickerItem(text))} variant="serif" speed={30} gap={60} separator="" />
		</section>
	);
}

/* ---- Inner-circle statement + rings ---- */
export function Statement({ content = statement, editable }) {
	return (
		<section {...editable} style={{ padding: '64px var(--content-gutter)' }}>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
				<div>
					<p style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.28, letterSpacing: '-0.015em', margin: 0 }}>
						{content.lead}
					</p>
					<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: '32px 0 28px', maxWidth: '46ch' }}>
						{content.body}
					</p>
					<Button variant="primary" trailingCircle icon="arrow-forward">
						{content.cta}
					</Button>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<ViolaRings />
				</div>
			</div>
		</section>
	);
}
