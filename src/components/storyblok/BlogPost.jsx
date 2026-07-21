import { storyblokEditable, renderRichText } from '@storyblok/react/rsc';
import { HomeNav } from '@/components/home/HomeSections';
import { Newsletter } from '@/components/home/HomeLowerSections';
import { Footer } from '@/ds/components/navigation/Footer';
import FooterLogoMarquee from '@/components/home/FooterLogoMarquee';
import { footerCols, footerTagline } from '@/lib/homeContent';

function assetUrl(a) {
	if (!a) return undefined;
	return typeof a === 'string' ? a : a.filename;
}

function formatDate(d) {
	if (!d) return '';
	const dt = new Date(String(d).replace(' ', 'T'));
	if (Number.isNaN(dt.getTime())) return String(d);
	return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' };

export default function BlogPost({ blok }) {
	const cover = assetUrl(blok.cover_image);
	return (
		<div className="vc-page" {...storyblokEditable(blok)}>
			<HomeNav />

			{/* Dark hero band — title, left-aligned, oversized serif */}
			<header style={{ background: 'var(--color-black)', color: 'var(--color-white)', padding: '150px var(--content-gutter) 72px', marginTop: '-76px' }}>
				<div style={{ maxWidth: 1100, margin: '0 auto' }}>
					<span style={{ ...mono, color: 'rgba(249,249,240,0.55)' }}>
						Blog{blok.date ? ` · ${formatDate(blok.date)}` : ''}
					</span>
					<h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.5rem, calc(1.2rem + 5vw), 5.5rem)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: '28px 0 0', maxWidth: '18ch' }}>
						{blok.title}
					</h1>
					{blok.author && (
						<div style={{ ...mono, color: 'rgba(249,249,240,0.55)', marginTop: 32 }}>By {blok.author}</div>
					)}
				</div>
			</header>

			{cover && (
				<div style={{ background: 'var(--accent-blue)', overflow: 'hidden' }}>
					<img src={cover} alt={blok.title || ''} style={{ width: '100%', maxHeight: 520, objectFit: 'cover', filter: 'grayscale(1)', display: 'block' }} />
				</div>
			)}

			{/* Body — narrow readable column, serif lead + rich text */}
			<article style={{ maxWidth: 680, margin: '0 auto', padding: '72px var(--content-gutter) 96px' }}>
				{blok.excerpt && (
					<p style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--color-black)', margin: '0 0 40px', textAlign: 'center' }}>
						{blok.excerpt}
					</p>
				)}
				<div className="vc-prose" dangerouslySetInnerHTML={{ __html: renderRichText(blok.body) }} />
				<div style={{ borderTop: '1px solid var(--border)', marginTop: 56, paddingTop: 28 }}>
					<a href="/blog" style={{ ...mono, color: 'var(--text-secondary)', textDecoration: 'none' }}>← More in Currents</a>
				</div>
			</article>

			<Newsletter />
			<Footer columns={footerCols} tagline={footerTagline} signature="" showBottom={false} />
			<FooterLogoMarquee />
		</div>
	);
}
