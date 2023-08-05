import { useEffect, useRef, useState } from 'react';
import { MyDrawer } from './MyDrawer';
import { Button } from './ui/button';
import useMovies from '@/context/context';
import Modal from './Modal';
import { ToastAction } from './ui/toast';
import { useToast } from './ui/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

// const data = [
// 	{
// 		slot: 'CE2',
// 		available: true,
// 	},
// 	{
// 		slot: 'CE3',
// 		available: true,
// 	},
// 	{
// 		slot: 'CE4',
// 		available: true,
// 	},
// 	{
// 		slot: 'CE5',
// 		available: true,
// 	},
// 	{
// 		slot: 'CE6',
// 		available: true,
// 	},
// 	{
// 		slot: 'CE7',
// 		available: false,
// 	},
// 	{
// 		slot: 'CE8',
// 		available: true,
// 	},
// 	{
// 		slot: 'CE9',
// 		available: false,
// 	},
// 	{
// 		slot: 'KG',
// 		available: true,
// 	},
// 	{
// 		slot: 'KH',
// 		available: false,
// 	},
// 	{
// 		slot: 'KJ',
// 		available: true,
// 	},
// 	{
// 		slot: 'KK',
// 		available: true,
// 	},
// 	{
// 		slot: 'KL',
// 		available: true,
// 	},
// 	{
// 		slot: 'KM',
// 		available: false,
// 	},
// 	{
// 		slot: 'KN',
// 		available: true,
// 	},
// ];

export default function Stadium() {
	return (
		<>
			<SVG />
		</>
	);
}

