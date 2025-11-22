"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Word } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';

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
                <Link
                    href="/dictionary"
                    className="inline-flex items-center text-lg font-bold uppercase tracking-wide hover:text-primary mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-2 transition-transform" />
                    Back to Dictionary
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="border-b-4 border-foreground pb-6 mb-8">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none break-words">
                                    {data.word}
                                </h1>
                                {data.audio && (
                                    <button className="p-3 sm:p-4 border-4 border-foreground rounded-full hover:bg-foreground hover:text-background transition-colors flex-shrink-0">
                                        <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {data.type && (
                                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white font-bold uppercase tracking-widest text-xs sm:text-sm">
                                        {data.type}
                                    </span>
                                )}
                                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-foreground text-background font-bold uppercase tracking-widest text-xs sm:text-sm">
                                    Mi'gmaq
                                </span>
                            </div>
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
                                    <div key={idx} className="relative pl-6 sm:pl-8 border-l-4 border-primary">
                                        <span className="absolute -left-[1.2rem] sm:-left-[1.4rem] -top-2 text-4xl sm:text-6xl font-black text-muted-foreground/20">
                                            {idx + 1}
                                        </span>
                                        <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                            {def}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-6 bg-muted border-4 border-foreground">
                            <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-foreground pb-2">
                                Actions
                            </h3>
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 border-2 border-foreground font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors">
                                    Share
                                </button>
                                <button className="flex-1 py-3 border-2 border-foreground font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors">
                                    Save
                                </button>
                            </div>
                        </div>

                        {data.usages && data.usages.length > 0 && (
                            <div className="p-6 bg-accent/20 border-4 border-accent">
                                <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-foreground pb-2">
                                    Usage Examples
                                </h3>
                                <ul className="space-y-4">
                                    {data.usages.map((usage, idx) => (
                                        <li key={idx} className="font-medium leading-relaxed">
                                            <p className="text-base sm:text-lg font-bold mb-1">{usage.translation}</p>
                                            <p className="text-sm sm:text-base italic opacity-80">{usage.english}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
