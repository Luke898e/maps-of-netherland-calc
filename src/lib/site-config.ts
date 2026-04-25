const localFallbackSiteUrl = "http://localhost:3001";
const productionFallbackSiteUrl = "https://map-of-netherlands.co.uk";
const fallbackContactEmail = "contact@map-of-netherlands.co.uk";
const fallbackGithubProfile = "https://github.com/LukmonIsiaq";
const fallbackServiceName = "Global Tax Suite";
const isProductionBuild = process.env.NODE_ENV === "production";

function isLocalOrigin(origin: string): boolean {
  return origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes("[::1]");
}

function normalizeSiteUrl(rawValue: string | undefined): string {
  const raw = rawValue?.trim();
  if (!raw) {
    return isProductionBuild ? productionFallbackSiteUrl : localFallbackSiteUrl;
  }

  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    const normalized = new URL(withProtocol).origin;

    if (isProductionBuild && (!normalized.startsWith("https://") || isLocalOrigin(normalized))) {
      return productionFallbackSiteUrl;
    }

    return normalized;
  } catch {
    return isProductionBuild ? productionFallbackSiteUrl : localFallbackSiteUrl;
  }
}

function normalizeContactEmail(rawValue: string | undefined): string {
  const raw = rawValue?.trim();
  const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (raw && validEmailPattern.test(raw)) {
    return raw;
  }

  return fallbackContactEmail;
}

function normalizePhone(rawValue: string | undefined): { display: string; dial: string } | null {
  const raw = rawValue?.trim();

  if (!raw) {
    return null;
  }

  const dial = raw.replace(/[^\d+]/g, "");
  if (!dial.startsWith("+") || dial.length < 8) {
    return null;
  }

  return {
    display: raw,
    dial
  };
}

function normalizeNonEmpty(rawValue: string | undefined, fallback: string): string {
  const raw = rawValue?.trim();
  return raw && raw.length > 0 ? raw : fallback;
}

function normalizeGithubProfile(rawValue: string | undefined): string {
  const raw = rawValue?.trim();
  if (raw) {
    const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
    try {
      const normalized = new URL(withProtocol).toString().replace(/\/$/, "");
      return normalized;
    } catch {
      return fallbackGithubProfile;
    }
  }

  return fallbackGithubProfile;
}

function normalizeOptionalProfile(rawValue: string | undefined): string | null {
  const raw = rawValue?.trim();
  if (!raw) {
    return null;
  }

  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

const normalizedSiteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const normalizedContactEmail = normalizeContactEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const normalizedPhone = normalizePhone(process.env.NEXT_PUBLIC_CONTACT_PHONE);
const normalizedGithubProfile = normalizeGithubProfile(process.env.NEXT_PUBLIC_GITHUB_PROFILE);
const normalizedLinkedInProfile = normalizeOptionalProfile(process.env.NEXT_PUBLIC_LINKEDIN_PROFILE);
const normalizedProfessionalProfile = normalizeOptionalProfile(process.env.NEXT_PUBLIC_PROFESSIONAL_PROFILE);
const businessLegalName = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME, fallbackServiceName);
const useUkFallbackAddress = normalizedSiteUrl.endsWith(".co.uk");
const fallbackLocality = useUkFallbackAddress ? "London" : "Lagos";
const fallbackRegion = useUkFallbackAddress ? "England" : "Lagos";
const fallbackCountryCode = useUkFallbackAddress ? "GB" : "NG";
const fallbackCountryName = useUkFallbackAddress ? "United Kingdom" : "Nigeria";
const fallbackStreet = useUkFallbackAddress ? "London, United Kingdom" : "Lagos, Nigeria";
const fallbackPostalCode = useUkFallbackAddress ? "EC1A 1AA" : "100001";
const locality = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_LOCALITY, fallbackLocality);
const region = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_REGION, fallbackRegion);
const countryCode = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_COUNTRY_CODE, fallbackCountryCode);
const addressCountryName = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_COUNTRY_NAME, fallbackCountryName);
const streetAddress = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS, fallbackStreet);
const postalCode = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE, fallbackPostalCode);

export const siteConfig = {
  siteName: "2026 Global Mobility & Tax Suite",
  siteUrl: normalizedSiteUrl,
  contactEmail: normalizedContactEmail,
  contactPhone: normalizedPhone?.display ?? null,
  contactPhoneDial: normalizedPhone?.dial ?? null,
  legalName: businessLegalName,
  address: {
    streetAddress,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: addressCountryName,
    addressCountryCode: countryCode
  },
  githubProfile: normalizedGithubProfile,
  linkedInProfile: normalizedLinkedInProfile,
  professionalProfile: normalizedProfessionalProfile
} as const;
