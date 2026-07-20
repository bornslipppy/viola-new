'use client';

import { storyblokEditable } from '@storyblok/react';
import { LogoMarquee, ValueProp, Ticker, Statement } from '@/components/home/HomeSections';
import WhoWereLookingFor from '@/components/home/WhoWereLookingFor';
import InvestmentFocus from '@/components/home/InvestmentFocus';
import { EventCards, FeaturedPerspective, Newsletter } from '@/components/home/HomeLowerSections';

const splitLines = (s) =>
	s
		? String(s)
				.split(/[\n,]/)
				.map((x) => x.trim())
				.filter(Boolean)
		: [];

export function LogoMarqueeBlok({ blok }) {
	return <LogoMarquee logos={splitLines(blok.logos)} editable={storyblokEditable(blok)} />;
}

export function ValuePropBlok({ blok }) {
	return <ValueProp content={{ heading: blok.heading, paragraph: blok.paragraph, cta: blok.cta }} editable={storyblokEditable(blok)} />;
}

export function TickerBlok({ blok }) {
	return <Ticker text={blok.text} editable={storyblokEditable(blok)} />;
}

export function StatementBlok({ blok }) {
	return <Statement content={{ lead: blok.lead, body: blok.body, cta: blok.cta }} editable={storyblokEditable(blok)} />;
}

export function LookingForBlok({ blok }) {
	const list = blok.people || [];
	const content = {
		eyebrow: blok.eyebrow,
		heading: [blok.heading_line1, blok.heading_line2],
		people: list.map((p, i) => ({
			title: p.title,
			tagline: p.tagline,
			status: p.status || undefined,
			img: p.image,
			desc: p.description,
			num: `${String(i + 1).padStart(2, '0')} / ${list.length}`,
			editable: storyblokEditable(p),
		})),
	};
	return <WhoWereLookingFor content={content} editable={storyblokEditable(blok)} />;
}

export function InvestmentFocusBlok({ blok }) {
	const content = { eyebrow: blok.eyebrow, heading: blok.heading, intro: blok.intro, closing: blok.closing };
	const sectors = (blok.sectors || []).map((s) => ({ name: s.name, description: s.description, editable: storyblokEditable(s) }));
	return <InvestmentFocus content={content} sectors={sectors} editable={storyblokEditable(blok)} />;
}

export function EventCardsBlok({ blok }) {
	const cards = (blok.cards || []).map((c) => ({
		accent: c.accent,
		title: c.title,
		who: c.who,
		role: c.role,
		eyebrow: c.eyebrow,
		category: c.category,
		image: c.image || '',
		quote: c.quote,
		editable: storyblokEditable(c),
	}));
	return <EventCards content={{ cards }} editable={storyblokEditable(blok)} />;
}

export function FeaturedPerspectiveBlok({ blok }) {
	const posts = (blok.posts || []).map((p) => ({ tag: p.tag, title: p.title, subtitle: p.subtitle, readTime: p.read_time, editable: storyblokEditable(p) }));
	return <FeaturedPerspective content={{ heading: blok.heading, label: blok.label, posts }} editable={storyblokEditable(blok)} />;
}

export function NewsletterBlok({ blok }) {
	const content = { heading: blok.heading, paragraph: blok.paragraph, inputPlaceholder: blok.input_placeholder, cta: blok.cta };
	return <Newsletter content={content} editable={storyblokEditable(blok)} />;
}
