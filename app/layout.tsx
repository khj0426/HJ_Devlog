import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hj-devlog.vercel.app'),
  alternates: { canonical: '/' },
  title: { default: 'HJ Devlog', template: '%s | HJ Devlog' },
  description: '프론트엔드 개발과 제품에 대한 생각을 기록하는 공간',
  icons: { icon: '/images/favicon.webp' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={inter.className}>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <main className="mx-auto w-full min-w-0 max-w-[60ch] space-y-6">{children}</main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-12 text-center">
      <a href="https://github.com/khj0426" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200">
        github
      </a>
    </footer>
  );
}
