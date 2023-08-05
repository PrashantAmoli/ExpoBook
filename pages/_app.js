import { Toaster } from '@/components/ui/toaster';
import { MoviesProvider } from '@/context/context';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<>
			<MoviesProvider>
				<Component {...pageProps} />
				<Toaster />
			</MoviesProvider>
		</>
	);
}
