import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export const ExhibitionCard = ({ inquiry }) => {
	return (
		<>
			<Card key={inquiry.id} className="transition-all duration-500 shadow-lg hover:scale-105 hover:shadow-xl hover:-translate-y-3">
				<CardHeader>
					<CardTitle>{inquiry.email}</CardTitle>
				</CardHeader>

				<CardContent>
					<CardDescription>{inquiry.description}</CardDescription>

					<div className="flex flex-col justify-between w-full gap-1 my-2">
						<Label className="w-full text-sm">Exhibition Start & End Date</Label>
						<div className="text-xs text-gray-500">
							<time dateTime={inquiry.exhibition_start}>{inquiry.exhibition_start}</time> to{' '}
							<time dateTime={inquiry.exhibition_end}>{inquiry.exhibition_end}</time>
						</div>

						<Label className="w-full text-sm">Registration Start & End Date</Label>
						<div className="text-xs text-gray-500">
							<time dateTime={inquiry.registration_start}>{inquiry.registration_start}</time> to{' '}
							<time dateTime={inquiry.registration_end}>{inquiry.registration_end}</time>
						</div>

						<Label className="w-full text-sm">Created At Date</Label>
						<div className="text-sm text-gray-500">
							<time dateTime={inquiry.created_at}>{inquiry.created_at}</time>
						</div>

						<Label className="w-full text-sm">Updated At Date</Label>
						<div className="text-sm text-gray-500">
							<time dateTime={inquiry.updated_at}>{inquiry.updated_at}</time>
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col items-end gap-2">
					<div className="flex justify-start w-full gap-1">
						<Badge variant={inquiry.status === 'active' ? '' : inquiry.status === 'archieved' ? 'secondary' : 'destructive'}>{inquiry.status}</Badge>
						<Badge>
							{inquiry.available_slots} / {inquiry.slots} available
						</Badge>
					</div>

					<div className="flex gap-2">
						<Link href={`/admin/exhibitions/${inquiry.id}/edit`}>
							<Button variant="outline">Edit</Button>
						</Link>

						<Link href={`/admin/exhibitions/${inquiry.id}`}>
							<Button>View</Button>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};
