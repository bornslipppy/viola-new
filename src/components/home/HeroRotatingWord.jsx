'use client';

import { useEffect, useRef } from 'react';

// Faithful port of the original hero rotating word: cycles through words with a
// left-to-right wipe while morphing the Season VF serif axis (SERF 0=sans →
// 100=serif). Each incoming word starts sans and settles serif.
export function HeroRotatingWord({ words = ['Moves', 'Signals', 'Customers', 'Hires', 'Partners'], style = {} }) {
	const curRef = useRef(null);
	const nextRef = useRef(null);

	useEffect(() => {
		let cur = curRef.current;
		let nxt = nextRef.current;
		if (!cur || !nxt || words.length < 2) return;
		const timers = [];
		let idx = 0;
		nxt.classList.add('rot-hidden');

		const cycle = () => {
			const nextIdx = (idx + 1) % words.length;
			nxt.textContent = words[nextIdx];
			nxt.classList.remove('rot-in', 'rot-out');
			nxt.classList.add('rot-hidden');
			cur.classList.remove('rot-in');
			cur.classList.add('rot-out');
			timers.push(setTimeout(() => {
				nxt.classList.remove('rot-hidden');
				void nxt.offsetWidth; // reflow so the animation restarts
				nxt.classList.add('rot-in');
			}, 150));
			timers.push(setTimeout(() => {
				cur.classList.remove('rot-out');
				cur.classList.add('rot-hidden');
				const tmp = cur; cur = nxt; nxt = tmp;
				idx = nextIdx;
			}, 1000));
		};
		const loop = () => { cycle(); timers.push(setTimeout(loop, 4000)); };
		timers.push(setTimeout(loop, 1500));
		return () => timers.forEach(clearTimeout);
	}, [words]);

	const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');
	const slot = { position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap', fontVariationSettings: '"SERF" 100', fontWeight: 300 };

	return (
		<span style={{ position: 'relative', display: 'inline-block', verticalAlign: 'baseline', whiteSpace: 'nowrap', letterSpacing: '-0.02em', textTransform: 'capitalize', fontFamily: "'Season VF'", ...style }}>
			{/* invisible ghost reserves width for the longest word */}
			<span style={{ visibility: 'hidden', fontVariationSettings: '"SERF" 100', fontWeight: 300 }}>{longest}</span>
			<span ref={curRef} style={slot}>{words[0]}</span>
			<span ref={nextRef} style={slot} />
		</span>
	);
}
