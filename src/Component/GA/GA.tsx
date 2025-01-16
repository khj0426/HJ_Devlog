import Script from "next/script";

import isProductionMode from "@/utils/isProductMode";

const GoogleAnalytics = () => {
  if (isProductionMode()) {
    return (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
          `,
          }}
        />
      </>
    );
  }

  return <></>;
};
export default GoogleAnalytics;
