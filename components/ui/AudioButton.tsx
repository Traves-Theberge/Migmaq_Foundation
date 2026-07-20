"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playRecording, stopAudio } from '@/lib/play-audio';

interface AudioButtonProps {
    url: string;
    label: string;
    className?: string;
}

/** A play button for one recording. Stops any other playing recording. */
export default function AudioButton({ url, label, className }: AudioButtonProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const onOtherPlay = () => setPlaying(false);
        window.addEventListener('migmaq-audio-play', onOtherPlay);
        return () => {
            window.removeEventListener('migmaq-audio-play', onOtherPlay);
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
            aria-label={playing ? `Stop ${label}` : `Play ${label}`}
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 border-2 border-foreground font-bold uppercase text-xs tracking-widest transition-colors",
                playing
                    ? "bg-accent text-foreground border-accent"
                    : "bg-background hover:bg-foreground hover:text-background",
                className
            )}
        >
            {playing ? <Square className="w-3.5 h-3.5" aria-hidden="true" /> : <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />}
            {label}
            <span className="sr-only" aria-live="polite">
                {playing ? `Playing ${label}` : ''}
            </span>
        </button>
    );
}
