import '../app/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} bg-gray-50`}>
      <NavBar />
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
    </div>
  );
}