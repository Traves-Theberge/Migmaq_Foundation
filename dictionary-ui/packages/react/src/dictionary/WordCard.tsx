"use client";

import React from 'react';
import type { DictionaryWord } from './types';

export interface WordCardProps {
    word: DictionaryWord;
    className?: string;
}

/** A small pill badge — used internally for part-of-speech, exported in case you want it standalone. */
export function PartOfSpeechBadge({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                display: 'inline-block',
                padding: '0.2rem 0.6rem',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: 'var(--dui-radius, 9999px)',
                background: 'var(--dui-muted, rgba(127,127,127,0.15))',
                color: 'var(--dui-fg, currentColor)',
            }}
        >
            {children}
        </span>
    );
}

/** A word list card: word, pronunciation, part-of-speech badge, first definition.
 *  Renders as a plain `<a>` when `word.href` is set, a `<div>` otherwise. */
export default function WordCard({ word, className }: WordCardProps) {
    const Tag = word.href ? 'a' : 'div';
    return (
        <Tag
            href={word.href}
            className={className}
            style={{
                display: 'block',
                padding: '1.25rem',
                borderRadius: 'var(--dui-radius, 0.75rem)',
                border: '1px solid var(--dui-border, rgba(127,127,127,0.25))',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{word.word}</h3>
                {word.partOfSpeech && <PartOfSpeechBadge>{word.partOfSpeech}</PartOfSpeechBadge>}
            </div>
            {word.pronunciation && (
                <p style={{ fontSize: '0.85rem', opacity: 0.6, margin: '0 0 0.4rem' }}>{word.pronunciation}</p>
            )}
            {word.definitions[0] && (
                <p style={{ fontSize: '0.95rem', margin: 0, opacity: 0.9 }}>{word.definitions[0]}</p>
            )}
        </Tag>
    );
}
