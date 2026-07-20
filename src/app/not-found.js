export default function NotFound() {
	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'center',
				gap: 20,
				padding: '0 var(--content-gutter)',
				background: 'var(--surface-100)',
				color: 'var(--inverted-100)',
			}}
		>
			<span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
				Viola Ventures — 404
			</span>
			<h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.75rem, calc(1.4rem + 5vw), 4.75rem)', lineHeight: 1.02, letterSpacing: '-0.02em', margin: 0 }}>
				Nothing here yet.
			</h1>
			<a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--inverted-100)' }}>
				← Back to the homepage
			</a>
		</div>
	);
}
