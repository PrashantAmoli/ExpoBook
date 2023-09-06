import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { MoviesProvider } from '@/context/context';
import ClerkWrapper from '@/components/auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { queryClient } from '@/components/ReactQuery';
import dynamic from 'next/dynamic';
const CrispChatWidget = dynamic(() => import('@/components/CrispChatWidget'), { ssr: false });

export default function App({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
				<ClerkWrapper>
					<QueryClientProvider client={queryClient}>
						<MoviesProvider>
							<Component {...pageProps} />

							<CrispChatWidget />

							<Toaster />

							<ReactQueryDevtools initialIsOpen={false} />
						</MoviesProvider>
					</QueryClientProvider>
				</ClerkWrapper>
			</ThemeProvider>
		</>
	);
}
