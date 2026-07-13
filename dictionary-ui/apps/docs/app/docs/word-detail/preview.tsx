"use client";

import { WordDetailPage, type WordDetailData } from '@dictionary-ui/react';

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

const demo: WordDetailData = {
    word: "mui'n",
    pronunciation: 'mu·iin',
    partOfSpeech: 'noun animate',
    translations: ['Bear'],
    definitions: ['bear'],
    audio: [{ url: beepDataUri(392), label: 'Speaker A' }, { url: beepDataUri(440), label: 'Speaker B' }],
    usages: [{
        example: "Mui'n na to'q maw wigt'gl pgumann.",
        translation: 'A bear apparently really likes blueberries.',
        audio: [{ url: beepDataUri(523), label: 'Speaker A' }],
    }],
    alternateForms: [
        { text: "mui'naq", gloss: 'bears', note: '(plural)' },
        { text: "mui'nal", gloss: 'a bear', note: '(fourth person)' },
    ],
    sources: ['Pacifique Dictionary Manuscript, Page Image #517'],
    sourceUrl: '#',
};

export default function WordDetailPreview() {
    return <WordDetailPage data={demo} />;
}
