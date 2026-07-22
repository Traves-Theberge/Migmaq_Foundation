import { ImageResponse } from 'next/og';

export const alt = "Mi'gmaq Foundation — Language Dictionary & Learning Resources";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default social-share card for every page that doesn't set its own
 * (dictionary word pages override this via their own opengraph-image
 * route in the same directory — see app/dictionary/[word]/opengraph-image.tsx).
 * Generated at request time rather than a static asset so it can't go
 * stale relative to the brand palette in app/globals.css.
 */
export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f1e8',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 96,
                        height: 96,
                        borderRadius: '50%',
                        backgroundColor: '#f59e0b',
                        color: '#000000',
                        fontSize: 48,
                        fontWeight: 900,
                        marginBottom: 40,
                    }}
                >
                    M
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 72,
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: '#1a1a1a',
                        textTransform: 'uppercase',
                    }}
                >
                    Mi&apos;gmaq Foundation
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 20,
                        fontSize: 32,
                        fontWeight: 600,
                        color: '#6b6b6b',
                    }}
                >
                    Language Dictionary &amp; Learning Resources
                </div>
            </div>
        ),
        { ...size },
    );
}
