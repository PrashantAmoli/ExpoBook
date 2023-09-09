import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { supabase } from '@/utils/supabase';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

export const EditSlotDataForm = ({ slotData, exhibition }) => {
	const [directBooking, setDirectBooking] = useState(slotData?.direct_booking || false);
	const [booked, setBooked] = useState(slotData?.booked || false);
	const [status, setStatus] = useState(slotData?.status || 'available');

	const { toast } = useToast();

	const handleSubmit = async e => {
		e.preventDefault();

		const data = new FormData(e.target);
		const formData = Object.fromEntries(data.entries());
		console.log('formData', formData);

		const submission = {
			description: formData?.description,
			length: formData?.length,
			width: formData?.width,
			direct_booking: directBooking,
			booked,
			status,
		};

		console.log('submission', submission);

		if (
			submission.status === slotData.status &&
			submission.length == slotData.length &&
			submission.width == slotData.width &&
			submission.description === slotData.description &&
			submission.directBooking === slotData.direct_booking &&
			submission.booked === slotData.booked
		) {
			console.log('no changes');
			toast({
				title: 'No changes',
				description: `No changes were made to slot ${slotData.slot} data. Please make changes to update. `,
				variant: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		const { data: updatedSlotData, error } = await supabase.from('slots').update(submission).match({ id: slotData.id, slot: slotData.slot });

		if (error) {
			console.error(error);
			toast({
				title: 'Error',
				description: error.message,
				variant: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		toast({
			title: 'Updated successfully',
			description: 'Slot data updated successfully. Refresh the page to see the changes.',
			variant: 'success',
			duration: 5000,
			isClosable: true,
		});

		console.log('updatedSlotData', updatedSlotData);
	};

	return (
		<>
			<section className="container max-w-2xl p-3 border rounded-xl">
				<h2 className="text-xl font-bold text-center">Edit Slot {slotData?.slot}</h2>

				<form action="" className="container flex flex-col max-w-xl gap-5 py-4" onSubmit={e => handleSubmit(e)}>
					<div className="grid items-center grid-cols-5 gap-3">
						<Label htmlFor="description" className="capitalize">
							description
						</Label>
						<Textarea name="description" id="description" placeholder="description" defaultValue={slotData?.description} className="col-span-4" />
						<Label htmlFor="length" className="capitalize">
							length
						</Label>
						<Input type="number" name="length" id="length" placeholder="length" defaultValue={slotData?.length} className="col-span-4" />

						<Label htmlFor="width" className="capitalize">
							width
						</Label>
						<Input type="number" name="width" id="width" placeholder="width" defaultValue={slotData?.width} className="col-span-4" />

						<Label htmlFor="direct_booking" className="capitalize">
							direct booking
						</Label>

						<Switch
							name="booked"
							id="booked"
							checked={directBooking}
							onCheckedChange={() => setDirectBooking(!directBooking)}
							className="col-span-4"
						/>

						<Label htmlFor="booked" className="capitalize">
							Booked
						</Label>

						<Switch name="booked" id="booked" checked={booked} onCheckedChange={() => setBooked(!booked)} className="col-span-4" />

						<Label htmlFor="status" className="capitalize">
							status
						</Label>

						<Select defaultValue={status} onValueChange={e => setStatus(e)} className="col-span-4">
							<SelectTrigger className="w-fit">
								<SelectValue placeholder="10" />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									<SelectLabel>Set slot status</SelectLabel>
									<SelectItem value={'available'}>available</SelectItem>
									<SelectItem value={'booked'}>booked</SelectItem>
									<SelectItem value={'paused'}>paused</SelectItem>
									<SelectItem value={'canceled'}>canceled</SelectItem>
									<SelectItem value={'unavailable'}>unavailable</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="grid items-center grid-flow-col gap-3">
						<Button variant="secondary" className="w-full" type="reset">
							Reset
						</Button>

						<Button className="w-full" type="submit">
							Save
						</Button>
					</div>
				</form>
			</section>
		</>
	);
};

export default EditSlotDataForm;
