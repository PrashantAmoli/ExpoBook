import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/clerk-react';
import { ExhibitionCard } from '@/components/booking/ExhibitionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SuperAdmin from '@/components/auth/SuperAdmin';

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
];

export default function AdminPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['exhibitions'],
		queryFn: async () => {
			const { data } = await axios.get('/api/v1/admin/exhibitions');
			return data;
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<Head>
				<title>Admin Page</title>
			</Head>

			<main className="w-full min-h-screen py-2">
				<SuperAdmin showMessage>
					<Tabs defaultValue="cards" className="container mx-auto">
						<TabsList className="w-full">
							<TabsTrigger value="cards" className="w-full">
								Cards
							</TabsTrigger>
							<TabsTrigger value="table" className="w-full">
								Table
							</TabsTrigger>
						</TabsList>
						<Link href="/admin/exhibitions/new">
							<Button className="m-1">Create New</Button>
						</Link>

						<TabsContent value="cards">
							<div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 xl:grid-cols-3">
								{data.exhibitions.reverse().map(exhibition => (
									<>
										<ExhibitionCard exhibition={exhibition} />
									</>
								))}
							</div>
						</TabsContent>
						<TabsContent value="table">CRUD Table of all exhibitions here</TabsContent>
					</Tabs>

					<p className="break-words">{JSON.stringify(data.exhibitions)}</p>
				</SuperAdmin>
			</main>
		</>
	);
}
