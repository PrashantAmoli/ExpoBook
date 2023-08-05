import Stadium from '@/components/Stadium';
import Head from 'next/head';
import Link from 'next/link';

export default function Demo() {
	return (
		<>
			<Head>
				<title>EaseMyExpo</title>
			</Head>

			<main className="w-full min-h-screen">
				<Stadium />
			</main>
		</>
	);
}
