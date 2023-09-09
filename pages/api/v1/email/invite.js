import { InviteEmail } from '@/utils/emails';
import { resend } from '@/utils/resend';

const SAMPLE_RECORD = {
	type: 'INSERT',
	table: 'inquiries',
	record: {
		id: 2,
		slot: 46,
		email: 'test1@gmail.com',
		status: 'new',
		company: 'EaseMyExpo',
		slot_id: 34,
		phone_no: 9318899447,
		last_name: 'Amoli',
		created_at: '2023-09-09T14:25:32.975435+00:00',
		first_name: 'Prashant',
		updated_at: '2023-09-09T14:25:32.975435+00:00',
		exhibition_id: 4,
	},
	schema: 'public',
	old_record: null,
};

export default async function handler(req, res) {
	const { record } = req.body;

	if (!record) return res.status(400).json({ message: 'Record not found' });

	const { email, first_name, last_name, slot, company } = record;

	const invitee = { email, first_name, last_name, slot, company };
	const invited_by = { email: '', organizer: 'HBLF Organizer' };

	const data = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: `${email}`,
		subject: 'Exhibtiion Booking | EaseMyExpo',
		react: <InviteEmail invitee={invitee} invited_by={invited_by} />,
	});

	res.status(200).json({ data, invitee, invited_by });
}
