"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy, Timer, Sparkles, Hexagon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface GameCardData {
    id: string;
    content: string;
    type: 'word' | 'translation';
    matchId: string;
}

interface Card extends GameCardData {
    index: number;
    isFlipped: boolean;
    isMatched: boolean;
}

export default function FlashcardGame() {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matches, setMatches] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);
    const [gameActive, setGameActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameActive) {
            interval = setInterval(() => setTimer((t) => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameActive]);

    const fetchGameData = async () => {
        try {
            setLoading(true);
            setError(null);
            setGameActive(false);
            setTimer(0);

            const res = await fetch('/api/games/flashcard');
            if (!res.ok) throw new Error('Failed to fetch game data');
            const data: GameCardData[] = await res.json();

            const initialCards = data.map((item, index) => ({
                ...item,
                index,
                isFlipped: false,
                isMatched: false,
            }));

            setCards(initialCards);
            setMatches(0);
            setFlippedIndices([]);
            setGameActive(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameData();
    }, []);

    const handleCardClick = (index: number) => {
        if (
            cards[index].isFlipped ||
            cards[index].isMatched ||
            flippedIndices.length >= 2
        ) {
            return;
        }

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlippedIndices = [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

        if (newFlippedIndices.length === 2) {
            const [firstIndex, secondIndex] = newFlippedIndices;
            const firstCard = newCards[firstIndex];
            const secondCard = newCards[secondIndex];

            if (firstCard.matchId === secondCard.matchId) {
                setTimeout(() => {
                    const matchedCards = [...newCards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;
                    setCards(matchedCards);
                    setFlippedIndices([]);
                    setMatches((prev) => {
                        const newMatches = prev + 1;
                        if (newMatches === cards.length / 2) {
                            setGameActive(false);
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
                        return newMatches;
                    });
                }, 500);
            } else {
                setTimeout(() => {
                    const resetCards = [...newCards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;
                    setCards(resetCards);
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-4xl font-black uppercase tracking-tighter animate-pulse">
                Shuffling Deck...
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-background text-red-600 font-bold text-2xl">
            Error: {error}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-background pt-24">
            <div className="flex-1 max-w-6xl mx-auto flex flex-col">
                {/* HUD */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-4 md:mb-8 border-b-4 border-foreground pb-4 md:pb-8">
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-2">
                            Memory
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide text-secondary">
                            Match the pairs
                        </p>
                    </div>

                    <div className="flex gap-4 sm:gap-6 md:gap-8 mt-4 md:mt-0">
                        <div className="text-right">
                            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">Score</div>
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black">{matches} / {cards.length / 2}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">Time</div>
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black tabular-nums">{formatTime(timer)}</div>
                        </div>
                        <button
                            onClick={fetchGameData}
                            className="p-3 md:p-4 bg-foreground text-background hover:bg-primary hover:text-white transition-colors"
                        >
                            <RefreshCw className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                    </div>
                </div>

                {/* Grid Container - fits within viewport */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        <AnimatePresence>
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleCardClick(index)}
                                    className="aspect-square cursor-pointer w-full"
                                    style={{ perspective: '1000px' }}
                                >
                                    <motion.div
                                        className="w-full h-full relative"
                                        style={{ transformStyle: 'preserve-3d' }}
                                        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {/* Front (Hidden) */}
                                        <div
                                            className="absolute inset-0 bg-accent flex items-center justify-center border-2 sm:border-4 border-accent rounded-sm sm:rounded-none"
                                            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                                        >
                                            <img
                                                src="/assets/Images/fn_logo.png"
                                                alt="Mi'gmaq Foundation"
                                                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                                            />
                                        </div>

                                        {/* Back (Visible) */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 bg-white border-2 sm:border-4 border-foreground flex flex-col items-center justify-center p-2 sm:p-4 text-center rounded-sm sm:rounded-none text-black",
                                                card.isMatched ? "bg-primary text-white border-primary" : ""
                                            )}
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)'
                                            }}
                                        >
                                            <p className={cn(
                                                "font-black uppercase mb-2 sm:mb-3",
                                                card.type === 'word' ? "text-base sm:text-xl md:text-2xl" : "text-sm sm:text-lg md:text-xl",
                                                card.isMatched ? "text-white" : card.type === 'translation' ? "text-gray-600" : "text-black"
                                            )}>
                                                {card.type === 'word' ? "Mi'gmaq" : "English"}
                                            </p>
                                            <p className={cn(
                                                "text-base sm:text-xl md:text-2xl font-bold leading-tight break-words w-full",
                                                card.isMatched ? "text-white" : "text-black"
                                            )}>
                                                {card.content}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Victory Modal */}
                <AnimatePresence>
                    {matches === cards.length / 2 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/90"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-background p-12 max-w-lg w-full text-center border-4 border-white hard-shadow shadow-white"
                            >
                                <Trophy className="w-20 h-20 mx-auto mb-6 text-accent" />
                                <h2 className="text-6xl font-black uppercase mb-4 tracking-tighter">
                                    Victory!
                                </h2>
                                <p className="text-2xl font-bold mb-8">
                                    Time: {formatTime(timer)}
                                </p>
                                <div className="space-y-4">
                                    <button
                                        onClick={fetchGameData}
                                        className="w-full py-4 bg-accent text-foreground font-black text-xl uppercase tracking-wide hover:bg-accent/80 transition-colors border-2 border-foreground"
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
