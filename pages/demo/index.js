import MyTable from '@/components/MyTable';
import Stadium from '@/components/Stadium';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Demo() {
	const [showAdmin, setShowAdmin] = useState(false);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['slots'],
		queryFn: async () => {
			// const res = await axios.get('/api/v1/3');
			// const data = res.data;
			const { data, error } = await supabase.from('slots').select('*').eq('exhibition_id', '3');
			if (error) console.log(error);
			console.log(data);
			return data;
		},
	});

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error...</div>;

	return (
		<>
			<Head>
				<title>EaseMyExpo</title>
			</Head>

			<main className="w-full min-h-screen">
				<div className="absolute flex gap-1 top-1 right-1">
					<Link href="/demo/new">
						<Button className="">New</Button>
					</Link>
					<Button onClick={() => setShowAdmin(!showAdmin)} className="">
						Toggle Admin
					</Button>
				</div>
				{showAdmin ? (
					<section className="container flex items-center justify-center max-h-screen mx-auto pt-7 max-w-screen-2xl">
						<MyTable data={data} />
					</section>
				) : (
					<Stadium data={data} />
				)}
			</main>
		</>
	);
}
