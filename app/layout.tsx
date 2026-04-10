import type { Metadata } from 'next';
import { DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.made180.com'),
  title: 'MADE180 Digital Solutions | AI-Powered Platforms for Behavioral Health',
  description: 'We build custom platforms, AI-powered tools, and provide technical strategy for organizations supporting people in recovery, behavioral health, and workforce development. Based in Louisville, KY.',
  keywords: 'custom software development, behavioral health platforms, AI tools, peer support, recovery technology, LMS development, case management, HIPAA compliant, Louisville KY, MADE180',
  authors: [{ name: 'MADE180 Digital Solutions' }],
  openGraph: {
    title: 'MADE180 Digital Solutions | AI-Powered Platforms for Behavioral Health',
    description: 'We build the software you can\'t find off the shelf. Custom platforms, AI-powered tools, and technical strategy for behavioral health organizations.',
    type: 'website',
    url: 'https://www.made180.com',
    siteName: 'MADE180 Digital Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MADE180 Digital Solutions - AI-Powered Platforms for Behavioral Health',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MADE180 Digital Solutions | AI-Powered Platforms for Behavioral Health',
    description: 'We build the software you can\'t find off the shelf. Custom platforms, AI-powered tools, and technical strategy for behavioral health organizations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
