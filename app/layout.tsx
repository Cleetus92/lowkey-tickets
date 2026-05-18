import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Lowkey Tickets',
  description: 'Real Music. Real Low Fees. $1.99 per ticket. Built for blue-collar America.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#B91C1C" />
      </head>
      <body className="bg-zinc-950 text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}