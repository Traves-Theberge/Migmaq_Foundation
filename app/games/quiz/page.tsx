"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n/LocaleProvider';

interface Question {
    word: string;
    correctAnswer: string;
    options: string[];
}

export default function QuizGame() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const t = useTranslations('quiz');
    const completeHeadingRef = useRef<HTMLHeadingElement>(null);

    const fetchQuestions = async () => {
        setLoading(true);
        setError(null);
        setGameOver(false);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);

        try {
            const res = await fetch('/api/games/quiz');
            if (!res.ok) throw new Error('Failed to fetch quiz questions');
            const data: Question[] = await res.json();
            if (!Array.isArray(data) || data.length === 0) throw new Error('No quiz questions available');
            setQuestions(data);
        } catch {
            setError(t('loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (gameOver) completeHeadingRef.current?.focus();
    }, [gameOver]);

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        setIsAnswered(true);

        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(s => s + 1);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#2563eb', '#ef4444', '#f59e0b']
            });
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setGameOver(true);
            if (score === questions.length) {
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
                const random = (min: number, max: number) => Math.random() * (max - min) + min;

                const interval: any = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) return clearInterval(interval);
                    const particleCount = 50 * (timeLeft / duration);
                    confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#2563eb', '#ef4444', '#f59e0b'] });
                    confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#2563eb', '#ef4444', '#f59e0b'] });
                }, 250);
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-4xl font-black uppercase tracking-tighter animate-pulse">
                {t('loading')}
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-center px-4">
            <p className="text-red-600 font-bold text-2xl">{t('errorPrefix')} {error}</p>
            <button
                type="button"
                onClick={fetchQuestions}
                className="px-8 py-3 bg-foreground text-background font-black uppercase tracking-wide hover:bg-primary transition-colors"
            >
                {t('retry')}
            </button>
        </div>
    );

    if (gameOver) return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg w-full bg-background border-4 border-foreground p-12 text-center hard-shadow"
            >
                <Trophy className="w-24 h-24 mx-auto mb-6 text-primary" aria-hidden="true" />
                <h1
                    ref={completeHeadingRef}
                    tabIndex={-1}
                    className="text-6xl font-black uppercase mb-4 tracking-tighter outline-none"
                >
                    {t('complete')}
                </h1>
                <p className="text-3xl font-bold mb-8">
                    {t('scoreLabel')} {score} / {questions.length}
                </p>
                <div className="space-y-4">
                    <button
                        type="button"
                        onClick={fetchQuestions}
                        className="w-full py-4 bg-primary text-white font-black text-xl uppercase tracking-wide hover:bg-blue-600 transition-colors border-2 border-foreground"
                    >
                        {t('playAgain')}
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.href = '/education'}
                        className="w-full py-4 bg-muted text-foreground font-black text-xl uppercase tracking-wide hover:bg-muted-foreground/20 transition-colors border-2 border-foreground"
                    >
                        {t('backToEducation')}
                    </button>
                </div>
            </motion.div>
        </div>
    );

    const question = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-background pt-32 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-16 border-b-4 border-foreground pb-8">
                    <div>
                        <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">
                            {t('title')}
                        </h1>
                        <p className="text-xl font-bold uppercase tracking-wide text-primary">
                            {t('question')} {currentQuestion + 1} {t('of')} {questions.length}
                        </p>
                    </div>
                    <div className="text-4xl font-black">
                        {score} {t('pts')}
                    </div>
                </div>

                {/* Question Card */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 text-center">
                        {t('whatIsMeaning')} <br />
                        <span className="text-primary inline-block mt-2">{question.word}</span>?
                    </h2>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {question.options.map((option, idx) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = option === question.correctAnswer;
                        const showResult = isAnswered && (isSelected || isCorrect);

                        let bgClass = "bg-background hover:bg-muted";
                        let borderClass = "border-foreground";

                        if (isAnswered) {
                            if (isCorrect) {
                                bgClass = "bg-green-500 text-white";
                                borderClass = "border-green-700";
                            } else if (isSelected && !isCorrect) {
                                bgClass = "bg-red-500 text-white";
                                borderClass = "border-red-700";
                            } else {
                                bgClass = "opacity-50";
                            }
                        }

                        return (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={cn(
                                    "p-8 text-xl font-bold uppercase tracking-wide border-4 text-left transition-all hard-shadow relative overflow-hidden",
                                    bgClass,
                                    borderClass
                                )}
                            >
                                {option}
                                {showResult && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {isCorrect ? <Check className="w-8 h-8" aria-hidden="true" /> : <X className="w-8 h-8" aria-hidden="true" />}
                                        <span className="sr-only">{isCorrect ? t('correctAnswer') : t('incorrectAnswer')}</span>
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <AnimatePresence>
                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 flex justify-end"
                        >
                            <button
                                type="button"
                                onClick={nextQuestion}
                                className="px-12 py-4 bg-foreground text-background font-black text-xl uppercase tracking-wide hover:bg-primary hover:text-white transition-colors flex items-center gap-4"
                            >
                                {t('nextQuestion')} <ArrowRight className="w-6 h-6" aria-hidden="true" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
