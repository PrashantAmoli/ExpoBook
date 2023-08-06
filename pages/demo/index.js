import MyTable from '@/components/MyTable';
import Stadium from '@/components/Stadium';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Demo() {
	const [showAdmin, setShowAdmin] = useState(false);
	return (
		<>
			<Head>
				<title>EaseMyExpo</title>
			</Head>

			<main className="w-full min-h-screen">
				<div className="flex gap-1 absolute top-1 right-1">
					<Link href="/demo/new">
						<Button className="">New</Button>
					</Link>
					<Button onClick={() => setShowAdmin(!showAdmin)} className="">
						Toggle Admin
					</Button>
				</div>
				{showAdmin ? (
					<section className="container flex items-center justify-center max-h-screen mx-auto pt-7 max-w-screen-2xl">
						<MyTable />
					</section>
				) : (
					<Stadium />
				)}
			</main>
		</>
	);
}
