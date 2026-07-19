"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, Search, Clock,
    BookOpen, Users, Trees, Star, Hand, Apple, Package, Puzzle, Zap, Feather, type LucideIcon,
} from 'lucide-react';
import { lessonCategories, getAllLessons } from '@/lib/lessons/index';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    Users,
    Trees,
    Squirrel: Star,
    Hand,
    Apple,
    Package,
    Puzzle,
    Zap,
    Feather,
};

const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500',
};

const allLessons = getAllLessons();

export default function LessonsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    const fuse = useMemo(() => new Fuse(allLessons, {
        keys: ['title', 'description', 'steps.term', 'steps.translation'],
        threshold: 0.3,
        ignoreLocation: true,
    }), []);

    const filtered = useMemo(() => {
        let results = searchTerm ? fuse.search(searchTerm).map((r) => r.item) : allLessons;
        if (selectedCategory) results = results.filter((l) => l.categoryId === selectedCategory);
        if (selectedDifficulty) results = results.filter((l) => l.difficulty === selectedDifficulty);
        return results;
    }, [searchTerm, selectedCategory, selectedDifficulty, fuse]);

    return (
        <div className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link
                    href="/education"
                    className="inline-flex items-center text-lg font-bold uppercase tracking-wide hover:text-primary transition-colors group mb-8"
                >
                    <ArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-2 transition-transform" />
                    Back to Education
                </Link>

                <div className="mb-12 border-b-4 border-foreground pb-8">
                    <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter mb-4">
                        Lessons
                    </h1>
                    <p className="text-xl sm:text-2xl font-medium max-w-2xl">
                        <span className="text-primary font-bold">{allLessons.length}</span> guided lessons across{' '}
                        <span className="text-primary font-bold">{lessonCategories.length}</span> topics.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-12 space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search lessons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background border-4 border-foreground p-4 sm:p-6 text-lg sm:text-2xl font-bold normal-case placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        />
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "px-4 py-2 font-bold border-2 border-foreground transition-all uppercase text-sm",
                                !selectedCategory ? "bg-foreground text-background" : "bg-background hover:bg-muted"
                            )}
                        >
                            All Topics
                        </button>
                        {lessonCategories.map((category) => {
                            const CategoryIcon = iconMap[category.icon] || BookOpen;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory((c) => (c === category.id ? null : category.id))}
                                    className={cn(
                                        "inline-flex items-center gap-2 px-4 py-2 font-bold border-2 border-foreground transition-all uppercase text-sm",
                                        selectedCategory === category.id ? "bg-primary text-white" : "bg-background hover:bg-muted"
                                    )}
                                >
                                    <CategoryIcon className="w-4 h-4" />
                                    {category.title}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
                            <button
                                key={difficulty}
                                onClick={() => setSelectedDifficulty((d) => (d === difficulty ? null : difficulty))}
                                className={cn(
                                    "px-3 py-1.5 font-bold border-2 border-foreground transition-all uppercase text-xs",
                                    selectedDifficulty === difficulty
                                        ? `${difficultyColors[difficulty]} text-white border-transparent`
                                        : "bg-background hover:bg-muted"
                                )}
                            >
                                {difficulty}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                {filtered.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-2xl font-bold text-muted-foreground">No lessons match your search.</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((lesson) => (
                                <motion.div
                                    key={lesson.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Link
                                        href={`/education/lessons/${lesson.id}`}
                                        className="block h-full bg-white border-4 border-foreground p-6 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span className={`px-2 py-1 ${difficultyColors[lesson.difficulty]} text-white text-xs font-bold uppercase tracking-wide`}>
                                                {lesson.difficulty}
                                            </span>
                                            <div className="flex items-center text-muted-foreground text-sm">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {lesson.estimatedMinutes}m
                                            </div>
                                        </div>

                                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                                            {lesson.categoryTitle}
                                        </p>

                                        <h3 className="text-xl font-black uppercase mb-2 tracking-tight group-hover:text-primary transition-colors">
                                            {lesson.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground font-medium mb-4 line-clamp-2">
                                            {lesson.description}
                                        </p>

                                        <div className="flex items-center justify-between text-sm font-bold">
                                            <span className="text-muted-foreground">{lesson.steps.length} steps</span>
                                            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
