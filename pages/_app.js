import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { MoviesProvider } from '@/context/context';
import '@/styles/globals.css';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
	const [password, setPassword] = useState('');
	return (
		<>
			<MoviesProvider>
				{password.includes('expo') ? (
					<>
						<Component {...pageProps} />
						<Toaster />
					</>
				) : (
					<div className="fixed inset-0 z-30 flex items-center justify-center w-screen h-screen">
						{/* <input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="p-2 text-2xl border-2 border-gray-300 rounded-md outline-none focus:border-gray-500"
						/> */}
						<Input
							type="password"
							placeholder="Enter Passcode"
							value={password}
							onChange={e => setPassword(e.target.value.toLowerCase())}
							className="max-w-sm py-5 m-2"
							autoFocus
						/>
					</div>
				)}
			</MoviesProvider>
		</>
	);
}
