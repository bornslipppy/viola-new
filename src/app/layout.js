import '@/ds/styles.css';
import '@/styles/viola-page.css';
import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';

export const metadata = {
	title: 'Viola Ventures',
	description: 'Early moves matter. Viola Ventures partners with industry-defining founders from the spark moment.',
};

export default function RootLayout({ children }) {
	return (
		<StoryblokProvider>
			<html lang="en">
				<body>{children}</body>
			</html>
		</StoryblokProvider>
	);
}
