// Storyblok provisioning — creates/updates the Viola homepage content model
// (components) and populates the `home` story from src/lib/homeContent.js.
//
// Run:  node --env-file=.env scripts/storyblok-provision.mjs
//
// Requires in .env:
//   STORYBLOK_MANAGEMENT_TOKEN   personal access token (mapi)
//   STORYBLOK_REGION             eu | us | ap | ca | cn   (default eu)
//   STORYBLOK_SPACE_ID           optional; auto-detected from the token if unset
//
// Safe to re-run: components are upserted by name; the home story is upserted
// by slug. Images are stored as site-relative paths (served from Next public/),
// so no asset upload is needed — swap to uploaded assets later if desired.

import { randomUUID } from 'node:crypto';
import * as C from '../src/lib/homeContent.js';
import { sectorMarks } from '../src/lib/sectorMarks.js';

const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const REGION = (process.env.STORYBLOK_REGION || 'eu').toLowerCase();
let SPACE_ID = process.env.STORYBLOK_SPACE_ID;

if (!TOKEN) {
	console.error('✗ STORYBLOK_MANAGEMENT_TOKEN missing in .env');
	process.exit(1);
}

const MAPI = {
	eu: 'https://mapi.storyblok.com/v1',
	us: 'https://api-us.storyblok.com/v1',
	ap: 'https://api-ap.storyblok.com/v1',
	ca: 'https://api-ca.storyblok.com/v1',
	cn: 'https://app.storyblokchina.cn/v1',
}[REGION];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function mapi(path, method = 'GET', body, attempt = 0) {
	// Throttle to stay under the Management API limit (6 req/s).
	await sleep(220);
	const res = await fetch(`${MAPI}${path}`, {
		method,
		headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
	});
	if (res.status === 429 && attempt < 5) {
		await sleep(1500 * (attempt + 1));
		return mapi(path, method, body, attempt + 1);
	}
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`${method} ${path} → ${res.status}: ${text}`);
	}
	return res.status === 204 ? null : res.json();
}

// ---- field + component helpers -------------------------------------------
let pos = 0;
const f = (type, extra = {}) => ({ type, pos: pos++, ...extra });
const text = (extra) => f('text', extra);
const textarea = (extra) => f('textarea', extra);
const bool = () => f('boolean');
const asset = () => f('asset', { filetypes: ['images'] });
const blocks = (whitelist) => f('bloks', whitelist ? { restrict_components: true, component_whitelist: whitelist } : {});
const option = (values) => f('option', { use_uuid: false, options: values.map((v) => ({ name: v, value: v })) });

// schema fields declared in order via the incrementing `pos`
function schema(builder) {
	pos = 0;
	return builder();
}

const COMPONENTS = [
	{ name: 'page', is_root: true, is_nestable: false, schema: schema(() => ({ body: blocks() })) },
	{ name: 'hero', is_nestable: true, schema: schema(() => ({ lead_in: text(), trailing: text(), paragraph: textarea(), input_placeholder: text(), rotating_words: textarea({ description: 'One word per line' }), founders: blocks(['hero_founder']) })) },
	{ name: 'hero_founder', is_nestable: true, schema: schema(() => ({ image: text({ description: 'Site-relative path, e.g. /viola-assets/images/hero-founder-1.png' }), caption: text(), dim: bool(), object_position: text() })) },
	{ name: 'logo_marquee', is_nestable: true, schema: schema(() => ({ logos: textarea({ description: 'One portfolio name per line' }) })) },
	{ name: 'value_prop', is_nestable: true, schema: schema(() => ({ heading: text(), paragraph: textarea(), cta: text() })) },
	{ name: 'looking_for', is_nestable: true, schema: schema(() => ({ eyebrow: text(), heading_line1: text(), heading_line2: text(), people: blocks(['looking_for_person']) })) },
	{ name: 'looking_for_person', is_nestable: true, schema: schema(() => ({ title: text(), tagline: text(), status: text(), image: text(), description: textarea() })) },
	{ name: 'ticker', is_nestable: true, schema: schema(() => ({ text: text() })) },
	{ name: 'statement', is_nestable: true, schema: schema(() => ({ lead: textarea(), body: textarea(), cta: text() })) },
	{ name: 'investment_focus', is_nestable: true, schema: schema(() => ({ eyebrow: text(), heading: text(), intro: textarea(), sectors: blocks(['sector']), closing: text() })) },
	{ name: 'sector', is_nestable: true, schema: schema(() => ({ name: text({ description: 'Must match the coded mark name: Cyber, Fintech, Infrastructure, Vertical Applications, Defense' }), description: textarea() })) },
	{ name: 'event_cards', is_nestable: true, schema: schema(() => ({ cards: blocks(['event_card']) })) },
	{ name: 'event_card', is_nestable: true, schema: schema(() => ({ accent: option(['blue', 'mint']), title: text(), who: text(), role: text(), eyebrow: text(), category: text(), image: text(), quote: textarea() })) },
	{ name: 'featured_perspective', is_nestable: true, schema: schema(() => ({ heading: text(), label: text(), posts: blocks(['post']) })) },
	{ name: 'post', is_nestable: true, schema: schema(() => ({ tag: text(), title: text(), subtitle: textarea(), read_time: text() })) },
	{ name: 'newsletter', is_nestable: true, schema: schema(() => ({ heading: text(), paragraph: textarea(), input_placeholder: text(), cta: text() })) },
];

