import Script from "next/script";

function isLikelyHttpsUrl(value: string | undefined): value is string {
  return Boolean(value && value.startsWith("https://"));
}

export function GoogleCmpScripts(): React.JSX.Element | null {
  const fundingChoicesScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL;
  const hasFundingChoices = isLikelyHttpsUrl(fundingChoicesScriptUrl);
  if (!hasFundingChoices) {
    return null;
  }

  return (
    <>
      <Script id="googlefc-init" strategy="afterInteractive">
        {`window.googlefc = window.googlefc || {}; window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];`}
      </Script>
      <Script id="google-funding-choices" src={fundingChoicesScriptUrl} strategy="afterInteractive" />
    </>
  );
}
