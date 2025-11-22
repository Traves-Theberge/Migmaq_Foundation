"use client";
import { useEffect, useState } from 'react';

const spellings = ["Mi'gmaq", "Mi'gmaaq", "Mi'gma'k"]; // Add more variations if needed

export function SpellingCycler() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % spellings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return <span className="gradient-text">{spellings[index]}</span>;
}
