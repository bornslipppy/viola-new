'use client';

import { footerLogoGradient, footerLogoGroup } from '@/lib/footerLogo';

const defsHtml = `<defs>${footerLogoGradient}${footerLogoGroup}</defs>`;

export default function FooterLogoMarquee() {
	return (
		<div aria-hidden="true" style={{ width: '100%', overflow: 'hidden', background: 'var(--color-black)', userSelect: 'none', pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
			<svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: defsHtml }} />
			<div className="footer-marquee-track">
				{[0, 1, 2, 3].map((i) => (
					<svg key={i} className="footer-marquee-logo" viewBox="0 0 1101 156" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
						<use href="#viola-footer-logo" />
					</svg>
				))}
			</div>
			<div style={{ position: 'absolute', left: 'var(--content-gutter)', right: 'var(--content-gutter)', bottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, color: 'rgba(249,249,240,0.5)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
				<span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<img src="/viola-assets/viola-secondary-logo.svg" alt="" style={{ height: 18, width: 'auto', display: 'block', opacity: 0.5 }} />
					<span>
						<span style={{ fontFamily: 'var(--font-sans)' }}>©</span> 2026 Viola Ventures
					</span>
				</span>
				<span style={{ display: 'flex', gap: 28, pointerEvents: 'auto' }}>
					<a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
					<a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
					<a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookies Settings</a>
				</span>
			</div>
		</div>
	);
}
