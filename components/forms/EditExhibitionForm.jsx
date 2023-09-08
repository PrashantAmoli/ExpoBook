import { useEffect, useState } from 'react';
import { DatePickerWithRange } from '../DatePicker';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import ConfirmationPrompt from '../ConfirmationPrompt';
import { Switch } from '@headlessui/react';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { supabase } from '@/utils/supabase';
import { set } from 'date-fns';

export const EditExhibitionForm = ({ exhibition }) => {
	const [exhibitionDates, setExhibitionDates] = useState(null);
	const [registrationDates, setRegistrationDates] = useState(null);
	const [archive, setArchive] = useState(false);
	const [active, setActive] = useState(false);

	const { toast } = useToast();

	useEffect(() => {
		if (exhibition?.registration_start && exhibition?.registration_end) {
			setRegistrationDates({
				from: new Date(exhibition?.registration_start),
				to: new Date(exhibition?.registration_end),
			});
		}

		if (exhibition?.exhibition_start && exhibition?.exhibition_end) {
			setExhibitionDates({
				from: new Date(exhibition?.exhibition_start),
				to: new Date(exhibition?.exhibition_end),
			});
		}

		if (exhibition?.archive) setArchive(exhibition?.archive);
		if (exhibition?.active) setActive(exhibition?.active);
	}, [exhibition]);

	const handleFormSubmit = async e => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const payload = Object.fromEntries(formData);

		const exhibitionData = {
			title: payload.title,
			description: payload.description,
			exhibition_start: exhibitionDates.from,
			exhibition_end: exhibitionDates.to,
			registration_start: registrationDates.from,
			registration_end: registrationDates.to,
			slots: payload.slots,
			active: active,
			archive: archive,
		};

		if (exhibitionData?.title.length < 3) {
			toast({
				title: 'Title is too short',
				description: 'Please enter a title with at least 3 characters',
				variant: 'destructive',
			});
			return;
		}

		if (exhibitionData?.description.length < 20) {
			toast({
				title: 'Description is too short',
				description: 'Please enter a description with at least 20 characters',
				variant: 'destructive',
			});
			return;
		}

		if (parseInt(exhibitionData?.slots) < 1 || parseInt(exhibitionData?.slots) > 1000) {
			toast({
				title: 'Invalid number of slots',
				description: 'Please enter a number of slots greater than 0',
				variant: 'destructive',
			});
			return;
		}

		// TODO:check if exhibiton start date is after registration end date

		console.log(exhibitionData);

		const data = await supabase.from('exhibitions').update(exhibitionData).match({ id: exhibition.id }).single();

		console.log(data);

		const { error } = data;

		if (error) {
			toast({
				title: 'Error',
				description: `${error.message}`,
				variant: 'destructive',
			});
		} else {
			toast({
				title: 'Success',
				description: `Exhibition updated successfully`,
				variant: 'success',
			});
		}
	};

	return (
		<>
			<form className="flex flex-col w-full max-w-lg gap-5 p-2 mx-auto my-5" onSubmit={e => handleFormSubmit(e)}>
				<div className="flex flex-col gap-2">
					<Label htmlFor="title" className="capitalize">
						Exhibition Title
					</Label>

					<Input id="title" name="title" defaultValue={exhibition?.title} placeholder="Exhibition Title" />
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="description" className="capitalize">
						Exhibition Description
					</Label>

					<Textarea id="description" name="description" defaultValue={exhibition?.description} placeholder="Exhibition Description" />
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="registrationDates" className="capitalize">
						Registration Start and End Dates
					</Label>

					<DatePickerWithRange date={registrationDates} setDate={setRegistrationDates} />
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="exhibitionDates" className="capitalize">
						Exhibtion Start and End Dates
					</Label>

					<DatePickerWithRange date={exhibitionDates} setDate={setExhibitionDates} />
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="slots" className="capitalize">
						Slots
					</Label>

					<Input id="slots" name="slots" type="number" min="0" max={1000} defaultValue={exhibition?.slots} placeholder="Slots" />
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="status" className="capitalize">
						Status
					</Label>

					<div className="flex gap-2">
						<Switch
							checked={active}
							onChange={() => {
								setActive(!active);
							}}
							className={`${active ? 'bg-green-500' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}
						>
							<span className="sr-only">Enable notifications</span>
							<span className={`${active ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`} />
						</Switch>

						{active ? <Badge variant={'success'}>active</Badge> : <Badge variant="outline">inactive</Badge>}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="status" className="capitalize">
						Archive
					</Label>

					<div className="flex gap-2">
						<Switch
							checked={archive}
							onChange={() => {
								setArchive(!archive);
							}}
							className={`${archive ? 'bg-green-500' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}
						>
							<span className="sr-only">Enable notifications</span>
							<span className={`${archive ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`} />
						</Switch>

						{archive ? <Badge variant={'destructive'}>true</Badge> : <Badge variant="success">false</Badge>}
					</div>
				</div>

				<div className="flex flex-row-reverse gap-1">
					<ConfirmationPrompt
						title="Are you sure you want to delete this exhibition?"
						description="This action cannot be undone."
						confirmText="Delete"
						cancelText="Cancel"
						buttons={<Button type="submit">Save</Button>}
					>
						<Button type="submit">Save (Prompt)</Button>
					</ConfirmationPrompt>

					<Button type="submit">Save</Button>
				</div>
			</form>
		</>
	);
};

export default EditExhibitionForm;
