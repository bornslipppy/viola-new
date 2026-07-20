import Feature from '@/components/Feature';
import Grid from '@/components/Grid';
import Teaser from '@/components/Teaser';
import PageBlok from '@/components/storyblok/PageBlok';
import HeroBlok from '@/components/storyblok/HeroBlok';
import {
	LogoMarqueeBlok,
	ValuePropBlok,
	TickerBlok,
	StatementBlok,
	LookingForBlok,
	InvestmentFocusBlok,
	EventCardsBlok,
	FeaturedPerspectiveBlok,
	NewsletterBlok,
} from '@/components/storyblok/blocks';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

// Token separation: the server uses the PREVIEW token (draft access) and it is
// never sent to the browser; the client bundle only ever sees the PUBLIC token
// (published content only), which is safe to expose.
const accessToken =
	typeof window === 'undefined'
		? process.env.STORYBLOK_DELIVERY_API_TOKEN
		: process.env.STORYBLOK_PUBLIC_TOKEN;

export const getStoryblokApi = storyblokInit({
	accessToken,
	use: [apiPlugin],
	components: {
		// Blueprint starter bloks (kept for any legacy demo content)
		feature: Feature,
		grid: Grid,
		teaser: Teaser,
		// Viola homepage bloks
		page: PageBlok,
		hero: HeroBlok,
		logo_marquee: LogoMarqueeBlok,
		value_prop: ValuePropBlok,
		looking_for: LookingForBlok,
		ticker: TickerBlok,
		statement: StatementBlok,
		investment_focus: InvestmentFocusBlok,
		event_cards: EventCardsBlok,
		featured_perspective: FeaturedPerspectiveBlok,
		newsletter: NewsletterBlok,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
