import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';
import { HomeNav } from '@/components/home/HomeSections';
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
			<article style={{ maxWidth: 760, margin: '0 auto', padding: '128px var(--content-gutter) 96px' }}>
				<a href="/blog" style={{ ...mono, color: 'var(--text-secondary)', textDecoration: 'none' }}>
					← Currents / Blog
				</a>
				<h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'var(--text-5xl)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-black)', margin: '24px 0 0' }}>
					{blok.title}
				</h1>
				<div style={{ ...mono, color: 'var(--text-secondary)', marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
					{blok.author && <span>{blok.author}</span>}
					{blok.author && blok.date && <span style={{ opacity: 0.5 }}>·</span>}
					{blok.date && <span>{formatDate(blok.date)}</span>}
				</div>
				{cover && (
					<img src={cover} alt={blok.title || ''} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', filter: 'grayscale(1)', margin: '40px 0 8px', display: 'block' }} />
				)}
				<div className="vc-prose">
					<StoryblokServerRichText doc={blok.body} />
				</div>
			</article>
			<Footer columns={footerCols} tagline={footerTagline} signature="" showBottom={false} />
			<FooterLogoMarquee />
		</div>
	);
}
