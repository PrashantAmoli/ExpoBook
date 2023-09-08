import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/clerk-react';
import { ExhibitionCard } from '@/components/booking/ExhibitionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const exhibitions = [
	{
		id: 1,
		name: 'Exhibition 1',
		description: 'This is the first exhibition',
		startDate: '2021-01-01',
		endDate: '2021-01-31',
		createdAt: '2021-01-01',
		updatedAt: '2021-01-01',
		status: 'active',
		slots: 200,
		availableSlots: 100,
	},
	{
		id: 2,
		name: 'Exhibition 2',
		description: 'This is the second exhibition',
		startDate: '2021-02-01',
		endDate: '2021-02-28',
		createdAt: '2021-02-01',
		updatedAt: '2021-02-01',
		status: 'inactive',
		slots: 200,
		availableSlots: 180,
	},
	{
		id: 3,
		name: 'Exhibition 2',
		description: 'This is the second exhibition',
		startDate: '2021-02-01',
		endDate: '2021-02-28',
		createdAt: '2021-02-01',
		updatedAt: '2021-02-01',
		status: 'archieved',
		slots: 200,
		availableSlots: 80,
	},
];

export default function AdminPage() {
	const authData = useAuth();
	const userData = useUser();

	// const { data, isLoading, error } = useQuery({
	// 	queryKey: ['admin'],
	// 	queryFn: async () => {
	// 		const { data } = await axios.get('/api/v1');
	// 		return data;
	// 	},
	// 	config: {
	// 		refetchOnWindowFocus: false,
	// 		retry: 3,
	// 		retryDelay: 1000,
	// 		staleTime: 1000 * 60 * 60 * 2, // 2 hours
	// 		cacheTime: 1000 * 60 * 60 * 2, // 2 hours
	// 	},
	// });

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	// if (error) {
	// 	return <div>Error: {error.message}</div>;
	// }

	if (userData?.user?.publicMetadata?.role !== 'admin' && userData?.user?.publicMetadata?.role !== 'superadmin') {
		return (
			<>
				<Head>
					<title>Admin Page</title>
				</Head>

				<main className="container fixed inset-0 flex flex-col items-center justify-center mx-auto">
					<h1 className="text-3xl font-bold ">You are not authorized to view this page</h1>
					<p className="w-full text-xs text-center">
						Only admins can view this page. Please contact the administrator if you think this is a mistake.
					</p>
				</main>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>Admin Page</title>
			</Head>

			<main className="w-full min-h-screen py-3">
				<Tabs defaultValue="cards" className="container mx-auto">
					<TabsList className="w-full">
						<TabsTrigger value="cards" className="w-full">
							Cards
						</TabsTrigger>
						<TabsTrigger value="table" className="w-full">
							Table
						</TabsTrigger>
					</TabsList>
					<Button className="m-1">Create New</Button>
					<Link href="/admin/exhibitions">
						<Button className="m-1">Exhibitions</Button>
					</Link>
					<Link href="/admin/exhibitions/new">
						<Button className="m-1">Exhibitions</Button>
					</Link>

					<TabsContent value="cards">
						<div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 xl:grid-cols-3">
							{exhibitions.map(exhibition => (
								<>
									<ExhibitionCard exhibition={exhibition} />
								</>
							))}
						</div>
					</TabsContent>
					<TabsContent value="table">CRUD Table of all exhibitions here</TabsContent>
				</Tabs>
			</main>
		</>
	);
}
