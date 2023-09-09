import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const Links = [
	{
		name: 'Admin',
		href: '/admin',
		info: 'Admin page',
	},
	{
		name: 'Exhibitions',
		href: '/admin/exhibitions',
		info: 'Admin Exhibitions page',
	},
	{
		name: 'Users',
		href: '/admin/users',
		info: 'Users page',
	},
	{
		name: 'Orders',
		href: '/admin/orders',
		info: 'Orders page',
	},
	{
		name: 'Sign In',
		href: '/sign-in',
		info: 'Sign In page',
	},
	{
		name: 'Sign Up',
		href: '/sign-up',
		info: 'Sign Up page',
	},
	{
		name: 'Exhibitions',
		href: '/exhibitions',
		info: 'Exhibitions page',
	},
	{
		name: 'Embed',
		href: '/embed',
		info: 'Embed page',
	},
	{
		name: 'Demo',
		href: '/demo',
		info: 'Demo page',
	},
	{
		name: 'Embed Demo',
		href: '/demo/embed',
		info: 'Embed Demo page',
	},
	{
		name: 'Test',
		href: '/tests',
		info: 'Test layout page',
	},
	{
		name: 'Emails',
		href: '/admin/emails',
		info: 'Email Templates Demo Page',
	},
];

export default function Home() {
	const { toast } = useToast();

	return (
		<>
			<Head>
				<title>EaseMyExpo</title>
			</Head>

			<main className="w-full min-h-screen">
				<section className="container flex flex-col items-center justify-center h-48 mx-auto">
					<h1 className="text-2xl text-center uppercase sm:text-4xl font-SpaceX">Welcome to ExpoBook</h1>
					<p className="text-xs text-center">Keep homepage as a public landing page for now add link cards to all the different subpages</p>
				</section>

				<section className="container grid max-w-6xl grid-cols-1 gap-3 mx-auto my-10 sm:grid-cols-2 justify-items-center sm:gap-5 lg:grid-cols-3">
					{Links.map((link, key) => (
						<Link key={key} href={link.href} className="w-full h-full">
							<Card className="flex flex-col items-center justify-center w-full p-2 cursor-pointer">
								<CardHeader className="flex flex-col items-center justify-center w-full ">
									<CardTitle className="text-xl uppercase font-SpaceX">{link.name}</CardTitle>
								</CardHeader>

								<CardContent className="flex flex-col items-center justify-center w-full ">
									<p className="text-xs">{link.info}</p>
								</CardContent>

								<CardFooter className="flex flex-col items-center justify-center w-full ">{link.href}</CardFooter>
							</Card>
						</Link>
					))}

					<Card className="flex flex-col items-center justify-center w-full p-2 cursor-pointer">
						<CardHeader className="flex flex-col items-center justify-center w-full ">
							<CardTitle className="text-xl uppercase font-SpaceX">Checkout</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col items-center justify-center w-full ">
							<p className="text-xs">Stripe checkout</p>
						</CardContent>

						<CardFooter className="flex flex-col items-center justify-center w-full ">
							<form action="/api/v1/stripe/checkout" method="POST">
								<Button type="submit">Pay</Button>
							</form>
						</CardFooter>
					</Card>
				</section>
			</main>
		</>
	);
}
