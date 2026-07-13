"use client";

import React, { useEffect, useState } from 'react';
import { playRecording } from '../audio/play-audio';
import { cn } from '../utils';
import type { GlossData, GlossToken } from './types';

// Injected once globally rather than per-instance — many GlossWords on one
// page would otherwise duplicate an identical <style> block each.
let stylesInjected = false;
function useGlossWordStyles() {
    useEffect(() => {
        if (stylesInjected || typeof document === 'undefined') return;
        stylesInjected = true;
        const style = document.createElement('style');
        style.setAttribute('data-dui', 'gloss-word');
        style.textContent = `
            .dui-gloss-word:hover > .dui-gloss-word__bridge,
            .dui-gloss-word:focus-within > .dui-gloss-word__bridge {
                /* !important: the bridge's own "display: none" is an inline
                   style attribute, which beats a plain external-stylesheet
                   rule regardless of selector specificity — only !important
                   can override it. */
                display: block !important;
            }
        `;
        document.head.appendChild(style);
    }, []);
}

export interface GlossWordProps {
    /** The lookup key — used for the aria-label; display defaults to this. */
    word: string;
    /** Text actually shown, if different from `word` (e.g. a capitalized form). */
    display?: string;
    data?: GlossData;
    className?: string;
}

/**
 * A single word with a hover/focus gloss tooltip and click-to-play audio.
 * Router-agnostic: the tooltip's "open dictionary entry" link is a plain
 * `<a>` — if you're on Next.js/Remix/etc. and want client-side navigation,
 * swap it for your framework's Link in a copy-pasted version.
 *
 * The tooltip sits flush against the word (no gap) with its own bottom
 * padding acting as an invisible hover "bridge" — without it, moving the
 * mouse from the word up into the tooltip crosses a dead zone that belongs
 * to neither element, so hover (and the tooltip) drops before the cursor
 * arrives. `:focus-within` keeps it open while the link inside is
 * keyboard-focused, too.
 */
export default function GlossWord({ word, display, data, className }: GlossWordProps) {
    const [playing, setPlaying] = useState(false);
    const text = display ?? word;
    useGlossWordStyles();

    if (!data) return <span className={className}>{text}</span>;

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
            className={cn('dui-gloss-word', className)}
            style={{
                position: 'relative',
                display: 'inline-block',
                borderBottom: '2px dotted currentColor',
                cursor: data.audioUrl ? 'pointer' : 'help',
                color: playing ? 'var(--dui-accent, #a8402c)' : undefined,
            }}
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
            <span className="dui-gloss-word__bridge" style={{
                position: 'absolute', left: 0, bottom: '100%', zIndex: 20,
                display: 'none', width: 'max-content', maxWidth: '16rem', paddingBottom: '0.5rem',
            }}>
                <span style={{
                    display: 'block',
                    background: 'var(--dui-tooltip-bg, #1a1a1a)',
                    color: 'var(--dui-tooltip-fg, #fff)',
                    fontSize: '0.75rem', fontWeight: 700, lineHeight: 1.5,
                    padding: '0.75rem', borderRadius: 'var(--dui-radius, 0.5rem)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                }}>
                    {data.gloss}
                    {data.pron && <span style={{ display: 'block', fontWeight: 400, marginTop: '0.25rem' }}>say: {data.pron}</span>}
                    {data.audioUrl && (
                        <span style={{ display: 'block', fontWeight: 400, marginTop: '0.25rem', opacity: 0.8 }}>
                            click the word to hear it
                        </span>
                    )}
                    {data.href && (
                        <a
                            href={data.href}
                            onClick={(e) => e.stopPropagation()}
                            style={{ display: 'block', fontWeight: 400, marginTop: '0.5rem', textDecoration: 'underline', color: 'inherit' }}
                        >
                            open dictionary entry →
                        </a>
                    )}
                </span>
            </span>
        </span>
    );
}

/** Renders a line of mixed word/literal tokens, resolving each word against a gloss map. */
export function GlossLine({
    tokens,
    glosses,
}: {
    tokens: GlossToken[];
    glosses: Record<string, GlossData>;
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
