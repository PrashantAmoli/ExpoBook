import { supabase } from '@/utils/supabase';

export default async function handler(req, res) {
	try {
		switch (req.method) {
			case 'GET':
				const { exhibition_id } = req.query;
				const { data, error } = await supabase.from('slots').select('*').eq('exhibition_id', exhibition_id);
				if (error) throw error;
				return res.status(200).json(data);
			default:
				return res.status(400).json({ error: 'Not authorized to access this HTTP method' });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err.message });
	}
}
