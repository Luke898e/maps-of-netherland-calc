# 2026 Global Mobility & Tax Suite

Professional Next.js 15 tax tooling site with:

- `2026 Nigeria Zero-Tax Auditor`
- `2026 UK FIG Regime Eligibility Tool`
- editorial blog section (`/blog`)
- trust/compliance pages (`/about`, `/privacy-policy`, `/terms-of-use`, `/editorial-policy`, `/disclaimer`)
- support loop (`/support`, `/updates`)
- operations status page (`/status`)
- AdSense readiness tracker (`/adsense-readiness`)

## Local run

```bash
npm install
npm run dev -- --port 3001 --hostname 0.0.0.0
```

Open: `http://localhost:3001`

## Environment setup

1. Copy `.env.example` to `.env.local`
2. Configure:
   - `NEXT_PUBLIC_SITE_URL` (use `https://map-of-netherlands.co.uk`)
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_GITHUB_PROFILE`
   - `NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL`
   - `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`
3. Restart the dev server.

Production note:
- The app now has production-safe fallbacks for `NEXT_PUBLIC_SITE_URL`, contact, and profile identity so deployment does not fail.
- For AdSense approval, you should still set all production values (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_GITHUB_PROFILE`, `NEXT_PUBLIC_GOOGLE_FC_SCRIPT_URL`, `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`) before requesting review.

## Support API Protection

The support endpoint (`/api/support-feedback`) includes validation, origin checks, honeypot protection, and rate limiting.

Configure rate-limit behavior with:

- `SUPPORT_RATE_LIMIT_MODE=auto` (default): uses Upstash when credentials exist, otherwise local in-memory limiting.
- `SUPPORT_RATE_LIMIT_MODE=memory`: force local limiter (not shared across multiple instances).
- `SUPPORT_RATE_LIMIT_MODE=upstash`: prefer global Upstash limiter; falls back to memory if Upstash errors.
- `SUPPORT_RATE_LIMIT_MODE=strict-global`: require global Upstash limiter and fail closed (`503`) if unavailable.

For distributed protection on multi-instance hosting, set:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## CMP / TCF v2.3 verification

- Consent status is visible at `/privacy-policy` under **TCF / CMP Status**.
- Ads TXT endpoint is available at `/ads.txt` and auto-populates when `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` is set.

## E-E-A-T / metadata signals

- Site-wide `Organization`, `Person`, and `WebSite` JSON-LD is injected in the root layout.
- Shared Open Graph / Twitter preview image metadata is configured for core routes.

## Preview troubleshooting (`localhost:3001`)

If preview fails or you see stale `500` errors:

1. Stop old Node processes using port `3001`.
2. Delete stale build output (`.next`) if needed.
3. Restart the server:

```bash
npm run dev -- --port 3001 --hostname 0.0.0.0
```

## Blog authoring rules (persistent)

For markdown-style articles in `src/content/blog-markdown-overrides.ts`, use these conventions:

- `# Title` is the article title only (rendered once in the page header, not repeated in body).
- `##` and `###` are rendered as section/subsection headings.
- `* item` is rendered as a bullet item.
- `**text**` is rendered as bold text.
- `[label](/internal-path)` and `[label](https://external-site)` are rendered as links.
- Internal and external links should be placed naturally inside the article body (not appended after the article).
