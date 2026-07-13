import type { BookDefinition, GlossData } from '@dictionary-ui/react';

function beepDataUri(freq: number): string {
    const rate = 8000;
    const seconds = 0.35;
    const samples = Math.floor(rate * seconds);
    const buf = new ArrayBuffer(44 + samples * 2);
    const v = new DataView(buf);
    const str = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    str(0, 'RIFF'); v.setUint32(4, 36 + samples * 2, true); str(8, 'WAVE');
    str(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    str(36, 'data'); v.setUint32(40, samples * 2, true);
    for (let i = 0; i < samples; i++) {
        const t = i / rate;
        const envelope = Math.min(1, (seconds - t) * 8) * Math.min(1, t * 40);
        const sample = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
        v.setInt16(44 + i * 2, sample * 32767, true);
    }
    let b = '';
    new Uint8Array(buf).forEach((byte) => { b += String.fromCharCode(byte); });
    return 'data:audio/wav;base64,' + btoa(b);
}

// A tiny demo book — chosen in Spanish (rather than any specific real
// dictionary project's content) so it's clearly a generic illustration of
// the API, not tied to any one language site.
const CHAIN = ['sol', 'nube', 'luna', 'estrella'] as const;
const EN: Record<string, string> = { sol: 'sun', nube: 'cloud', luna: 'moon', estrella: 'star' };

export const glosses: Record<string, GlossData> = {
    sol: { gloss: 'sun', pron: 'sol', audioUrl: beepDataUri(392) },
    nube: { gloss: 'cloud', pron: 'NOO-beh' },
    luna: { gloss: 'moon', pron: 'LOO-nah', audioUrl: beepDataUri(440) },
    estrella: { gloss: 'star', pron: 'es-TREH-yah' },
    quién: { gloss: 'who' },
    ves: { gloss: 'you see' },
    veo: { gloss: 'I see' },
};

function askLine(word: string) {
    return {
        text: [{ word }, { literal: ', ' }, { word }, { literal: ', ¿a ' }, { word: 'quién' }, { word: 'ves' }, { literal: '?' }],
        translation: `${EN[word][0].toUpperCase()}${EN[word].slice(1)}, ${EN[word]}, who do you see?`,
    };
}
function answerLine(word: string) {
    return {
        text: [{ word: 'veo' }, { literal: ' un ' }, { word }, { literal: '.' }],
        translation: `I see a ${EN[word]}.`,
    };
}

export const demoBook: BookDefinition = {
    slug: 'sol-sol',
    title: [{ word: 'sol', display: 'Sol' }, { literal: ', sol, ¿a ' }, { word: 'quién' }, { word: 'ves' }, { literal: '?' }],
    subtitle: 'Sun, sun, who do you see?',
    coverImageAlt: 'The sun shining over rolling hills',
    pages: CHAIN.slice(0, -1).map((word, i) => ({
        id: word,
        label: `${word} — ${EN[word]}`,
        lines: [askLine(word), answerLine(CHAIN[i + 1])],
        imageAlt: `The ${EN[word]} looks toward ${EN[CHAIN[i + 1]] === 'cloud' ? 'a' : 'the'} ${EN[CHAIN[i + 1]]}.`,
    })),
    note: 'A three-page demo — this is the full `<StoryBook>` component driven entirely by the `demoBook` object above and the `glosses` map. Swap in your own words, pages, and dictionary data and it works exactly the same way.',
};
