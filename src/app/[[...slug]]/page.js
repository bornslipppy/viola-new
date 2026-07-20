import { createHash } from 'node:crypto';
import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

// Verify a request genuinely comes from the Storyblok Visual Editor by checking
// the signed `_storyblok_tk` param: SHA1(spaceId:previewToken:timestamp). Only
// then do we serve draft content — so the public can't force drafts with a
// bare query param. (https://www.storyblok.com/docs/guide/in-depth/preview)
function isEditorRequest(sp) {
	let spaceId, timestamp, token;
	const tk = sp._storyblok_tk;
	if (tk && typeof tk === 'object') {
		({ space_id: spaceId, timestamp, token } = tk);
	} else {
		spaceId = sp['_storyblok_tk[space_id]'];
		timestamp = sp['_storyblok_tk[timestamp]'];
		token = sp['_storyblok_tk[token]'];
	}
	if (!spaceId || !timestamp || !token) return false;

	const previewToken = process.env.STORYBLOK_DELIVERY_API_TOKEN;
	const expected = createHash('sha1').update(`${spaceId}:${previewToken}:${timestamp}`).digest('hex');
	if (token !== expected) return false;

	// reject stale tokens (older than 1 hour)
	return Number(timestamp) >= Math.floor(Date.now() / 1000) - 3600;
}

export default async function Page({ params, searchParams }) {
	const { slug } = await params;
	const sp = (await searchParams) || {};
	const fullSlug = slug ? slug.join('/') : 'home';

	// Draft locally, or on the live site only for a validated editor session;
	// everyone else (the public) gets published.
	const draft = process.env.NODE_ENV !== 'production' || isEditorRequest(sp);
	const sbParams = { version: draft ? 'draft' : 'published' };

	const storyblokApi = getStoryblokApi();
	let data;
	try {
		({ data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams));
	} catch (err) {
		notFound();
	}

	return <StoryblokStory story={data.story} />;
}
