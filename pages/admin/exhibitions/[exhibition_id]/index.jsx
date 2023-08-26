import Head from 'next/head';
import { useRouter } from 'next/router';

export const ExhibitionDetailsPage = () => {
	const router = useRouter();

	const { exhibition_id } = router.query;

	return (
		<>
			<Head>
				<title>Exhibition {exhibition_id}</title>
			</Head>

			<main className="w-full min-h-screen py-3">
				<h1 className="my-2 text-2xl font-bold text-center">Exhibition {exhibition_id}</h1>
			</main>
		</>
	);
};

export default ExhibitionDetailsPage;
