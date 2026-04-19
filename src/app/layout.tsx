import type { Metadata, Viewport } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";

import { GoogleCmpScripts } from "@/components/google-cmp-scripts";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { authorProfile } from "@/content/author-profile";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const headingFont = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"]
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const ogImagePath = "/og/global-tax-suite-og.svg";
const ogImageAlt = "2026 Global Mobility and Tax Suite with Nigeria and UK tax compliance tools.";
const absoluteOgImageUrl = `${siteConfig.siteUrl}${ogImagePath}`;

const personProfileUrls = authorProfile.profileLinks
  .map((link) => link.url)
  .filter((link) => link.startsWith("http://") || link.startsWith("https://"));

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.siteUrl}#organization`,
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  email: siteConfig.contactEmail,
  sameAs: [siteConfig.githubProfile],
  logo: `${siteConfig.siteUrl}/brand/logo-emblem.svg`
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.siteUrl}#author`,
  name: authorProfile.name,
  jobTitle: authorProfile.role,
  image: `${siteConfig.siteUrl}${authorProfile.photoSrc}`,
  worksFor: {
    "@id": `${siteConfig.siteUrl}#organization`
  },
  url: siteConfig.siteUrl,
  sameAs: personProfileUrls
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: "2026 Global Mobility & Tax Suite",
  title: {
    default: "2026 Global Mobility & Tax Suite",
    template: "%s | 2026 Global Mobility & Tax Suite"
  },
  description:
    "Professional tax advisory tools for 2026 Nigeria corporate tax screening and UK FIG regime eligibility assessment.",
  keywords: [
    "Nigeria zero tax auditor 2026",
    "UK FIG regime 2026",
    "global mobility tax",
    "development levy calculator",
    "cross border tax planning"
  ],
  authors: [{ name: authorProfile.name }],
  creator: authorProfile.name,
  publisher: siteConfig.siteName,
  openGraph: {
    title: "2026 Global Mobility & Tax Suite",
    description:
      "Run policy-aligned tax checks for Nigeria 2026 CIT screening and UK 4-year FIG eligibility with professional documentation.",
    type: "website",
    locale: "en_GB",
    url: siteConfig.siteUrl,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 Global Mobility & Tax Suite",
    description: "Professional 2026 tax screening tools for Nigeria and UK FIG regime planning.",
    images: [ogImagePath]
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icons/icon-192.svg", type: "image/svg+xml", sizes: "192x192" },
      { url: "/icons/icon-512.svg", type: "image/svg+xml", sizes: "512x512" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.svg", type: "image/svg+xml", sizes: "180x180" }],
    shortcut: ["/favicon.svg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#12447d"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} min-h-screen font-[var(--font-body)]`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-[#0f3364] focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteConfig.siteUrl}#website`,
              url: siteConfig.siteUrl,
              name: siteConfig.siteName,
              publisher: {
                "@id": `${siteConfig.siteUrl}#organization`
              },
              image: absoluteOgImageUrl
            })
          }}
        />
        <GoogleCmpScripts />
        <SiteHeader />
        <div aria-hidden="true" className="h-[88px] lg:h-[134px]" />
        <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <SiteFooter />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
