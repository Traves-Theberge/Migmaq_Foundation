"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { playRecording } from '@/lib/play-audio';
import { useTranslations } from '@/lib/i18n/LocaleProvider';
import type { ResolvedWord } from '@/lib/books/types';

interface GlossWordProps {
    word: string;
    display?: string;
    data?: ResolvedWord;
}

const HIDE_DELAY_MS = 150;
/** Below this distance from the viewport top, flip the tooltip to render below the word instead of above. */
const MIN_SPACE_ABOVE = 160;

/**
 * A single Mi'kmaq word inside book text: dotted-underline, click plays its
 * recording, hover/focus shows a gloss tooltip with a real link through to
 * the dictionary entry.
 *
 * The tooltip is rendered through a portal into document.body rather than
 * inline, because the book leaf it sits inside (`.leaf`/`.hardCover` in
 * StoryBook.module.css) uses `overflow: hidden` for its rounded corners and
 * edge-gradient pseudo-elements — that's load-bearing for the page's visual
 * design, so escaping the clip via a portal (instead of loosening the
 * ancestor's overflow) avoids a visual regression elsewhere. Position is
 * computed from the trigger's bounding rect and kept in sync on
 * scroll/resize while open. Portals break DOM-containment-based
 * `:hover`/`group-focus-within` CSS, so open state is driven explicitly by
 * mouse/focus handlers wired on both the trigger and the portaled content.
 */
export default function GlossWord({ word, display, data }: GlossWordProps) {
    const [playing, setPlaying] = useState(false);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<'above' | 'below'>('above');
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLSpanElement>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const t = useTranslations('storybook');
    const text = display ?? word;

    const updatePosition = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const above = rect.top >= MIN_SPACE_ABOVE;
        setPlacement(above ? 'above' : 'below');
        setCoords({
            top: above ? rect.top : rect.bottom,
            left: rect.left,
        });
    };

    const cancelHide = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    };

    const show = () => {
        cancelHide();
        updatePosition();
        setOpen(true);
    };

    const scheduleHide = () => {
        cancelHide();
        hideTimer.current = setTimeout(() => setOpen(false), HIDE_DELAY_MS);
    };

    useEffect(() => {
        if (!open) return;
        const onReposition = () => updatePosition();
        window.addEventListener('scroll', onReposition, true);
        window.addEventListener('resize', onReposition);
        return () => {
            window.removeEventListener('scroll', onReposition, true);
            window.removeEventListener('resize', onReposition);
        };
    }, [open]);

    useEffect(() => () => cancelHide(), []);

    if (!data) return <span>{text}</span>;

    const play = async () => {
        if (!data.audioUrl) return;
        try {
            setPlaying(true);
            const audio = await playRecording(data.audioUrl);
            audio.addEventListener('ended', () => setPlaying(false));
            audio.addEventListener('error', () => setPlaying(false));
        } catch {
            setPlaying(false);
        }
    };

    return (
        <span
            ref={triggerRef}
            className={`relative inline-block border-b-2 border-dotted border-current transition-colors ${
                data.audioUrl ? 'cursor-pointer' : 'cursor-help'
            } ${playing ? 'text-accent-ink' : ''}`}
            tabIndex={0}
            role={data.audioUrl ? 'button' : undefined}
            aria-label={data.audioUrl ? `${text}: ${data.gloss}. ${t('playRecording')}` : `${text}: ${data.gloss}`}
            onClick={data.audioUrl ? play : undefined}
            onKeyDown={(e) => {
                if (e.key === 'Escape') { setOpen(false); return; }
                if (data.audioUrl && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); play(); }
            }}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
            onFocus={show}
            onBlur={scheduleHide}
        >
            {text}
            {open && createPortal(
                <span
                    className="fixed z-50 block w-max max-w-64"
                    style={{
                        top: coords.top,
                        left: coords.left,
                        transform: placement === 'above' ? 'translateY(-100%)' : 'translateY(0)',
                    }}
                    onMouseEnter={cancelHide}
                    onMouseLeave={scheduleHide}
                    onFocus={cancelHide}
                    onBlur={scheduleHide}
                >
                    <span className={`block bg-foreground text-background text-xs font-bold normal-case tracking-normal
                                  leading-relaxed p-3 border-2 border-foreground shadow-lg ${placement === 'above' ? 'mb-2' : 'mt-2'}`}>
                        {data.gloss}
                        {data.pron && <span className="block font-normal mt-1">{t('say')} {data.pron}</span>}
                        {data.audioUrl && <span className="block font-normal mt-1 opacity-80">{t('clickToHear')}</span>}
                        {data.inDictionary && (
                            <Link
                                href={`/dictionary/${encodeURIComponent(word)}`}
                                className="block font-normal mt-2 underline hover:opacity-80"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {t('openInDictionary')}
                            </Link>
                        )}
                    </span>
                </span>,
                document.body
            )}
        </span>
    );
}

/** Renders a line of mixed word/literal tokens, resolving each word against the glosses map. */
export function GlossLine({
    tokens,
    glosses,
}: {
    tokens: Array<{ word: string; display?: string } | { literal: string }>;
    glosses: Record<string, ResolvedWord>;
}) {
    return (
        <>
            {tokens.map((t, i) =>
                'literal' in t
                    ? <React.Fragment key={i}>{t.literal}</React.Fragment>
                    : <GlossWord key={i} word={t.word} display={t.display} data={glosses[t.word]} />
            )}
        </>
    );
}
