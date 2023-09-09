export const Error = ({ error }) => {
	return (
		<>
			<main className="flex flex-col items-center justify-center w-full h-full">
				<div className="m-auto text-center">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{error}</h1>
				</div>
			</main>
		</>
	);
};

export default Error;
