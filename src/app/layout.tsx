import './globals.css';
import Recoil from './Recoil';
import GlobalStyle from '@/style/globalStyle';
import { ThemeWrapper } from './themeWrapper';
import Navbar from '@/Component/Common/Navbar';
import Footer from '@/Component/Common/Footer';
import Head from 'next/head';

export const metadata = {
  title: 'HJ`s Blog',
  description: '개발관련 여러 지식을 기록하는 공간',
  icons: {
    icon: '/images/favicon.png',
  },
  url: 'https://hj-devlog.vercel.app',
  openGraph: {
    title: 'HJ`s Blog',
    description: '개발 관련 여러 지식을 기록하고, 정리하는 공간입니다',
    image: '../images/ogImage.webp
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="g3Daim29whdK1ZzL1CE6pvkYyvSgM5-6C898-TVjiz0"
        />
        <meta
          property="og:image"
          content="https://avatars.githubusercontent.com/u/59411107?v=4"
        />

        <meta property="og:title" content="효중킴의 개발 블로그" />

        <meta
          property="og:description"
          content="개발 관련 여러 정보를 정리하고 기록하는 공간입니다."
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <body className="App">
        <Recoil>
          <ThemeWrapper>
            <GlobalStyle />
            <Navbar />
            {children}
          </ThemeWrapper>
          <Footer />
        </Recoil>
      </body>
    </html>
  );
}
