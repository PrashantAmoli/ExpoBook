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

const SampleExhibition = [
	{
		title: 'Exhibition 1',
		description: 'This is the first exhibition',
		startDate: '2021-01-01',
		endDate: '2021-01-31',
		regstrationStartDate: '2021-01-01',
		registrationEndDate: '2021-01-31',
		status: 'new',
		slots: 200,
		availableSlots: 200,
		inquiryFormLink: 'https://tally.so/embed/2zj2qz?hideTitle=1&alignLeft=1&transparentBackground=1&hideFooter=1',
		bookingFormLink: 'https://tally.so/embed/2zj2qz?hideTitle=1&alignLeft=1&transparentBackground=1&hideFooter=1',
		visitorFormLink: 'https://tally.so/embed/2zj2qz?hideTitle=1&alignLeft=1&transparentBackground=1&hideFooter=1',
		organizations: [
			{
				id: 1,
				slug: 'organization-1',
				name: 'Organization 1',
			},
		],
		users: [
			{
				id: 1,
				slug: 'user-1',
				name: 'User 1',
			},
		],
		payments: [
			{
				id: 1,
				amount: 100,
				status: 'paid',
				createdAt: '2021-01-01',
			},
		],
	},
];

export const CreateNewExhibition = () => {
	const { toast } = useToast();
	const formRef = useRef(null);
	const [exhibitionDates, setExhibitionDates] = useState(null);
	const [registrationDates, setRegistrationDates] = useState(null);
	const [confirmSubmission, setConfirmSubmission] = useState(false);
	const [exhibitionData, setExhibitionData] = useState({});
	const [polulateSampleData, setPolulateSampleData] = useState(false);

	const createNewExhibition = async exhibitionData => {
		toast({
			title: 'Creating New Exhibition',
			description: 'Creating New Exhibition. Please wait while we create the exhibition. This may take a while.',
			variant: 'success',
		});

		const { data, error } = await supabase
			.from('exhibitions')
			.insert([{ ...exhibitionData }])
			.select();

		if (error) {
			toast({
				title: 'Error creating exhibition',
				description: `Error creating exhibition. Please try again later. If the problem persists, please contact the administrator.
        Error: ${error.message}`,
				variant: 'destructive',
			});
			console.error(error);
			return;
		}

		toast({
			title: 'Exhibition created successfully',
			description: `Exhibition created successfully. You will be redirected to the exhibition page shortly. Please navigate to the exhibition page if you are not redirected automatically and complete all the required steps. Data: ${JSON.stringify(
				data
			)}`,
			variant: 'success',
		});
	};

	// get exhibition data from the form and set it to exhibitionData
	const populateExhibitionData = async () => {
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		console.log(data);

		// check if all the required fields are set or not
		if (!data.title || !data.description || !data.status || !data.slots) {
			toast({
				title: 'Required fields not set',
				description: 'Please set all the required fields to continue',
				variant: 'destructive',
			});
			return;
		}

		if (!exhibitionDates || !exhibitionDates.from || !exhibitionDates.to) {
			toast({
				title: 'Exhibition Dates not set',
				description: 'Please set the exhibition start & end dates to continue',
				variant: 'destructive',
			});
			return;
		}
		data.exhibition_start = exhibitionDates.from;
		data.exhibition_end = exhibitionDates.to;

		if (!registrationDates || !registrationDates.from || !registrationDates.to) {
			toast({
				title: 'Registration Dates not set',
				description: 'Please set the registration start & end dates to continue',
				variant: 'destructive',
			});
			return;
		}
		// extract date from registrationDates.from and registrationDates.to
		data.registration_start = registrationDates.from;
		data.registration_end = registrationDates.to;

		// more exhibition data for db
		// set update_at to current timestampz
		data.updated_at = new Date().toISOString();
		data.active = false;
		data.archive = false;
		data.available_slots = data.slots;
		setExhibitionData(data);
	};

	useEffect(() => {
		populateExhibitionData();
	}, [confirmSubmission]);

	return (
		<>
			<Head>
				<title>Create New Exhibition</title>
			</Head>

			<main className="w-full min-h-screen py-3">
				<h1 className="my-2 text-2xl font-bold text-center">Create New Exhibition</h1>

				{exhibitionData && JSON.stringify(exhibitionData)}
				{exhibitionDates && JSON.stringify(exhibitionDates)}
				{registrationDates && JSON.stringify(registrationDates)}

				<form ref={formRef} className="container flex flex-col w-full max-w-4xl gap-5 px-3 py-3 my-2 bg-black/5 rounded-xl">
					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="title" className="pl-1">
							Title
						</Label>
						<Input
							id="title"
							type="text"
							placeholder="Exhibition Title"
							className="w-full"
							name="title"
							defaultValue={polulateSampleData ? `Exhibition Title Sample` : null}
						/>
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
							defaultValue={polulateSampleData ? `Exhibition Description Sample` : null}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="exhibitionDates" className="pl-1">
							Select Exhibition Start & End Date
						</Label>
						<DatePickerWithRange id="exhibitionDates" date={exhibitionDates} setDate={setExhibitionDates} />
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="startDate" className="pl-1">
							Select Registration Start & End Date
						</Label>
						<DatePickerWithRange id="exhibitionDates" date={registrationDates} setDate={setRegistrationDates} />
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
							value="new"
							name="status"
							defaultValue={polulateSampleData ? `${SampleExhibition.status}` : null}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="slots" className="pl-1">
							Slots
						</Label>
						<Input
							id="slots"
							type="number"
							placeholder="No of Slots"
							className="w-full"
							min="10"
							max="1000"
							name="slots"
							defaultValue={polulateSampleData ? 108 : null}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="inquiryFormLink" className="pl-1">
							Inquiry Form Link
						</Label>
						<Input
							id="inquiryFormLink"
							type="text"
							placeholder="Inquiry Form Link"
							className="w-full"
							// name="inquiryFormLink"
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="bookingFormLink" className="pl-1">
							Booking Form Link
						</Label>
						<Input
							id="bookingFormLink"
							type="text"
							placeholder="Booking Form Link"
							className="w-full"
							// name="bookingFormLink"
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="visitorFormLink" className="pl-1">
							Visitor Form Link
						</Label>
						<Input
							id="visitorFormLink"
							type="text"
							placeholder="Visitor Form Link"
							className="w-full"
							// name="visitorFormLink"
						/>
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
									createNewExhibition(exhibitionData);
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
			</main>
		</>
	);
};

export default CreateNewExhibition;
