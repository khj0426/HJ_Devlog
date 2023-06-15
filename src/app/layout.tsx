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
  url:'https://hj-devlog.vercel.app',
  openGraph:{
    title:'HJ`s Blog'
  }
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
