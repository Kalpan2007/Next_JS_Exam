import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mutual Fund Dashboard - Analytics',
  description: 'Comprehensive mutual fund dashboard with dual routing architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <NavBar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}