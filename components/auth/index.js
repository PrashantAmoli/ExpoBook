import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CreateOrganization, OrganizationProfile, OrganizationSwitcher } from '@clerk/clerk-react';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DropdownMenuWrapper from '../DropdownMenuWrapper';

const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]', '/admin', '/admin/orders', '/admin/users'];

const Navbar = ({ children }) => {
	const { theme, setTheme } = useTheme();

	return (
		<nav className="relative inset-x-0 top-0 z-30 items-center justify-center hidden w-full shadow-xl dark:shadow-xl dark:shadow-blue-300/10 sm:flex backdrop-blur">
			<div className="flex flex-row items-center justify-between w-full gap-1 px-2 mx-auto sm:gap-3 max-w-7xl h-14 ">
				<Link href="/">
					<h2 className="text-xl text-center lg:text-2xl font-SpaceX">EXPOBOOK</h2>
				</Link>

				<DropdownMenuWrapper />

				<div className="flex gap-1">
					{children}
					<Switch
						checked={theme === 'dark' ? true : false}
						onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						className="mt-1.5 transition-all duration-500 ease-in-out rotate-90"
					/>
				</div>
			</div>
		</nav>
	);
};

export default function ClerkWrapper({ children }) {
	const { pathname } = useRouter();

	const isPublicPage = publicPages.includes(pathname);

	return (
		<ClerkProvider>
			{isPublicPage ? (
				<>
					<SignedIn>
						<Navbar>
							<OrganizationSwitcher
								appearance={{
									elements: {
										organizationSwitcherPopoverActionButton: pathname.includes('admin') ? '' : 'disabled hidden ',
										organizationPreview: 'text-black dark:text-white',
										organizationSwitcherTriggerIcon: 'text-black dark:text-white',
									},
								}}
							/>
							<UserButton />
							{/* <OrganizationProfile /> */}
							{/* <SignOutButton>Signout</SignOutButton> */}
						</Navbar>
					</SignedIn>

					<SignedOut>
						<Navbar>
							<SignInButton>
								<Button>Sign In</Button>
							</SignInButton>
						</Navbar>
					</SignedOut>

					{children}
				</>
			) : (
				<>
					<SignedIn>
						<Navbar>
							<OrganizationSwitcher
								appearance={{
									elements: {
										organizationSwitcherPopoverActionButton: 'disabled hidden',
									},
								}}
							/>
							<UserButton />
							{/* <SignOutButton>Signout</SignOutButton> */}
						</Navbar>

						<div className="relative w-full">{children}</div>
					</SignedIn>

					<SignedOut>
						<Navbar>
							<SignInButton>
								<Button>Sign In</Button>
							</SignInButton>
						</Navbar>

						<div className="relative">{children}</div>

						{/* <RedirectToSignIn path="/admin" /> */}
					</SignedOut>
				</>
			)}
		</ClerkProvider>
	);
}
