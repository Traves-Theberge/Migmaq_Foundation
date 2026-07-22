import { ImageResponse } from 'next/og';
import { getWordDetails } from '@/lib/dictionary';

// Not edge — getWordDetails() reads public/assets/dictionary.json off disk
// via fs/promises, which the edge runtime doesn't support.
export const alt = "Mi'gmaq Dictionary word";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
    params: Promise<{ word: string }>;
}

/** Per-word share card — shows the headword and its first English translation, so a shared dictionary link is self-explanatory without a click. */
export default async function Image({ params }: Props) {
    const { word } = await params;
    let headword = decodeURIComponent(word);
    let translation = '';
    try {
        const data = await getWordDetails(headword);
        headword = data.word;
        translation = data.translations?.[0] ?? data.definitions?.[0] ?? '';
    } catch {
        // Falls through to a headword-only card if the word can't be resolved
        // (generateMetadata's own try/catch handles the real not-found page).
    }

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
                    padding: 80,
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#f59e0b',
                        marginBottom: 24,
                    }}
                >
                    Mi&apos;gmaq Dictionary
                </div>
                <div style={{ display: 'flex', fontSize: 96, fontWeight: 900, color: '#1a1a1a' }}>{headword}</div>
                {translation && (
                    <div style={{ display: 'flex', marginTop: 28, fontSize: 40, fontWeight: 600, color: '#6b6b6b' }}>
                        {translation}
                    </div>
                )}
            </div>
        ),
        { ...size },
    );
}
