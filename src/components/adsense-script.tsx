import Script from "next/script";

export function AdSenseScript(): React.JSX.Element | null {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  const fundingChoicesScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL;
  const hasAdsenseClient = typeof adsenseClient === "string" && adsenseClient.startsWith("ca-pub-");
  const hasCmpScript = typeof fundingChoicesScriptUrl === "string" && fundingChoicesScriptUrl.startsWith("https://");

  if (!hasAdsenseClient || !hasCmpScript) {
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
