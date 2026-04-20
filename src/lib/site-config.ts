const localFallbackSiteUrl = "http://localhost:3001";
const productionFallbackSiteUrl = "https://map-of-netherlands.co.uk";
const fallbackContactEmail = "contact@map-of-netherlands.co.uk";
const fallbackGithubProfile = "https://github.com/LukmonIsiaq";
const isProductionBuild = process.env.NODE_ENV === "production";
const isVercelProduction = isProductionBuild && process.env.VERCEL === "1";

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
const normalizedGithubProfile = normalizeGithubProfile(process.env.NEXT_PUBLIC_GITHUB_PROFILE);
const normalizedLinkedInProfile = normalizeOptionalProfile(process.env.NEXT_PUBLIC_LINKEDIN_PROFILE);
const normalizedProfessionalProfile = normalizeOptionalProfile(process.env.NEXT_PUBLIC_PROFESSIONAL_PROFILE);

export const siteConfig = {
  siteName: "2026 Global Mobility & Tax Suite",
  siteUrl: normalizedSiteUrl,
  contactEmail: normalizedContactEmail,
  githubProfile: normalizedGithubProfile,
  linkedInProfile: normalizedLinkedInProfile,
  professionalProfile: normalizedProfessionalProfile
} as const;
