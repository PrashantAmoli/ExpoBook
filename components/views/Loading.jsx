import { LayersIcon } from '@radix-ui/react-icons';

export const Loading = ({ title, description, options }) => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-[88vh]">
			<div className="w-20 h-20 transition-all duration-1000 rounded-full animate-bounce">
				<span className="sr-only">Loading...</span>
				<LayersIcon className="w-full h-full transition-all duration-1000 text-blue-950 animate-ping" />
			</div>

			<div className="container translate-y-8">
				{title && <h1 className="text-2xl font-bold text-center capitalize">{title}</h1>}
				{description && <p className="text-center">{description}</p>}
				{options}
			</div>
		</div>
	);
};

export default Loading;
