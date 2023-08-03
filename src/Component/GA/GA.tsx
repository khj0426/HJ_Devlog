'use client';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-S9N5XJ40DL"
        strategy="afterInteractive"
      />
      <Script id="google-analgytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S9N5XJ40DL');
        `}
      </Script>
    </>
  );
};
export default GoogleAnalytics;
