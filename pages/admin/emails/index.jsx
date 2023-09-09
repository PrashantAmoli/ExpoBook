import SuperAdmin from '@/components/auth/SuperAdmin';
import { InviteEmail } from '@/utils/emails';
import Head from 'next/head';

const Templates = [
	{
		name: 'Invite User',
		component: <InviteEmail />,
	},
];

export const EmailTemplatesPage = () => {
	return (
		<>
			<Head>
				<title>Email Templates</title>
			</Head>

			<main className="w-full">
				<SuperAdmin showMessage>
					{Templates.map((template, index) => (
						<div key={index} className="p-2 mx-auto w-fit">
							{template.component}
						</div>
					))}
				</SuperAdmin>
			</main>
		</>
	);
};

export default EmailTemplatesPage;
