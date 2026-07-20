'use client';

// STATIC REFERENCE ONLY — hardcoded homepage (content from src/lib/homeContent).
// The live, CMS-driven homepage is the `/` route (Storyblok). Keep this as a
// design reference / offline fallback; it is NOT the source of truth.

import { Footer } from '@/ds/components/navigation/Footer';
import { HomeNav, LogoMarquee, ValueProp, Ticker, Statement } from '@/components/home/HomeSections';
import Hero from '@/components/home/Hero';
import WhoWereLookingFor from '@/components/home/WhoWereLookingFor';
import InvestmentFocus from '@/components/home/InvestmentFocus';
import { EventCards, FeaturedPerspective, Newsletter } from '@/components/home/HomeLowerSections';
import FooterLogoMarquee from '@/components/home/FooterLogoMarquee';
import { footerCols } from '@/lib/homeContent';

export default function HomePreview() {
	return (
		<div className="vc-page">
			<HomeNav />
			<Hero />
			<LogoMarquee />
			<div id="a-value" />
			<ValueProp />
			<WhoWereLookingFor />
			<Ticker />
			<div id="a-statement" />
			<Statement />
			<div id="a-focus" />
			<InvestmentFocus />
			<div id="a-events" />
			<EventCards />
			<FeaturedPerspective />
			<div id="a-news" />
			<Newsletter />
			<Footer columns={footerCols} tagline="In it. Together." signature="" showBottom={false} />
			<FooterLogoMarquee />
		</div>
	);
}
