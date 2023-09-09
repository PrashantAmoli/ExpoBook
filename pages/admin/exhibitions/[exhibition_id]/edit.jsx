import EditExhibitionForm from '@/components/forms/EditExhibitionForm';
import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const ExhibitionEditPage = () => {
	const router = useRouter();
	const { exhibition_id } = router.query;

	const exhibitions = useQueryClient()?.getQueryData(['exhibitions']);
	const exhibition = exhibitions?.find(exhibition => exhibition.id == exhibition_id);

	console.log(exhibition);

	return (
		<>
			<Head>
				<title>Edit Exhibition</title>
			</Head>

			<main className="w-full min-h-screen py-3">
				<h2 className="my-2 ml-2 text-2xl font-bold sm:px-4">
					Edit Exhibition: {exhibition?.title} ({exhibition_id})
				</h2>

				<EditExhibitionForm exhibition={exhibition} />
			</main>
		</>
	);
};

export default ExhibitionEditPage;
