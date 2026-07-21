import { getStoryblokApi } from '@/lib/storyblok';
import { HomeNav } from '@/components/home/HomeSections';
import { Footer } from '@/ds/components/navigation/Footer';
import FooterLogoMarquee from '@/components/home/FooterLogoMarquee';
import { footerCols, footerTagline } from '@/lib/homeContent';

export const dynamic = 'force-dynamic';

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' };

function formatDate(d) {
	if (!d) return '';
	const dt = new Date(String(d).replace(' ', 'T'));
	return Number.isNaN(dt.getTime()) ? '' : dt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function PostCard({ story }) {
	const c = story.content || {};
	return (
		<a href={`/${story.full_slug}`} className="deep-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--border)', background: 'linear-gradient(to left, var(--accent-mint) 0%, var(--color-white) 42%)', textDecoration: 'none', color: 'var(--color-black)' }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '22px 24px 0' }}>
				<span style={{ ...mono, fontSize: 11, letterSpacing: '0.1em' }}>The VC Perspective</span>
				<span style={{ ...mono, fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>{formatDate(c.date)}</span>
			</div>
			<h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 33, lineHeight: 1.02, letterSpacing: '-0.02em', margin: 0, padding: '36px 24px 18px' }}>{c.title}</h3>
			<div style={{ padding: '0 24px 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
				<p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', lineHeight: 1.55, color: 'rgba(15,14,11,0.66)', margin: 0 }}>{c.excerpt}</p>
				<span style={{ marginTop: 'auto', ...mono, fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
					Read
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 12H1.5" /><path d="M22.5 12C18.64 12 15.5 8.86 15.5 5" /><path d="M22.5 12C18.64 12 15.5 15.14 15.5 19" /></svg>
				</span>
			</div>
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
			<section style={{ padding: '128px var(--content-gutter) 96px', minHeight: '60vh' }}>
				<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, borderBottom: '1px solid var(--border)', paddingBottom: 20, marginBottom: 48 }}>
					<h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'var(--text-5xl)', letterSpacing: '-0.02em', margin: 0 }}>Currents</h1>
					<span style={{ ...mono, color: 'var(--text-secondary)' }}>{stories.length} {stories.length === 1 ? 'post' : 'posts'}</span>
				</div>
				{stories.length === 0 ? (
					<p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>No posts yet.</p>
				) : (
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, alignItems: 'stretch' }}>
						{stories.map((s) => (
							<PostCard key={s.uuid} story={s} />
						))}
					</div>
				)}
			</section>
			<Footer columns={footerCols} tagline={footerTagline} signature="" showBottom={false} />
			<FooterLogoMarquee />
		</div>
	);
}
