"use client";

import React from 'react';
import AudioButton from '../audio/AudioButton';
import { PartOfSpeechBadge } from './WordCard';

export interface WordDetailUsage {
    /** The word's own language, e.g. a Mi'kmaq example sentence. */
    example: string;
    /** English (or your reference language) translation of the example. */
    translation: string;
    /** Recordings of this specific example sentence, if any. */
    audio?: { url: string; label: string }[];
}

export interface WordDetailAlternateForm {
    text: string;
    gloss?: string;
    note?: string;
    href?: string;
}

export interface WordDetailData {
    word: string;
    pronunciation?: string;
    partOfSpeech?: string;
    translations?: string[];
    definitions: string[];
    usages?: WordDetailUsage[];
    alternateForms?: WordDetailAlternateForm[];
    /** Citation strings for where this entry's data came from. */
    sources?: string[];
    /** Link to view the entry on its original source site, if any. */
    sourceUrl?: string;
    /** Recordings of the word itself (not an example), by speaker. */
    audio?: { url: string; label: string }[];
}

export interface WordDetailPageProps {
    data: WordDetailData;
    className?: string;
}

const sectionStyle: React.CSSProperties = {
    border: '1.5px solid var(--dui-border, currentColor)',
    borderRadius: 'var(--dui-radius, 0.5rem)',
    overflow: 'hidden',
};
const sectionHeaderStyle: React.CSSProperties = {
    padding: '0.9rem 1.25rem',
    background: 'var(--dui-accent, #a8402c)',
    color: 'var(--dui-accent-foreground, #fff)',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    fontSize: '0.95rem',
};

/**
 * A full word entry: header (pronunciation, part of speech, audio),
 * translations, numbered definitions, usage examples with their own audio,
 * alternate/inflected forms, and source citations. `WordCard` is the list
 * item; this is the page you land on when you click one.
 */
export default function WordDetailPage({ data, className }: WordDetailPageProps) {
    return (
        <div className={className} style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)' }}>
            <div style={{ minWidth: 0 }}>
                <div style={{ borderBottom: '3px solid var(--dui-border, currentColor)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 0.5rem', wordBreak: 'break-word' }}>
                        {data.word}
                    </h1>
                    {data.pronunciation && (
                        <p style={{ fontSize: '1.25rem', fontWeight: 700, opacity: 0.6, margin: '0 0 0.75rem' }}>{data.pronunciation}</p>
                    )}
                    {data.partOfSpeech && (
                        <div style={{ marginBottom: '1rem' }}><PartOfSpeechBadge>{data.partOfSpeech}</PartOfSpeechBadge></div>
                    )}
                    {data.audio && data.audio.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {data.audio.map((rec, i) => <AudioButton key={i} url={rec.url} label={rec.label} />)}
                        </div>
                    )}
                </div>

                {data.translations && data.translations.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, margin: '0 0 0.75rem' }}>
                            Translations
                        </h2>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {data.translations.map((t, i) => (
                                <li key={i} style={{ fontSize: '1.15rem', fontWeight: 700 }}>{t}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {data.definitions.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, margin: '0 0 1rem' }}>
                            Definitions
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {data.definitions.map((def, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{
                                        flexShrink: 0, width: '2rem', height: '2rem', borderRadius: '9999px',
                                        background: 'var(--dui-accent, #a8402c)', color: 'var(--dui-accent-foreground, #fff)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem',
                                    }}>
                                        {i + 1}
                                    </span>
                                    <p style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.4, margin: '0.15rem 0 0' }}>{def}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
                {data.usages && data.usages.length > 0 && (
                    <div style={sectionStyle}>
                        <div style={sectionHeaderStyle}>Usage examples</div>
                        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {data.usages.map((usage, i) => (
                                <div key={i} style={{ borderLeft: '3px solid var(--dui-accent, #a8402c)', paddingLeft: '0.9rem' }}>
                                    <p style={{ fontWeight: 700, margin: '0 0 0.3rem' }}>{usage.example}</p>
                                    <p style={{ fontStyle: 'italic', opacity: 0.7, margin: usage.audio?.length ? '0 0 0.5rem' : 0 }}>{usage.translation}</p>
                                    {usage.audio && usage.audio.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {usage.audio.map((rec, j) => <AudioButton key={j} url={rec.url} label={rec.label} />)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.alternateForms && data.alternateForms.length > 0 && (
                    <div style={sectionStyle}>
                        <div style={{ ...sectionHeaderStyle, background: 'var(--dui-fg, #000)', color: 'var(--dui-bg, #fff)' }}>Other forms</div>
                        <ul style={{ margin: 0, padding: '1.25rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {data.alternateForms.map((form, i) => {
                                const content = (
                                    <>
                                        <strong>{form.text}</strong>
                                        {form.gloss && <span style={{ opacity: 0.6 }}> — {form.gloss}</span>}
                                        {form.note && <span style={{ opacity: 0.5, fontSize: '0.85em' }}> {form.note}</span>}
                                    </>
                                );
                                return (
                                    <li key={i} style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                                        {form.href ? <a href={form.href} style={{ color: 'inherit' }}>{content}</a> : content}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {data.sources && data.sources.length > 0 && (
                    <div style={{ ...sectionStyle, borderStyle: 'dashed' }}>
                        <div style={{ padding: '1.25rem' }}>
                            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, margin: '0 0 0.75rem' }}>
                                Sources
                            </h3>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {data.sources.map((src, i) => (
                                    <li key={i} style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.4 }}>{src}</li>
                                ))}
                            </ul>
                            {data.sourceUrl && (
                                <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.9rem', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'underline', color: 'inherit' }}>
                                    View original entry →
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
