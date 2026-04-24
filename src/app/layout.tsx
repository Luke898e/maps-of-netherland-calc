import type { Metadata, Viewport } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import Script from "next/script";

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
const googleAnalyticsMeasurementId = "G-DT2TMQ66L0";
const googleSiteVerificationToken =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "google2fccf752706bd799";
const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
const hasValidAdsenseClient = typeof adsenseClient === "string" && adsenseClient.startsWith("ca-pub-");

const personProfileUrls = authorProfile.profileLinks
  .map((link) => link.url)
  .filter((link) => link.startsWith("http://") || link.startsWith("https://"))
  .filter((link) => !link.startsWith(siteConfig.siteUrl));

const organizationSameAs = [
  siteConfig.githubProfile,
  siteConfig.linkedInProfile,
  siteConfig.professionalProfile
].filter((value): value is string => typeof value === "string" && value.length > 0);

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.siteUrl}#organization`,
  legalName: siteConfig.legalName,
  alternateName: ["Global Tax Suite", "map-of-netherlands.co.uk"],
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  email: siteConfig.contactEmail,
  telephone: siteConfig.contactPhone,
  sameAs: organizationSameAs,
  logo: `${siteConfig.siteUrl}/brand/logo-emblem.svg`,
  description:
    "Educational tax-compliance screening platform for Nigeria corporate tax workflows and UK FIG eligibility analysis.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contactEmail,
      telephone: siteConfig.contactPhone,
      availableLanguage: ["en"],
      areaServed: ["NG", "GB"]
    }
  ]
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

const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.siteUrl}#business`,
  alternateName: ["Global Tax Suite", "map-of-netherlands.co.uk"],
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/brand/logo-emblem.svg`,
  image: absoluteOgImageUrl,
  telephone: siteConfig.contactPhone,
  email: siteConfig.contactEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountryCode
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Nigeria"
    },
    {
      "@type": "Country",
      name: "United Kingdom"
    }
  ],
  sameAs: organizationSameAs
};

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.siteUrl}#service`,
  serviceType: "Tax compliance screening and eligibility analysis",
  provider: {
    "@id": `${siteConfig.siteUrl}#organization`
  },
  areaServed: ["NG", "GB"],
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: siteConfig.siteUrl
  },
  name: "Global Mobility and Tax Screening Service",
  description:
    "Decision-support tools for Nigeria company tax screening, audit readiness, and UK FIG regime timeline eligibility."
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
  verification: {
    google: googleSiteVerificationToken
  },
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
  other: hasValidAdsenseClient ? { "google-adsense-account": adsenseClient } : undefined,
  manifest: "/site.webmanifest",
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
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1
    }
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsMeasurementId}');
          `}
        </Script>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceStructuredData)
          }}
        />
        <GoogleCmpScripts />
        <SiteHeader />
        <div aria-hidden="true" className="h-[96px] md:h-[112px] lg:h-[128px]" />
        <main id="main-content" className="mx-auto w-full max-w-[86rem] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <SiteFooter />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
