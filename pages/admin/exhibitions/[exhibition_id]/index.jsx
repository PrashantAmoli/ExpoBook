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

export const ExhibitionDetailsPage = () => {
	const router = useRouter();

	const { exhibition_id } = router.query;
	const exhibitions = useQueryClient()?.getQueryData(['exhibitions']);

	const {
		data: slotsData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['slots', exhibition_id],
		queryFn: async () => {
			const { data, error } = await supabase.from('slots').select('*').match({ exhibition_id: exhibition_id });
			if (error) console.log(error);
			return data;
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (exhibitions?.exhibitions?.length === 0) {
		return <div>not found</div>;
	}

	return (
		<>
			<Head>
				<title>Exhibition {exhibition_id}</title>
			</Head>

			<main className="w-full min-h-screen px-2 py-3">
				<Tabs defaultValue="table" className="w-full mx-auto lg:container">
					<TabsList className="w-full">
						<TabsTrigger value="table" className="w-full">
							Table
						</TabsTrigger>
						<TabsTrigger value="form" className="w-full">
							Form
						</TabsTrigger>
					</TabsList>

					<TabsContent value="table">
						<h2 className="mt-2 text-xl font-bold text-center">Exhibition {exhibition_id}</h2>

						<SlotsTable data={slotsData} />

						<p className="p-2 break-words border rounded">{JSON.stringify(exhibitions)}</p>
						<p className="p-2 break-words border rounded">{JSON.stringify(slotsData)}</p>
					</TabsContent>

					<TabsContent value="form">
						<AddSlotsForm exhibition_id={exhibition_id} />
					</TabsContent>
				</Tabs>

				<p className="p-3 my-5 break-words border rounded">
					{JSON.stringify(exhibitions?.exhibitions?.find(exhibition => parseInt(exhibition_id) === exhibition.id))}
				</p>
			</main>
		</>
	);
};

export default ExhibitionDetailsPage;

export const AddSlotsForm = ({ exhibition_id }) => {
	const { toast } = useToast();
	const formRef = useRef(null);
	const [exhibitionDates, setExhibitionDates] = useState(null);
	const [registrationDates, setRegistrationDates] = useState(null);
	const [confirmSubmission, setConfirmSubmission] = useState(true);
	const [slotsData, setSlotsData] = useState({});
	const [polulateSampleData, setPolulateSampleData] = useState(false);

	const addSlots = async slotsData => {
		toast({
			title: 'Adding New Slots',
			description:
				'Adding New Slots. Please wait while the action is in progress. You will be notified once the action is complete. Thank you for your patience. If you have any questions, please contact the administrator.',
			variant: 'success',
		});
		console.log('POST: ', { ...slotsData });
		// return;

		// check if already exists
		const { data: prevEntriesMatch, error: err } = await supabase
			.from('slots')
			.select('slot, exhibition_id')
			.match({ slot: slotsData.slot, exhibition_id: slotsData.exhibition_id });

		if (err) console.log(err);
		// if already exists then return
		if (!prevEntriesMatch || prevEntriesMatch.length !== 0) {
			toast({
				title: `Slot: ${slotsData.slot} already exists`,
				description: `Slot already exists. Duplicate slots are not allowed. Please try again with a different slot number. If the problem persists, please contact the administrator.`,
				variant: 'destructive',
			});
			return;
		}

		const { data, error } = await supabase
			.from('slots')
			.insert([{ ...slotsData }])
			.select();

		if (error) {
			toast({
				title: 'Error adding slots',
				description: `Error adding slots. Please try again later. If the problem persists, please contact the administrator. 
        Error: ${error.message}`,
				variant: 'destructive',
			});
			console.error(error);
			return;
		}

		toast({
			title: `Slot ${data[0].slot} added successfully`,
			description: ` Slots added successfully. You will be redirected to the exhibition page shortly. Please navigate to the exhibition page if you are not redirected automatically and complete all the required steps.`,
			variant: 'success',
		});
	};

	// get exhibition data from the form and set it to slotsData
	const populateExhibitionData = async () => {
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		console.log(data);

		// check if all the required fields are set or not
		if (!data.slot || !data.status || !data.length || !data.width) {
			toast({
				title: 'Required fields not set',
				description: 'Please set all the required fields to continue',
				variant: 'destructive',
			});
			return;
		}

		// more exhibition data for db
		// set update_at to current timestampz
		data.updated_at = new Date().toISOString();
		setSlotsData(data);
	};

	useEffect(() => {
		populateExhibitionData();
	}, [confirmSubmission]);

	return (
		<>
			<h1 className="my-2 text-2xl font-bold text-center">Add Slots to Exhibition</h1>

			{slotsData && JSON.stringify(slotsData)}
			{exhibitionDates && JSON.stringify(exhibitionDates)}
			{registrationDates && JSON.stringify(registrationDates)}

			<form ref={formRef} className="container flex flex-col w-full max-w-4xl gap-5 px-3 py-3 my-2 bg-black/5 backdrop-blur-3xl rounded-xl">
				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="slot" className="pl-1">
						Slot
					</Label>
					<Input id="slot" type="text" placeholder="Slot No." className="w-full" name="slot" defaultValue={polulateSampleData ? `99` : null} />
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="description" className="pl-1">
						Description
					</Label>
					<Input
						id="description"
						type="text"
						placeholder="Exhibition Description"
						className="w-full"
						name="description"
						defaultValue={polulateSampleData ? `Slot Description Sample` : null}
					/>
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="exhibition_id" className="pl-1">
						Exhibition ID
					</Label>
					<Input
						id="exhibition_id"
						type="text"
						placeholder="Exhibition ID"
						className="w-full"
						name="exhibition_id"
						defaultValue={polulateSampleData ? `${exhibition_id}` : null}
					/>
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="status" className="pl-1">
						Status
					</Label>
					<Input
						id="status"
						type="text"
						placeholder="Exhibition Status"
						className="w-full"
						name="status"
						defaultValue={polulateSampleData ? `available` : null}
					/>
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="length" className="pl-1">
						Length
					</Label>
					<Input
						id="length"
						type="number"
						placeholder="No of Slots"
						className="w-full"
						min="1"
						max="1000"
						name="length"
						defaultValue={polulateSampleData ? 10 : null}
					/>
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="width" className="pl-1">
						Width
					</Label>
					<Input
						id="width"
						type="number"
						placeholder="No of Slots"
						className="w-full"
						min="1"
						max="1000"
						name="width"
						defaultValue={polulateSampleData ? 12 : null}
					/>
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="booked" className="pl-1">
						Booked
					</Label>
					<Switch id="booked" checked={false} name="booked" />
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="direct_booking" className="pl-1">
						Direct Booking instead of enquiry
					</Label>
					<Switch id="direct_booking" checked={false} name="direct_booking" />
				</div>

				<div className="flex items-center justify-end w-full gap-1 sm:gap-3">
					<Label htmlFor="polulateSampleData" className="pl-1">
						Populate Sample Data
					</Label>

					<Switch id="polulateSampleData" checked={polulateSampleData} onCheckedChange={() => setPolulateSampleData(!polulateSampleData)} />

					<Button type="submit" variant="outline">
						Reset
					</Button>

					{!confirmSubmission ? (
						<Button onClick={() => setConfirmSubmission(true)} className="animate-pulse">
							Confirm
						</Button>
					) : (
						<ConfirmationPrompt
							onConfirm={() => {
								addSlots(slotsData);
								setConfirmSubmission(false);
							}}
							title="Are you sure you want to create this new exhibition?"
							description={`
                Please confirm that you want to create this new exhibition. This action cannot be undone. Please make sure that all the details are correct before confirming. 
                If you are not sure, please click on the cancel button to go back and review the details. 
                If you are sure, please click on the confirm button to create the new exhibition. 
                Please note that this action may take a while. Please do not refresh the page or close the browser tab while the action is in progress. You will be notified once the action is complete. 
                Thank you for your patience. 
                If you have any questions, please contact the administrator.`}
							onCancel={() => setConfirmSubmission(false)}
							cancelText={'Cancel'}
							confirmText={'Confirm'}
						>
							<Button onClick={() => setConfirmSubmission(true)}>Create</Button>
						</ConfirmationPrompt>
					)}
				</div>
			</form>
		</>
	);
};
