import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const BookingForm = ({ slot }) => {
	const [formData, setFormData] = useState({ slot: slot });
	const [required, setRequired] = useState(false);

	return (
		<>
			<form className="flex flex-col w-full max-w-2xl gap-5 p-1 mx-auto my-5 overflow-y-auto border-blue-500 sm:p-4 rounded-2xl">
				<div className="flex flex-col gap-3 p-3 border rounded-2xl">
					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="first_name">
							Slot
						</Label>
						<Input id="first_name" name="first_name" type="text" placeholder="John" value={slot} required={required} />
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="email">
							Email
						</Label>
						<Input id="email" name="email" type="email" placeholder="team@company.com" required={required} />
						<p className="text-xs text-muted-foreground">
							NOTE: This email address will be used for all further processes and communication including email updates, payments, client portal
							login(coming soon), etc. Please make sure this is the correct email address & use it for all future communication.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-3 p-3 border rounded-2xl">
					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="first_name">
							First Name
						</Label>
						<Input
							id="first_name"
							name="first_name"
							type="text"
							placeholder="John"
							defaultValue={formData?.first_name || ''}
							onChange={e => setFormData({ ...formData, first_name: e.target.value })}
						/>
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="last_name">
							Last Name
						</Label>
						<Input
							id="last_name"
							name="last_name"
							type="text"
							placeholder="Doe"
							defaultValue={formData?.last_name || ''}
							onChange={e => setFormData({ ...formData, last_name: e.target.value })}
						/>
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="personal_email">
							Personal Email
						</Label>
						<Input
							id="personal_email"
							name="personal_email"
							type="email"
							placeholder={formData?.first_name ? `${formData?.first_name}@gmail.com` : 'Your email'}
							defaultValue={formData?.personal_email || ''}
							onChange={e => setFormData({ ...formData, personal_email: e.target.value })}
						/>
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="phone">
							Phone no.
						</Label>
						<Input id="phone" name="phone" type="tel" placeholder="123-456-7890" required={required} />
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="position">
							Position
						</Label>
						<Input
							id="position"
							name="position"
							type="text"
							placeholder="Position i.e. CEO, CMO, etc."
							defaultValue={formData?.position || ''}
							onChange={e => setFormData({ ...formData, position: e.target.value })}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-3 p-3 border rounded-2xl">
					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="company">
							Company
						</Label>
						<Input id="company" name="company" type="text" placeholder="Company Name" required={required} />
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="website">
							website
						</Label>
						<Input id="website" name="website" type="url" placeholder="https://company.com" required={required} />
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="address">
							address
						</Label>
						<Input id="address" name="address" type="text" placeholder="Address" required={required} />
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="city">
							city
						</Label>
						<Input id="city" name="city" type="text" placeholder="City" required={required} />
					</div>

					<div className="flex flex-col w-full gap-1">
						<Label className="capitalize" htmlFor="state">
							state
						</Label>
						<Input id="state" name="state" type="text" placeholder="State" required={required} />
					</div>
				</div>

				<div className="flex flex-row-reverse gap-2">
					<Button
						className=""
						onClick={() => {
							const confirmation = confirm('Are you sure you want to submit?');
							if (confirmation) {
								console.log(formData);
							}
						}}
					>
						Submit
					</Button>
					<Button className="" variant="outline">
						Cancel
					</Button>
				</div>
			</form>
		</>
	);
};

export default BookingForm;
