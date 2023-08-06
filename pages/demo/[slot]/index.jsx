import DBTable from '@/components/DBTable';
import { DatePickerWithRange } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/utils/supabase';
import { addDays } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SAMPLE_DATA = [
	{
		slot: '1',
		size: '3X4',
		length: 3,
		width: 4,
		booked: false,
		status: 'available',
		exhibition_title: 'Test Exhibition',
		exhibition_description: 'Test Exhibition Description',
		exhibition_category: 'Test Exhibition Category',
		exhibition_start_date: '2021-09-01',
		exhibition_end_date: '2021-09-30',
		exhibition_city: 'Test City',
		form_id: 'WWE342WR',
		// organizer
		organizer_name: 'Test Organizer',
		organizer_email: 'testorganizer@gmail.com',
		organizer_contact_number: '+919876543210',
		organizer_website: 'https://testorganizer.com',
	},
];

export default function EditPage() {
	const [date, setDate] = useState({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	const router = useRouter();
	const { slot } = router.query;
	const [bookingsData, setBookingsData] = useState([]);
	const [submissionData, setSubmissionData] = useState({});

	const fetchBookings = async () => {
		const data = await supabase.from('bookings').select('*');
		console.log(data);
		setBookingsData(data);
	};

	const addSlot = async slotData => {
		const { data, error } = await supabase
			.from('bookings')
			.insert([{ ...slotData }])
			.select();

		console.log(data);
		console.log(error);
	};

	useEffect(() => {
		fetchBookings();
	}, [submissionData]);

	const handleSubmit = async e => {
		e.preventDefault();
		// get all values from form
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		data.length = 3;
		data.width = 4;
		data.booked = false;
		data.status = 'available';
		data.exhibition_title = 'Test Exhibition';
		data.exhibition_category = ['Test Exhibition Category'];
		data.exhibition_start_date = date.from;
		data.exhibition_end_date = date.to;
		data.exhibition_city = 'Delhi';
		data.form_id = 'WWE342WR';
		// organizer
		data.organizer_name = 'Test Organizer';
		data.organizer_email = 'testorganizer@gmail.com';
		data.organizer_contact_number = '+919876543210';
		data.organizer_website = 'https://testorganizer.com';

		addSlot({
			...data,
			size: `${data.length}X${data.width}`,
		});
		console.log(data);
		setSubmissionData(data);
	};

	return (
		<>
			<Head>
				<title>{slot}</title>
			</Head>

			<main className="w-full">
				<h1 className="text-center">Booking Data From</h1>

				<p className="break-words p-2">{JSON.stringify(bookingsData)}</p>
				<p className="break-words p-2">{JSON.stringify(submissionData)}</p>

				<form onSubmit={e => handleSubmit(e)} className="w-full max-w-2xl mx-auto flex flex-col gap-5 p-2">
					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="slot">
							Slot
						</Label>
						<Input type="text" placeholder="Slot" name="slot" id="slot" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="length">
							Length
						</Label>
						<Input type="number" placeholder="Length" name="length" id="length" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="width">
							Width
						</Label>
						<Input type="number" placeholder="Width" name="width" id="width" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="size">
							Size
						</Label>
						<Input type="text" placeholder="LengthXWidth i.e. 3X4" name="size" id="size" disabled />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="booked">
							Booked
						</Label>
						<Input type="text" placeholder="Default false" name="booked" id="booked" disabled />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="status">
							Status
						</Label>
						<Input type="text" placeholder="'available' 'unavailable' 'cancelled'" name="status" id="status" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="exhibition_title">
							Exhibition Title
						</Label>
						<Input type="text" placeholder="Exhibition Name" name="exhibition_title" id="exhibition_title" defaultValue="Test Exhibition" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="exhibition_category">
							Exhibition Category
						</Label>
						<Input type="text" placeholder="Exhibition Category Multi-select Dropdown" name="exhibition_category" id="exhibition_category" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="exhibition_start_date">
							Exhibition Date Range
						</Label>
						<DatePickerWithRange date={date} setDate={setDate} />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="exhibition_start_date">
							Exhibition Start Date
						</Label>
						<Input type="text" placeholder="Exhibition Start Date" name="exhibition_start_date" id="exhibition_start_date" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="exhibition_end_date">
							Exhibition End Date
						</Label>
						<Input type="text" placeholder="Exhibition End Date" name="exhibition_end_date" id="exhibition_end_date" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="exhibition_city">
							Exhibition City
						</Label>
						<Input type="text" placeholder="Exhibition City" name="exhibition_city" id="exhibition_city" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="form_id">
							Form ID
						</Label>
						<Input type="text" placeholder="Form ID" name="form_id" id="form_id" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="organizer_name">
							Organizer Name
						</Label>
						<Input type="text" placeholder="Organizer Name" name="organizer_name" id="organizer_name" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="organizer_email">
							Organizer Email
						</Label>
						<Input type="text" placeholder="Organizer Email" name="organizer_email" id="organizer_email" />
					</div>

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="organizer_contact_number">
							Organizer Phone
						</Label>
						<Input type="text" placeholder="Organizer Phone" name="organizer_contact_number" id="organizer_contact_number" />
					</div>

					{/* <div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="organizer_city">
							Organizer City
						</Label>
						<Input type="text" placeholder="Organizer City" name="organizer_city" id="organizer_city" />
					</div> */}

					<div className="flex flex-col gap-1">
						<Label className="ml-2 text-base" htmlFor="organizer_website">
							Organizer Website
						</Label>
						<Input type="text" placeholder="Organizer Website" name="organizer_website" id="organizer_website" />
					</div>

					<Button type="submit" className="w-full">
						Add
					</Button>
				</form>

				<section className="p-1 sm:p-2">
					<DBTable data={bookingsData.data} />
				</section>
			</main>
		</>
	);
}
