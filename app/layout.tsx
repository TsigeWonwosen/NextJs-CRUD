import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Simple Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main className='flex justify-between flex-col text-center h-screen'>
          <Header />
          <section className='h-full w-full flex-grow-1 m-0'>{children}</section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
