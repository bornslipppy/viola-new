'use client';

import { storyblokEditable } from '@storyblok/react';
import Hero from '@/components/home/Hero';

// Maps a Storyblok `hero` blok to the content shape the Hero section expects.
// Asset fields arrive as objects ({ filename, alt, ... }); plain strings are
// tolerated for mock/preview data.
function assetUrl(a) {
	if (!a) return undefined;
	return typeof a === 'string' ? a : a.filename;
}

export default function HeroBlok({ blok }) {
	const content = {
		leadIn: blok.lead_in,
		trailing: blok.trailing,
		paragraph: blok.paragraph,
		inputPlaceholder: blok.input_placeholder,
		founders: (blok.founders || []).map((f) => ({
			img: assetUrl(f.image),
			caption: f.caption,
			dim: !!f.dim,
			objectPosition: f.object_position || undefined,
			editable: storyblokEditable(f),
		})),
	};
	const words = blok.rotating_words
		? String(blok.rotating_words)
				.split(/[\n,]/)
				.map((s) => s.trim())
				.filter(Boolean)
		: undefined;

	return <Hero content={content} words={words} editable={storyblokEditable(blok)} />;
}
