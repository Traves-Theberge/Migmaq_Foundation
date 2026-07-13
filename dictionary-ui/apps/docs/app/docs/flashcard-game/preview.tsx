"use client";

import { useState, useCallback } from 'react';
import { FlashcardGame, type FlashcardPair } from '@dictionary-ui/react';

const WORDS: [string, string][] = [
    ["mui'n", 'bear'],
    ["apli'gmuj", 'rabbit'],
    ['plamu', 'salmon'],
];

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildDeck(): FlashcardPair[] {
    const pairs: FlashcardPair[] = WORDS.flatMap(([word, en], i) => [
        { id: `${i}-word`, content: word, side: "Mi'gmaq", matchId: String(i) },
        { id: `${i}-en`, content: en, side: 'English', matchId: String(i) },
    ]);
    return shuffle(pairs);
}

export default function FlashcardGamePreview() {
    const [deck, setDeck] = useState(buildDeck);
    const restart = useCallback(() => setDeck(buildDeck()), []);
    return <FlashcardGame pairs={deck} onRestart={restart} />;
}
