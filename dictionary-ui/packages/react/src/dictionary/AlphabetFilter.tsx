"use client";

import React from 'react';
import { cn } from '../utils';

export interface AlphabetFilterProps {
    /** Letters to show, in order — derive this from your own word list so it
     *  only shows letters that actually have entries. */
    letters: string[];
    selected: string | null;
    onSelect: (letter: string | null) => void;
    /** Label for the "clear filter" button. */
    allLabel?: string;
    className?: string;
}

/** A row of letter buttons for jumping to a section of a word list, plus an "all" button to clear it. */
export default function AlphabetFilter({ letters, selected, onSelect, allLabel = 'All', className }: AlphabetFilterProps) {
    const buttonStyle = (active: boolean): React.CSSProperties => ({
        minWidth: '2rem',
        height: '2rem',
        padding: '0 0.4rem',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--dui-radius, 0.4rem)',
        border: '1.5px solid var(--dui-border, currentColor)',
        background: active ? 'var(--dui-accent, #a8402c)' : 'var(--dui-bg, transparent)',
        color: active ? 'var(--dui-accent-foreground, #fff)' : 'var(--dui-fg, currentColor)',
        fontWeight: 700,
        fontSize: '0.85rem',
        cursor: 'pointer',
    });

    return (
        <div className={cn('dui-alphabet-filter', className)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            <button type="button" onClick={() => onSelect(null)} style={buttonStyle(selected === null)}>
                {allLabel}
            </button>
            {letters.map((letter) => (
                <button key={letter} type="button" onClick={() => onSelect(letter)} style={buttonStyle(selected === letter)}>
                    {letter}
                </button>
            ))}
        </div>
    );
}