// ---- home story content, built from homeContent ---------------------------
const uid = () => randomUUID();
const blok = (component, fields) => ({ component, _uid: uid(), ...fields });

function buildBody() {
	return [
		blok('hero', {
			lead_in: C.hero.leadIn,
			trailing: C.hero.trailing,
			paragraph: C.hero.paragraph,
			input_placeholder: C.hero.inputPlaceholder,
			rotating_words: C.rotatingWords.join('\n'),
			founders: C.hero.founders.map((x) => blok('hero_founder', { image: x.img, caption: x.caption, dim: !!x.dim, object_position: x.objectPosition || '' })),
		}),
		blok('logo_marquee', { logos: C.codeLogos.join('\n') }),
		blok('value_prop', { heading: C.valueProp.heading, paragraph: C.valueProp.paragraph, cta: C.valueProp.cta }),
		blok('looking_for', {
			eyebrow: C.lookingFor.eyebrow,
			heading_line1: C.lookingFor.heading[0],
			heading_line2: C.lookingFor.heading[1],
			people: C.lookingFor.people.map((p) => blok('looking_for_person', { title: p.title, tagline: p.tagline, status: p.status || '', image: p.img, description: p.desc })),
		}),
		blok('ticker', { text: C.tickerText }),
		blok('statement', { lead: C.statement.lead, body: C.statement.body, cta: C.statement.cta }),
		blok('investment_focus', {
			eyebrow: C.investmentFocus.eyebrow,
			heading: C.investmentFocus.heading,
			intro: C.investmentFocus.intro,
			closing: C.investmentFocus.closing,
			sectors: sectorMarks.map((s) => blok('sector', { name: s.name, description: s.desc })),
		}),
		blok('event_cards', {
			cards: C.events.cards.map((e) => blok('event_card', { accent: e.accent, title: e.title, who: e.who, role: e.role, eyebrow: e.eyebrow, category: e.category, image: e.image, quote: e.quote })),
		}),
		blok('featured_perspective', {
			heading: C.featured.heading,
			label: C.featured.label,
			posts: C.featured.posts.map((p) => blok('post', { tag: p.tag, title: p.title, subtitle: p.subtitle, read_time: p.readTime })),
		}),
		blok('newsletter', { heading: C.newsletter.heading, paragraph: C.newsletter.paragraph, input_placeholder: C.newsletter.inputPlaceholder, cta: C.newsletter.cta }),
	];
}

// ---- run ------------------------------------------------------------------
async function run() {
	if (!MAPI) throw new Error(`Unknown region: ${REGION}`);

	if (!SPACE_ID) {
		const { spaces } = await mapi('/spaces');
		if (!spaces?.length) throw new Error('No spaces found for this token');
		SPACE_ID = spaces[0].id;
		console.log(`ℹ Auto-detected space ${SPACE_ID} (${spaces[0].name})`);
	}
	const base = `/spaces/${SPACE_ID}`;

	// upsert components
	const { components: existing } = await mapi(`${base}/components`);
	const byName = new Map(existing.map((c) => [c.name, c.id]));
	for (const c of COMPONENTS) {
		const payload = { component: { name: c.name, display_name: c.name, is_root: !!c.is_root, is_nestable: c.is_nestable !== false, schema: c.schema } };
		if (byName.has(c.name)) {
			await mapi(`${base}/components/${byName.get(c.name)}`, 'PUT', payload);
			console.log(`↻ updated component: ${c.name}`);
		} else {
			const created = await mapi(`${base}/components`, 'POST', payload);
			byName.set(c.name, created.component.id);
			console.log(`+ created component: ${c.name}`);
		}
	}

	// upsert home story
	const content = { component: 'page', _uid: uid(), body: buildBody() };
	const { stories } = await mapi(`${base}/stories?by_slugs=home`);
	if (stories?.length) {
		const id = stories[0].id;
		await mapi(`${base}/stories/${id}`, 'PUT', { story: { content }, publish: 1 });
		console.log(`↻ updated + published story: home (${id})`);
	} else {
		await mapi(`${base}/stories`, 'POST', { story: { name: 'Home', slug: 'home', content }, publish: 1 });
		console.log('+ created + published story: home');
	}

	console.log('\n✓ Provisioning complete.');
}

run().catch((e) => {
	console.error('\n✗ Provisioning failed:\n' + e.message);
	process.exit(1);
});
