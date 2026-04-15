import Script from "next/script";

const isProductionBuild = process.env.NODE_ENV === "production";

function isLikelyHttpsUrl(value: string | undefined): value is string {
  return Boolean(value && value.startsWith("https://"));
}

export function GoogleCmpScripts(): React.JSX.Element | null {
  const fundingChoicesScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL;
  const hasFundingChoices = isLikelyHttpsUrl(fundingChoicesScriptUrl);
  if (isProductionBuild && !hasFundingChoices) {
    throw new Error("NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL must be set to a valid https URL in production.");
  }
  if (!hasFundingChoices) {
    return null;
  }

  return (
    <>
      <Script id="googlefc-init" strategy="beforeInteractive">
        {`window.googlefc = window.googlefc || {}; window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];`}
      </Script>
      <Script id="google-funding-choices" src={fundingChoicesScriptUrl} strategy="afterInteractive" />
    </>
  );
}
