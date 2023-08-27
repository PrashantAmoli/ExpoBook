import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function EmbedDemo() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') setIsLoaded(true);
	}, []);

	if (!isLoaded) return <main className="fixed inset-0 flex flex-col items-center justify-center top-1/3 animate-bounce">Loading...</main>;

	return (
		<>
			<Head>
				<title>Embed Demo</title>
			</Head>

			<main className="w-full">
				<iframe
					src="https://beta-expobook.vercel.app/demo"
					width={typeof window !== 'undefined' ? window.innerWidth : '100%'}
					height={typeof window !== 'undefined' ? window.innerHeight : '88vh'}
					frameborder="0"
					allow="payment; fullscreen; accelerometer; ambient-light-sensor; autoplay; camera; encrypted-media; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
				></iframe>
			</main>
		</>
	);
}
