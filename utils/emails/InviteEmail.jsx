import * as React from 'react';
import { Body, Button, Container, Column, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from '@react-email/components';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
const Exhibitor_Portal_Url = process.env.EXHIBITOR_PORTAL_URL || 'https://easemyexpo.com/exhibitor';

export const InviteEmail = ({ invitee, invited_by }) => {
	const previewText = `Exhibtion Booking Step#1 Complete | Next Step`;

	return (
		<Html>
			<Head />

			<Preview>{previewText}</Preview>

			<Tailwind>
				<Body className="p-2 mx-auto my-auto font-sans bg-white border border-solid border-[#eaeaea]">
					<Container className="  rounded my-[40px] mx-auto p-[50px] w-[465px]">
						{/* <Section className="mt-[32px]">
							<Img src={`${baseUrl}/static/vercel-logo.png`} width="40" height="37" alt="Vercel" className="mx-auto my-0" />
						</Section> */}

						<Heading className="text-black text-[18px] font-normal text-center p-0 my-[30px] mx-0">
							Booking initiated for slot <strong>{invitee?.slot || 0}</strong>
						</Heading>

						<Text className="text-black text-[14px] leading-[21px]">Hello {invitee?.first_name || 'Exhibitor Name'},</Text>

						<Text className="text-black text-[14px] leading-[24px] indent-3">
							<Link href={`https://hblfshows.com`} className="text-blue-600 no-underline">
								<strong>{invited_by?.organizer || 'Exhibition Organizer'} </strong>
							</Link>
							has invited you to the exhibitor portal of{' '}
							<Link href={`https://easemyexpo.com`} className="text-blue-600 no-underline">
								<strong> EaseMyExpo </strong>
							</Link>
							for the next steps regarding your exhibition slot booking process.
						</Text>

						<Text className="text-black text-[14px] ">Please click the button below to accept the invitation and register using this email.</Text>

						{/* <Section>
							<Row>
								<Column align="right">
									<Img className="rounded-full" src={`next.svg`} width="64" height="64" />
								</Column>
								<Column align="center">
									<Img src={`/favicon.ico`} width="12" height="9" alt="invited you to" />
								</Column>
								<Column align="left">
									<Img className="rounded-full" src={`/vercel.svg`} width="64" height="64" />
								</Column>
							</Row>
						</Section> */}

						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								pX={20}
								pY={12}
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
								href={`${Exhibitor_Portal_Url}/register?exhibition=${invitee?.exhibition_id}`}
							>
								Accept
							</Button>
						</Section>

						<Text className="text-black text-[14px] leading-[24px]">
							or copy and paste this URL into your browser:{' '}
							<Link href={`${Exhibitor_Portal_Url}/register?exhibition=${invitee?.exhibition_id}`} className="text-blue-600 no-underline">
								{`${Exhibitor_Portal_Url}/register?exhibition=${invitee?.exhibition_id}`}
							</Link>
						</Text>

						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[11px] leading-[15px]">
							This invitation was intended for{' 	'}
							<Link href={`mailto:${invitee?.email}`} className="text-blue-600 no-underline">
								{invitee?.first_name || 'Exhibitor'} {invitee?.last_name || 'Name'}
							</Link>
							, <span className="text-black">{invitee?.company || 'Company'} </span>. If you were not expecting this invitation, you can ignore this
							email. If you are concerned about your account&apos;s safety, please reply to this email to get in touch with us or visit{' '}
							<Link href={`https://easemyexpo.com`} className="text-blue-600 no-underline">
								here
							</Link>
							.
						</Text>

						<Text className="text-[#666666] text-[11px] leading-[15px]">
							<Link href={`https://easemyexpo.com`} className="text-blue-600 no-underline">
								EaseMyExpo
							</Link>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default InviteEmail;
