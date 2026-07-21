import { getStoryblokApi } from '@/lib/storyblok';
import { HomeNav } from '@/components/home/HomeSections';
import { Newsletter } from '@/components/home/HomeLowerSections';
import { Footer } from '@/ds/components/navigation/Footer';
import FooterLogoMarquee from '@/components/home/FooterLogoMarquee';
import { footerCols, footerTagline } from '@/lib/homeContent';

export const dynamic = 'force-dynamic';

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' };
const ACCENTS = ['var(--accent-mint)', 'var(--accent-blue)', 'var(--accent-lime)', 'var(--color-cream)'];

function formatDate(d) {
	if (!d) return '';
	const dt = new Date(String(d).replace(' ', 'T'));
	return Number.isNaN(dt.getTime()) ? '' : dt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const arrow = (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M22.5 12H1.5" /><path d="M22.5 12C18.64 12 15.5 8.86 15.5 5" /><path d="M22.5 12C18.64 12 15.5 15.14 15.5 19" />
	</svg>
);

function PostCard({ story, i }) {
	const c = story.content || {};
	const accent = ACCENTS[i % ACCENTS.length];
	return (
		<a href={`/${story.full_slug}`} className="deep-card" style={{ display: 'flex', flexDirection: 'column', minHeight: 320, background: accent, color: 'var(--color-black)', border: '1px solid var(--border)', textDecoration: 'none', padding: '24px 24px 20px' }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
				<span style={{ ...mono }}>Blog</span>
				<span style={{ ...mono, color: 'rgba(15,14,11,0.55)' }}>{formatDate(c.date)}</span>
			</div>
			<h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(1.75rem, 2.2vw, 2.25rem)', lineHeight: 1.02, letterSpacing: '-0.02em', margin: '28px 0 0', flex: 'none' }}>
				{c.title}
			</h3>
			<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 1.5, color: 'rgba(15,14,11,0.66)', margin: '14px 0 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
				{c.excerpt}
			</p>
			<span style={{ marginTop: 'auto', paddingTop: 20, ...mono, color: 'rgba(15,14,11,0.66)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
				Read {arrow}
			</span>
		</a>
	);
}

export default async function BlogIndex() {
	const api = getStoryblokApi();
	let stories = [];
	try {
		const { data } = await api.get('cdn/stories', {
			version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
			starts_with: 'blog/',
			content_type: 'blog_post',
			per_page: 100,
			sort_by: 'content.date:desc',
		});
		stories = data.stories || [];
	} catch {
		stories = [];
	}

	return (
		<div className="vc-page">
			<HomeNav />

			{/* Header */}
			<section style={{ padding: '150px var(--content-gutter) 8px', marginTop: '-76px', background: 'var(--surface-100)' }}>
				<div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end' }}>
					<h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.75rem, calc(1.4rem + 5vw), 5rem)', lineHeight: 1.0, letterSpacing: '-0.02em', margin: 0 }}>
						Currents
					</h1>
					<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
						Perspectives on the moves that change a company&apos;s trajectory — from the first spark to velocity. Less noise, more signal.
					</p>
				</div>
			</section>

			{/* Card grid */}
			<section style={{ padding: '48px var(--content-gutter) 96px', minHeight: '40vh' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid var(--border)', paddingTop: 24, marginBottom: 32 }}>
					<span style={{ ...mono, color: 'var(--color-black)' }}>All Posts</span>
					<span style={{ ...mono, color: 'var(--text-secondary)' }}>{stories.length}</span>
				</div>
				{stories.length === 0 ? (
					<p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>No posts yet.</p>
				) : (
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
						{stories.map((s, i) => (
							<PostCard key={s.uuid} story={s} i={i} />
						))}
					</div>
				)}
			</section>

			<Newsletter />
			<Footer columns={footerCols} tagline={footerTagline} signature="" showBottom={false} />
			<FooterLogoMarquee />
		</div>
	);
}
