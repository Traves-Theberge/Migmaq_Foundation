"use client";

import { useState } from 'react';
import { AlphabetFilter } from '@dictionary-ui/react';

export default function AlphabetFilterPreview() {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <div>
            <AlphabetFilter letters={['A', 'B', 'E', 'L', 'M', 'P', 'S', 'T', 'W']} selected={selected} onSelect={setSelected} />
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.7 }}>
                Selected: {selected ?? 'none (showing all)'}
            </p>
        </div>
    );
}
