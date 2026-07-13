"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { CoverLeaf, ImageLeaf, TextLeaf, BackCoverLeaf } from './BookLeaves';
import type { BookDefinition, GlossData } from './types';

// A playful default trail color per page dot — pass your own via `dotColors`.
const DEFAULT_DOT_COLORS = ['#c1583f', '#4a7363', '#dab465', '#5a8598'];

export interface StoryBookProps {
    book: BookDefinition;
    /** Resolved gloss data for every word the book uses, keyed by word. You
     *  fetch/build this however your dictionary data is stored. */
    glosses: Record<string, GlossData>;
    /** Overrides the page-dot color rotation. */
    dotColors?: string[];
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
 *
 * Requires `import '@dictionary-ui/react/styles.css'` once in your app.
 */
export default function StoryBook({ book, glosses, dotColors = DEFAULT_DOT_COLORS }: StoryBookProps) {
    const flipRef = useRef<PageFlipHandle | null>(null);
    const [leafIndex, setLeafIndex] = useState(0);
    const [ready, setReady] = useState(false);
    // react-pageflip manipulates the DOM directly and has no meaningful SSR
    // output; a mount-guard (rather than a framework-specific "no SSR" API)
    // keeps this package portable across Next.js, Vite, CRA, Remix, etc.
    const [mounted, setMounted] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => setMounted(true), []);

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
    // causes real layout bugs — shift the whole widget visually with a
    // transform instead. Transforms don't touch the library's own layout
    // math, so this is safe.
    const isFrontCover = leafIndex === 0;
    const isBackCover = leafIndex === lastLeaf;
    const isSingleLeaf = isFrontCover || isBackCover;
    const singleLeafShift = isFrontCover ? '-25%' : isBackCover ? '25%' : '0%';

    const goToLeaf = useCallback((leaf: number) => {
        flipRef.current?.pageFlip().flip(Math.max(0, Math.min(lastLeaf, leaf)));
    }, [lastLeaf]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!ready) return;
            if (e.key === 'ArrowRight') flipRef.current?.pageFlip().flipNext();
            if (e.key === 'ArrowLeft') flipRef.current?.pageFlip().flipPrev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [ready]);

    return (
        <div className="dui-stage">
            <div className="dui-book-shadow" style={{ width: '100%', display: 'flex', justifyContent: 'center', maxWidth: 1040 }}>
                <div
                    style={{
                        width: '100%',
                        transform: isSingleLeaf ? `translateX(${singleLeafShift})` : 'translateX(0)',
                        transition: 'transform 0.5s ease-out',
                    }}
                >
                    {mounted ? (
                        <HTMLFlipBook
                            ref={flipRef}
                            className="dui-flipbook"
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
                                <TextLeaf key={`${page.id}-text`} page={page} glosses={glosses} />,
                            ])}
                            <BackCoverLeaf note={book.note} onRestart={() => goToLeaf(0)} />
                        </HTMLFlipBook>
                    ) : (
                        // Reserves the same footprint so nothing jumps once the reader mounts.
                        <div style={{ width: '100%', aspectRatio: '480 / 620', maxWidth: 560, margin: '0 auto', borderRadius: '0.6rem', background: 'var(--dui-paper-shade, #f0e2c4)' }} />
                    )}
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', width: '100%', maxWidth: 1040 }}>
                <button
                    onClick={() => flipRef.current?.pageFlip().flipPrev()}
                    disabled={leafIndex === 0}
                    className="dui-nav-button"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.875rem 1.5rem', borderRadius: '9999px', fontWeight: 700,
                        textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.03em',
                    }}
                >
                    <ChevronLeft size={20} /> Back
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {book.pages.map((page, i) => (
                        <button
                            key={page.id}
                            aria-label={`Go to page ${i + 1}: ${page.label}`}
                            onClick={() => goToLeaf(1 + i * 2)}
                            className="dui-page-dot"
                            style={{
                                width: '0.875rem', height: '0.875rem', borderRadius: '9999px', border: 'none', padding: 0, cursor: 'pointer',
                                background: i === currentPageOfBook ? 'var(--dui-book-accent, #a8402c)' : dotColors[i % dotColors.length],
                                opacity: i === currentPageOfBook ? 1 : 0.55,
                                transform: i === currentPageOfBook ? 'scale(1.5)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => flipRef.current?.pageFlip().flipNext()}
                    disabled={leafIndex === lastLeaf}
                    className="dui-nav-button"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.875rem 1.5rem', borderRadius: '9999px', fontWeight: 700,
                        textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.03em',
                    }}
                >
                    Next <ChevronRight size={20} />
                </button>
            </div>

            <p style={{ fontSize: '0.75rem', fontStyle: 'italic', textAlign: 'center', color: 'var(--dui-ink-soft, #7c6a52)', opacity: 0.7 }}>
                Drag a page corner to turn it, or use the arrow keys.
            </p>
        </div>
    );
}
