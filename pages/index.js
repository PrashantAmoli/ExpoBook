import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { toast } = useToast();
	return (
		<>
			<Head>
				<title>EaseMyExpo</title>
			</Head>

			<main className="w-full min-h-screen">
				<section className="container flex items-center justify-center mx-auto h-44">
					<h1 className="text-2xl text-center sm:text-4xl font-SpaceX">EASEMYEXPO</h1>
				</section>
				<section className="container grid grid-cols-1 gap-3 mx-auto my-10 sm:grid-cols-2 justify-items-center sm:gap-10">
					<Link
						href="/demo"
						className="flex items-center justify-center w-full h-20 transition-all rounded-md shadow-lg hover:shadow-xl hover:scale-105"
					>
						<h3 className="p-2">Demo Exhibition</h3>
					</Link>

					<Link
						href="/demo"
						className="flex items-center justify-center w-full h-20 transition-all rounded-md shadow-lg hover:shadow-xl hover:scale-105"
					>
						<h3 className="p-2">Demo Exhibition</h3>
					</Link>

					<Link
						href="/demo"
						className="flex items-center justify-center w-full h-20 transition-all rounded-md shadow-lg hover:shadow-xl hover:scale-105"
					>
						<h3 className="p-2">Demo Exhibition</h3>
					</Link>

					<div
						onClick={() =>
							toast({
								title: 'Slot not available ',
								description: 'You can still contact supoort to see if there is any chance of getting this slot',
							})
						}
						className="flex items-center justify-center w-full h-20 transition-all rounded-md shadow-lg hover:shadow-xl hover:scale-105"
					>
						<h3 className="p-2">Demo Exhibition</h3>
					</div>
				</section>
			</main>
		</>
	);
}
