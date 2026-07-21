// Provisions a blog: the `blog_post` content type, a `blog` folder, and one
// seeded example post. Re-runnable (upserts by name/slug).
//   node --env-file=.env scripts/storyblok-provision-blog.mjs

const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const REGION = (process.env.STORYBLOK_REGION || 'eu').toLowerCase();
let SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const MAPI = { eu: 'https://mapi.storyblok.com/v1', us: 'https://api-us.storyblok.com/v1' }[REGION] || 'https://mapi.storyblok.com/v1';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function mapi(path, method = 'GET', body, attempt = 0) {
	await sleep(220);
	const res = await fetch(`${MAPI}${path}`, {
		method,
		headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
	});
	if (res.status === 429 && attempt < 5) { await sleep(1500 * (attempt + 1)); return mapi(path, method, body, attempt + 1); }
	if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`);
	return res.status === 204 ? null : res.json();
}

const p = (() => { let i = 0; return () => i++; })();
const BLOG_POST = {
	name: 'blog_post',
	display_name: 'Blog Post',
	is_root: true,
	is_nestable: false,
	schema: {
		title: { type: 'text', pos: p() },
		author: { type: 'text', pos: p() },
		date: { type: 'datetime', pos: p() },
		cover_image: { type: 'asset', filetypes: ['images'], pos: p() },
		excerpt: { type: 'textarea', pos: p(), description: 'Short summary shown on the /blog index' },
		body: { type: 'richtext', pos: p() },
	},
};

// a small rich-text document for the seed post
const rt = (nodes) => ({ type: 'doc', content: nodes });
const h = (level, text) => ({ type: 'heading', attrs: { level }, content: [{ type: 'text', text }] });
const para = (nodes) => ({ type: 'paragraph', content: nodes });
const t = (text, marks) => ({ type: 'text', text, ...(marks ? { marks } : {}) });

const seedBody = rt([
	para([t('Most companies die of indigestion, not starvation. In the earliest days, the scarce resource isn’t ideas — it’s the right customers, met at the right moment.')]),
	h(2, 'Why the first customers matter'),
	para([t('The decisions you make in the first year determine everything that follows. A design partner who shapes the product is worth more than ten who merely buy it. ', undefined), t('Signal over noise', [{ type: 'bold' }]), t(' is the whole game.')]),
	para([t('At Viola, founders don’t just work with partners — they get access to an inner circle of operators who’ve built and scaled real companies.')]),
	h(2, 'How to make every move count'),
	para([t('Pressure-test product-market fit, sharpen the ICP, and get in front of buyers who can validate the wedge. Then repeat.')]),
]);

async function upsertComponent() {
	const { components } = await mapi(`/spaces/${SPACE_ID}/components`);
	const existing = components.find((c) => c.name === 'blog_post');
	const payload = { component: BLOG_POST };
	if (existing) { await mapi(`/spaces/${SPACE_ID}/components/${existing.id}`, 'PUT', payload); console.log('↻ blog_post component updated'); }
	else { await mapi(`/spaces/${SPACE_ID}/components`, 'POST', payload); console.log('+ blog_post component created'); }
}

async function upsertFolder() {
	const { stories } = await mapi(`/spaces/${SPACE_ID}/stories?with_slug=blog`);
	if (stories?.length) { console.log('↻ blog folder exists'); return stories[0].id; }
	const created = await mapi(`/spaces/${SPACE_ID}/stories`, 'POST', { story: { name: 'Blog', slug: 'blog', is_folder: true } });
	console.log('+ blog folder created');
	return created.story.id;
}

async function upsertPost(folderId) {
	const slug = 'how-early-customers-win';
	const content = {
		component: 'blog_post',
		title: 'How Early Customers Win',
		author: 'Viola Ventures',
		date: '2026-07-21 09:00',
		cover_image: { filename: '/viola-assets/images/img-01.png', alt: 'How Early Customers Win' },
		excerpt: 'Nothing creates signal faster than the right customers. Why the first year decides everything — and how to make every move count.',
		body: seedBody,
	};
	const { stories } = await mapi(`/spaces/${SPACE_ID}/stories?by_slugs=blog/${slug}`);
	if (stories?.length) { await mapi(`/spaces/${SPACE_ID}/stories/${stories[0].id}`, 'PUT', { story: { content }, publish: 1 }); console.log('↻ example post updated + published'); }
	else { await mapi(`/spaces/${SPACE_ID}/stories`, 'POST', { story: { name: 'How Early Customers Win', slug, parent_id: folderId, content }, publish: 1 }); console.log('+ example post created + published'); }
}

async function run() {
	if (!SPACE_ID) { const { spaces } = await mapi('/spaces'); SPACE_ID = spaces[0].id; }
	await upsertComponent();
	const folderId = await upsertFolder();
	await upsertPost(folderId);
	console.log('\n✓ Blog provisioning complete — post at /blog/how-early-customers-win');
}
run().catch((e) => { console.error('\n✗ ' + e.message); process.exit(1); });
