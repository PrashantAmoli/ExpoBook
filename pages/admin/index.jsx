import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useAuth, useUser } from '@clerk/clerk-react';

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

	const { data, isLoading, error } = useQuery({
		queryKey: ['admin'],
		queryFn: async () => {
			const { data } = await axios.get('/api/v1');
			return data;
		},
		config: {
			refetchOnWindowFocus: false,
			retry: 3,
			retryDelay: 1000,
			staleTime: 1000 * 60 * 60 * 2, // 2 hours
			cacheTime: 1000 * 60 * 60 * 2, // 2 hours
		},
	});

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

			<main className="w-full min-h-screen">
				<div className="container mx-auto">
					{JSON.stringify(data)}
					<div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 xl:grid-cols-3">
						{exhibitions.map(exhibition => (
							<Card key={exhibition.id} className="transition-all duration-500 shadow-lg hover:scale-105 hover:shadow-xl hover:-translate-y-3">
								<CardHeader>
									<CardTitle>{exhibition.name}</CardTitle>
								</CardHeader>

								<CardContent>
									<CardDescription>{exhibition.description}</CardDescription>

									<div className="flex justify-between w-full my-1">
										<div className="text-xs text-gray-500">
											<time dateTime={exhibition.startDate}>{exhibition.startDate}</time> to{' '}
											<time dateTime={exhibition.endDate}>{exhibition.endDate}</time>
										</div>
										<div className="text-sm text-gray-500">
											<time dateTime={exhibition.createdAt}>{exhibition.createdAt}</time>
										</div>
									</div>
								</CardContent>

								<CardFooter className="flex flex-col items-end gap-2">
									<div className="flex justify-start w-full gap-1">
										<Badge variant={exhibition.status === 'active' ? '' : exhibition.status === 'archieved' ? 'secondary' : 'destructive'}>
											{exhibition.status}
										</Badge>
										<Badge>
											{exhibition.availableSlots} / {exhibition.slots} available
										</Badge>
									</div>
									<Link href={`/admin/exhibitions/${exhibition.id}`}>
										<Button>View</Button>
									</Link>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>

				<p className="w-full">Current Organization: {authData.orgSlug}</p>
				<p className="w-full p-2 my-2 mt-20 break-words shadow-xl">{JSON.stringify(authData)}</p>
				<p className="w-full p-2 my-2 break-words shadow-xl">{JSON.stringify(userData)}</p>
			</main>
		</>
	);
}
