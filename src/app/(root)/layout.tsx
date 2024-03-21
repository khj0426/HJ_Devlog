import '../globals.css';
import { Metadata } from 'next';

import { Montserrat } from 'next/font/google';

import Providers from '@/app/Providers/Query/queryClientProvider';
import Footer from '@/Component/Common/Footer/Footer';
import Navbar from '@/Component/Common/NavigationBar/Navbar';
import ScrollToTop from '@/Component/Common/ScrolltoTop/ScrollToTop';
import GoogleAnalytics from '@/Component/GA/GA';
import GlobalStyle from '@/style/globalStyle';

import Recoil from '../Providers/Recoil/Recoil';
import { ThemeWrapper } from '../Providers/Styled-Component/themeWrapper';

const baseFont = Montserrat({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'HJ`s Blog',
  description: '개발관련 여러 지식을 기록하는 공간',
  icons: {
    icon: '/images/favicon.webp',
  },
  metadataBase: new URL('https://hj-devlog.vercel.app/'),
  openGraph: {
    url: 'https://hj-devlog.vercel.app',
    title: 'HJ`s Blog',
    description: '개발 관련 여러 지식을 기록하고, 정리하는 공간입니다',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
        width: 800,
        height: 600,
      },
      {
        url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'g3Daim29whdK1ZzL1CE6pvkYyvSgM5-6C898-TVjiz0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={baseFont.className}>
      <meta
        name="naver-site-verification"
        content="e0f502f252b42b1b2aa8779c7927832b439a42ab"
      />
      <body className="App">
        <Providers>
          <Recoil>
            <ThemeWrapper>
              <GlobalStyle />
              <Navbar />
              {children}
              <div id="modal"></div>
              <div id="drawer"></div>
              <ScrollToTop />
            </ThemeWrapper>
            <Footer />
          </Recoil>
        </Providers>
      </body>
    </html>
  );
}
