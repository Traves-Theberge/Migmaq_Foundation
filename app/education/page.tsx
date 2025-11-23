"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, GraduationCap, ArrowRight, Star, BrainCircuit, Clock, Users, Trees, Hand, Apple, Package } from 'lucide-react';
import { lessonCategories, LessonCategory, Lesson } from '@/lib/lessons/index';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const iconMap: Record<string, any> = {
    BookOpen,
    Users,
    Trees,
    Squirrel: Star,
    Gamepad2,
    GraduationCap,
    Hand,
    Apple,
    Package
};

const difficultyColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500'
};

export default function EducationPage() {
    const [randomWord, setRandomWord] = useState<any>(null);

    useEffect(() => {
        fetch('/api/dictionary')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const random = data[Math.floor(Math.random() * data.length)];
                    setRandomWord(random);
                }
            });
    }, []);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 border-b-4 border-foreground pb-8">
                    <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter mb-4">
                        Education
                    </h1>
                    <p className="text-xl sm:text-2xl font-medium max-w-3xl leading-relaxed">
                        Fun ways to learn. <span className="text-secondary font-bold">Play games</span> and explore the language together!
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-12"
                >
                    {/* Learn a New Word */}
                    <motion.section variants={item} className="w-full">
                        <div className="relative bg-accent text-foreground p-6 sm:p-12 border-4 border-foreground overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                            <Star className="absolute top-8 right-8 w-16 h-16 sm:w-24 sm:h-24 text-white/20 animate-spin-slow" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-white text-accent border-2 border-foreground">
                                        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">Learn a New Word</h2>
                                </div>

                                {randomWord ? (
                                    <Link href={`/dictionary/${encodeURIComponent(randomWord.word)}`} className="block bg-white text-foreground p-6 sm:p-8 border-4 border-foreground hover:scale-[1.02] transition-transform cursor-pointer">
                                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                                            <h3 className="text-4xl sm:text-6xl font-black tracking-tighter">{randomWord.word}</h3>
                                            {randomWord.type && (
                                                <span className="px-4 py-2 bg-secondary text-white font-bold uppercase tracking-widest text-sm">
                                                    {randomWord.type}
                                                </span>
                                            )}
                                        </div>
                                        {randomWord.definitions && randomWord.definitions.length > 0 && (
                                            <p className="text-xl sm:text-2xl font-bold opacity-80 line-clamp-2">
                                                {randomWord.definitions[0]}
                                            </p>
                                        )}
                                        <div className="mt-6 flex items-center text-accent font-black uppercase tracking-wide">
                                            View Details <ArrowRight className="w-6 h-6 ml-2" />
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="bg-white text-foreground p-6 sm:p-8 border-4 border-foreground animate-pulse">
                                        <div className="h-12 bg-muted w-1/3 mb-4"></div>
                                        <div className="h-6 bg-muted w-2/3"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.section>

                    {/* Games Section */}
                    <motion.section variants={item}>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase mb-6 tracking-tighter">Games</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Memory Game */}
                            <Link
                                href="/games/flashcard"
                                className="block h-full bg-secondary text-white p-6 sm:p-10 border-4 border-foreground hover:-translate-y-2 transition-transform group"
                            >
                                <div className="flex justify-between items-start mb-8 sm:mb-12">
                                    <div className="p-3 bg-white text-secondary border-2 border-foreground">
                                        <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-black uppercase mb-4 tracking-tighter">Memory</h3>
                                <p className="text-base sm:text-lg font-medium opacity-90 leading-relaxed">
                                    Match words to their English translations.
                                </p>
                            </Link>

                            {/* Quiz Game */}
                            <Link
                                href="/games/quiz"
                                className="block h-full bg-primary text-white p-6 sm:p-10 border-4 border-foreground hover:-translate-y-2 transition-transform group"
                            >
                                <div className="flex justify-between items-start mb-8 sm:mb-12">
                                    <div className="p-3 bg-white text-primary border-2 border-foreground">
                                        <BrainCircuit className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-black uppercase mb-4 tracking-tighter">Quiz</h3>
                                <p className="text-base sm:text-lg font-medium opacity-90 leading-relaxed">
                                    Test your vocabulary with multiple choice questions.
                                </p>
                            </Link>
                        </div>
                    </motion.section>

                    {/* Lessons by Category */}
                    {lessonCategories.map((category: LessonCategory, categoryIndex: number) => {
                        const CategoryIcon = iconMap[category.icon] || BookOpen;

                        return (
                            <motion.section key={category.id} variants={item}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 ${category.color} text-foreground border-2 border-foreground`}>
                                        <CategoryIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">{category.title}</h2>
                                        <p className="text-lg text-muted-foreground font-medium">{category.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {category.lessons.map((lesson: Lesson) => (
                                        <Link
                                            key={lesson.id}
                                            href={`/education/lessons/${lesson.id}`}
                                            className="block bg-white border-4 border-foreground p-6 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <span className={`px-2 py-1 ${difficultyColors[lesson.difficulty as keyof typeof difficultyColors]} text-white text-xs font-bold uppercase tracking-wide`}>
                                                    {lesson.difficulty}
                                                </span>
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {lesson.estimatedMinutes}m
                                                </div>
                                            </div>

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
                                    ))}
                                </div>
                            </motion.section>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
