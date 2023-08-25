export default function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return res.status(200).json({
				message: 'GET',
			});
			break;
		case 'POST':
			return res.status(200).json({
				message: 'POST',
			});
			break;
		case 'PUT':
			return res.status(200).json({
				message: 'PUT',
			});
			break;
		case 'DELETE':
			return res.status(200).json({
				message: 'DELETE',
			});
			break;
		default:
			return res.status(200).json({
				message: 'Default',
			});
			break;
	}
}
