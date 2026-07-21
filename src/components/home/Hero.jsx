'use client';

import { useEffect, useState } from 'react';
import { HeroRotatingWord } from '@/components/home/HeroRotatingWord';
import { IconButton } from '@/ds/components/actions/IconButton';
import { hero, rotatingWords } from '@/lib/homeContent';

const serifHeadline = {
	fontFamily: 'var(--font-serif)',
	fontWeight: 300,
	fontSize: 'clamp(2.75rem, calc(1.4rem + 5vw), 4.75rem)',
	lineHeight: 1.06,
	letterSpacing: '-0.02em',
	color: 'var(--color-black)',
	margin: 0,
};

export default function Hero({ content = hero, words = rotatingWords, editable }) {
	const founders = content.founders || [];
	const [idx, setIdx] = useState(0);
	const [capVisible, setCapVisible] = useState(true);

	useEffect(() => {
		if (founders.length < 2) return;
		let swap;
		const t = setInterval(() => {
			setCapVisible(false);
			swap = setTimeout(() => {
				setIdx((i) => (i + 1) % founders.length);
				setCapVisible(true);
			}, 450);
		}, 3000);
		return () => {
			clearInterval(t);
			clearTimeout(swap);
		};
	}, [founders.length]);

	const current = founders[idx] || {};

	return (
		<section
			{...editable}
			style={{
				background:
					'linear-gradient(to left, var(--accent-blue), var(--accent-blue) 18%, var(--color-white))',
				marginTop: '-76px',
				padding: '144px var(--content-gutter) 64px',
			}}
		>
			<div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'center' }}>
				<div>
					<h1 style={serifHeadline}>
						<span>{content.leadIn} </span>
						<HeroRotatingWord words={words} style={{ color: 'var(--color-black)' }} />
						<br />
						<span>{content.trailing}</span>
					</h1>

					<p
						style={{
							fontFamily: 'var(--font-sans)',
							fontSize: 'var(--text-lg)',
							lineHeight: 1.5,
							color: 'rgba(15,14,11,0.72)',
							margin: '28px 0 0',
							maxWidth: '46ch',
						}}
					>
						{content.paragraph}
					</p>

					<form
						onSubmit={(e) => e.preventDefault()}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							background: 'var(--surface-100)',
							border: '1px solid var(--border)',
							borderRadius: 'var(--radius-full)',
							padding: '8px 8px 8px 26px',
							maxWidth: 440,
							marginTop: 32,
						}}
					>
						<input
							placeholder={content.inputPlaceholder}
							style={{
								flex: 1,
								border: 0,
								background: 'none',
								fontFamily: 'var(--font-sans)',
								fontSize: 'var(--text-lg)',
								color: 'var(--inverted-100)',
								outline: 'none',
							}}
						/>
						<IconButton icon="arrow-forward" variant="filled" label="Ask" />
					</form>
				</div>

				<div>
					<div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4 / 5' }}>
						{founders.map((f, i) => (
							<img
								key={f.img}
								{...f.editable}
								className={`hero-slide${f.dim ? ' hero-slide-dim' : ''}${i === idx ? ' is-active' : ''}`}
								src={f.img}
								alt={f.caption}
								style={{ opacity: i === idx ? 1 : 0, objectPosition: f.objectPosition || '50% 50%' }}
							/>
						))}
						<div className="viola-edge-glow" />
						<div
							style={{
								position: 'absolute',
								left: 16,
								bottom: 16,
								opacity: capVisible ? 1 : 0,
								transition: 'opacity 0.45s cubic-bezier(.4,0,.2,1)',
							}}
						>
							<span
								style={{
									fontFamily: 'var(--font-mono)',
									fontSize: 'var(--text-xs)',
									textTransform: 'uppercase',
									letterSpacing: '0.03em',
									color: 'var(--color-white)',
									background: 'rgba(15,14,11,0.6)',
									padding: '7px 12px',
								}}
							>
								{current.caption}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
