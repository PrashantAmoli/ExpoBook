import { Suspense, useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { Button } from './ui/button';
import Script from 'next/script';

export function MyDrawer({ children, drawerOpen, setDrawerOpen, slot }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isSlotAvailable, setIsSlotAvailable] = useState(false);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		setIsOpen(drawerOpen);
	}, [drawerOpen]);

	const closeDrawer = () => {
		setDrawerOpen(false);
	};

	useEffect(() => {
		Tally.loadEmbeds();
	}, [showForm]);

	return (
		<>
			<Drawer.Root
				shouldScaleBackground
				dismissible={true}
				isOpen={isOpen}
				value={isOpen}
				// onOpenChange={() => setIsOpen(prev => !prev)}
			>
				<Drawer.Trigger asChild onClick={() => setIsOpen(true)} data-state={isOpen}>
					{children}
				</Drawer.Trigger>

				<Drawer.Portal>
					<Drawer.Overlay className="fixed inset-0 bg-black/40" />
					<Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[98vh] min-h-[95vh] rounded-t-[10px] z-30">
						<div className="max-w-3xl w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]">
							{isSlotAvailable ? (
								<>
									<h2 className="text-center">You chosen slot {slot} is available</h2>
									<p className="text-xs text-center opacity-90">
										Book it using the form below. Try refreshing the page in case form doesn&apos;t show up or contact support using the chat widget
										below
									</p>
								</>
							) : (
								<div className="absolute inset-0 flex flex-col items-center justify-center -z-10 animate-pulse">
									<p>Checking if slot {slot} is available...</p>
									<p>You will see a booking button if slot is available...</p>
								</div>
							)}

							{isSlotAvailable ? (
								<>
									{showForm ? (
										<Suspense fallback={<div>Loading...</div>}>
											<iframe
												data-tally-src="https://tally.so/embed/wvrkGD?hideTitle=1&transparentBackground=1&dynamicHeight=1"
												loading="eager"
												width="100%"
												height="900"
												frameborder="0"
												marginheight="0"
												marginwidth="0"
												title="EME: PoC"
												className="relative z-50"
												onLoad={() => {
													console.log('TallyLoaded');
												}}
											/>
										</Suspense>
									) : (
										<> </>
									)}
									<Button onClick={() => setShowForm(prev => !prev)}>Toggle Form</Button>
								</>
							) : (
								<Button onClick={() => setIsSlotAvailable(true)}>Book Now</Button>
							)}
						</div>

						<Button
							type="button"
							onClick={() => setIsOpen(false)}
							className="absolute top-0 right-0 mt-2 mr-2"
							// className="rounded-md mb-6 w-full bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
						>
							X
						</Button>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</>
	);
}
