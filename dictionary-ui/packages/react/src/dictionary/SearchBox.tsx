"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Result count to show as a hint, e.g. "42 words". Omit to hide. */
    resultCount?: number;
    className?: string;
}

/**
 * A controlled search input. Deliberately has no search engine baked in —
 * plug in whatever you filter/fuzzy-match with (Fuse.js, a server query,
 * plain `.includes()`) and pass the current text in via `value`/`onChange`.
 */
export default function SearchBox({ value, onChange, placeholder = 'Search…', resultCount, className }: SearchBoxProps) {
    // Replaces the browser's default outline with a visible, on-brand focus
    // ring instead — never remove a focus indicator without something in
    // its place, or keyboard users lose track of where they are.
    const [focused, setFocused] = useState(false);

    return (
        <div className={className} style={{ position: 'relative' }}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    padding: '0.75rem 2.75rem 0.75rem 1rem',
                    fontSize: '1rem',
                    borderRadius: 'var(--dui-radius, 0.5rem)',
                    border: '1.5px solid var(--dui-border, #ccc)',
                    background: 'var(--dui-bg, transparent)',
                    color: 'var(--dui-fg, currentColor)',
                    outline: focused ? '2px solid var(--dui-accent, #a8402c)' : 'none',
                    outlineOffset: '2px',
                }}
            />
            <Search
                size={18}
                style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}
            />
            {resultCount !== undefined && (
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>
                    {resultCount} {resultCount === 1 ? 'result' : 'results'}
                </p>
            )}
        </div>
    );
}
