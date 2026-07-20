// Phase 1 content model for the Viola Ventures homepage — hardcoded here,
// transcribed faithfully from the original VcHomepage.dc.html. In Phase 2 this
// is replaced by Storyblok story content of the same shape.

const IMG = '/viola-assets/images/';

export const navItems = ['Portfolio', 'Team', 'Verticals', 'Perspectives'];

export const rotatingWords = ['Moves', 'Signals', 'Customers', 'Hires', 'Partners'];

export const hero = {
	leadIn: 'Early',
	trailing: 'Matter.',
	paragraph:
		'The decisions you make in the first year determine everything that follows. We partner with industry-defining founders from the spark moment, helping accelerate velocity at the critical inflection points and amplify momentum as they build.',
	inputPlaceholder: 'Ask me anything',
	founders: [
		{ img: IMG + 'hero-founder-1.png', caption: 'Tomer Bar Zeev — CEO & Co-Founder, ironSource / Zyg' },
		{ img: IMG + 'hero-founder-2.png', caption: 'Zeev Ferbman — CEO & Co-Founder, Lightricks' },
		{ img: IMG + 'hero-founder-3.png', caption: 'Noam Solomon — CEO & Co-Founder, immuani' },
		{ img: IMG + 'hero-founder-4.png', caption: 'Elad Schaffer — CEO & Co-Founder, Faye' },
		{ img: IMG + 'hero-founder-5.png', caption: 'Shay Cohen — CEO & Co-Founder, PorteanTecs', dim: true, objectPosition: '50% 22%' },
		{ img: IMG + 'hero-founder-6.png', caption: 'Gal Krubiner — CEO & Co-Founder, Pagaya' },
		{ img: IMG + 'hero-founder-7.png', caption: 'Nir Erez — Co-Founder, Vimi / Formerly CEO, Moovit' },
	],
};

export const codeLogos = [
	'ironSource', 'Redis', 'Via', 'CYE', 'Payoneer', 'Mellanox', 'Aryon', 'SunGard',
	'Faye', 'Red Hat', 'Rise', 'impala.ai', 'PayZen', 'Vimi', 'Zyg', 'Lama.ai', 'PhaseV',
];

export const valueProp = {
	heading: 'Making Every Move Count.',
	paragraph:
		'Clarity, customers, and capital — the three levers that decide whether early potential becomes real momentum. We pressure-test product-market fit, put founders in front of real buyers, and help assemble the right capital at the right time.',
	cta: 'Learn more',
};

export const lookingFor = {
	eyebrow: 'The founders we back',
	heading: ['One Introduction', 'Changes Everything.'],
	people: [
		{ title: 'Tomer Bar-Zeev', tagline: 'Co-founder & former CEO of ironSource', status: 'IPO/acquired', img: IMG + 'img-tomer-barzeev.png', desc: 'Tomer helped build one of Israel’s defining global technology companies and led it through its landmark combination with Unity. He brings founders hard-earned perspective on category creation, monetization, scaling culture, and navigating strategic outcomes at global scale.' },
		{ title: 'Jim Whitehurst', tagline: 'Former CEO of Red Hat', status: 'IPO/acquired', img: IMG + 'img-jim-whitehurst.png', desc: 'Jim Whitehurst led Red Hat through its evolution into the world’s leading enterprise open-source company and its $34B acquisition by IBM. His experience spans open ecosystems, enterprise transformation, public-company leadership, and the operating discipline required to turn developer trust into enduring business value.' },
		{ title: 'Lior Gerenstein', tagline: 'CTO of Via', status: 'acquired', img: IMG + 'img-lior-gerenstein.png', desc: 'Lior brings deep expertise in complex, real-time technology systems. His work sits at the intersection of software, optimization, mobility, and operational scale — the kind of technical judgment founders need when architecture becomes company strategy.' },
		{ title: 'Eyal Waldman', tagline: 'Founder & former CEO of Mellanox', status: 'acquired', img: IMG + 'img-eyal-waldman.png', desc: 'Eyal built a global infrastructure technology leader that became foundational to high-performance computing and data centers, culminating in NVIDIA’s $7B acquisition. He brings rare founder-to-scale insight across deep tech, enterprise sales, global operations, and strategic M&A.' },
		{ title: 'Yiftach Shulman', tagline: 'Co-founder of Redis', img: IMG + 'img-yiftach-shulman.png', desc: 'Yiftach helped build one of the world’s most influential real-time data platforms. With a career spanning infrastructure, cloud, networking, and developer-facing technology, he brings founders a sharp perspective on technical differentiation, product depth, and building platforms developers trust.' },
		{ title: 'Reuven (Rubi) Aronashvili', tagline: 'Founder & CEO of CYE', img: IMG + 'img-rubi-aronashvili.png', desc: 'Rubi is a cybersecurity operator with deep offensive-security roots and a track record of helping organizations understand and reduce real business risk. He brings founders practical board-level perspective on cyber strategy, enterprise trust, resilience, and selling into security-conscious markets.' },
		{ title: 'Stu Solomon', tagline: 'Enterprise operator & adviser', img: IMG + 'img-stu-solomon.png', desc: 'CEO of HUMAN Security and former President of Recorded Future, Stu brings a rare combination of cybersecurity, intelligence, go-to-market, and operational leadership. He helps founders think clearly about trust, digital risk, enterprise adoption, and how to scale security companies with credibility and urgency.' },
		{ title: 'Scott Galit', tagline: 'Former CEO of Payoneer', status: 'IPO/acquired', img: IMG + 'img-scott-galit.png', desc: 'Scott helped turn a cross-border payments company into a global public fintech platform. He brings founders deep perspective on fintech infrastructure, marketplace economics, regulated growth, global expansion, and building financial products that can scale across borders and customer segments.' },
		{ title: 'Cris Conde', tagline: 'Former CEO of SunGard', status: 'acquired', img: IMG + 'img-cris-conde.png', desc: 'Cris led one of the most important enterprise software companies in financial technology. His experience spans large-scale software operations, financial services infrastructure, private-equity transformation, and the kind of strategic pattern recognition that helps founders build for durability.' },
	].map((p, i, arr) => ({ ...p, num: String(i + 1).padStart(2, '0') + ' / ' + arr.length })),
};

