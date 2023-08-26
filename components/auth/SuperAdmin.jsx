import { useUser } from '@clerk/nextjs';

export const SuperAdmin = ({ children, showMessage = false }) => {
	const userData = useUser();

	if (userData?.user?.publicMetadata?.role !== 'superadmin') {
		return (
			<>
				{showMessage ? (
					<div className="flex flex-col items-center justify-center w-full h-screen">
						<h1 className="text-3xl font-bold ">You are not authorized to view this page</h1>
						<p className="w-full text-xs text-center">
							Only superadmins can view this page. Please contact the administrator if you think this is a mistake.
						</p>
					</div>
				) : null}
			</>
		);
	}

	return <>{children}</>;
};

export default SuperAdmin;
