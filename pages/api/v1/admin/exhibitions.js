import { supabase } from '@/utils/supabase';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			const { data, error } = await supabase.from('exhibitions').select('*');

			if (error) return res.status(401).json({ error: error.message });
			return res.status(200).json({ exhibitions: data });
			break;
		case 'POST':
			break;
		case 'PUT':
			break;
		case 'DELETE':
			break;
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
}
