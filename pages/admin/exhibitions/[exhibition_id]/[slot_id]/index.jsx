import { useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StripeCheckout, { CheckoutForm } from '@/components/booking/StripeCheckout';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import EditSlotDataForm from '@/components/forms/EditSlotDataForm';
import SuperAdmin from '@/components/auth/SuperAdmin';
import { InquiryCard } from '@/components/booking/InquiryCard';

export default function SlotDetailsPage() {
	const router = useRouter();
	const { exhibition_id, slot_id } = router.query;

	return (
		<>
			<Head>
				<title>Slot {slot_id}</title>
			</Head>

			<main className="w-full min-h-screen px-2">
				<SuperAdmin showMessage>
					<SlotDetails />
				</SuperAdmin>
			</main>
		</>
	);
}

export function SlotDetails() {
	const router = useRouter();
	const { exhibition_id, slot_id } = router.query;

	const allSlotData = useQueryClient()?.getQueryData(['exhibition', exhibition_id]);
	const slotData = allSlotData?.find(slot => slot.slot == slot_id);

	const {
		data: inquiries,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['inquiries', exhibition_id, slot_id],
		queryFn: async () => {
			const { data, error } = await supabase.from('inquiries').select('*').match({ slot: slot_id, exhibition_id: exhibition_id });
			if (error) {
				console.error(error);
				return;
			}
			console.log('inquiries', data);
			return data;
		},
	});

	return (
		<>
			<Tabs defaultValue="details" className="w-full mx-auto mt-2">
				<TabsList className="w-full">
					<TabsTrigger value="details" className="w-full capitalize">
						Details
					</TabsTrigger>
					<TabsTrigger value="edit" className="w-full capitalize">
						Edit
					</TabsTrigger>
					<TabsTrigger value="pay" className="w-full capitalize">
						pay
					</TabsTrigger>
					<TabsTrigger value="json" className="uppercase">
						json
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="w-full">
					<section className="flex flex-col gap-1">
						<div className="flex flex-col w-full gap-1 md:gap-5 md:flex-row">
							<h4 className="font-semibold tracking-tight text-md scroll-m-20">Exhibition ID:</h4>

							<span>{slotData?.exhibitions?.id}</span>
						</div>

						<div className="flex flex-col gap-1 md:gap-5 md:flex-row">
							<h4 className="font-semibold tracking-tight text-md scroll-m-20">Exhibition Title:</h4>

							<span>{slotData?.exhibitions?.title}</span>
						</div>

						<div className="flex flex-col gap-1 md:gap-5 md:flex-row">
							<h4 className="font-semibold tracking-tight text-md scroll-m-20">Slot:</h4>

							<span>{slotData?.slot ? slotData?.slot : ''}</span>
						</div>

						<div className="flex flex-col gap-1 md:gap-5 md:flex-row">
							<h4 className="font-semibold tracking-tight text-md scroll-m-20">Booked:</h4>

							<span>{slotData?.booked ? 'Yes' : 'No'}</span>
						</div>

						<div className="flex flex-col gap-1 md:gap-5 md:flex-row">
							<h4 className="font-semibold tracking-tight text-md scroll-m-20">Size:</h4>

							<span>
								{slotData?.length && slotData?.width
									? `${slotData?.length}X${slotData?.width} (${parseInt(slotData?.length) * parseInt(slotData?.width)})`
									: '_'}
							</span>
						</div>

						<div className="grid grid-cols-1 gap-5 sm:p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
							{inquiries?.map(inquiry => (
								<InquiryCard inquiry={inquiry} key={inquiry.id} />
							))}
						</div>
					</section>
				</TabsContent>

				<TabsContent value="json" className="w-full">
					{isLoading ? (
						<div className="text-center">Loading Inquries...</div>
					) : (
						<>
							<div className="w-11/12 p-3 mx-auto my-3 break-words border rounded-xl">Inquiries: {JSON.stringify(inquiries)}</div>
						</>
					)}

					<div className="w-11/12 p-3 mx-auto my-3 break-words border rounded-xl">Data: {JSON.stringify(slotData)}</div>
				</TabsContent>

				<TabsContent value="edit" className="w-full">
					<EditSlotDataForm slotData={slotData} exhibition={slotData?.exhibitions} />
				</TabsContent>

				<TabsContent value="pay" className="w-full">
					<StripeCheckout />
				</TabsContent>
			</Tabs>
		</>
	);
}
