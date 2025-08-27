import type { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';
import '@/app/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
