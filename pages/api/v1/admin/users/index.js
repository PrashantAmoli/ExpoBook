const { supabase } = require('@/utils/supabase');

export default async function handler(req, res) {
	try {
		const getAllUsers = async () => {
			const { data, error } = await supabase.from('users').select('*');
			if (error) return error;
			return data;
		};

		switch (req.method) {
			case 'GET':
				const users = await getAllUsers();
				res.status(200).json(users);
				break;
			default:
				res.status(405).end();
				break;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
}
