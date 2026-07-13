"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { playRecording, stopAudio } from './play-audio';
import { cn } from '../utils';

export interface AudioButtonProps {
    /** Playable audio URL (mp3, wav, etc.) — fetch it from wherever your data lives. */
    url: string;
    /** Visible label, e.g. a speaker name or "play". */
    label: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * A play/stop button for one audio recording. Playing this button stops
 * any other `<AudioButton>` (or `playRecording()` call) currently playing,
 * so multiple buttons on a page never overlap.
 *
 * Ships with sane default styling via CSS custom properties (`--dui-*`) so
 * it looks reasonable with zero setup; override with `className`/`style`,
 * or redeclare the `--dui-*` variables to theme it, in either the installed
 * package or a copy-pasted version.
 */
export default function AudioButton({ url, label, className, style }: AudioButtonProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const onOtherPlay = () => setPlaying(false);
        window.addEventListener('dictionary-ui-audio-play', onOtherPlay);
        return () => {
            window.removeEventListener('dictionary-ui-audio-play', onOtherPlay);
            audioRef.current?.pause();
        };
    }, []);

    const toggle = async () => {
        if (playing) {
            stopAudio();
            setPlaying(false);
            return;
        }
        try {
            const audio = await playRecording(url);
            audioRef.current = audio;
            setPlaying(true);
            audio.addEventListener('ended', () => setPlaying(false));
            audio.addEventListener('error', () => setPlaying(false));
        } catch {
            setPlaying(false);
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            className={cn('dui-audio-button', playing && 'dui-audio-button--playing', className)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 0.875rem',
                borderRadius: 'var(--dui-radius, 9999px)',
                border: '1.5px solid var(--dui-border, currentColor)',
                background: playing ? 'var(--dui-accent, #a8402c)' : 'var(--dui-bg, transparent)',
                color: playing ? 'var(--dui-accent-foreground, #fff)' : 'var(--dui-fg, currentColor)',
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'background 0.15s ease, color 0.15s ease',
                ...style,
            }}
        >
            {playing ? <Square size={14} /> : <Volume2 size={14} />}
            {label}
        </button>
    );
}
