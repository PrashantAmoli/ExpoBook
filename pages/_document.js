import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const CrispChatWidget = dynamic(() => import('@/components/CrispChatWidget'), { ssr: false });

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<CrispChatWidget />
			</Head>

			<body className="overflow-x-hidden transition-all duration-1000 dark:duration-1000 dark:transition-all scroll-smooth dark:scroll-smooth bg-gradient-to-br from-stone-100 via-blue-100/50 to-stone-100 dark:bg-gradient-to-br dark:from-blue-950/5 dark:via-blue-950/5 dark:to-blue-950/10 ">
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
