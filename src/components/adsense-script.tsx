import Script from "next/script";

const isProductionBuild = process.env.NODE_ENV === "production";

export function AdSenseScript(): React.JSX.Element | null {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  const hasAdsenseClient = typeof adsenseClient === "string" && adsenseClient.startsWith("ca-pub-");
  if (isProductionBuild && !hasAdsenseClient) {
    throw new Error("NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT must be set in production.");
  }
  if (!hasAdsenseClient) {
    return null;
  }

  return (
    <Script
      id="google-adsense-content-only"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
    />
  );
}
