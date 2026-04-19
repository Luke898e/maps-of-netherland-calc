const localFallbackSiteUrl = "http://localhost:3001";
const productionFallbackSiteUrl = "https://map-of-netherlands.co.uk";
const fallbackContactEmail = "contact@map-of-netherlands.co.uk";
const fallbackGithubProfile = "https://github.com/LukmonIsiaq";
const isProductionBuild = process.env.NODE_ENV === "production";
const isVercelProduction = isProductionBuild && process.env.VERCEL === "1";

function normalizeSiteUrl(rawValue: string | undefined): string {
  const raw = rawValue?.trim();
  if (!raw) {
    if (isVercelProduction) {
      throw new Error("NEXT_PUBLIC_SITE_URL must be set in production.");
    }
    return isProductionBuild ? productionFallbackSiteUrl : localFallbackSiteUrl;
  }

  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    const normalized = new URL(withProtocol).origin;
    const isLocalOrigin =
      normalized.includes("localhost") || normalized.includes("127.0.0.1") || normalized.includes("[::1]");

    if (isProductionBuild && (!normalized.startsWith("https://") || isLocalOrigin)) {
      if (isVercelProduction) {
        throw new Error("NEXT_PUBLIC_SITE_URL must be a valid HTTPS public origin in production.");
      }
      return productionFallbackSiteUrl;
    }

    return normalized;
  } catch {
    if (isVercelProduction) {
      throw new Error("NEXT_PUBLIC_SITE_URL must be a valid URL in production.");
    }
    return isProductionBuild ? productionFallbackSiteUrl : localFallbackSiteUrl;
  }
}

function normalizeContactEmail(rawValue: string | undefined): string {
  const raw = rawValue?.trim();
  const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (raw && validEmailPattern.test(raw)) {
    return raw;
  }

  if (isVercelProduction) {
    throw new Error("NEXT_PUBLIC_CONTACT_EMAIL must be set to a valid email in production.");
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
      if (isVercelProduction) {
        throw new Error("NEXT_PUBLIC_GITHUB_PROFILE must be a valid URL in production.");
      }
      return fallbackGithubProfile;
    }
  }

  if (isVercelProduction) {
    throw new Error("NEXT_PUBLIC_GITHUB_PROFILE must be set in production.");
  }

  return fallbackGithubProfile;
}

const normalizedSiteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const normalizedContactEmail = normalizeContactEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const normalizedGithubProfile = normalizeGithubProfile(process.env.NEXT_PUBLIC_GITHUB_PROFILE);

export const siteConfig = {
  siteName: "2026 Global Mobility & Tax Suite",
  siteUrl: normalizedSiteUrl,
  contactEmail: normalizedContactEmail,
  githubProfile: normalizedGithubProfile
} as const;
