import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';
import { Footer } from '@/ds/components/navigation/Footer';
import { HomeNav } from '@/components/home/HomeSections';
import FooterLogoMarquee from '@/components/home/FooterLogoMarquee';
import { footerCols, footerTagline } from '@/lib/homeContent';

// Root page blok: the Viola shell (nav + section body + footer + logo marquee).
// The section bloks in `body` render through the Storyblok pipeline.
export default function PageBlok({ blok }) {
	return (
		<div className="vc-page">
			<HomeNav />
			<main {...storyblokEditable(blok)}>
				{(blok.body || []).map((nested) => (
					<StoryblokServerComponent blok={nested} key={nested._uid} />
				))}
			</main>
			<Footer columns={footerCols} tagline={footerTagline} signature="" showBottom={false} />
			<FooterLogoMarquee />
		</div>
	);
}
