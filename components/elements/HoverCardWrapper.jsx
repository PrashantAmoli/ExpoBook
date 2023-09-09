import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@radix-ui/react-dropdown-menu';

export const HoverCardWrapper = ({ children, title, description, content }) => {
	return (
		<>
			<HoverCard>
				<HoverCardTrigger className="w-fit">{children}</HoverCardTrigger>

				<HoverCardContent>
					{title ? <h3 className="text-base font-semibold "> {title} </h3> : null}
					<Separator className="w-11/12" />
					{description ? <p className="text-sm"> {description} </p> : null}
					{content}
				</HoverCardContent>
			</HoverCard>
		</>
	);
};

export default HoverCardWrapper;
