import { useEffect, useRef, useState } from 'react';
import HoverCardWrapper from '../elements/HoverCardWrapper';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { add } from 'date-fns';
import { supabase } from '@/utils/supabase';
import { Separator } from '../ui/separator';

export const AddSlotsForm = ({ exhibition_id }) => {
	const { toast } = useToast();
	const formRef = useRef(null);
	const [exhibitionDates, setExhibitionDates] = useState(null);
	const [registrationDates, setRegistrationDates] = useState(null);
	const [confirmSubmission, setConfirmSubmission] = useState(true);
	const [slotsData, setSlotsData] = useState({});
	const [directBooking, setDirectBooking] = useState(false);

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
			.match({ slot: slotsData.slot, exhibition_id: exhibition_id });

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
			.insert([{ status: 'available', exhibition_id: exhibition_id, ...slotsData }])
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

	const handleSubmit = async e => {
		try {
			e.preventDefault();
			const formData = new FormData(e.target);
			const data = Object.fromEntries(formData.entries());

			// check if all the required fields are set or not
			if (!data.slot || !data.description || !data.length || !data.width) {
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
			data.status = 'available';
			data.direct_booking = directBooking;

			console.log(data);

			await addSlots(data);
		} catch (err) {
			console.error(err);
			toast({
				title: 'Error adding slots',
				description: `Error adding slots. Please try again later. If the problem persists, please contact tech support.`,
				variant: 'destructive',
			});
		}
	};

	return (
		<>
			<form
				ref={formRef}
				className="container flex flex-col w-full max-w-xl gap-5 p-2 my-2 border sm:p-6 backdrop-blur-3xl rounded-xl"
				onSubmit={e => handleSubmit(e)}
			>
				<div className="w-full">
					<h3 className="my-1 text-lg font-bold text-center ">Add New Slot</h3>
					<Separator className="" />
				</div>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
					<div className="flex flex-col w-full gap-2 max-sm:col-span-2">
						<Label htmlFor="slot" className="pl-1">
							Slot ID
						</Label>
						<Input id="slot" type="text" placeholder="Unique Slot ID" className="w-full" name="slot" />
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="length" className="pl-1">
							Length
						</Label>
						<Input id="length" type="number" placeholder="Length |" className="w-full" min="1" max="1000" name="length" />
					</div>

					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="width" className="pl-1">
							Width
						</Label>
						<Input id="width" type="number" placeholder="Width of Slot <->" className="w-full" min="1" max="1000" name="width" />
					</div>
				</div>

				<div className="flex flex-col w-full gap-2">
					<Label htmlFor="description" className="pl-1">
						Description
					</Label>
					<Textarea
						id="description"
						type="text"
						placeholder="Exhibition Description"
						className="w-full bg-white dark:bg-transparent"
						name="description"
					/>
				</div>

				<HoverCardWrapper
					title="Book Directly"
					description="Book directly on first-come-first-serve basis by sending booking payment link to all interested exhibitors"
				>
					<div className="flex items-center gap-3 w-fit">
						<Label htmlFor="direct_booking" className="pl-1">
							Direct Booking
						</Label>
						<Switch id="direct_booking" checked={directBooking} onCheckedChange={() => setDirectBooking(!directBooking)} name="direct_booking" />
					</div>
				</HoverCardWrapper>

				<div className="flex items-center justify-end w-full gap-1.5 sm:gap-3">
					<Button type="reset" variant="outline">
						Reset
					</Button>

					<Button type="submit" variant="" className="px-6">
						Add
					</Button>

					{/* {!confirmSubmission ? (
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
                Create slot ${slotsData.slot} for exhibition ${slotsData.length}x${slotsData.width} with description ${slotsData.description}`}
							onCancel={() => setConfirmSubmission(false)}
							cancelText={'Cancel'}
							confirmText={'Confirm'}
						>
							<Button onClick={() => setConfirmSubmission(true)}>Create</Button>
						</ConfirmationPrompt>
					)} */}
				</div>
			</form>
		</>
	);
};

export default AddSlotsForm;
