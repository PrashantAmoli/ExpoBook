import { useEffect, useRef } from 'react';

export default function Test1() {
	const svgRef = useRef(null);

	useEffect(() => {
		const svg = svgRef.current;

		svg.querySelectorAll('rect').forEach(rect => {
			rect.classList.add('cursor-pointer');
			rect.addEventListener('click', () => {
				console.log('rect clicked', rect);
			});
		});

		svg.querySelectorAll('g.main-wrapper').forEach(g => {
			g.classList.add('cursor-pointer');

			// console.log(g?.children);

			// g?.children?.forEach(child => {
			// 	console.log('child');
			// 	child.addEventListener('click', () => {
			// 		console.log('g clicked', g);
			// 	});
			// 	child.classList.add('cursor-pointer');
			// });

			g.querySelectorAll('rect').forEach(rect => {
				rect.classList.add('cursor-pointer');
				rect.addEventListener('click', () => {
					console.log('rect clicked', rect);
				});
			});

			g.querySelectorAll('path').forEach(path => {
				path.classList.add('cursor-pointer');

				path.addEventListener('click', () => {
					console.log('path clicked', path);
				});
			});
		});
	}, []);

	return (
		<>
			<main className="w-full min-h-screen my-12 overflow-auto">
				<svg width="815" height="797" viewBox="0 0 815 797" fill="none" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
					{/* <path
							d="M40 42C40 40.8954 40.8954 40 42 40H773C774.105 40 775 40.8954 775 42V755C775 756.105 774.105 757 773 757H42C40.8954 757 40 756.105 40 755V42Z"
							fill="white"
						></path> */}
					<g id="403eeae8" className=" main-wrapper">
						<g className="1">
							<rect x="40" y="42" width="100" height="100" stroke="black"></rect>
							<text x="45" y="58" stroke="black">
								1
							</text>
						</g>
					</g>
				</svg>
			</main>
		</>
	);
}
