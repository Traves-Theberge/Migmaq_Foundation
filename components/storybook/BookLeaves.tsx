"use client";

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { GlossLine } from './GlossWord';
import PagePlaceholder from './PagePlaceholder';
import styles from './StoryBook.module.css';
import { useTranslations } from '@/lib/i18n/LocaleProvider';
import type { BookDefinition, ResolvedWord } from '@/lib/books/types';

/**
 * The individual leaves react-pageflip renders. Each must be a single
 * forwarded-ref div at the top level (the library measures/transforms it
 * directly), so these stay presentational — all reading state lives in the
 * parent BookReader.
 */

export const CoverLeaf = forwardRef<HTMLDivElement, {
    book: BookDefinition;
    glosses: Record<string, ResolvedWord>;
}>(function CoverLeaf({ book, glosses }, ref) {
    return (
        <div ref={ref} className="page" data-density="hard">
            <div className={styles.hardCover} style={{ position: 'relative' }}>
                {/* Full-bleed art — the illustration IS the cover, not a boxed inset. */}
                <div className="absolute inset-0">
                    <PagePlaceholder alt={book.coverImageAlt} imageUrl={book.coverImageUrl} seed={0} />
                </div>
                {/* Title block sits over the art, like a printed cover, on a
                    scrim that guarantees legibility regardless of the art. */}
                <div className={`${styles.coverScrim} absolute inset-x-0 bottom-0 px-6 sm:px-8 pt-20 pb-8 text-center`}>
                    <p
                        className={`${styles.titleOutline} text-2xl sm:text-3xl font-bold leading-tight mb-3 text-balance`}
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--cover-ink)' }}
                    >
                        <GlossLine tokens={book.title} glosses={glosses} />
                    </p>
                    <p className="italic text-base sm:text-lg opacity-90" style={{ color: 'var(--cover-ink)' }}>
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
                <div className={`${styles.leaf} ${styles.imageLeaf}`}>
                    <PagePlaceholder alt={alt} imageUrl={imageUrl} seed={seed} />
                </div>
            </div>
        );
    }
);

export const TextLeaf = forwardRef<HTMLDivElement, {
    page: BookDefinition['pages'][number];
    index: number;
    total: number;
    glosses: Record<string, ResolvedWord>;
}>(function TextLeaf({ page, glosses }, ref) {
    return (
        <div ref={ref} className="page">
            <div className={`${styles.leaf} ${styles.textLeaf} flex flex-col justify-center px-7 sm:px-10 py-8`}>
                <div className="space-y-5">
                    {page.lines.map((line, i) => (
                        <div key={i}>
                            <p
                                className="text-lg sm:text-2xl font-bold leading-snug"
                                style={{ color: i % 2 === 1 ? 'var(--accent)' : 'var(--ink)' }}
                            >
                                <GlossLine tokens={line.mikmaq} glosses={glosses} />
                            </p>
                            <p className="italic mt-1 text-sm sm:text-base" style={{ color: 'var(--ink-soft)' }}>
                                {line.english}
                            </p>
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
        const t = useTranslations('storybook');
        return (
            <div ref={ref} className="page" data-density="hard">
                <div className={`${styles.hardCover} ${styles.hardCoverColumn} overflow-y-auto`}>
                    <div className="px-8 py-10 sm:px-10">
                        <h2 className="text-lg font-bold uppercase tracking-widest mb-5 opacity-90">
                            {t('forParentsTeachers')}
                        </h2>
                        {paragraphs.map((p, i) => (
                            <p
                                key={i}
                                className={`mb-3 leading-relaxed text-sm ${i === paragraphs.length - 1 ? 'opacity-60 text-xs' : 'opacity-90'}`}
                                dangerouslySetInnerHTML={{
                                    __html: p
                                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\*(.+?)\*/g, '<em>$1</em>'),
                                }}
                            />
                        ))}
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={onRestart}
                            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-current/40 font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
                        >
                            {t('readAgain')}
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }
);
