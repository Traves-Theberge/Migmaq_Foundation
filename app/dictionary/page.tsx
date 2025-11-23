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
    const [searchMode, setSearchMode] = useState<'all' | 'word' | 'english'>('all');
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/dictionary')
            .then((res) => res.json())
            .then((data) => {
                setWords(data);
                setFiltered(data);
                setLoading(false);
            });
    }, []);

    // Extract unique starting letters
    const availableLetters = React.useMemo(() => {
        const letters = new Set<string>();
        words.forEach(w => {
            const firstChar = w.word.charAt(0).toUpperCase();
            // Group special characters or ensure they are handled
            letters.add(firstChar);
        });
        return Array.from(letters).sort();
    }, [words]);

    useEffect(() => {
        let results = words;

        // 1. Filter by Search Term
        if (searchTerm) {
            let keys = ['word', 'definitions'];
            if (searchMode === 'word') keys = ['word'];
            if (searchMode === 'english') keys = ['definitions'];

            const fuse = new Fuse(words, {
                keys,
                threshold: 0.3,
                isCaseSensitive: false,
                ignoreLocation: true,
            });
            results = fuse.search(searchTerm).map((r) => r.item);
        }

        // 2. Filter by Selected Letter (if any)
        if (selectedLetter) {
            results = results.filter(w => w.word.charAt(0).toUpperCase() === selectedLetter);
        }

        setFiltered(results);
        setPage(1);
    }, [searchTerm, words, searchMode, selectedLetter]);

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
                        The complete lexicon. <span className="text-accent font-bold">{words.length}</span> words archived.
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div className="mb-20 space-y-8">
                    {/* Search Bar & Mode */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search the archive..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setSelectedLetter(null); // Clear letter filter on search
                                }}
                                className="w-full bg-background border-4 border-foreground p-4 sm:p-8 text-xl sm:text-3xl font-bold normal-case placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                            />
                            <Search className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 text-foreground" />
                        </div>

                        {/* Search Mode Dropdown */}
                        <div className="relative md:w-64">
                            <select
                                value={searchMode}
                                onChange={(e) => setSearchMode(e.target.value as any)}
                                className="w-full h-full bg-background border-4 border-foreground p-4 sm:px-8 sm:py-8 text-xl font-bold uppercase focus:outline-none focus:border-accent appearance-none cursor-pointer"
                            >
                                <option value="all">All Fields</option>
                                <option value="word">Mi'gmaq</option>
                                <option value="english">English</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Alphabet Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setSelectedLetter(null)}
                            className={cn(
                                "px-4 py-2 font-bold border-2 border-foreground transition-all uppercase",
                                !selectedLetter ? "bg-foreground text-background" : "bg-background hover:bg-muted"
                            )}
                        >
                            All
                        </button>
                        {availableLetters.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => {
                                    setSelectedLetter(letter);
                                    setSearchTerm(''); // Clear search term when picking a letter
                                }}
                                className={cn(
                                    "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold border-2 border-foreground transition-all text-lg sm:text-xl",
                                    selectedLetter === letter
                                        ? "bg-accent text-foreground border-accent scale-110"
                                        : "bg-background hover:bg-accent/20"
                                )}
                            >
                                {letter}
                            </button>
                        ))}
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
                                        className="group block border-b-2 border-foreground py-8 hover:bg-muted transition-colors px-4 -mx-4"
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
                                                {/* Translations */}
                                                {w.translations && w.translations.length > 0 && (
                                                    <div className="mb-2 flex flex-wrap gap-2">
                                                        {w.translations.map((t, i) => (
                                                            <span key={i} className="text-lg font-bold text-accent">
                                                                {t}{i < w.translations!.length - 1 ? ',' : ''}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Definitions */}
                                                {w.definitions && w.definitions.length > 0 && (
                                                    <div className="space-y-1">
                                                        {w.definitions.map((def, i) => (
                                                            <p key={i} className="text-lg font-medium opacity-80">
                                                                {def}
                                                            </p>
                                                        ))}
                                                    </div>
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
                                    className="px-12 py-4 bg-foreground text-background font-black text-xl uppercase tracking-wide hover:bg-accent hover:text-foreground transition-colors"
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
