/**
 * Canonical site URL, used everywhere an absolute URL is required
 * (metadataBase, sitemap, robots, JSON-LD, OG image generation). Set
 * NEXT_PUBLIC_SITE_URL once the production domain is known — falls back to
 * a placeholder so local dev and preview builds still work, but that
 * fallback should never end up in a real deployment's sitemap/OG tags.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://migmaqfoundation.org').replace(/\/$/, '');

export const SITE_NAME = "Mi'gmaq Foundation";

export const SITE_DESCRIPTION = "A searchable Mi'gmaq–English–French dictionary, guided lessons, illustrated storybooks, and games for learning the Mi'gmaq language.";

/**
 * The two site-wide JSON-LD blocks app/layout.tsx renders on every page —
 * 100% static, same bytes for every visitor. Exported as builder functions
 * (not just rendered inline in the layout) so next.config.ts can build the
 * exact same objects to compute the CSP script-src hashes that authorize
 * them — a single source of truth instead of two copies that could drift
 * out of sync and silently break either the JSON-LD or the CSP.
 */
export function getWebsiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/dictionary?q={search_term_string}` },
            'query-input': 'required name=search_term_string',
        },
    };
}

export function getOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
    };
}
