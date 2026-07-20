"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { playRecording } from '@/lib/play-audio';
import type { ResolvedWord } from '@/lib/books/types';

interface GlossWordProps {
    word: string;
    display?: string;
    data?: ResolvedWord;
}

/**
 * A single Mi'kmaq word inside book text: dotted-underline, click plays its
 * recording, hover/focus shows a gloss tooltip with a real link through to
 * the dictionary entry.
 *
 * The tooltip sits flush against the word (no gap) with its own bottom
 * padding acting as an invisible hover "bridge" — without it, moving the
 * mouse from the word up into the tooltip crosses a dead zone that isn't
 * part of any hoverable element, so :hover (and the tooltip) drops before
 * the cursor arrives. `group-focus-within` keeps it open while the
 * dictionary link inside is keyboard-focused, too.
 */
export default function GlossWord({ word, display, data }: GlossWordProps) {
    const [playing, setPlaying] = useState(false);
    const text = display ?? word;

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
            className={`group relative inline-block border-b-2 border-dotted border-current transition-colors ${
                data.audioUrl ? 'cursor-pointer' : 'cursor-help'
            } ${playing ? 'text-accent-ink' : ''}`}
            tabIndex={0}
            role={data.audioUrl ? 'button' : undefined}
            aria-label={data.audioUrl ? `${text}: ${data.gloss}. Play recording.` : `${text}: ${data.gloss}`}
            onClick={data.audioUrl ? play : undefined}
            onKeyDown={
                data.audioUrl
                    ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }
                    : undefined
            }
        >
            {text}
            <span
                className="absolute left-0 bottom-full z-20 hidden w-max max-w-64 pb-2
                           group-hover:block group-focus-within:block"
            >
                <span className="block bg-foreground text-background text-xs font-bold normal-case tracking-normal
                                  leading-relaxed p-3 border-2 border-foreground shadow-lg">
                    {data.gloss}
                    {data.pron && <span className="block font-normal mt-1">say: {data.pron}</span>}
                    {data.audioUrl && <span className="block font-normal mt-1 opacity-80">click the word to hear it</span>}
                    {data.inDictionary && (
                        <Link
                            href={`/dictionary/${encodeURIComponent(word)}`}
                            className="block font-normal mt-2 underline hover:opacity-80"
                            onClick={(e) => e.stopPropagation()}
                        >
                            open in dictionary →
                        </Link>
                    )}
                </span>
            </span>
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