export function SVG() {
	const svgRef = useRef(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [slot, setSlot] = useState('1');
	const { slots: data } = useMovies();
	const [modalOpen, setModalOpen] = useState(false);

	const { toast } = useToast();

	useEffect(() => {
		const anchors = svgRef.current.querySelectorAll('a');

		anchors.forEach(a => {
			a.classList.add('hover:bg-red-500/50');
			a.classList.add('relative');
			a.classList.add('z-50');
			a.setAttribute('target', '');
			a.setAttribute('href', '#');

			a.addEventListener('click', () => {
				// rect.setAttribute('fill', '#0b00e4');
				const slot_id = a.querySelector('text').innerHTML;
				setSlot(slot_id);
				a.setAttribute('href', `#${slot_id}`);

				if (!data.find(d => d.slot === slot_id).available) {
					// if slot is not available
					const notAvailableToast = () =>
						toast({
							title: 'Slot not available ',
							description: 'Contact support to see if there is any cancellation',
							action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>,
						});
					notAvailableToast();
				} else {
					// if slot is available
					setDrawerOpen(true);
					// Open booking modal here
					setModalOpen(true);
				}
			});

			a.addEventListener('mouseenter', () => {
				const slot_id = a.querySelector('text').innerHTML;

				let color = '#000000';

				// if slot is not available
				if (!data.find(d => d.slot === slot_id).available) {
					color = '#ff0000';
				} else {
					color = '#00ff00';
				}
				a.querySelectorAll('rect').forEach(rect => {
					rect.classList.add('hover:bg-red-500/50');
					rect.setAttribute('fill', `${color}`);
				});
				a.querySelectorAll('polygon').forEach(rect => {
					rect.classList.add('hover:bg-red-500/50');
					rect.setAttribute('fill', `${color}`);
				});
			});
			a.addEventListener('mouseleave', () => {
				a.querySelectorAll('rect').forEach(rect => {
					rect.classList.remove('hover:bg-red-500/50');
					rect.setAttribute('fill', '#000000');
				});
				a.querySelectorAll('polygon').forEach(rect => {
					rect.classList.remove('hover:bg-red-500/50');
					rect.setAttribute('fill', '#000000');
				});
			});
		});
	}, []);

	useEffect(() => {
		setDrawerOpen(true);
	}, [slot]);

	return (
		<>
			{/* <div className="fixed inset-x-auto bottom-0 z-10 flex gap-3 font-bold text-center w-fit">
				<div className="flex flex-col">
					<h3 className="font-semibold">Slot {slot} selected</h3>
					<h3 className="font-semibold">Check availability & book</h3>
				</div>
				<Button onClick={() => setDrawerOpen(true)} className="mx-auto animate-pulse hover:animate-none">
					Book Now
				</Button>
			</div> */}

			<MyDrawer drawer={drawerOpen} setDrawerOpen={setDrawerOpen} slot={slot}></MyDrawer>
			<section className="object-cover w-full max-h-screen overflow-auto ">
				{/* <ScrollArea className="h-[88vh] w-full rounded-md border p-1"> */}
				<svg
					version="1.0"
					id="mapts_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 1000 1000"
					enable-background="new 0 0 1000 1000"
					xmlSpace="preserve"
					ref={svgRef}
					className="min-w-[900px] min-h-[500px]"
				>
					<g id="mapts">
						<path
							fill="#808080"
							d="M332.27,82.483c-1.376-0.792-2.46-1.872-3.252-3.24c-0.792-1.368-1.188-2.884-1.188-4.548
s0.396-3.18,1.188-4.548s1.876-2.448,3.252-3.24s2.896-1.188,4.56-1.188c2.592,0,4.736,0.936,6.433,2.808l-2.28,2.208
c-1.104-1.296-2.48-1.944-4.128-1.944c-1.072,0-2.048,0.244-2.929,0.732c-0.879,0.488-1.571,1.18-2.075,2.076
s-0.757,1.928-0.757,3.096s0.253,2.2,0.757,3.096c0.504,0.897,1.196,1.588,2.075,2.076c0.881,0.489,1.856,0.732,2.929,0.732
c1.808,0,3.319-0.752,4.536-2.256l2.304,2.184c-0.848,1.024-1.853,1.804-3.012,2.34c-1.16,0.536-2.444,0.804-3.853,0.804
C335.166,83.671,333.646,83.275,332.27,82.483"
						></path>
						<polygon
							fill="#808080"
							points="346.694,66.103 357.589,66.103 357.589,69.175 349.934,69.175 349.934,73.159 356.822,73.159
356.822,76.231 349.934,76.231 349.934,80.215 357.589,80.215 357.589,83.287 346.694,83.287 		"
						></polygon>
						<polygon
							fill="#808080"
							points="360.925,66.103 364.693,66.103 371.605,77.623 371.797,77.623 371.605,74.311 371.605,66.103
374.822,66.103 374.822,83.287 371.414,83.287 364.117,71.119 363.925,71.119 364.117,74.431 364.117,83.287 360.925,83.287 		"
						></polygon>
						<polygon
							fill="#808080"
							points="381.878,69.175 377.078,69.175 377.078,66.103 389.917,66.103 389.917,69.175 385.118,69.175
385.118,83.287 381.878,83.287 		"
						></polygon>
						<polygon
							fill="#808080"
							points="392.509,66.103 403.406,66.103 403.406,69.175 395.75,69.175 395.75,73.159 402.637,73.159
402.637,76.231 395.75,76.231 395.75,80.215 403.406,80.215 403.406,83.287 392.509,83.287 		"
						></polygon>
						<polygon
							fill="#808080"
							points="406.742,66.103 410.509,66.103 417.421,77.623 417.613,77.623 417.421,74.311 417.421,66.103
420.637,66.103 420.637,83.287 417.229,83.287 409.933,71.119 409.742,71.119 409.933,74.431 409.933,83.287 406.742,83.287 		"
						></polygon>
						<path
							fill="#808080"
							d="M429.589,66.103h3.72l6.456,17.184h-3.576l-1.439-4.104h-6.576l-1.44,4.104h-3.576L429.589,66.103z
M433.693,76.207l-1.512-4.32l-0.624-2.064h-0.192l-0.624,2.064l-1.536,4.32H433.693z"
						></path>
						<path
							fill="#808080"
							d="M442.092,66.103h6.265c1.119,0,2.115,0.232,2.987,0.696c0.872,0.464,1.548,1.108,2.028,1.932
s0.72,1.756,0.72,2.796c0,1.104-0.348,2.084-1.044,2.94c-0.695,0.855-1.572,1.476-2.628,1.86l-0.024,0.168l4.608,6.6v0.192h-3.72
l-4.44-6.456h-1.512v6.456h-3.24V66.103z M448.333,73.855c0.735,0,1.336-0.224,1.8-0.672c0.465-0.448,0.696-1.016,0.696-1.704
c0-0.656-0.22-1.216-0.66-1.68c-0.44-0.464-1.036-0.696-1.788-0.696h-3.048v4.752H448.333z"
						></path>
						<polygon
							fill="#808080"
							points="461.004,75.295 455.22,66.103 459.084,66.103 462.517,71.791 462.708,71.791 466.021,66.103
469.932,66.103 464.245,75.295 464.245,83.287 461.004,83.287 		"
						></polygon>
						<path
							fill="#808080"
							d="M478.332,82.399c-1.151-0.848-1.959-2.048-2.424-3.6l3.049-1.2c0.239,0.912,0.647,1.64,1.224,2.184
c0.575,0.544,1.296,0.816,2.159,0.816c0.721,0,1.336-0.18,1.849-0.54s0.769-0.86,0.769-1.5c0-0.639-0.244-1.164-0.732-1.572
c-0.488-0.408-1.355-0.843-2.604-1.308l-1.057-0.384c-1.104-0.384-2.048-0.972-2.832-1.764s-1.176-1.788-1.176-2.988
c0-0.895,0.232-1.712,0.695-2.448c0.465-0.736,1.121-1.316,1.969-1.74s1.808-0.636,2.88-0.636c1.552,0,2.776,0.364,3.672,1.092
c0.896,0.729,1.513,1.581,1.849,2.556l-2.856,1.2c-0.177-0.528-0.484-0.972-0.925-1.332c-0.439-0.36-1.004-0.54-1.691-0.54
c-0.704,0-1.284,0.164-1.74,0.492c-0.455,0.328-0.684,0.756-0.684,1.284c0,0.512,0.216,0.948,0.648,1.308
c0.432,0.36,1.144,0.708,2.135,1.044l1.08,0.36c1.488,0.512,2.629,1.188,3.42,2.028c0.793,0.84,1.188,1.94,1.188,3.3
c0,1.12-0.288,2.068-0.864,2.844s-1.315,1.356-2.22,1.74c-0.903,0.384-1.836,0.576-2.796,0.576
C480.812,83.671,479.484,83.248,478.332,82.399"
						></path>
						<polygon
							fill="#808080"
							points="494.508,69.175 489.708,69.175 489.708,66.103 502.549,66.103 502.549,69.175 497.749,69.175
497.749,83.287 494.508,83.287 		"
						></polygon>
						<path
							fill="#808080"
							d="M506.99,66.103h3.719l6.455,17.184h-3.576l-1.439-4.104h-6.576l-1.439,4.104h-3.576L506.99,66.103z
M511.094,76.207l-1.514-4.32l-0.623-2.064h-0.191l-0.625,2.064l-1.535,4.32H511.094z"
						></path>
						<polygon
							fill="#808080"
							points="519.492,66.103 523.26,66.103 530.172,77.623 530.363,77.623 530.172,74.311 530.172,66.103
533.389,66.103 533.389,83.287 529.98,83.287 522.684,71.119 522.492,71.119 522.684,74.431 522.684,83.287 519.492,83.287 		"
						></polygon>
						<path
							fill="#808080"
							d="M537.299,66.104h5.809c1.791,0,3.352,0.36,4.68,1.08c1.328,0.72,2.352,1.729,3.072,3.024
s1.08,2.792,1.08,4.488s-0.359,3.192-1.08,4.488c-0.721,1.296-1.744,2.304-3.072,3.024c-1.328,0.72-2.889,1.08-4.68,1.08h-5.809
V66.104z M542.963,80.215c1.857,0,3.273-0.492,4.248-1.476c0.977-0.984,1.465-2.332,1.465-4.044s-0.488-3.06-1.465-4.044
c-0.975-0.984-2.391-1.476-4.248-1.476h-2.424v11.04H542.963z"
						></path>
						{/* <g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="177.271,95.248 177.271,141.248 142.561,141.248
126.511,95.248 		"
							></polygon>
							<text transform="matrix(1 0 0 1 142.4517 122.23)" fill="#FFFFFF">
								CE1
							</text>
						</a>{' '}
					</g> */}
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="177.271" y="95.248" fill="#AC1D3F" stroke="#FFFFFF" stroke-miterlimit="10" width="68" height="46"></rect>
								<text transform="matrix(1 0 0 1 197.8774 122.23)" fill="#FFFFFF">
									CE2
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="245.271" y="95.248" fill="#AC1D3F" stroke="#FFFFFF" stroke-miterlimit="10" width="81" height="46"></rect>
								<text transform="matrix(1 0 0 1 272.2739 122.23)" fill="#FFFFFF">
									CE3
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="326.271" y="95.248" fill="#AC1D3F" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="46"></rect>
								<text transform="matrix(1 0 0 1 349.8477 122.23)" fill="#FFFFFF">
									CE4
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="401.271" y="95.248" fill="#AC1D3F" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="46"></rect>
								<text transform="matrix(1 0 0 1 425.1255 122.23)" fill="#FFFFFF">
									CE5
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="476.271" y="95.248" fill="#AC1D3F" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="46"></rect>
								<text transform="matrix(1 0 0 1 500.2217 122.23)" fill="#FFFFFF">
									CE6
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="551.271" y="95.248" fill="#AC1D3F" stroke="#FFFFFF" stroke-miterlimit="10" width="78" height="46"></rect>
								<text transform="matrix(1 0 0 1 576.8584 122.23)" fill="#FFFFFF">
									CE7
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="629.271" y="95.248" fill="#AC1D3F" stroke="#FFFFFF" stroke-miterlimit="10" width="56" height="46"></rect>
								<text transform="matrix(1 0 0 1 643.7783 122.23)" fill="#FFFFFF">
									CE8
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<polygon
									class="path_hover"
									fill="#AC1D3F"
									stroke="#FFFFFF"
									stroke-miterlimit="10"
									points="739.271,95.248 731.361,141.248 685.271,141.248
685.271,95.248 		"
								></polygon>
								<text transform="matrix(1 0 0 1 698.7139 122.23)" fill="#FFFFFF">
									CE9
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="177.271" y="141.248" fill="#FDC883" stroke="#FFFFFF" stroke-miterlimit="10" width="68" height="45"></rect>
								<text transform="matrix(1 0 0 1 197.8799 168.231)" fill="#FFFFFF">
									CE2
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="245.271" y="141.248" fill="#FDC883" stroke="#FFFFFF" stroke-miterlimit="10" width="81" height="45"></rect>
								<text transform="matrix(1 0 0 1 272.2759 168.231)" fill="#FFFFFF">
									CE3
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="326.271" y="141.248" fill="#FDC883" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="45"></rect>
								<text transform="matrix(1 0 0 1 349.8501 168.231)" fill="#FFFFFF">
									CE4
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="401.271" y="141.248" fill="#FDC883" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="45"></rect>
								<text transform="matrix(1 0 0 1 425.1279 168.231)" fill="#FFFFFF">
									CE5
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="476.271" y="141.248" fill="#FDC883" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="45"></rect>
								<text transform="matrix(1 0 0 1 500.2246 168.231)" fill="#FFFFFF">
									CE6
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="551.271" y="141.248" fill="#FDC883" stroke="#FFFFFF" stroke-miterlimit="10" width="78" height="45"></rect>
								<text transform="matrix(1 0 0 1 576.8604 168.231)" fill="#FFFFFF">
									CE7
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="629.271" y="141.248" fill="#FDC883" stroke="#FFFFFF" stroke-miterlimit="10" width="56" height="45"></rect>
								<text transform="matrix(1 0 0 1 643.7803 168.231)" fill="#FFFFFF">
									CE8
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<polygon
									class="path_hover"
									fill="#FDC883"
									stroke="#FFFFFF"
									stroke-miterlimit="10"
									points="731.361,141.248 723.631,186.248 685.271,186.248
685.271,141.248 		"
								></polygon>
								<text transform="matrix(-6.123234e-017 -1 1 -6.123234e-017 710.2539 177.791)" fill="#FFFFFF">
									CE9
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<polygon
									class="path_hover"
									fill="#E8487E"
									stroke="#FFFFFF"
									stroke-miterlimit="10"
									points="245.271,186.248 245.271,277.248 187.451,277.248
182.271,266.248 177.271,266.248 177.271,186.248 		"
								></polygon>
								<text transform="matrix(1 0 0 1 201.0234 238.4712)" fill="#ffffff">
									KG
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="245.271" y="214.248" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="81" height="63"></rect>
								<text transform="matrix(1 0 0 1 275.8394 253.0171)" fill="#FFFFFF">
									KH
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="326.271" y="214.248" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="63"></rect>
								<text transform="matrix(1 0 0 1 355.0796 253.0171)" fill="#FFFFFF">
									KJ
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="401.271" y="214.248" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="63"></rect>
								<text transform="matrix(1 0 0 1 429.2095 253.0171)" fill="#FFFFFF">
									KK
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="476.271" y="214.248" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="75" height="63"></rect>
								<text transform="matrix(1 0 0 1 505.1318 253.0171)" fill="#FFFFFF">
									KL
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="551.271" y="214.248" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="78" height="63"></rect>
								<text transform="matrix(1 0 0 1 579.1914 253.0171)" fill="#FFFFFF">
									KM
								</text>
							</a>{' '}
						</g>
						<g>
							{' '}
							<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
								<rect class="path_hover" x="629.271" y="186.248" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="56" height="91"></rect>
								<text transform="matrix(1 0 0 1 647.3018 253.0171)" fill="#FFFFFF">
									KN
								</text>
							</a>{' '}
						</g>
						{/* <g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="245.271" y="186.248" fill="#F68E1E" stroke="#FFFFFF" stroke-miterlimit="10" width="384" height="28"></rect>
							<path
								fill="#FFFFFF"
								d="M398.414,204.79c-0.803-0.462-1.435-1.092-1.896-1.89c-0.462-0.798-0.694-1.681-0.694-2.653
c0-0.97,0.232-1.854,0.694-2.652c0.461-0.798,1.093-1.428,1.896-1.891c0.804-0.462,1.689-0.692,2.66-0.692
c1.512,0,2.764,0.546,3.752,1.637l-1.33,1.288c-0.644-0.755-1.445-1.133-2.406-1.133c-0.627,0-1.196,0.142-1.709,0.426
c-0.514,0.286-0.916,0.689-1.211,1.211c-0.295,0.523-0.441,1.125-0.441,1.806c0,0.682,0.146,1.284,0.441,1.807
c0.295,0.522,0.697,0.925,1.211,1.211c0.513,0.285,1.082,0.426,1.709,0.426c1.054,0,1.936-0.438,2.645-1.315l1.344,1.273
c-0.494,0.598-1.08,1.053-1.756,1.366c-0.678,0.312-1.427,0.468-2.248,0.468C400.103,205.483,399.217,205.253,398.414,204.79"
							></path>
							<polygon
								fill="#FFFFFF"
								points="406.828,195.235 413.184,195.235 413.184,197.027 408.719,197.027 408.719,199.352
412.736,199.352 412.736,201.144 408.719,201.144 408.719,203.467 413.184,203.467 413.184,205.259 406.828,205.259 			"
							></polygon>
							<polygon
								fill="#FFFFFF"
								points="415.13,195.235 417.328,195.235 421.36,201.956 421.472,201.956 421.36,200.023 421.36,195.235
423.236,195.235 423.236,205.259 421.248,205.259 416.992,198.162 416.88,198.162 416.992,200.093 416.992,205.259
415.13,205.259 			"
							></polygon>
							<polygon
								fill="#FFFFFF"
								points="427.353,197.027 424.551,197.027 424.551,195.235 432.042,195.235 432.042,197.027
429.243,197.027 429.243,205.259 427.353,205.259 			"
							></polygon>
							<polygon
								fill="#FFFFFF"
								points="433.554,195.235 439.91,195.235 439.91,197.027 435.445,197.027 435.445,199.352
439.462,199.352 439.462,201.144 435.445,201.144 435.445,203.467 439.91,203.467 439.91,205.259 433.554,205.259 			"
							></polygon>
							<polygon
								fill="#FFFFFF"
								points="441.855,195.235 444.054,195.235 448.085,201.956 448.199,201.956 448.085,200.023
448.085,195.235 449.961,195.235 449.961,205.259 447.974,205.259 443.717,198.162 443.605,198.162 443.717,200.093
443.717,205.259 441.855,205.259 			"
							></polygon>
							<path
								fill="#FFFFFF"
								d="M455.183,195.235h2.17l3.766,10.025h-2.086l-0.84-2.395h-3.836l-0.84,2.395h-2.086L455.183,195.235z
M457.578,201.13l-0.883-2.521l-0.363-1.204h-0.111l-0.365,1.204l-0.896,2.521H457.578z"
							></path>
							<path
								fill="#FFFFFF"
								d="M462.477,195.236h3.654c0.653,0,1.233,0.135,1.743,0.406c0.509,0.27,0.902,0.646,1.183,1.127
c0.28,0.48,0.42,1.024,0.42,1.631c0,0.644-0.203,1.215-0.608,1.714c-0.406,0.5-0.918,0.862-1.533,1.085l-0.014,0.099l2.688,3.85
v0.112h-2.171l-2.59-3.767h-0.883v3.767h-1.89V195.236z M466.117,199.758c0.431,0,0.779-0.131,1.051-0.393
c0.27-0.26,0.406-0.592,0.406-0.994c0-0.382-0.129-0.709-0.386-0.979c-0.257-0.271-0.604-0.406-1.043-0.406h-1.778v2.772H466.117
z"
							></path>
							<polygon
								fill="#FFFFFF"
								points="473.509,200.598 470.136,195.236 472.39,195.236 474.392,198.554 474.503,198.554
476.436,195.236 478.718,195.236 475.4,200.598 475.4,205.26 473.509,205.26 			"
							></polygon>
						</a>{' '}
					</g> */}
					</g>
					{/* <g id="mapts">
					<g>
						<path
							fill="#808080"
							d="M15.964,558.364v-3.722l17.184-6.455v3.576l-4.104,1.439v6.577l4.104,1.438v3.576L15.964,558.364z
M26.068,554.26l-4.32,1.512l-2.064,0.624v0.192l2.064,0.623l4.32,1.536V554.26z"
						></path>
						<polygon
							fill="#808080"
							points="15.964,545.859 15.964,542.092 27.484,535.18 27.484,534.988 24.172,535.18 15.964,535.18
15.964,531.964 33.148,531.964 33.148,535.371 20.98,542.668 20.98,542.859 24.292,542.668 33.148,542.668 33.148,545.859 		"
						></polygon>
						<polygon
							fill="#808080"
							points="15.964,528.053 15.964,517.156 19.036,517.156 19.036,524.813 23.212,524.813 23.212,517.924
26.284,517.924 26.284,524.813 33.148,524.813 33.148,528.053 		"
						></polygon>
						<rect x="15.963" y="511.061" fill="#808080" width="17.184" height="3.24"></rect>
						<polygon
							fill="#808080"
							points="15.964,507.148 15.964,496.252 19.036,496.252 19.036,503.908 23.02,503.908 23.02,497.021
26.092,497.021 26.092,503.908 30.076,503.908 30.076,496.252 33.148,496.252 33.148,507.148 		"
						></polygon>
						<polygon
							fill="#808080"
							points="15.964,492.917 15.964,489.677 30.076,489.677 30.076,482.405 33.148,482.405 33.148,492.917
"
						></polygon>
						<path
							fill="#808080"
							d="M15.964,479.693v-5.808c0-1.792,0.36-3.352,1.08-4.68c0.72-1.328,1.728-2.352,3.024-3.072
c1.296-0.72,2.792-1.08,4.488-1.08c1.696,0,3.192,0.36,4.488,1.08c1.296,0.72,2.304,1.744,3.024,3.072
c0.72,1.328,1.08,2.888,1.08,4.68v5.808H15.964z M30.076,474.029c0-1.856-0.492-3.272-1.476-4.248s-2.332-1.464-4.044-1.464
s-3.06,0.488-4.044,1.464s-1.476,2.392-1.476,4.248v2.424h11.04V474.029z"
						></path>
						<path
							fill="#808080"
							d="M15.964,456.365v-6.264c0-1.12,0.232-2.116,0.696-2.988c0.464-0.872,1.108-1.548,1.932-2.028
s1.756-0.72,2.796-0.72c1.104,0,2.084,0.348,2.94,1.044c0.856,0.696,1.476,1.572,1.86,2.628l0.168,0.024l6.6-4.608h0.192v3.72
l-6.456,4.44v1.512h6.456v3.24H15.964z M23.716,450.125c0-0.736-0.224-1.336-0.672-1.8c-0.448-0.464-1.016-0.696-1.704-0.696
c-0.656,0-1.216,0.22-1.68,0.66c-0.464,0.44-0.696,1.036-0.696,1.788v3.048h4.752V450.125z"
						></path>
						<path
							fill="#808080"
							d="M32.344,437.609c-0.792,1.368-1.876,2.444-3.252,3.228c-1.376,0.784-2.888,1.176-4.536,1.176
s-3.16-0.392-4.536-1.176c-1.376-0.784-2.46-1.86-3.252-3.228s-1.188-2.892-1.188-4.572c0-1.68,0.396-3.204,1.188-4.572
s1.876-2.444,3.252-3.228s2.888-1.176,4.536-1.176s3.16,0.392,4.536,1.176s2.46,1.86,3.252,3.228s1.188,2.892,1.188,4.572
C33.532,434.717,33.136,436.241,32.344,437.609 M29.716,430.133c-0.496-0.88-1.191-1.572-2.088-2.076
c-0.896-0.504-1.92-0.756-3.072-0.756c-1.152,0-2.175,0.252-3.072,0.756c-0.896,0.504-1.592,1.196-2.088,2.076
c-0.495,0.88-0.744,1.848-0.744,2.904c0,1.056,0.249,2.02,0.744,2.892c0.496,0.872,1.192,1.56,2.088,2.064
c0.897,0.504,1.92,0.756,3.072,0.756c1.152,0,2.176-0.252,3.072-0.756c0.897-0.504,1.592-1.192,2.088-2.064
s0.744-1.836,0.744-2.892C30.46,431.981,30.212,431.013,29.716,430.133"
						></path>
						<path
							fill="#808080"
							d="M15.964,416.885v-3.72l17.184-6.456v3.576l-4.104,1.44v6.576l4.104,1.44v3.576L15.964,416.885z
M26.068,412.781l-4.32,1.512l-2.064,0.624v0.192l2.064,0.624l4.32,1.536V412.781z"
						></path>
						<path
							fill="#808080"
							d="M15.964,404.382v-5.808c0-1.792,0.36-3.352,1.08-4.68c0.72-1.328,1.728-2.352,3.024-3.072
c1.296-0.72,2.792-1.08,4.488-1.08c1.696,0,3.192,0.36,4.488,1.08c1.296,0.72,2.304,1.744,3.024,3.072
c0.72,1.328,1.08,2.888,1.08,4.68v5.808H15.964z M30.076,398.718c0-1.856-0.492-3.272-1.476-4.248s-2.332-1.464-4.044-1.464
s-3.06,0.488-4.044,1.464s-1.476,2.392-1.476,4.248v2.424h11.04V398.718z"
						></path>
						<path
							fill="#808080"
							d="M32.26,380.573c-0.848,1.152-2.048,1.96-3.6,2.424l-1.2-3.048c0.912-0.24,1.64-0.648,2.184-1.224
c0.544-0.576,0.816-1.296,0.816-2.16c0-0.721-0.18-1.336-0.54-1.848c-0.36-0.512-0.86-0.768-1.5-0.768
c-0.639,0-1.164,0.244-1.572,0.732c-0.408,0.489-0.843,1.356-1.308,2.604l-0.384,1.056c-0.384,1.104-0.972,2.048-1.764,2.832
c-0.792,0.784-1.788,1.176-2.988,1.176c-0.895,0-1.712-0.232-2.448-0.696c-0.736-0.464-1.316-1.12-1.74-1.968
c-0.424-0.848-0.636-1.808-0.636-2.88c0-1.551,0.364-2.776,1.092-3.672c0.729-0.896,1.581-1.512,2.556-1.848l1.2,2.856
c-0.528,0.176-0.972,0.484-1.332,0.924c-0.36,0.441-0.54,1.004-0.54,1.692c0,0.705,0.164,1.284,0.492,1.74
s0.756,0.684,1.284,0.684c0.512,0,0.948-0.216,1.308-0.648c0.36-0.432,0.708-1.144,1.044-2.136l0.36-1.08
c0.512-1.488,1.188-2.628,2.028-3.42s1.94-1.188,3.3-1.188c1.12,0,2.068,0.288,2.844,0.864s1.356,1.316,1.74,2.22
c0.384,0.904,0.576,1.836,0.576,2.796C33.532,378.094,33.109,379.421,32.26,380.573"
						></path>
						<polygon
							fill="#808080"
							points="19.036,364.397 19.036,369.198 15.964,369.198 15.964,356.357 19.036,356.357 19.036,361.158
33.148,361.158 33.148,364.397 		"
						></polygon>
						<path
							fill="#808080"
							d="M15.964,351.917v-3.719l17.184-6.456v3.576l-4.104,1.439v6.577l4.104,1.44v3.575L15.964,351.917z
M26.068,347.813l-4.32,1.513l-2.064,0.624v0.191l2.064,0.624l4.32,1.536V347.813z"
						></path>
						<polygon
							fill="#808080"
							points="15.964,339.414 15.964,335.645 27.484,328.733 27.484,328.542 24.172,328.733 15.964,328.733
15.964,325.518 33.148,325.518 33.148,328.926 20.98,336.222 20.98,336.414 24.292,336.222 33.148,336.222 33.148,339.414 		"
						></polygon>
						<path
							fill="#808080"
							d="M15.964,321.606v-5.809c0-1.791,0.36-3.351,1.08-4.679c0.72-1.328,1.728-2.352,3.024-3.072
c1.296-0.72,2.792-1.081,4.488-1.081c1.696,0,3.192,0.361,4.488,1.081c1.296,0.72,2.304,1.744,3.024,3.072
c0.72,1.328,1.08,2.888,1.08,4.679v5.809H15.964z M30.076,315.942c0-1.856-0.492-3.272-1.476-4.248s-2.332-1.464-4.044-1.464
s-3.06,0.488-4.044,1.464s-1.476,2.392-1.476,4.248v2.424h11.04V315.942z"
						></path>
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="137.42" y="511" fill="#555555" stroke="#FFFFFF" stroke-miterlimit="10" width="80" height="54"></rect>
							<text transform="matrix(1 0 0 1 166.2329 541.9893)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									23
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="46.42" y="619" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="60.5"></rect>
							<text transform="matrix(1 0 0 1 80.9028 653.2334)" fill="#FFFFFF">
								221
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="46.42" y="565" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="54"></rect>
							<text transform="matrix(1 0 0 1 79.9507 595.9873)" fill="#FFFFFF">
								222
							</text>
              </a>{' '}
              </g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="46.42" y="511" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="54"></rect>
							<text transform="matrix(1 0 0 1 79.853 541.9893)" fill="#FFFFFF">
								223
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="46.42" y="452" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="59"></rect>
							<text transform="matrix(1 0 0 1 79.4326 485.4854)" fill="#FFFFFF">
								224
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="46.42" y="395.5" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="56.5"></rect>
							<text transform="matrix(1 0 0 1 79.7129 427.7354)" fill="#FFFFFF">
								225
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="46.42" y="343.5" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="52"></rect>
							<text transform="matrix(1 0 0 1 79.7969 373.4854)" fill="#FFFFFF">
								226
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="46.42" y="291.5" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="52"></rect>
							<text transform="matrix(1 0 0 1 79.937 321.4893)" fill="#FFFFFF">
								227
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#008780"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="137.42,248.5 137.42,291.5 46.42,291.5 46.42,224.5
108.42,224.5 108.42,248.5 		"
							></polygon>
							<text transform="matrix(1 0 0 1 74.2246 263.7256)" fill="#FFFFFF">
								228
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#555555"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="179.98,619 137.42,660.5 137.42,619 		"
							></polygon>
							<text transform="matrix(1 0 0 1 140.2627 634.3477)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									21
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#555555"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="217.42,565 217.42,582.5 179.98,619 137.42,619
137.42,565 		"
							></polygon>
							<text transform="matrix(1 0 0 1 166.3306 590.0234)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									22
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="137.42" y="482.5" fill="#555555" stroke="#FFFFFF" stroke-miterlimit="10" width="80" height="28.5"></rect>
							<text transform="matrix(1 0 0 1 165.813 500.7456)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									24
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="137.42" y="395.5" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="80" height="56.5"></rect>
							<text transform="matrix(1 0 0 1 166.0928 427.7495)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									25
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="137.42" y="452" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="80" height="30.5"></rect>
							<text transform="matrix(1 0 0 1 165.813 471.2476)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									24
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="137.42" y="343.5" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="80" height="52"></rect>
							<text transform="matrix(1 0 0 1 166.1768 373.4995)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									26
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="137.42" y="291.5" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="80" height="52"></rect>
							<text transform="matrix(1 0 0 1 166.3169 321.5034)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									27
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="137.42" y="267.5" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="34" height="24"></rect>
							<text transform="matrix(1 0 0 1 143.2446 285.5093)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.216" y="0" fill="#FFFFFF">
									28
								</tspan>
							</text>
						</a>{' '}
					</g>
				</g> */}
					{/* Right */}
					{/* <g id="mapts">
					<polygon
						fill="#808080"
						points="991.936,377.208 991.936,380.448 984.567,380.448 984.567,380.64 991.936,386.928 991.936,390.84
991.744,390.84 984.64,384.624 974.943,391.488 974.752,391.488 974.752,387.528 982.071,382.392 979.791,380.448
974.752,380.448 974.752,377.208 		"
					></polygon>
					<path
						fill="#808080"
						d="M975.556,396.06c0.792-1.368,1.876-2.444,3.252-3.228c1.376-0.784,2.888-1.176,4.536-1.176
c1.647,0,3.16,0.392,4.535,1.176c1.377,0.784,2.461,1.86,3.252,3.228c0.793,1.368,1.188,2.892,1.188,4.572
c0,1.68-0.396,3.204-1.188,4.572c-0.791,1.368-1.875,2.444-3.252,3.228c-1.375,0.784-2.888,1.176-4.535,1.176
c-1.648,0-3.16-0.392-4.536-1.176c-1.376-0.784-2.46-1.86-3.252-3.228c-0.792-1.368-1.188-2.892-1.188-4.572
C974.367,398.952,974.764,397.428,975.556,396.06 M978.184,403.536c0.496,0.88,1.191,1.572,2.088,2.076s1.92,0.756,3.072,0.756
s2.176-0.252,3.072-0.756c0.896-0.504,1.592-1.196,2.088-2.076c0.495-0.88,0.744-1.848,0.744-2.904
c0-1.056-0.249-2.02-0.744-2.892c-0.496-0.872-1.192-1.56-2.088-2.064c-0.896-0.504-1.92-0.756-3.072-0.756
s-2.176,0.252-3.072,0.756s-1.592,1.192-2.088,2.064s-0.744,1.836-0.744,2.892C977.439,401.688,977.688,402.656,978.184,403.536"
					></path>
					<path
						fill="#808080"
						d="M991.936,412.68v6.048c0,1.088-0.229,2.08-0.684,2.976c-0.457,0.896-1.096,1.6-1.92,2.112
c-0.824,0.512-1.765,0.768-2.82,0.768c-1.057,0-2-0.256-2.832-0.768c-0.832-0.512-1.477-1.216-1.932-2.112
c-0.457-0.896-0.685-1.888-0.685-2.976v-2.808h-6.312v-3.24H991.936z M984.135,418.824c0,0.8,0.232,1.428,0.697,1.884
c0.463,0.456,1.023,0.684,1.68,0.684s1.212-0.229,1.668-0.684c0.455-0.456,0.684-1.084,0.684-1.884v-2.904h-4.729V418.824z"
					></path>
					<path
						fill="#808080"
						d="M975.64,433.416c0.848-1.152,2.048-1.96,3.6-2.424l1.2,3.048c-0.912,0.24-1.641,0.648-2.184,1.224
c-0.545,0.576-0.816,1.296-0.816,2.16c0,0.72,0.179,1.336,0.54,1.848c0.36,0.512,0.86,0.768,1.5,0.768
c0.639,0,1.164-0.244,1.571-0.732c0.408-0.488,0.844-1.356,1.309-2.604l0.384-1.056c0.384-1.104,0.972-2.048,1.765-2.832
c0.791-0.784,1.787-1.176,2.988-1.176c0.895,0,1.711,0.232,2.447,0.696c0.736,0.464,1.316,1.12,1.74,1.968s0.636,1.808,0.636,2.88
c0,1.552-0.364,2.776-1.092,3.672c-0.729,0.896-1.581,1.512-2.556,1.848l-1.2-2.856c0.528-0.176,0.972-0.484,1.331-0.924
c0.361-0.44,0.541-1.004,0.541-1.692c0-0.704-0.164-1.284-0.492-1.74s-0.756-0.684-1.284-0.684c-0.513,0-0.949,0.216-1.308,0.648
c-0.36,0.432-0.709,1.144-1.045,2.136l-0.359,1.08c-0.512,1.488-1.188,2.628-2.027,3.42c-0.841,0.792-1.941,1.188-3.301,1.188
c-1.12,0-2.068-0.288-2.844-0.864c-0.776-0.576-1.355-1.316-1.74-2.22c-0.384-0.904-0.576-1.836-0.576-2.796
C974.367,435.896,974.791,434.568,975.64,433.416"
					></path>
					<polygon
						fill="#808080"
						points="988.863,449.592 988.863,444.792 991.936,444.792 991.936,457.632 988.863,457.632
988.863,452.832 974.752,452.832 974.752,449.592 		"
					></polygon>
					<path
						fill="#808080"
						d="M991.936,462.072v3.72l-17.184,6.456v-3.576l4.104-1.44v-6.576l-4.104-1.44v-3.576L991.936,462.072z
M981.832,466.176l4.319-1.512l2.063-0.624v-0.192l-2.063-0.624l-4.319-1.536V466.176z"
					></path>
					<polygon
						fill="#808080"
						points="991.936,474.575 991.936,478.343 980.416,485.255 980.416,485.447 983.728,485.255
991.936,485.255 991.936,488.471 974.752,488.471 974.752,485.063 986.92,477.767 986.92,477.575 983.607,477.767
974.752,477.767 974.752,474.575 		"
					></polygon>
					<path
						fill="#808080"
						d="M991.936,492.383v5.808c0,1.792-0.359,3.352-1.08,4.68s-1.729,2.354-3.023,3.072
c-1.297,0.721-2.793,1.08-4.488,1.08c-1.696,0-3.192-0.359-4.488-1.08c-1.296-0.719-2.305-1.744-3.023-3.072
c-0.721-1.328-1.08-2.887-1.08-4.68v-5.808H991.936z M977.823,498.047c0,1.856,0.492,3.273,1.476,4.248
c0.984,0.977,2.332,1.465,4.045,1.465c1.711,0,3.06-0.488,4.043-1.465c0.984-0.975,1.477-2.392,1.477-4.248v-2.424h-11.04V498.047
z"
					></path>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#1EB18F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="771.972,236.472 771.972,268.492 724.661,268.492
756.682,236.472 		"
							></polygon>
							<text transform="matrix(1 0 0 1 743.792 264.0361)" fill="#FFFFFF">
								109
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#1EB18F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="800.682,292.472 800.682,306.472 666.682,306.472
666.682,287.472 705.682,287.472 724.662,268.492 771.972,268.492 771.972,292.472 		"
							></polygon>
							<text transform="matrix(1 0 0 1 725.8584 296.1382)" fill="#FFFFFF">
								108
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="666.682" y="306.472" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="134" height="49"></rect>
							<text transform="matrix(1 0 0 1 726.0127 334.9463)">
								<tspan x="0" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="6.076" y="0" fill="#FFFFFF">
									0
								</tspan>
								<tspan x="15.386" y="0" fill="#FFFFFF">
									7
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="666.682" y="355.472" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="134" height="57"></rect>
							<text transform="matrix(1 0 0 1 725.8027 387.9502)" fill="#FFFFFF">
								106
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="666.682" y="412.472" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="134" height="57"></rect>
							<text transform="matrix(1 0 0 1 725.7188 444.9443)" fill="#FFFFFF">
								105
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="666.682" y="469.472" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="134" height="57"></rect>
							<text transform="matrix(1 0 0 1 725.4385 501.9375)" fill="#FFFFFF">
								104
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="666.682" y="526.473" fill="#1EB18F" stroke="#FFFFFF" stroke-miterlimit="10" width="134" height="54"></rect>
							<text transform="matrix(1 0 0 1 725.8584 557.4336)" fill="#FFFFFF">
								103
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#1EB18F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="771.682,580.473 771.682,641.803 735.682,635.473
735.682,608.473 696.682,608.473 688.682,593.473 666.682,593.473 666.682,580.473 		"
							></polygon>
							<text transform="matrix(1 0 0 1 706.958 600.0781)" fill="#FFFFFF">
								102
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#008780"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="922.682,223.472 922.682,306.472 800.682,306.472
800.682,292.472 771.972,292.472 771.972,236.472 791.372,236.472 791.372,223.472 		"
							></polygon>
							<text transform="matrix(1 0 0 1 836.1641 268.936)">
								<tspan x="0" y="0" fill="#FFFFFF">
									2
								</tspan>
								<tspan x="7.784" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="13.986" y="0" fill="#FFFFFF">
									8
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="800.682" y="306.472" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="150" height="49"></rect>
							<text transform="matrix(1 0 0 1 864.668 334.9321)" fill="#FFFFFF">
								217
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#008780"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="895.542,355.472 895.542,391.472 870.682,391.472
870.682,412.472 800.682,412.472 800.682,355.472 		"
							></polygon>
							<text transform="matrix(1 0 0 1 826.5039 391.1001)">
								<tspan x="0" y="0" fill="#FFFFFF">
									2
								</tspan>
								<tspan x="7.784" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="14" y="0" fill="#FFFFFF">
									6
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="800.682" y="412.472" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="70" height="57"></rect>
							<text transform="matrix(1 0 0 1 826.4063 447.7861)">
								<tspan x="0" y="0" fill="#FFFFFF">
									2
								</tspan>
								<tspan x="7.784" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="13.986" y="0" fill="#FFFFFF">
									5
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#008780"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="888.682,499.472 888.682,526.473 800.682,526.473
800.682,469.472 870.682,469.472 870.682,499.472 		"
							></polygon>
							<text transform="matrix(1 0 0 1 826.21 506.7676)" fill="#FFFFFF">
								214
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="800.682" y="526.473" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="151" height="54"></rect>
							<text transform="matrix(1 0 0 1 865.0879 557.4482)" fill="#FFFFFF">
								213
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#008780"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="923.372,580.473 923.372,668.473 771.682,641.803
771.682,580.473 		"
							></polygon>
							<text transform="matrix(1 0 0 1 836.458 628.4414)">
								<tspan x="0" y="0" fill="#FFFFFF">
									2
								</tspan>
								<tspan x="7.784" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="13.986" y="0" fill="#FFFFFF">
									2
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#008780"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="961.682,469.472 961.682,510.473 951.682,510.473
951.682,526.473 888.682,526.473 888.682,499.472 870.682,499.472 870.682,469.472 		"
							></polygon>
							<text transform="matrix(1 0 0 1 908.6279 505.998)" fill="#FFFFFF">
								304
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="870.682" y="412.472" fill="#008780" stroke="#FFFFFF" stroke-miterlimit="10" width="91" height="57"></rect>
							<text transform="matrix(1 0 0 1 908.8945 447.0161)" fill="#FFFFFF">
								305
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#008780"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="961.682,367.792 961.682,412.472 870.682,412.472
870.682,391.472 895.542,391.472 895.542,355.472 950.682,355.472 950.682,367.792 		"
							></polygon>
							<text class="path_hover" transform="matrix(1 0 0 1 908.9922 392.6265)" fill="#FFFFFF">
								306
							</text>
						</a>{' '}
					</g>
				</g> */}
					{/* Center field piece */}
					{/* <g>
					<rect x="218.5" y="278" fill="#63995D" width="447" height="295"></rect>
					<rect x="218.5" y="278" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" width="447" height="295"></rect>
					<rect x="238" y="297" fill="#316E36" width="34" height="257"></rect>
					<rect x="272" y="297" fill="#409244" width="34" height="257"></rect>
					<rect x="306" y="297" fill="#316E36" width="34" height="257"></rect>
					<rect x="340" y="297" fill="#409244" width="34" height="257"></rect>
					<rect x="374" y="297" fill="#316E36" width="34" height="257"></rect>
					<rect x="408" y="297" fill="#409244" width="34" height="257"></rect>
					<rect x="442" y="297" fill="#316E36" width="34" height="257"></rect>
					<rect x="476" y="297" fill="#409244" width="34" height="257"></rect>
					<rect x="510" y="297" fill="#316E36" width="34" height="257"></rect>
					<rect x="544" y="297" fill="#409244" width="34" height="257"></rect>
					<rect x="578" y="297" fill="#316E36" width="34" height="257"></rect>
					<rect x="612" y="297" fill="#409244" width="34" height="257"></rect>
					<rect x="238" y="297.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" width="408" height="257"></rect>
					<rect x="238" y="343.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" width="68" height="163"></rect>
					<rect x="238" y="386.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" width="24" height="77"></rect>
					<rect x="578" y="343.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" width="68" height="163"></rect>
					<rect x="622" y="386.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" width="24" height="77"></rect>
					<line fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" x1="442" y1="297.5" x2="442" y2="554.5"></line>
					<circle fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" cx="442" cy="426.5" r="40"></circle>
					<path
						fill="none"
						stroke="#FFFFFF"
						stroke-width="2"
						stroke-miterlimit="10"
						d="M306.002,459.911
C316.846,452.756,324,440.463,324,426.5c0-13.945-7.137-26.225-17.957-33.384"
					></path>
					<path
						fill="none"
						stroke="#FFFFFF"
						stroke-width="2"
						stroke-miterlimit="10"
						d="M578,459.911
c-10.844-7.155-17.999-19.448-17.999-33.411c0-13.945,7.138-26.225,17.958-33.384"
					></path>
					<path fill="#FFFFFF" d="M439,426.5c0,1.657,1.343,3,3,3s3-1.343,3-3s-1.343-3-3-3S439,424.843,439,426.5"></path>
					<path fill="#FFFFFF" d="M281,426.5c0,1.657,1.343,3,3,3s3-1.343,3-3s-1.343-3-3-3S281,424.843,281,426.5"></path>
					<path fill="#FFFFFF" d="M597,426.5c0,1.657,1.343,3,3,3s3-1.343,3-3s-1.343-3-3-3S597,424.843,597,426.5"></path>
				</g> */}
					{/* Bottom */}
					{/* <g id="mapts">
					<polygon
						fill="#808080"
						points="366.252,919.683 370.429,919.683 374.987,931.755 375.181,931.755 379.74,919.683 383.94,919.683
383.94,936.866 380.724,936.866 380.724,928.395 380.916,925.538 380.724,925.538 376.356,936.866 373.836,936.866
369.444,925.538 369.252,925.538 369.444,928.395 369.444,936.866 366.252,936.866 		"
					></polygon>
					<path
						fill="#808080"
						d="M392.892,919.683h3.721l6.455,17.184h-3.576l-1.439-4.104h-6.576l-1.439,4.104h-3.576L392.892,919.683z
M396.995,929.786l-1.512-4.319l-0.624-2.063h-0.192l-0.623,2.063l-1.536,4.319H396.995z"
					></path>
					<rect x="405.396" y="919.683" fill="#808080" width="3.24" height="17.184"></rect>
					<polygon
						fill="#808080"
						points="412.547,919.683 416.315,919.683 423.228,931.203 423.419,931.203 423.228,927.891
423.228,919.683 426.442,919.683 426.442,936.866 423.034,936.866 415.739,924.698 415.547,924.698 415.739,928.011
415.739,936.866 412.547,936.866 		"
					></polygon>
					<path
						fill="#808080"
						d="M436.45,935.979c-1.151-0.848-1.959-2.048-2.424-3.6l3.049-1.2c0.239,0.912,0.647,1.641,1.224,2.184
c0.575,0.545,1.296,0.816,2.159,0.816c0.721,0,1.337-0.179,1.849-0.54c0.513-0.36,0.769-0.86,0.769-1.5
c0-0.639-0.244-1.164-0.732-1.571c-0.488-0.408-1.355-0.844-2.604-1.309l-1.057-0.384c-1.104-0.384-2.048-0.972-2.832-1.765
c-0.783-0.791-1.176-1.787-1.176-2.988c0-0.895,0.232-1.711,0.695-2.447c0.465-0.736,1.121-1.316,1.969-1.74
s1.808-0.636,2.88-0.636c1.552,0,2.776,0.364,3.672,1.092c0.896,0.729,1.513,1.581,1.849,2.556l-2.856,1.2
c-0.177-0.528-0.483-0.972-0.925-1.331c-0.439-0.361-1.004-0.541-1.691-0.541c-0.704,0-1.283,0.164-1.74,0.492
c-0.455,0.328-0.684,0.756-0.684,1.284c0,0.513,0.216,0.949,0.648,1.308c0.432,0.36,1.144,0.709,2.136,1.045l1.079,0.359
c1.488,0.512,2.629,1.188,3.421,2.028c0.792,0.84,1.188,1.94,1.188,3.3c0,1.12-0.288,2.068-0.864,2.844
c-0.576,0.776-1.315,1.356-2.22,1.74c-0.903,0.384-1.836,0.576-2.796,0.576C438.931,937.251,437.603,936.827,436.45,935.979"
					></path>
					<polygon
						fill="#808080"
						points="452.627,922.755 447.827,922.755 447.827,919.683 460.667,919.683 460.667,922.755
455.867,922.755 455.867,936.866 452.627,936.866 		"
					></polygon>
					<path
						fill="#808080"
						d="M465.106,919.683h3.721l6.455,17.184h-3.575l-1.44-4.104h-6.576l-1.439,4.104h-3.576L465.106,919.683z
M469.211,929.786l-1.513-4.319l-0.623-2.063h-0.192l-0.624,2.063l-1.536,4.319H469.211z"
					></path>
					<polygon
						fill="#808080"
						points="477.61,919.683 481.378,919.683 488.29,931.203 488.482,931.203 488.29,927.891 488.29,919.683
491.507,919.683 491.507,936.866 488.099,936.866 480.802,924.698 480.61,924.698 480.802,928.011 480.802,936.866
477.61,936.866 		"
					></polygon>
					<path
						fill="#808080"
						d="M495.418,919.683h5.808c1.793,0,3.353,0.359,4.681,1.08c1.327,0.721,2.353,1.729,3.071,3.023
c0.721,1.297,1.08,2.793,1.08,4.488c0,1.696-0.359,3.192-1.08,4.488c-0.719,1.296-1.744,2.305-3.071,3.023
c-1.328,0.721-2.888,1.08-4.681,1.08h-5.808V919.683z M501.082,933.795c1.856,0,3.271-0.492,4.248-1.476
c0.976-0.984,1.464-2.332,1.464-4.045c0-1.711-0.488-3.06-1.464-4.044c-0.977-0.983-2.392-1.476-4.248-1.476h-2.424v11.04H501.082
z"
					></path>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#E8487E"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="228.829,592.827 228.829,712.827 157.829,712.827
157.829,663.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 184.7109 681.4619)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									1
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#E8487E"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="281.829,575.827 281.829,681.827 250.829,681.827
250.829,712.827 228.829,712.827 228.829,592.827 245.829,575.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 248.7051 658.334)" fill="#FFFFFF">
								L2
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="281.829" y="575.827" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="55" height="106"></rect>
							<text transform="matrix(1 0 0 1 300.813 632.7979)" fill="#FFFFFF">
								L3
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="336.829" y="575.827" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="55" height="106"></rect>
							<text transform="matrix(1 0 0 1 355.959 632.7979)" fill="#FFFFFF">
								L4
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="391.829" y="575.827" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="55" height="106"></rect>
							<text transform="matrix(1 0 0 1 411.231 632.7979)" fill="#FFFFFF">
								L5
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="446.829" y="575.827" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="55" height="106"></rect>
							<text transform="matrix(1 0 0 1 466.3208 632.7979)" fill="#FFFFFF">
								L6
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="501.829" y="575.827" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="55" height="106"></rect>
							<text transform="matrix(1 0 0 1 521.4668 632.7979)" fill="#FFFFFF">
								L7
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect class="path_hover" x="556.829" y="575.827" fill="#E8487E" stroke="#FFFFFF" stroke-miterlimit="10" width="55" height="106"></rect>
							<text transform="matrix(1 0 0 1 576.3887 632.7979)" fill="#FFFFFF">
								L8
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#E8487E"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="665.829,602.827 665.829,712.347 640.829,712.347
640.829,681.827 611.829,681.827 611.829,575.827 638.829,575.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 631.1006 658.334)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.168" y="0" fill="#FFFFFF">
									9
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="665.829"
								y="624.827"
								fill="#E8487E"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="62"
								height="87.52"
							></rect>
							<text transform="matrix(1 0 0 1 685.4346 681.4619)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									10
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="410.171,681.827 410.171,712.63 475.171,712.55
475.171,681.827 	"
							></polygon>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="250.171,681.827 250.171,712.827 293.171,712.774
293.171,681.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 261.2905 705.5313)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									11
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="293.171,681.827 293.171,712.774 359.171,712.692
359.171,681.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 314.3506 705.5313)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="13.23" y="0" fill="#FFFFFF">
									2
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="359.171,681.827 359.171,712.692 410.171,712.63
410.171,681.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 373.2905 705.5313)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									13
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="475.171,681.827 475.171,712.55 526.171,712.487
526.171,681.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 488.9868 705.5313)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									14
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="526.171,681.827 526.171,712.487 590.171,712.408
590.171,681.827 		"
							></polygon>
							<text transform="matrix(1 0 0 1 548.0947 705.5313)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="13.229" y="0" fill="#FFFFFF">
									5
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="640.171,681.827 590.171,681.827 590.171,712.408
640.171,712.347 		"
							></polygon>
							<text transform="matrix(1 0 0 1 603.4502 705.5313)">
								<tspan x="0" y="0" fill="#FFFFFF">
									L
								</tspan>
								<tspan x="7.014" y="0" fill="#FFFFFF">
									1
								</tspan>
								<tspan x="13.229" y="0" fill="#FFFFFF">
									6
								</tspan>
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="157.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="76"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 182.6807 751.6328)" fill="#FFFFFF">
								M1
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="233.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="54"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 248.6348 751.6328)" fill="#FFFFFF">
								M2
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="287.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="66"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 308.3726 751.6328)" fill="#FFFFFF">
								M3
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="353.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="66"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 374.7607 751.6328)" fill="#FFFFFF">
								M4
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="419.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="48"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 431.9507 751.6328)" fill="#FFFFFF">
								M5
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="467.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="72"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 493.0186 751.6328)" fill="#FFFFFF">
								M6
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="539.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="62"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 559.0566 751.6328)" fill="#FFFFFF">
								M7
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="601.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="58"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 619.2705 751.6328)" fill="#FFFFFF">
								M8
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="659.171"
								y="712.827"
								fill="#FDC883"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="68"
								height="48.039"
							></rect>
							<text transform="matrix(1 0 0 1 681.6689 751.6328)" fill="#FFFFFF">
								M9
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="157.171,761.866 157.171,809.786 217.351,908.326
239.171,908.326 239.171,761.866 		"
							></polygon>
							<text transform="matrix(1 0 0 1 190.8145 819.1055)" fill="#FFFFFF">
								U1
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="239.171"
								y="761.866"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="54"
								height="146.46"
							></rect>
							<text transform="matrix(1 0 0 1 257.5664 850.1006)" fill="#FFFFFF">
								U2
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="293.171"
								y="761.866"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="63"
								height="146.46"
							></rect>
							<text transform="matrix(1 0 0 1 317.1787 850.1006)" fill="#FFFFFF">
								U3
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="356.171"
								y="761.866"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="58"
								height="146.46"
							></rect>
							<text transform="matrix(1 0 0 1 375.4746 850.1006)" fill="#FFFFFF">
								U4
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="414.171"
								y="761.866"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="59"
								height="146.46"
							></rect>
							<text transform="matrix(1 0 0 1 434.4565 850.1006)" fill="#FFFFFF">
								U5
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="473.171"
								y="761.866"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="53"
								height="146.46"
							></rect>
							<text transform="matrix(1 0 0 1 490.2607 850.1006)" fill="#FFFFFF">
								U6
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="526.171"
								y="761.866"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="57"
								height="146.46"
							></rect>
							<text transform="matrix(1 0 0 1 547.1143 850.1006)" fill="#FFFFFF">
								U7
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<rect
								class="path_hover"
								x="583.171"
								y="761.866"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								width="64"
								height="146.46"
							></rect>
							<text transform="matrix(1 0 0 1 605.7471 850.1006)" fill="#FFFFFF">
								U8
							</text>
						</a>{' '}
					</g>
					<g>
						{' '}
						<a xlinkHref="#" target="_blank" rel="noopener noreferrer">
							<polygon
								class="path_hover"
								fill="#AC1D3F"
								stroke="#FFFFFF"
								stroke-miterlimit="10"
								points="647.171,761.866 647.171,908.326 663.791,908.326
727.171,822.095 727.171,761.866 		"
							></polygon>
							<text transform="matrix(1 0 0 1 678.3926 819.1055)" fill="#FFFFFF">
								U9
							</text>
						</a>{' '}
					</g>
				</g> */}
				</svg>
			</section>
			{/* </ScrollArea> */}

			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen} slot={slot} />
		</>
	);
}
