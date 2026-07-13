"use client";

import { useMemo, useState } from 'react';
import { SearchBox, WordCard, type DictionaryWord } from '@dictionary-ui/react';

const WORDS: DictionaryWord[] = [
    { word: "mui'n", pronunciation: 'mu·iin', partOfSpeech: 'noun animate', definitions: ['bear'], href: '#' },
    { word: "apli'gmuj", pronunciation: 'a·pê·lii·gê·much', partOfSpeech: 'noun animate', definitions: ['rabbit, snowshoe hare'], href: '#' },
    { word: 'plamu', pronunciation: 'bê·la·mu', partOfSpeech: 'noun animate', definitions: ['salmon'], href: '#' },
];

export default function WordCardPreview() {
    const [query, setQuery] = useState('');
    const filtered = useMemo(
        () => WORDS.filter((w) => w.word.toLowerCase().includes(query.toLowerCase())),
        [query]
    );

    return (
        <div>
            <SearchBox value={query} onChange={setQuery} placeholder="Search words…" resultCount={filtered.length} />
            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                {filtered.map((w) => (
                    <WordCard key={w.word} word={w} />
                ))}
            </div>
        </div>
    );
}
