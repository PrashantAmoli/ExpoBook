import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export const ExhibitionCard = ({ exhibition }) => {
	return (
		<>
			<Card key={exhibition.id} className="transition-all duration-500 shadow-lg hover:scale-105 hover:shadow-xl hover:-translate-y-3">
				<CardHeader>
					<CardTitle>{exhibition.title}</CardTitle>
				</CardHeader>

				<CardContent>
					<CardDescription>{exhibition.description}</CardDescription>

					<div className="flex flex-col justify-between w-full gap-1 my-2">
						<Label className="w-full text-sm">Exhibition Start & End Date</Label>
						<div className="text-xs text-gray-500">
							<time dateTime={exhibition.exhibition_start}>{exhibition.exhibition_start}</time> to{' '}
							<time dateTime={exhibition.exhibition_end}>{exhibition.exhibition_end}</time>
						</div>

						<Label className="w-full text-sm">Registration Start & End Date</Label>
						<div className="text-xs text-gray-500">
							<time dateTime={exhibition.registration_start}>{exhibition.registration_start}</time> to{' '}
							<time dateTime={exhibition.registration_end}>{exhibition.registration_end}</time>
						</div>

						<Label className="w-full text-sm">Created At Date</Label>
						<div className="text-sm text-gray-500">
							<time dateTime={exhibition.created_at}>{exhibition.created_at}</time>
						</div>

						<Label className="w-full text-sm">Updated At Date</Label>
						<div className="text-sm text-gray-500">
							<time dateTime={exhibition.updated_at}>{exhibition.updated_at}</time>
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col items-end gap-2">
					<div className="flex justify-start w-full gap-1">
						<Badge variant={exhibition.status === 'active' ? '' : exhibition.status === 'archieved' ? 'secondary' : 'destructive'}>
							{exhibition.status}
						</Badge>
						<Badge>
							{exhibition.available_slots} / {exhibition.slots} available
						</Badge>
					</div>

					<div className="flex gap-2">
						<Link href={`/admin/exhibitions/${exhibition.id}/edit`}>
							<Button variant="outline">Edit</Button>
						</Link>

						<Link href={`/admin/exhibitions/${exhibition.id}`}>
							<Button>View</Button>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};
