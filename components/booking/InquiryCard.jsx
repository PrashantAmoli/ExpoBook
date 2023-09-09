import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export const InquiryCard = ({ inquiry }) => {
	return (
		<>
			<Card key={inquiry.id} className="w-full transition-all duration-500 shadow-lg hover:scale-105 hover:shadow-xl hover:-translate-y-3">
				<CardHeader>
					<CardTitle>{inquiry.email}</CardTitle>
				</CardHeader>

				<CardContent>
					<CardDescription></CardDescription>

					<div className="flex flex-col justify-between w-full gap-1 my-2">
						<div className="grid items-center grid-cols-3">
							<Label className="w-full mt-1 text-sm">Name: </Label>
							<span className="col-span-2 text-sm text-gray-500">
								{inquiry.first_name} {inquiry.last_name}
							</span>

							<Label className="w-full mt-1 text-sm">Company: </Label>
							<span className="col-span-2 text-sm text-gray-500">{inquiry.company}</span>

							<Label className="w-full mt-1 text-sm">Company: </Label>
							<span className="col-span-2 text-sm text-gray-500">{inquiry.company}</span>

							<Label className="w-full mt-1 text-sm">Email: </Label>
							<a href={`mailto:${inquiry.email}`} className="col-span-2 text-sm text-gray-500">
								{inquiry.email}
							</a>

							<Label className="w-full mt-1 text-sm">Phone: </Label>
							<a href={`tel:${inquiry.phone_no}`} className="col-span-2 text-sm text-gray-500">
								{inquiry.phone_no}
							</a>

							<Label className="w-full mt-1 text-sm">Created At</Label>
							<div className="col-span-2 text-sm text-gray-500">
								<time dateTime={inquiry.created_at}>
									{inquiry.created_at.slice(0, 10)} {inquiry.created_at.slice(12, 19)}
								</time>
							</div>

							<Label className="w-full mt-1 text-sm">Updated At</Label>
							<div className="col-span-2 text-sm text-gray-500">
								<time dateTime={inquiry.updated_at}>
									{inquiry.updated_at.slice(0, 10)} {inquiry.updated_at.slice(12, 19)}
								</time>
							</div>
						</div>
					</div>

					<div className="flex justify-start w-full gap-1">
						<Badge variant={inquiry.status === 'active' ? '' : inquiry.status === 'archieved' ? 'secondary' : 'destructive'}>{inquiry.status}</Badge>
						<Badge>
							{inquiry.available_slots} / {inquiry.slots} available
						</Badge>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col items-end gap-2">
					<div className="flex gap-2">
						<Button variant="destructive">Reject</Button>

						<Button>Request Payment</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};
