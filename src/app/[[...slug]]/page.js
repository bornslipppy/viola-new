import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Page({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';

	// Live site serves published content; local dev sees drafts. (The Visual
	// Editor still previews drafts via the bridge.)
	const sbParams = {
		version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
	};

	const storyblokApi = getStoryblokApi();
	let data;
	try {
		({ data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams));
	} catch (err) {
		// Unknown slug (Storyblok 404) → render Next's 404 instead of a 500.
		notFound();
	}

	return <StoryblokStory story={data.story} />;
}
