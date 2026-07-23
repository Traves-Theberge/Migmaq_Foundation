"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CoverLeaf, ImageLeaf, TextLeaf, BackCoverLeaf } from './BookLeaves';
import styles from './StoryBook.module.css';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n/LocaleProvider';
import type { BookDefinition, ResolvedWord } from '@/lib/books/types';

// react-pageflip manipulates the DOM directly and has no meaningful SSR output.
const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

// Quillwork-inspired palette, cycled per page dot for a playful trail.
const DOT_COLORS = ['#c1583f', '#4a7363', '#dab465', '#5a8598'];

interface StoryBookProps {
    book: BookDefinition;
    glosses: Record<string, ResolvedWord>;
}

/** Minimal surface of the PageFlip instance this component actually calls. */
interface PageFlipHandle {
    pageFlip(): {
        flipNext(): void;
        flipPrev(): void;
        flip(page: number): void;
        getCurrentPageIndex(): number;
        getPageCount(): number;
    };
}

/**
 * The reusable animated reader: any BookDefinition renders through this —
 * new books need only a data file, never new reader code. Pages are real
 * physical leaves (react-pageflip / StPageFlip) with drag-to-turn and corner
 * curl; each story page contributes an image leaf and a text leaf, which
 * pair up into a two-page spread whenever the viewport is wide enough.
 */
// react-pageflip's own switch point (page-flip's Render.calculateBoundsRect,
// size="stretch" branch): below `minWidth * 2`, it renders one leaf at a
// time (portrait) instead of a two-page spread (landscape). The single-leaf
// shift below only makes sense in landscape — in portrait the leaf already
// fills the widget, so the same shift pushes it partway off-screen instead
// of centering it. Mirrors the `minWidth={280}` passed to HTMLFlipBook.
const FLIPBOOK_MIN_WIDTH = 280;

export default function StoryBook({ book, glosses }: StoryBookProps) {
    const flipRef = useRef<PageFlipHandle | null>(null);
    const shiftContainerRef = useRef<HTMLDivElement | null>(null);
    const [leafIndex, setLeafIndex] = useState(0);
    const [ready, setReady] = useState(false);
    const [isLandscape, setIsLandscape] = useState(true);
    const reduceMotion = useReducedMotion();
    const t = useTranslations('storybook');

    useEffect(() => {
        const el = shiftContainerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            setIsLandscape(entry.contentRect.width >= FLIPBOOK_MIN_WIDTH * 2);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const totalLeaves = book.pages.length * 2 + 2;
    const lastLeaf = totalLeaves - 1;

    const currentPageOfBook = leafIndex > 0 && leafIndex < lastLeaf
        ? Math.min(book.pages.length - 1, Math.floor((leafIndex - 1) / 2))
        : -1;

    // The front cover renders alone in the widget's right slot; the back
    // cover renders alone in the LEFT slot (it's the final leaf, reached
    // after everything else has "turned" to that side) — opposite
    // directions, so they need opposite correction. Rather than resizing the
    // widget itself — react-pageflip caches each leaf's absolute position
    // and doesn't recompute on a CSS-transition-driven parent resize, which
    // caused real layout bugs — shift the whole widget visually with a
    // transform instead. Transforms don't touch the library's own layout
    // math, so this is safe.
    const isFrontCover = leafIndex === 0;
    const isBackCover = leafIndex === lastLeaf;
    const isSingleLeaf = isLandscape && (isFrontCover || isBackCover);
    const singleLeafShift = isFrontCover ? '-25%' : isBackCover ? '25%' : '0%';

    const goToLeaf = useCallback((leaf: number) => {
        flipRef.current?.pageFlip().flip(Math.max(0, Math.min(lastLeaf, leaf)));
    }, [lastLeaf]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!ready) return;
            const target = e.target as HTMLElement | null;
            if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
            if (e.key === 'ArrowRight') flipRef.current?.pageFlip().flipNext();
            if (e.key === 'ArrowLeft') flipRef.current?.pageFlip().flipPrev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [ready]);

    const currentPage = currentPageOfBook >= 0 ? book.pages[currentPageOfBook] : null;

    return (
        <div className={styles.stage}>
            <div
                ref={shiftContainerRef}
                className={cn('w-full flex justify-center', styles.bookShadow)}
                style={{ maxWidth: 1040 }}
            >
              <div
                className="transition-transform duration-500 ease-out"
                style={{ transform: isSingleLeaf ? `translateX(${singleLeafShift})` : 'translateX(0)', width: '100%' }}
              >
                <HTMLFlipBook
                    ref={flipRef}
                    className="story-flipbook"
                    style={{}}
                    startPage={0}
                    size="stretch"
                    width={480}
                    height={620}
                    minWidth={280}
                    maxWidth={560}
                    minHeight={380}
                    maxHeight={720}
                    drawShadow
                    flippingTime={reduceMotion ? 1 : 650}
                    usePortrait
                    startZIndex={10}
                    autoSize
                    maxShadowOpacity={0.4}
                    showCover
                    mobileScrollSupport={false}
                    swipeDistance={20}
                    showPageCorners
                    disableFlipByClick
                    clickEventForward
                    useMouseEvents
                    renderOnlyPageLengthChange={false}
                    onInit={() => setReady(true)}
                    onFlip={(e: { data: number }) => setLeafIndex(e.data)}
                >
                    <CoverLeaf book={book} glosses={glosses} />
                    {book.pages.flatMap((page, i) => [
                        <ImageLeaf key={`${page.id}-img`} alt={page.imageAlt} imageUrl={page.imageUrl} seed={i + 1} />,
                        <TextLeaf key={`${page.id}-text`} page={page} index={i} total={book.pages.length} glosses={glosses} />,
                    ])}
                    <BackCoverLeaf note={book.note} onRestart={() => goToLeaf(0)} />
                </HTMLFlipBook>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 w-full" style={{ maxWidth: 1040 }}>
                <button
                    type="button"
                    onClick={() => flipRef.current?.pageFlip().flipPrev()}
                    disabled={leafIndex === 0}
                    className={cn(styles.navButton, 'inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase text-sm tracking-wide',
                        'disabled:opacity-30 disabled:cursor-not-allowed')}
                >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" /> {t('back')}
                </button>

                <div className="flex items-center gap-2.5">
                    {book.pages.map((page, i) => (
                        <button
                            type="button"
                            key={page.id}
                            aria-label={`${t('goToPage')} ${i + 1}: ${page.label}`}
                            aria-current={i === currentPageOfBook ? 'page' : undefined}
                            onClick={() => goToLeaf(1 + i * 2)}
                            className={cn(styles.pageDot, 'w-3.5 h-3.5 rounded-full')}
                            style={{
                                background: i === currentPageOfBook ? 'var(--accent)' : DOT_COLORS[i % DOT_COLORS.length],
                                opacity: i === currentPageOfBook ? 1 : 0.55,
                                transform: i === currentPageOfBook ? 'scale(1.5)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => flipRef.current?.pageFlip().flipNext()}
                    disabled={leafIndex === lastLeaf}
                    className={cn(styles.navButton, 'inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase text-sm tracking-wide',
                        'disabled:opacity-30 disabled:cursor-not-allowed')}
                >
                    {t('next')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>

            <p className="text-xs italic text-center" style={{ color: 'var(--ink-soft)' }}>
                {t('dragHint')}
            </p>

            <span className="sr-only" aria-live="polite">
                {currentPage ? `${t('page')} ${currentPageOfBook + 1} ${t('of')} ${book.pages.length}: ${currentPage.label}` : ''}
            </span>
        </div>
    );
}
