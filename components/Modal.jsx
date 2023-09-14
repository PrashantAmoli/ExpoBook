import { Dialog, Transition } from '@headlessui/react';
import { Fragment, Suspense } from 'react';
import { Booking } from './booking';
import BookingForm from '@/components/forms/BookingForm';

export default function Modal({ children, modalOpen, setModalOpen, title }) {
	function handleClose() {
		setModalOpen(false);
	}

	function handleOpen() {
		setModalOpen(true);
	}

	return (
		<>
			<Transition appear show={modalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-1.5 text-center sm:p-6">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-50"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-50"
							>
								<Dialog.Panel className="w-full sm:max-w-screen-2xl flex flex-col justify-center h-[92vh] sm:min-h-[92vh] max-h-[92vh] transform overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl p-1 pt-2.5 sm:p-2 text-left align-middle shadow-xl transition-all select-none border border-blue-950">
									<Dialog.Title as="h3" className="fixed flex justify-center w-full text-lg font-semibold text-center gap-x-2 top-1">
										{title}
									</Dialog.Title>

									{children}

									<div className="absolute z-20 top-2 right-2 backdrop-blur-md">
										<button
											type="button"
											className="inline-flex justify-center p-1 font-extrabold border rounded-full border-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:scale-105"
											onClick={handleClose}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
												{/* Close button */}
											</svg>
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
