import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/clerk-react';
import { ExhibitionCard } from '@/components/booking/ExhibitionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SuperAdmin from '@/components/auth/SuperAdmin';
import Loading from '@/components/views/Loading';

export default function AdminExhibitionsPageWrapper() {
	return (
		<>
			<SuperAdmin showMessage>
				<AdminExhibitionsPage />
			</SuperAdmin>
		</>
	);
}

export function AdminExhibitionsPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['exhibitions'],
		queryFn: async () => {
			const { data } = await axios.get('/api/v1/admin/exhibitions');
			return data?.exhibitions;
		},
	});

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Loading title="error" description={error.message} />;
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

							<TabsTrigger value="json" className="uppercase">
								json
							</TabsTrigger>
						</TabsList>
						<Link href="/admin/exhibitions/new">
							<Button className="m-1">Create New</Button>
						</Link>

						<TabsContent value="cards">
							<div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 xl:grid-cols-3">
								{data.reverse().map(exhibition => (
									<>
										<ExhibitionCard exhibition={exhibition} />
									</>
								))}
							</div>
						</TabsContent>

						<TabsContent value="table">CRUD Table of all exhibitions here</TabsContent>

						<TabsContent value="json">
							<p className="break-words">{JSON.stringify(data)}</p>
						</TabsContent>
					</Tabs>
				</SuperAdmin>
			</main>
		</>
	);
}
