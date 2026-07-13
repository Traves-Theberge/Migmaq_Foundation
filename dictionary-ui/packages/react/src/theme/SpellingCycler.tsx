"use client";

import { useEffect, useState } from 'react';

export interface SpellingCyclerProps {
    /** Alternate spellings/orthographies to cycle between, e.g. ["Mi'gmaq", "Mi'gmaaq", "Mi'gma'k"]. */
    variants: string[];
    intervalMs?: number;
    className?: string;
}

/**
 * Cycles through alternate spellings of a language/word name — useful since
 * many languages have more than one accepted orthography and a dictionary
 * site's header is a natural place to acknowledge that rather than pick
 * just one.
 */
export function SpellingCycler({ variants, intervalMs = 3000, className }: SpellingCyclerProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (variants.length <= 1) return;
        const interval = setInterval(() => setIndex((prev) => (prev + 1) % variants.length), intervalMs);
        return () => clearInterval(interval);
    }, [variants.length, intervalMs]);

    return <span className={className}>{variants[index] ?? ''}</span>;
}
