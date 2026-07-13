"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy } from 'lucide-react';

export interface FlashcardPair {
    id: string;
    content: string;
    /** Which "side" this card is — purely a display label (e.g. "Word" / "English"). */
    side: string;
    /** Cards with the same matchId are a pair. */
    matchId: string;
}

export interface FlashcardGameProps {
    /** An even-length, already-shuffled array of cards (two per pair). Re-shuffle and pass a new array to restart. */
    pairs: FlashcardPair[];
    onRestart?: () => void;
    /** Colors used for the win-confetti burst. */
    confettiColors?: string[];
}

interface Card extends FlashcardPair {
    index: number;
    isFlipped: boolean;
    isMatched: boolean;
}

function fireConfetti(colors: string[]) {
    const duration = 3000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval = setInterval(() => {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }, colors });
        confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }, colors });
    }, 250);
}

const DEFAULT_COLORS = ['#7c3aed', '#ef4444', '#f59e0b'];

/**
 * A memory-match game: flip cards two at a time, matching pairs (e.g. a
 * word and its translation) clear from the board. You control the deck
 * entirely — shuffle your own `pairs` array and pass a fresh one (with a
 * changed `key` on this component, or bump some other prop) to restart.
 */
export default function FlashcardGame({ pairs, onRestart, confettiColors = DEFAULT_COLORS }: FlashcardGameProps) {
    const [cards, setCards] = useState<Card[]>(() => pairs.map((p, index) => ({ ...p, index, isFlipped: false, isMatched: false })));
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matches, setMatches] = useState(0);
    const [timer, setTimer] = useState(0);
    const [gameActive, setGameActive] = useState(true);

    useEffect(() => {
        setCards(pairs.map((p, index) => ({ ...p, index, isFlipped: false, isMatched: false })));
        setFlippedIndices([]);
        setMatches(0);
        setTimer(0);
        setGameActive(true);
        // Re-runs whenever the caller passes a new deck (identity change of `pairs`).
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pairs]);

    useEffect(() => {
        if (!gameActive) return;
        const interval = setInterval(() => setTimer((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, [gameActive]);

    const won = matches === cards.length / 2 && cards.length > 0;

    const handleCardClick = (index: number) => {
        if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length >= 2) return;

        const next = [...cards];
        next[index] = { ...next[index], isFlipped: true };
        setCards(next);

        const nextFlipped = [...flippedIndices, index];
        setFlippedIndices(nextFlipped);

        if (nextFlipped.length === 2) {
            const [a, b] = nextFlipped;
            if (next[a].matchId === next[b].matchId) {
                setTimeout(() => {
                    setCards((cur) => cur.map((c, i) => (i === a || i === b ? { ...c, isMatched: true } : c)));
                    setFlippedIndices([]);
                    setMatches((prev) => {
                        const m = prev + 1;
                        if (m === cards.length / 2) {
                            setGameActive(false);
                            fireConfetti(confettiColors);
                        }
                        return m;
                    });
                }, 500);
            } else {
                setTimeout(() => {
                    setCards((cur) => cur.map((c, i) => (i === a || i === b ? { ...c, isFlipped: false } : c)));
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>Score</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{matches} / {cards.length / 2}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>Time</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{formatTime(timer)}</div>
                    </div>
                </div>
                {onRestart && (
                    <button
                        onClick={onRestart}
                        aria-label="Restart"
                        style={{
                            padding: '0.6rem', border: '1.5px solid var(--dui-border, currentColor)',
                            background: 'var(--dui-bg, transparent)', color: 'var(--dui-fg, currentColor)',
                            borderRadius: 'var(--dui-radius, 0.5rem)', cursor: 'pointer', display: 'flex',
                        }}
                    >
                        <RefreshCw size={20} />
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 1fr))', gap: '1rem' }}>
                <AnimatePresence>
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.04 }}
                            onClick={() => handleCardClick(index)}
                            style={{ aspectRatio: '1', cursor: 'pointer', perspective: '1000px' }}
                        >
                            <motion.div
                                style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
                                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 'var(--dui-radius, 0.5rem)', border: '2px solid var(--dui-accent, #a8402c)',
                                    background: 'var(--dui-accent, #a8402c)', color: 'var(--dui-accent-foreground, #fff)',
                                    backfaceVisibility: 'hidden', fontWeight: 800, fontSize: '1.5rem',
                                }}>
                                    ?
                                </div>
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    justifyContent: 'center', padding: '0.5rem', textAlign: 'center',
                                    borderRadius: 'var(--dui-radius, 0.5rem)',
                                    border: `2px solid ${card.isMatched ? 'var(--dui-accent, #a8402c)' : 'var(--dui-border, currentColor)'}`,
                                    background: card.isMatched ? 'var(--dui-accent, #a8402c)' : 'var(--dui-bg, #fff)',
                                    color: card.isMatched ? 'var(--dui-accent-foreground, #fff)' : 'var(--dui-fg, #000)',
                                    backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                                }}>
                                    <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.7, margin: '0 0 0.3rem' }}>{card.side}</p>
                                    <p style={{ fontWeight: 700, margin: 0, wordBreak: 'break-word' }}>{card.content}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {won && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.7)' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                            style={{ background: 'var(--dui-bg, #fff)', color: 'var(--dui-fg, #000)', padding: '3rem', maxWidth: '28rem', width: '100%', textAlign: 'center', border: '2px solid var(--dui-border, currentColor)', borderRadius: 'var(--dui-radius, 0.5rem)' }}
                        >
                            <Trophy size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--dui-accent, #a8402c)' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem' }}>You matched them all!</h2>
                            <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 2rem' }}>Time: {formatTime(timer)}</p>
                            {onRestart && (
                                <button
                                    onClick={onRestart}
                                    style={{ width: '100%', padding: '1rem', background: 'var(--dui-accent, #a8402c)', color: 'var(--dui-accent-foreground, #fff)', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', border: 'none', borderRadius: 'var(--dui-radius, 0.5rem)', cursor: 'pointer' }}
                                >
                                    Play Again
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
