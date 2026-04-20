import { NextResponse } from "next/server";

const ADS_TXT_RECORD_ID = "f08c47fec0942fa0";

function getPublisherId(clientId: string | undefined): string | null {
  if (!clientId) {
    return null;
  }
  if (!clientId.startsWith("ca-pub-")) {
    return null;
  }
  return clientId.replace("ca-", "");
}

export async function GET(): Promise<NextResponse> {
  const publisherId = getPublisherId(process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT);

  if (!publisherId) {
    return new NextResponse("Not Found\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300"
      }
    });
  }

  const body = `google.com, ${publisherId}, DIRECT, ${ADS_TXT_RECORD_ID}\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
