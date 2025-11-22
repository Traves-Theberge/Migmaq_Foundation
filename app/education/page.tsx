"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, GraduationCap, ArrowRight, Lock, Star, BrainCircuit } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
};

export default function EducationPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 border-b-4 border-foreground pb-8">
                    <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter mb-4">
                        Education
                    </h1>
                    <p className="text-xl sm:text-2xl font-medium max-w-3xl leading-relaxed">
                        Fun ways to learn. <span className="text-primary font-bold">Play games</span> and explore the language together!
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                    {/* Word of the Day */}
                    <motion.section variants={item} className="col-span-1 md:col-span-2 lg:col-span-3">
                        <div className="relative bg-primary text-white p-6 sm:p-12 border-4 border-foreground overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                            <Star className="absolute top-8 right-8 w-16 h-16 sm:w-24 sm:h-24 text-white/20 animate-spin-slow" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-white text-primary border-2 border-foreground">
                                        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">Word of the Day</h2>
                                </div>

                                <div className="bg-white text-foreground p-6 sm:p-8 border-4 border-foreground">
                                    <p className="text-xl sm:text-2xl font-bold text-center uppercase tracking-widest opacity-50">
                                        Coming Soon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Flashcards */}
                    <motion.section variants={item}>
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
                            <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4 tracking-tighter">Memory</h2>
                            <p className="text-base sm:text-lg font-medium opacity-90 leading-relaxed">
                                Match words to their English translations.
                            </p>
                        </Link>
                    </motion.section>

                    {/* Quiz */}
                    <motion.section variants={item}>
                        <Link
                            href="/games/quiz"
                            className="block h-full bg-accent text-foreground p-6 sm:p-10 border-4 border-foreground hover:-translate-y-2 transition-transform group"
                        >
                            <div className="flex justify-between items-start mb-8 sm:mb-12">
                                <div className="p-3 bg-white text-accent border-2 border-foreground">
                                    <BrainCircuit className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4 tracking-tighter">Quiz</h2>
                            <p className="text-base sm:text-lg font-medium opacity-90 leading-relaxed">
                                Test your vocabulary with multiple choice questions.
                            </p>
                        </Link>
                    </motion.section>

                    {/* Lessons (Locked) */}
                    <motion.section variants={item}>
                        <div className="h-full bg-muted text-foreground p-6 sm:p-10 border-4 border-foreground">
                            <div className="flex justify-between items-start mb-8 sm:mb-12">
                                <div className="p-3 bg-white text-muted-foreground border-2 border-foreground">
                                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black uppercase mb-6 tracking-tighter">Lessons</h2>

                            <div className="space-y-4">
                                {['Greetings', 'Numbers', 'Family'].map((lesson, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white border-2 border-foreground opacity-60">
                                        <span className="font-bold uppercase tracking-wide text-sm sm:text-base">{lesson}</span>
                                        <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                </motion.div>
            </div>
        </div>
    );
}
