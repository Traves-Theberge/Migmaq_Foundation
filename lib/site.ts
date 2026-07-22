/**
 * Canonical site URL, used everywhere an absolute URL is required
 * (metadataBase, sitemap, robots, JSON-LD, OG image generation). Set
 * NEXT_PUBLIC_SITE_URL once the production domain is known — falls back to
 * a placeholder so local dev and preview builds still work, but that
 * fallback should never end up in a real deployment's sitemap/OG tags.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://migmaqfoundation.org').replace(/\/$/, '');

export const SITE_NAME = "Mi'gmaq Foundation";
