import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="overflow-x-hidden scroll-smooth">
				<Script
					src="https://tally.so/widgets/embed.js"
					strategy="beforeInteractive"
					onLoad={() => {
						Tally.loadEmbeds();
					}}
				/>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
