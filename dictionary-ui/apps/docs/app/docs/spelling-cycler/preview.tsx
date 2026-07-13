"use client";

import { SpellingCycler } from '@dictionary-ui/react';

export default function SpellingCyclerPreview() {
    return (
        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            <SpellingCycler variants={["Mi'gmaq", "Mi'gmaaq", "Mi'gma'k"]} intervalMs={1500} />
        </p>
    );
}
