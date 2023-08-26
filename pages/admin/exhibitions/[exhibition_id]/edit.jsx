import Head from 'next/head';
import { useRouter } from 'next/router';

export const ExhibitionEditPage = () => {
	const router = useRouter();
	const { exhibition_id } = router.query;

	return (
		<>
			<Head>
				<title>Edit Exhibition</title>
			</Head>

			<main className="w-full min-h-screen py-3">
				<h1 className="my-2 text-2xl font-bold text-center">Edit Exhibition {exhibition_id}</h1>
			</main>
		</>
	);
};

export default ExhibitionEditPage;
