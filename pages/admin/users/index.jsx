import UsersAdminTable from '@/components/admin/tables/UsersTable';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Head from 'next/head';

export const UsersDataPage = () => {
	const {
		data: users,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const { data, error } = await axios.get('/api/v1/admin/users');
			if (error) console.log(error);
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

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<>
			<Head>
				<title>Users</title>
			</Head>

			<main className="w-full min-h-screen py-3">
				<h1 className="my-2 text-2xl font-bold text-center">Users Table</h1>

				<p className="break-words">{JSON.stringify(users)}</p>

				{users && users.length > 1000 ? <UsersAdminTable users={users} className={'container max-w-7xl'} /> : <></>}
			</main>
		</>
	);
};

export default UsersDataPage;
