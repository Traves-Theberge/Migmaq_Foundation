"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Word } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import AudioButton from '@/components/ui/AudioButton';

const SPEAKER_NAMES: Record<string, string> = {
    dmm: 'Speaker DMM',
    ewm: 'Speaker EWM',
    jnw: 'Speaker JNW',
};
const speakerLabel = (s: string) => SPEAKER_NAMES[s] ?? `Speaker ${s.toUpperCase()}`;

export default function WordDetailsPage() {
    const { word } = useParams() as { word: string };
    const router = useRouter();
    const [data, setData] = useState<Word | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!word) return;
        fetch(`/api/word-details?word=${encodeURIComponent(word)}`)
            .then((res) => {
                if (!res.ok) throw new Error('Word not found');
                return res.json();
            })
            .then((json) => setData(json))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [word]);

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <h1 className="text-4xl font-black uppercase">Word Not Found</h1>
        </div>
    );

    if (loading || !data) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-2xl font-bold uppercase animate-pulse">Loading...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <Link
                        href="/dictionary"
                        className="inline-flex items-center text-lg font-bold uppercase tracking-wide hover:text-accent transition-colors group"
                    >
                        <ArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-2 transition-transform" />
                        Back to Dictionary
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center px-4 py-2 border-2 border-foreground font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border-2 border-foreground font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors">
                            <Bookmark className="w-4 h-4 mr-2" />
                            Save
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="border-b-4 border-foreground pb-6 mb-8">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none break-words">
                                    {data.word}
                                </h1>
                            </div>

                            {data.pronunciation_guide && (
                                <p className="text-xl sm:text-2xl font-bold text-muted-foreground mb-4 tracking-wide">
                                    {data.pronunciation_guide}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-3 mb-4">
                                {data.type && (
                                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary text-white font-bold uppercase tracking-widest text-xs sm:text-sm">
                                        {data.type}
                                    </span>
                                )}
                            </div>

                            {/* Every available recording of the word, by speaker */}
                            {data.recordings && data.recordings.some(r => r.kind === 'word') && (
                                <div className="flex flex-wrap gap-2">
                                    {data.recordings.filter(r => r.kind === 'word').map((rec) => (
                                        <AudioButton key={rec.file} url={rec.url} label={speakerLabel(rec.speaker)} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Translations */}
                        {data.translations && data.translations.length > 0 && (
                            <div className="mb-8 p-6 bg-secondary/10 border-4 border-secondary">
                                <h2 className="text-2xl font-black uppercase mb-4">English Translations</h2>
                                <ul className="space-y-2">
                                    {data.translations.map((translation, idx) => (
                                        <li key={idx} className="text-xl font-bold flex items-start">
                                            <span className="text-secondary mr-3">•</span>
                                            {translation}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Definitions */}
                        {data.definitions && data.definitions.length > 0 && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-black uppercase border-b-4 border-foreground pb-3">Definitions</h2>
                                {data.definitions.map((def, idx) => (
                                    <div key={idx} className="flex gap-6 items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-white flex items-center justify-center border-4 border-transparent group-hover:border-foreground transition-colors">
                                            <span className="text-2xl sm:text-3xl font-black">{idx + 1}</span>
                                        </div>
                                        <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight pt-2">
                                            {def}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Actions removed from here */}

                        {data.usages && data.usages.length > 0 && (
                            <div className="border-4 border-accent bg-background overflow-hidden relative">
                                <div className="bg-accent p-4 border-b-4 border-accent">
                                    <h3 className="text-xl font-black uppercase text-foreground">
                                        Usage Examples
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-6">
                                        {data.usages.map((usage, idx) => (
                                            <li key={idx} className="relative pl-4 border-l-4 border-accent/30">
                                                <p className="text-lg sm:text-xl font-bold mb-2 leading-snug">{usage.translation}</p>
                                                <p className="text-base sm:text-lg italic text-muted-foreground font-medium">{usage.english}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    {data.recordings && data.recordings.some(r => r.kind === 'example') && (
                                        <div className="mt-6 pt-4 border-t-2 border-accent/30">
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                                                Hear the example
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {data.recordings.filter(r => r.kind === 'example').map((rec) => (
                                                    <AudioButton key={rec.file} url={rec.url} label={speakerLabel(rec.speaker)} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {data.resolved_alternate_forms && data.resolved_alternate_forms.length > 0 && (
                            <div className="border-4 border-foreground bg-background">
                                <div className="bg-foreground p-4">
                                    <h3 className="text-xl font-black uppercase text-background">Other Forms</h3>
                                </div>
                                <ul className="p-6 space-y-3">
                                    {data.resolved_alternate_forms.map((form, idx) => {
                                        // Most inflected forms (plurals, obviatives, etc.) aren't their
                                        // own dictionary headword — only a note on the base entry. Rather
                                        // than leave those unclickable, fall back to the word you're
                                        // already viewing instead of a dead end.
                                        const href = form.href ?? `/dictionary/${encodeURIComponent(data.word)}`;
                                        return (
                                            <li key={idx} className="text-base leading-snug">
                                                <Link href={href} className="font-black hover:text-accent underline underline-offset-2 transition-colors">
                                                    {form.migmaq}
                                                </Link>
                                                {form.gloss && <span className="text-muted-foreground"> — {form.gloss}</span>}
                                                {form.note && <span className="text-muted-foreground text-sm"> {form.note}</span>}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {data.document_references && data.document_references.length > 0 && (
                            <div className="border-2 border-muted-foreground/40 bg-background p-6">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-3 text-muted-foreground">Sources</h3>
                                <ul className="space-y-2">
                                    {data.document_references.map((src, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground leading-snug">{src}</li>
                                    ))}
                                </ul>
                                {data.entry_url && (
                                    <a
                                        href={data.entry_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 mt-4 text-sm font-bold uppercase tracking-wide hover:text-accent transition-colors"
                                    >
                                        mikmaqonline.org <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
