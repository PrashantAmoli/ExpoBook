import { stripe } from '@/utils/stripe';

export default async function handler(req, res) {
	const sig = req.headers['stripe-signature'];
	// convert the raw body to text/buffer then pass it to stripe.webhooks.constructEvent
	const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

	/* 
	TODO: Handle all necessary payment_intent events including:
	- payment_intent.succeeded
	- payment_intent.payment_failed
	- payment_intent.canceled

	* GOTO slots table page and click on open button in the table you'll find the payment _intent element tab there

	TODO: Store the payment_intent id in the transactions table in the database and add more required columns to the table
	*/

	switch (event.type) {
		case 'checkout.session.completed':
			const session = event.data.object;
			const customer = await stripe.customers.retrieve(session.customer);

			// Do something with customer and session
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	res.json({ received: true });
}
