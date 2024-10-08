import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer, Navbar } from '@/components/organisms';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | ML@SJSU',
    default: 'Machine Learning Club at SJSU',
  },
  description: 'The official website for the Machine Learning Club at SJSU.',
  authors: [{ name: 'Ahmad Gazali', url: 'https://www.gaza.li' }],
  creator: 'ML@SJSU',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ''),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: new URL('/', process.env.NEXT_PUBLIC_BASE_URL || ''),
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-light-background text-light-text`}
      >
        <Navbar />
        {/* Mobile Nav Spacer */}
        <div className="h-[80px] lg:hidden" />
        {children}
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-TZ7CVDXW" />
      <GoogleAnalytics gaId="G-VDW4DWH7VJ" />
    </html>
  );
}
