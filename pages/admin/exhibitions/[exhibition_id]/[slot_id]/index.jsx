import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StripeCheckout, { CheckoutForm } from '@/components/booking/StripeCheckout';

export default function SlotDetailsPage() {
	const router = useRouter();
	const { exhibition_id, slot_id } = router.query;

	const exhibitions = useQueryClient()?.getQueryData(['exhibitions']);
	console.log('exhibitions', exhibitions);
	const exhibition = exhibitions?.find(exhibition => exhibition.id == exhibition_id);
	console.log('exhibition', exhibition);

	const allSlotData = useQueryClient()?.getQueryData(['slots', exhibition_id]);
	const slotData = allSlotData?.find(slot => slot.slot == slot_id);

	return (
		<>
			<Head>
				<title>Slot {slot_id}</title>
			</Head>

			<main className="w-full min-h-screen">
				<Tabs defaultValue="details" className="container w-full mt-2">
					<TabsList className="w-full">
						<TabsTrigger value="details" className="w-full capitalize">
							Details
						</TabsTrigger>
						<TabsTrigger value="pay" className="w-full">
							pay
						</TabsTrigger>
					</TabsList>

					<TabsContent value="details" className="w-full">
						<section className="flex flex-col gap-1">
							<div className="flex flex-col w-full gap-1 md:gap-5 md:flex-row">
								<h4 className="font-semibold tracking-tight text-md scroll-m-20">Exhibition ID:</h4>

								<span>{exhibition ? exhibition?.id : ''}</span>
							</div>

							<div className="flex flex-col gap-1 md:gap-5 md:flex-row">
								<h4 className="font-semibold tracking-tight text-md scroll-m-20">Exhibition Title:</h4>

								<span>{exhibition ? exhibition?.title : ''}</span>
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
						</section>

						<div className="w-11/12 p-3 mx-auto my-3 break-words border rounded-xl">Exhibition Data: {JSON.stringify(exhibition)}</div>

						<div className="w-11/12 p-3 mx-auto my-3 break-words border rounded-xl">Slot Data: {JSON.stringify(slotData)}</div>
					</TabsContent>

					<TabsContent value="pay" className="w-full">
						<StripeCheckout />
					</TabsContent>
				</Tabs>
			</main>
		</>
	);
}
