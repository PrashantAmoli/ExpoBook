import Stripe from 'stripe';

export default async function StripeCheckoutHandler(req, res) {
	// const { id, amount } = req.body;

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: '2020-08-27',
	});

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'inr',
						product_data: {
							name: 'T-shirt',
						},
						unit_amount: 10000,
					},
					quantity: 1,
				},
			],
			phone_number_collection: {
				enabled: true,
			},
			custom_fields: [
				{
					key: 'engraving',
					label: {
						type: 'custom',
						custom: 'Personalized engraving',
					},
					type: 'text',
					optional: false,
				},
				{
					key: 'for',
					label: {
						type: 'custom',
						custom: 'Paying for',
					},
					optional: true,
					type: 'dropdown',

					dropdown: {
						options: [
							{
								label: 'Bookings',
								value: 'bookings',
							},
							{
								label: 'Utilities',
								value: 'utilities',
							},
						],
					},
				},
			],
			mode: 'payment',
			// expire after 30mins
			expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
			success_url: 'http://localhost:3000/embed',
			cancel_url: 'http://localhost:4242/demo',
			metadata: {
				slot: '21',
				// transaction data for mapping in DB
			},
		});

		res.redirect(303, session.url);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: error.message,
		});
	}
}
