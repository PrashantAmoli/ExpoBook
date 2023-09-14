import ConfirmationPrompt from '@/components/ConfirmationPrompt';
import { DatePickerWithRange } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/utils/supabase';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { queryClient } from '@/components/ReactQuery';
import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SlotsTable from '@/components/booking/SlotsTable';
import { Textarea } from '@/components/ui/textarea';
import HoverCardWrapper from '@/components/elements/HoverCardWrapper';
import { add } from 'date-fns';
import AddSlotsForm from '@/components/forms/AddSlotForm';
import Loading from '@/components/views/Loading';

export const ExhibitionDetailsPage = () => {
	const router = useRouter();

	const { exhibition_id } = router.query;
	const exhibitions = useQueryClient()?.getQueryData(['exhibitions']);

	const {
		data: exhibitionData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['exhibition', exhibition_id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('slots')
				.select(
					`
					*,
					exhibitions (*)
					`
				)
				.match({ exhibition_id: exhibition_id });
			if (error) console.log(error);
			return data;
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
				<title>Exhibition {exhibition_id}</title>
			</Head>

			<main className="w-full px-2 py-3">
				<Tabs defaultValue="table" className="w-full mx-auto lg:container">
					<TabsList className="w-full border">
						<TabsTrigger value="table" className="w-full">
							Table
						</TabsTrigger>
						<TabsTrigger value="form" className="w-full">
							Form
						</TabsTrigger>
						<TabsTrigger value="json" className="uppercase">
							JSON
						</TabsTrigger>
					</TabsList>

					<TabsContent value="table">
						<h2 className="mt-2 text-xl font-bold text-center">Exhibition {exhibition_id}</h2>

						<SlotsTable data={exhibitionData} />
					</TabsContent>

					<TabsContent value="form">
						<AddSlotsForm exhibition_id={exhibition_id} />
					</TabsContent>

					<TabsContent value="json">
						<p className="p-2 m-2 break-words border rounded">{JSON.stringify(exhibitions)}</p>
						<p className="p-2 m-2 break-words border rounded">{JSON.stringify(exhibitionData)}</p>
					</TabsContent>
				</Tabs>
			</main>
		</>
	);
};

export default ExhibitionDetailsPage;