export const statement = {
	lead:
		'At Viola, founders don’t just work with partners. You also get access to an inner circle of operators and enterprise leaders who’ve built and scaled Fortune 500 companies.',
	body:
		'The circle gives you a seat at the right table, with people who bring real-world experience, and who’ll help you move faster on the milestones that matter.',
	cta: 'See the circles',
};

export const tickerText = 'Get Into The Inner Circle';

export const investmentFocus = {
	eyebrow: 'Verticals',
	heading: 'Where We Go Deep',
	intro:
		'We invest in FinTech, Cyber, Infra, and Vertical Applications not because they’re trendy, but because we’ve spent 25-plus years building and backing companies in those industries. We know the buyers, the bottlenecks, and what it takes to win.',
	closing: 'Transforming existing categories. Or creating new ones.',
};

export const events = {
	cards: [
		{
			accent: 'blue',
			title: 'Acceleration when it counts',
			who: 'Ron Arbel',
			role: 'Co-founder & CEO, Aryon',
			eyebrow: 'Potential ignited',
			category: 'Cyber',
			image: IMG + 'ron-arbel.png',
			quote:
				'“Viola’s CISO network helped us land our first paying customers. They connected us with over 100 CISOs globally, initiated our US roadshows, and put us directly in front of our target customers.\n\nThat early traction was a turning point and gave us the foundation to scale with confidence.”',
		},
		{
			accent: 'mint',
			title: 'Signal over noise',
			who: 'Maya Lev',
			role: 'Co-founder & CEO, Company',
			eyebrow: 'Momentum built',
			category: 'Fintech',
			image: '',
			quote:
				'“They entered right after our spark moment, when the potential was real but the path wasn’t obvious yet. Viola helped us pressure-test product-market fit, sharpen our ICP, and move with conviction when it mattered most.”',
		},
	],
};

export const featured = {
	heading: 'Featured Perspective',
	label: 'Currents / Blog',
	posts: [
		{ tag: 'The VC Perspective', title: 'An idea and a PowerPoint deck', subtitle: 'Why It’s Pointless to Approach Potential Investors with Nothing More Than an Idea and a PowerPoint Deck', readTime: '4M' },
		{ tag: 'Marketing', title: 'Growth hacker overnight', subtitle: 'How I Became a Growth Hacker Overnight (and Why I Still Think of Myself as a Marketer)', readTime: '6M' },
		{ tag: 'Startup Resources', title: 'The MVP methodology trap', subtitle: 'The Obstacles of Using MVP Methodology (and How to Avoid Them in Your Startup)', readTime: '4M' },
	],
};

export const newsletter = {
	heading: 'Get the Signals That Matter.',
	paragraph: "Less noise, more signal. Our perspectives on the moves that change a company's trajectory.",
	inputPlaceholder: 'Enter your mail',
	cta: 'Loop me in',
};

export const footerTagline = 'In it. Together.';

export const footerCols = [
	{ heading: 'About', links: ['Team', 'Portfolio', 'Careers'] },
	{ heading: 'Verticals', links: ['Cyber', 'Infrastructure', 'AI', 'Defense', 'Fintech'] },
	{ heading: 'Resources', links: ['Viola Circles', 'News & Insights'] },
	{ heading: 'Social', links: ['LinkedIn', 'X', 'YouTube'] },
];
