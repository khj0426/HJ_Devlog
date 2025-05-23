import "./globals.css";

import { Metadata } from "next";

import Footer from "@hj-devlog/shared/src/components/Footer/Footer";
import Navbar from "@hj-devlog/shared/src/components/NavigationBar/Navbar";
import ScrollToTop from "@hj-devlog/shared/src/components/ScrolltoTop/ScrollToTop";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Montserrat } from "next/font/google";

import NavigationBarDrawer from "../Component/Blog/NavigationBarDrawer/NavigationBarDrawer";
import GoogleAnalytics from "../Component/GA/GA";
import GlobalStyle from "@hj-devlog/shared/src/style/globalStyle";
import getCurrentBasePath from "../utils/getCurrentBasePath";

import Providers from "./Providers/Query/queryClientProvider";
import Recoil from "./Providers/Recoil/Recoil";
import { ThemeWrapper } from "./Providers/Styled-Component/themeWrapper";

const baseFont = Montserrat({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "HJ`s Blog",
  description: "개발관련 여러 지식을 기록하는 공간",
  icons: {
    icon: "/images/favicon.webp",
  },
  metadataBase: new URL("https://hj-devlog.vercel.app/"),
  alternates: {
    canonical: `${getCurrentBasePath()}`,
  },
  openGraph: {
    url: "https://hj-devlog.vercel.app",
    title: "HJ`s Blog",
    description: "개발 관련 여러 지식을 기록하고, 정리하는 공간입니다",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/59411107?v=4",
        width: 800,
        height: 600,
      },
      {
        url: "https://avatars.githubusercontent.com/u/59411107?v=4",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    type: "website",
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
    width: "device-width",
    initialScale: 1,
  },
  verification: {
    google: "6_5Ipa2heNbWv7GQPwYwLBY2qSwSA9Q",
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
      <GoogleAnalytics />
      <body className="App">
        <Providers>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
          <Recoil>
            <ThemeWrapper>
              <GlobalStyle />
              <Navbar
                drawer={<NavigationBarDrawer />}
                hasDrawer
                links={[
                  {
                    to: "/",
                    linkName: "Blog",
                  },
                  {
                    to: "/about",
                    linkName: "About",
                  },
                  {
                    to: "/guestbook",
                    linkName: "GuestBook",
                  },
                ]}
              />
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
