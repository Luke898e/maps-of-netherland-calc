const localFallbackSiteUrl = "http://localhost:3001";
const productionFallbackSiteUrl = "https://map-of-netherlands.co.uk";
const fallbackContactEmail = "contact@map-of-netherlands.co.uk";
const fallbackAccessibilityEmail = "accessibility@map-of-netherlands.co.uk";
const fallbackUkContactPhone = "+44 1632 960123";
const fallbackGithubProfile = "https://github.com/LukmonIsiaq";
const fallbackFacebookProfile = "https://www.facebook.com/lukmon.isiaq";
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

function normalizePhone(
  rawValue: string | undefined,
  options: { siteUrl: string; allowCrossRegionPhone: boolean }
): { display: string; dial: string } | null {
  const raw = rawValue?.trim();

  if (!raw) {
    return null;
  }

  const dial = raw.replace(/[^\d+]/g, "");
  if (!dial.startsWith("+") || dial.length < 8) {
    return null;
  }

  const usesUkDomain = options.siteUrl.endsWith(".co.uk");
  const isClearlyNigeriaPhone = dial.startsWith("+234");
  if (usesUkDomain && isClearlyNigeriaPhone && !options.allowCrossRegionPhone) {
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

function sanitizePlaceholder(value: string, fallback: string): string {
  const normalized = value.trim();
  if (!normalized || normalized === "#0" || normalized.toLowerCase() === "placeholder") {
    return fallback;
  }
  return normalized;
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
const normalizedAccessibilityEmail = normalizeContactEmail(
  process.env.NEXT_PUBLIC_ACCESSIBILITY_EMAIL ?? fallbackAccessibilityEmail
);
const allowCrossRegionPhone = process.env.NEXT_PUBLIC_ALLOW_CROSS_REGION_PHONE === "true";
const useUkFallbackAddress = normalizedSiteUrl.endsWith(".co.uk");
const normalizedConfiguredPhone = normalizePhone(process.env.NEXT_PUBLIC_CONTACT_PHONE, {
  siteUrl: normalizedSiteUrl,
  allowCrossRegionPhone
});
const normalizedUkFallbackPhone = normalizePhone(fallbackUkContactPhone, {
  siteUrl: normalizedSiteUrl,
  allowCrossRegionPhone: true
});
const normalizedPhone = normalizedConfiguredPhone ?? (useUkFallbackAddress ? normalizedUkFallbackPhone : null);
const normalizedGithubProfile = normalizeGithubProfile(process.env.NEXT_PUBLIC_GITHUB_PROFILE);
const normalizedXProfile = normalizeOptionalProfile(process.env.NEXT_PUBLIC_X_PROFILE);
const normalizedFacebookProfile =
  normalizeOptionalProfile(process.env.NEXT_PUBLIC_FACEBOOK_PROFILE) ?? fallbackFacebookProfile;
const normalizedLinkedInProfile = normalizeOptionalProfile(process.env.NEXT_PUBLIC_LINKEDIN_PROFILE);
const normalizedProfessionalProfile = normalizeOptionalProfile(process.env.NEXT_PUBLIC_PROFESSIONAL_PROFILE);
const businessLegalName = normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME, fallbackServiceName);
const fallbackLocality = useUkFallbackAddress ? "London" : "Lagos";
const fallbackRegion = useUkFallbackAddress ? "England" : "Lagos";
const fallbackCountryCode = useUkFallbackAddress ? "GB" : "NG";
const fallbackCountryName = useUkFallbackAddress ? "United Kingdom" : "Nigeria";
const fallbackStreet = useUkFallbackAddress ? "London, United Kingdom" : "Lagos, Nigeria";
const fallbackPostalCode = useUkFallbackAddress ? "EC1A 1AA" : "100001";
const locality = sanitizePlaceholder(
  normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_LOCALITY, fallbackLocality),
  fallbackLocality
);
const region = sanitizePlaceholder(
  normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_REGION, fallbackRegion),
  fallbackRegion
);
const countryCode = sanitizePlaceholder(
  normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_COUNTRY_CODE, fallbackCountryCode),
  fallbackCountryCode
);
const addressCountryName = sanitizePlaceholder(
  normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_COUNTRY_NAME, fallbackCountryName),
  fallbackCountryName
);
const streetAddress = sanitizePlaceholder(
  normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS, fallbackStreet),
  fallbackStreet
);
const postalCode = sanitizePlaceholder(
  normalizeNonEmpty(process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE, fallbackPostalCode),
  fallbackPostalCode
);

export const siteConfig = {
  siteName: "2026 Global Mobility & Tax Suite",
  siteUrl: normalizedSiteUrl,
  contactEmail: normalizedContactEmail,
  accessibilityEmail: normalizedAccessibilityEmail,
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
  xProfile: normalizedXProfile,
  facebookProfile: normalizedFacebookProfile,
  linkedInProfile: normalizedLinkedInProfile,
  professionalProfile: normalizedProfessionalProfile,
  socialProfiles: [
    { label: "GitHub", url: normalizedGithubProfile },
    { label: "Facebook", url: normalizedFacebookProfile },
    ...(normalizedXProfile ? [{ label: "X", url: normalizedXProfile }] : []),
    ...(normalizedLinkedInProfile ? [{ label: "LinkedIn", url: normalizedLinkedInProfile }] : []),
    ...(normalizedProfessionalProfile ? [{ label: "Professional Profile", url: normalizedProfessionalProfile }] : [])
  ] as ReadonlyArray<{ label: string; url: string }>
} as const;
