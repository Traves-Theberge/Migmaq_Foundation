"use client";

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { GlossLine } from '../gloss/GlossWord';
import PagePlaceholder from './PagePlaceholder';
import type { BookDefinition, GlossData } from './types';

/**
 * The individual leaves react-pageflip renders. Each must be a single
 * forwarded-ref div at the top level (the library measures/transforms it
 * directly), so these stay presentational — all reading state lives in the
 * parent <StoryBook>. Requires `@dictionary-ui/react/styles.css` for the
 * `dui-*` classes referenced here.
 */

export const CoverLeaf = forwardRef<HTMLDivElement, {
    book: BookDefinition;
    glosses: Record<string, GlossData>;
}>(function CoverLeaf({ book, glosses }, ref) {
    return (
        <div ref={ref} className="page" data-density="hard">
            <div className="dui-hard-cover" style={{ position: 'relative' }}>
                {/* Full-bleed art — the illustration IS the cover, not a boxed inset. */}
                <div style={{ position: 'absolute', inset: 0 }}>
                    <PagePlaceholder alt={book.coverImageAlt} imageUrl={book.coverImageUrl} seed={0} />
                </div>
                {/* Title sits over the art, like a printed cover, on a scrim
                    that guarantees legibility regardless of the art. */}
                <div
                    className="dui-cover-scrim"
                    style={{ position: 'absolute', insetInline: 0, bottom: 0, padding: '5rem 1.5rem 2rem', textAlign: 'center' }}
                >
                    <h1
                        className="dui-title-outline"
                        style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2, margin: '0 0 0.75rem', color: 'var(--dui-cover-ink)' }}
                    >
                        <GlossLine tokens={book.title} glosses={glosses} />
                    </h1>
                    <p style={{ fontStyle: 'italic', fontSize: '1.05rem', opacity: 0.9, margin: 0, color: 'var(--dui-cover-ink)' }}>
                        {book.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
});

export const ImageLeaf = forwardRef<HTMLDivElement, { alt: string; imageUrl?: string; seed: number }>(
    function ImageLeaf({ alt, imageUrl, seed }, ref) {
        return (
            <div ref={ref} className="page">
                <div className="dui-leaf dui-image-leaf">
                    <PagePlaceholder alt={alt} imageUrl={imageUrl} seed={seed} />
                </div>
            </div>
        );
    }
);

export const TextLeaf = forwardRef<HTMLDivElement, {
    page: BookDefinition['pages'][number];
    glosses: Record<string, GlossData>;
}>(function TextLeaf({ page, glosses }, ref) {
    return (
        <div ref={ref} className="page">
            <div
                className="dui-leaf dui-text-leaf"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1.75rem' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {page.lines.map((line, i) => (
                        <div key={i}>
                            <p style={{ fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3, margin: 0, color: i % 2 === 1 ? 'var(--dui-book-accent)' : 'var(--dui-ink)' }}>
                                <GlossLine tokens={line.text} glosses={glosses} />
                            </p>
                            {line.translation && (
                                <p style={{ fontStyle: 'italic', fontSize: '0.95rem', marginTop: '0.25rem', color: 'var(--dui-ink-soft)' }}>
                                    {line.translation}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export const BackCoverLeaf = forwardRef<HTMLDivElement, { note?: string; onRestart: () => void }>(
    function BackCoverLeaf({ note, onRestart }, ref) {
        const paragraphs = (note ?? '').split('\n\n');
        return (
            <div ref={ref} className="page" data-density="hard">
                <div className="dui-hard-cover dui-hard-cover--column" style={{ overflowY: 'auto' }}>
                    <div style={{ padding: '2.5rem 2rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', opacity: 0.9 }}>
                            Notes
                        </h2>
                        {paragraphs.map((p, i) => (
                            <p
                                key={i}
                                style={{
                                    marginBottom: '0.75rem', lineHeight: 1.6,
                                    fontSize: i === paragraphs.length - 1 ? '0.75rem' : '0.9rem',
                                    opacity: i === paragraphs.length - 1 ? 0.6 : 0.9,
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: p
                                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\*(.+?)\*/g, '<em>$1</em>'),
                                }}
                            />
                        ))}
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={onRestart}
                            style={{
                                marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.6rem 1.25rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.3)',
                                background: 'transparent', color: 'inherit', fontWeight: 700, textTransform: 'uppercase',
                                fontSize: '0.75rem', letterSpacing: '0.05em', cursor: 'pointer',
                            }}
                        >
                            Read Again
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }
);
