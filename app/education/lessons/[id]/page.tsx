"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { lessons } from '@/lib/lessons';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Volume2 } from 'lucide-react';
import Link from 'next/link';

export default function LessonPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const lesson = lessons.find(l => l.id === id);
    const [currentStep, setCurrentStep] = useState(0);

    if (!lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <h1 className="text-4xl font-black uppercase">Lesson Not Found</h1>
            </div>
        );
    }

    const step = lesson.steps[currentStep];
    const isLastStep = currentStep === lesson.steps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            router.push('/education');
        } else {
            setCurrentStep(c => c + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(c => c - 1);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <Link href="/education" className="flex items-center text-lg font-bold uppercase hover:text-primary transition-colors">
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Exit Lesson
                    </Link>
                    <div className="text-sm font-bold uppercase tracking-widest opacity-50">
                        Step {currentStep + 1} of {lesson.steps.length}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-4 bg-foreground/10 mb-12 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full ${lesson.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / lesson.steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Content Card */}
                <div className="flex-1 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full"
                        >
                            <div className="bg-white border-4 border-foreground p-8 sm:p-12 md:p-16 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                {step.type === 'info' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl sm:text-5xl font-black uppercase mb-8">{lesson.title}</h2>
                                        <p className="text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                                            {step.description}
                                        </p>
                                    </div>
                                )}

                                {(step.type === 'vocabulary' || step.type === 'phrase') && (
                                    <div className="space-y-8">
                                        <div className="inline-block px-4 py-2 bg-foreground text-background font-bold uppercase tracking-widest text-sm mb-4">
                                            {step.type}
                                        </div>

                                        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-primary mb-4">
                                            {step.term}
                                        </h2>

                                        {step.pronunciation && (
                                            <p className="text-xl text-muted-foreground font-mono mb-8">
                                                /{step.pronunciation}/
                                            </p>
                                        )}

                                        <div className="w-16 h-2 bg-foreground mx-auto rounded-full mb-8" />

                                        <p className="text-3xl sm:text-4xl font-bold uppercase">
                                            {step.translation}
                                        </p>

                                        {step.description && (
                                            <p className="text-lg sm:text-xl font-medium opacity-70 mt-6 max-w-xl mx-auto">
                                                {step.description}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="mt-12 flex justify-between items-center">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="px-8 py-4 font-bold uppercase tracking-wide disabled:opacity-30 hover:text-primary transition-colors"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleNext}
                        className={`px-12 py-4 ${lesson.color} text-foreground border-4 border-foreground font-black text-xl uppercase tracking-wide hover:brightness-110 transition-all flex items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none`}
                    >
                        {isLastStep ? 'Complete' : 'Next'}
                        {isLastStep ? <Check className="w-6 h-6 ml-2" /> : <ArrowRight className="w-6 h-6 ml-2" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
