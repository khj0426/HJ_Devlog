import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hj-devlog.vercel.app'),
  alternates: { canonical: '/' },
  title: { default: 'HJ Devlog', template: '%s | HJ Devlog' },
  description: '3개 조직이 사용하는 토스증권 고객상담 시스템을 개발, 출시, 운영한 프론트엔드 개발자 김효중의 블로그',
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
