"use client";

import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { Word } from '@/lib/types';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DictionaryPage() {
    const [words, setWords] = useState<Word[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        fetch('/api/dictionary')
            .then((res) => res.json())
            .then((data) => {
                setWords(data);
                setFiltered(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFiltered(words);
            return;
        }
        const fuse = new Fuse(words, {
            keys: ['word', 'definitions.definition'],
            threshold: 0.3,
        });
        const results = fuse.search(searchTerm).map((r) => r.item);
        setFiltered(results);
        setPage(1);
    }, [searchTerm, words]);

    const paginatedWords = filtered.slice(0, page * itemsPerPage);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16 border-b-4 border-foreground pb-8">
                    <h1 className="text-5xl sm:text-8xl font-black tracking-tighter mb-4 uppercase break-words">
                        Dictionary
                    </h1>
                    <p className="text-xl sm:text-2xl font-medium max-w-2xl">
                        The complete lexicon. <span className="text-primary font-bold">{words.length}</span> words archived.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-20">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="SEARCH THE ARCHIVE..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background border-4 border-foreground p-4 sm:p-8 text-xl sm:text-3xl font-bold uppercase placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors hard-shadow"
                        />
                        <Search className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 text-foreground" />
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
                    </div>
                ) : (
                    <div className="space-y-0">
                        <AnimatePresence mode="popLayout">
                            {paginatedWords.map((w, index) => (
                                <motion.div
                                    key={w.word + index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                >
                                    <Link
                                        href={`/dictionary/${encodeURIComponent(w.word)}`}
                                        className="group block border-b-2 border-foreground py-8 hover:bg-primary hover:text-white transition-colors px-4 -mx-4"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-baseline gap-4 mb-2">
                                                    <h2 className="text-4xl font-black tracking-tight group-hover:translate-x-2 transition-transform">
                                                        {w.word}
                                                    </h2>
                                                    {w.type && (
                                                        <span className="text-sm font-bold uppercase tracking-widest border border-current px-2 py-0.5 rounded-full">
                                                            {w.type}
                                                        </span>
                                                    )}
                                                </div>
                                                {w.definitions && w.definitions.length > 0 && (
                                                    <p className="text-xl font-medium opacity-80 line-clamp-1 max-w-3xl">
                                                        {w.definitions[0]}
                                                    </p>
                                                )}
                                            </div>
                                            <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all self-center" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Load More */}
                        {paginatedWords.length < filtered.length && (
                            <div className="flex justify-center pt-20">
                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    className="px-12 py-4 bg-foreground text-background font-black text-xl uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
