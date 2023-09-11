import { supabase } from '@/utils/supabase';

export default async function handler(req, res) {
	const { body, method } = req;
	const secret = req.headers['secret'];

	console.log(body);

	if (secret !== '9318899447') {
		res.status(401).json({ message: 'Invalid secret' });
		return;
	}

	if (body.record.direct_booking !== body.old_record.direct_boooking) {
		console.log('direct booking changed');

		const duplicates = await supabase
			.from('orders')
			.select()
			.match({ slot_id: body.record.id, exhibition_id: body.record.exhibition_id, type: 'reservation' });

		console.log(duplicates);

		if (duplicates.data.length === 0) {
			const { data, error } = await supabase.from('orders').insert({
				exhibition_id: body.record.exhibition_id,
				slot_id: body.record.id,
				// set updated_at as 30 seconds from current timestampz with timezone
				updated_at: new Date(new Date().getTime() + 30 * 1000).toISOString(),
				// set expire_at to 21 days from now timestampz with timezone
				expiry: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
				// set status to pending
				status: 'pending',
				amount: body.record?.amount || parseInt(body.record?.slot) * 1000 || 2000,
				tags: ['reservation'],
				type: 'reservation',
				accept_from: [],
			});

			console.log(data, error);
		} else {
			console.log(
				`${duplicates.data.length} duplicates found for slot ${body.record.slot} id ${body.record.id} and exhibition ${body.record.exhibition_id}`
			);

			// update the first duplicate
			const { data, error } = await supabase
				.from('orders')
				.update({
					// set updated_at as 30 seconds from current timestampz with timezone
					updated_at: new Date(new Date().getTime() + 30 * 1000).toISOString(),
					// set expire_at to 21 days from now timestampz with timezone
					expiry: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
					// set status to pending
					status: 'pending',
					amount: body.record?.amount || parseInt(body.record?.slot) * 1000 || 2000,
					tags: ['reservation'],
					type: 'reservation',
					accept_from: [],
				})
				.match({ id: duplicates.data[0].id, exhibition_id: body.record.exhibition_id, type: 'reservation', slot_id: body.record.id });

			console.log(data, error);
		}

		res.status(200).json({ success: true, message: 'Order updated' });
	} else {
		console.log('no change in booking');
		res.status(200).json({ message: 'No change in booking' });
	}
}
