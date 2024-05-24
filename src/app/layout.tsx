import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RootHeader } from '@/components/root-header';
import Providers from './providers';
import { validateRequest } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers value={session}>
          <RootHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
