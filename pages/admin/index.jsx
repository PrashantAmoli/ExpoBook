import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/clerk-react';
import { ExhibitionCard } from '@/components/booking/ExhibitionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NovelEditor from '@/components/elements/NovelEditor';

export default function AdminPage() {
	const authData = useAuth();
	const userData = useUser();

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

			<main className="w-full min-h-screen p-1.5">
				<Tabs defaultValue="cards" className="max-w-5xl mx-auto ">
					<TabsList className="w-full border">
						<TabsTrigger value="cards" className="w-full">
							Cards
						</TabsTrigger>
						<TabsTrigger value="table" className="w-full">
							Table
						</TabsTrigger>
					</TabsList>

					<TabsContent value="cards">
						<NovelEditor />
					</TabsContent>
					<TabsContent value="table">CRUD Table of all exhibitions here</TabsContent>
				</Tabs>
			</main>
		</>
	);
}
