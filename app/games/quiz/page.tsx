"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, RefreshCw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

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
    const [gameOver, setGameOver] = useState(false);

    const fetchQuestions = async () => {
        setLoading(true);
        setGameOver(false);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);

        try {
            const res = await fetch('/api/games/quiz');
            const data = await res.json();
            setQuestions(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

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
                Loading Quiz...
            </div>
        </div>
    );

    if (gameOver) return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg w-full bg-background border-4 border-foreground p-12 text-center hard-shadow"
            >
                <Trophy className="w-24 h-24 mx-auto mb-6 text-primary" />
                <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter">
                    Quiz Complete!
                </h1>
                <p className="text-3xl font-bold mb-8">
                    Score: {score} / {questions.length}
                </p>
                <div className="space-y-4">
                    <button
                        onClick={fetchQuestions}
                        className="w-full py-4 bg-primary text-white font-black text-xl uppercase tracking-wide hover:bg-blue-600 transition-colors border-2 border-foreground"
                    >
                        Play Again
                    </button>
                    <button
                        onClick={() => window.location.href = '/education'}
                        className="w-full py-4 bg-muted text-foreground font-black text-xl uppercase tracking-wide hover:bg-muted-foreground/20 transition-colors border-2 border-foreground"
                    >
                        Back to Education
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
                            Quiz Mode
                        </h1>
                        <p className="text-xl font-bold uppercase tracking-wide text-primary">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                    </div>
                    <div className="text-4xl font-black">
                        {score} pts
                    </div>
                </div>

                {/* Question Card */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 text-center">
                        What is the meaning of <br />
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
                                        {isCorrect ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
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
                                onClick={nextQuestion}
                                className="px-12 py-4 bg-foreground text-background font-black text-xl uppercase tracking-wide hover:bg-primary hover:text-white transition-colors flex items-center gap-4"
                            >
                                Next Question <ArrowRight className="w-6 h-6" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
