import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const DefaultData = {
	title: 'Are you absolutely sure?',
	description: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
	cancelText: 'Cancel',
	confirmText: 'Continue',
};

export function ConfirmationPrompt({ children, title, description, onConfirm, onCancel, cancelText, confirmText, buttons }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children ? children : <Button variant="Confirm">Show Dialog</Button>}</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title || DefaultData.title}</AlertDialogTitle>
					<AlertDialogDescription>{description || DefaultData.description}</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel || null}>{cancelText || DefaultData.cancelText}</AlertDialogCancel>

					{buttons ? (
						buttons
					) : (
						<AlertDialogAction onClick={onConfirm || null} type="submit">
							{confirmText || DefaultData.confirmText}
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmationPrompt;
