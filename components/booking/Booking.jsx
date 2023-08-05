import { Transition } from '@headlessui/react';
import { Fragment, Suspense, useState } from 'react';
import { Button } from '../ui/button';

export default function Booking({ slot }) {
	const [confirmSlot, setConfirmSlot] = useState(false);

	function handleConfirm() {
		setConfirmSlot(true);
	}

	return (
		<>
			{!confirmSlot ? (
				<Transition appear show={!confirmSlot} as={Fragment}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-50"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-300"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-50"
					>
						<div className="flex flex-col items-center justify-center w-full h-full gap-1">
							<p className="text-lg font-semibold text-center">Please confirm & book your slot</p>
							<Button onClick={handleConfirm} className="transition-all animate-pulse hover:scale-105">
								Confirm & Book {slot}
							</Button>
						</div>
					</Transition.Child>
				</Transition>
			) : (
				<Transition appear show={confirmSlot} as={Fragment}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-50"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-50"
					>
						<div className="flex flex-col items-center justify-center w-full h-full py-2 sm:py-3">
							<Suspense fallback={<div>Loading...</div>}>
								<iframe
									data-tally-src="https://tally.so/embed/wvrkGD?hideTitle=1&transparentBackground=1&dynamicHeight=0"
									loading="eager"
									width="100%"
									height="900"
									frameborder="0"
									marginheight="0"
									marginwidth="0"
									title="EME: PoC"
									allow="camera; microphone; autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture; speaker; vibrate; vr; magnetometer; xr; xr-spatial-tracking; accelerometer; gyroscope; midi; encrypted-media; autoplay; clipboard-write; clipboard-read; picture-in-picture; web-share;"
									className="relative z-20 overflow-y-scroll max-w-screen-2xl hide-scrollbar"
									onLoad={() => {
										Tally.loadEmbeds();
										console.log('TallyLoaded');
									}}
								/>
							</Suspense>
						</div>
					</Transition.Child>
				</Transition>
			)}
		</>
	);
}
