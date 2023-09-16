import { supabase } from '@/utils/supabase';

export default async function handler(req, res) {
	const { body, method } = req;
	const secret = req.headers['secret'];

	console.log(body);

	if (secret !== '9318899447') {
		res.status(401).json({ message: 'Invalid secret' });
		return;
	}

	const { type, record } = body;

	switch (type) {
		case 'DELETE':
			const { error } = await supabase
				.from('slots')
				.update({
					status: 'cancelled',
					booked: false,
					booked_by: null,
				})
				.eq('id', record?.slot_id);

			if (error) {
				console.log('DELETE: ', error);
				res.status(500).json({
					message: `Slot id ${record.slot_id} of exhibition id ${record?.exhibtion_id} not updated on deleting order ${JSON.stringify(record)}`,
				});
				return;
			}
			break;
		case 'INSERT':
			console.log('insert');
			break;
		case 'UPDATE':
			console.log('update');
			break;
		default:
			console.log('default');
			break;
	}
}
