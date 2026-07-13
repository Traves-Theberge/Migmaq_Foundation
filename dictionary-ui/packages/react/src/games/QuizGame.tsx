"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, X, Trophy, ArrowRight } from 'lucide-react';

export interface QuizQuestion {
    prompt: string;
    correctAnswer: string;
    /** All choices, including the correct one, already shuffled. */
    options: string[];
}

export interface QuizGameProps {
    questions: QuizQuestion[];
    onRestart?: () => void;
    confettiColors?: string[];
}

const DEFAULT_COLORS = ['#7c3aed', '#ef4444', '#f59e0b'];

/** A multiple-choice quiz: one question at a time, immediate right/wrong feedback, a score screen at the end. */
export default function QuizGame({ questions, onRestart, confettiColors = DEFAULT_COLORS }: QuizGameProps) {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [answered, setAnswered] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setCurrent(0);
        setScore(0);
        setSelected(null);
        setAnswered(false);
        setGameOver(false);
    }, [questions]);

    const handleAnswer = (answer: string) => {
        if (answered) return;
        setSelected(answer);
        setAnswered(true);
        if (answer === questions[current].correctAnswer) {
            setScore((s) => s + 1);
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 }, colors: confettiColors });
        }
    };

    const next = () => {
        if (current + 1 < questions.length) {
            setCurrent((c) => c + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            setGameOver(true);
        }
    };

    if (gameOver) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ maxWidth: '28rem', margin: '0 auto', textAlign: 'center', padding: '2rem' }}
            >
                <Trophy size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--dui-accent, #a8402c)' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem' }}>Quiz complete!</h2>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 2rem' }}>Score: {score} / {questions.length}</p>
                {onRestart && (
                    <button
                        onClick={onRestart}
                        style={{ width: '100%', padding: '1rem', background: 'var(--dui-accent, #a8402c)', color: 'var(--dui-accent-foreground, #fff)', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', border: 'none', borderRadius: 'var(--dui-radius, 0.5rem)', cursor: 'pointer' }}
                    >
                        Play Again
                    </button>
                )}
            </motion.div>
        );
    }

    const question = questions[current];
    if (!question) return null;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7, margin: 0 }}>
                    Question {current + 1} of {questions.length}
                </p>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{score} pts</p>
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', margin: '0 0 2rem' }}>
                {question.prompt}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', gap: '1rem' }}>
                {question.options.map((option, idx) => {
                    const isSelected = selected === option;
                    const isCorrect = option === question.correctAnswer;
                    const showResult = answered && (isSelected || isCorrect);

                    let background = 'var(--dui-bg, transparent)';
                    let color = 'var(--dui-fg, currentColor)';
                    let opacity = 1;
                    if (answered) {
                        if (isCorrect) { background = '#16a34a'; color = '#fff'; }
                        else if (isSelected) { background = '#dc2626'; color = '#fff'; }
                        else { opacity = 0.5; }
                    }

                    return (
                        <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                            onClick={() => handleAnswer(option)}
                            disabled={answered}
                            style={{
                                position: 'relative', padding: '1.5rem', fontSize: '1.1rem', fontWeight: 700, textAlign: 'left',
                                border: '2px solid var(--dui-border, currentColor)', borderRadius: 'var(--dui-radius, 0.5rem)',
                                background, color, opacity, cursor: answered ? 'default' : 'pointer', transition: 'all 0.15s ease',
                            }}
                        >
                            {option}
                            {showResult && (
                                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                                    {isCorrect ? <Check size={22} /> : <X size={22} />}
                                </span>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {answered && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <button
                            onClick={next}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 1.75rem',
                                background: 'var(--dui-fg, #000)', color: 'var(--dui-bg, #fff)', fontWeight: 800,
                                textTransform: 'uppercase', border: 'none', borderRadius: 'var(--dui-radius, 0.5rem)', cursor: 'pointer',
                            }}
                        >
                            Next <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
