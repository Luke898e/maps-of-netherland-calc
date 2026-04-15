const fallbackSiteUrl = "http://localhost:3001";
const fallbackContactEmail = "72778758+LukmonIsiaq@users.noreply.github.com";
const fallbackGithubProfile = "https://github.com/LukmonIsiaq";
const isProductionBuild = process.env.NODE_ENV === "production";

function normalizeSiteUrl(rawValue: string | undefined): string {
  const raw = rawValue?.trim();
  if (!raw) {
    if (isProductionBuild) {
      throw new Error("NEXT_PUBLIC_SITE_URL must be set in production.");
    }
    return fallbackSiteUrl;
  }

  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    const normalized = new URL(withProtocol).origin;
    if (isProductionBuild && !normalized.startsWith("https://")) {
      throw new Error("NEXT_PUBLIC_SITE_URL must use https in production.");
    }
    if (
      isProductionBuild &&
      (normalized.includes("localhost") || normalized.includes("127.0.0.1") || normalized.includes("[::1]"))
    ) {
      throw new Error("NEXT_PUBLIC_SITE_URL cannot point to localhost in production.");
    }
    return normalized;
  } catch {
    if (isProductionBuild) {
      throw new Error("NEXT_PUBLIC_SITE_URL is invalid. Provide a valid absolute domain URL.");
    }
    return fallbackSiteUrl;
  }
}

function normalizeContactEmail(rawValue: string | undefined): string {
  const raw = rawValue?.trim();
  const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (raw && validEmailPattern.test(raw)) {
    return raw;
  }

  if (isProductionBuild) {
    throw new Error("NEXT_PUBLIC_CONTACT_EMAIL must be set to a valid email address in production.");
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
      if (isProductionBuild) {
        throw new Error("NEXT_PUBLIC_GITHUB_PROFILE must be a valid URL in production.");
      }
    }
  }

  if (isProductionBuild) {
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
