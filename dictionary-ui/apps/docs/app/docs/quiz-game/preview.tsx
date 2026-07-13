"use client";

import { useState, useCallback } from 'react';
import { QuizGame, type QuizQuestion } from '@dictionary-ui/react';

const QUESTIONS: QuizQuestion[] = [
    { prompt: "What does mui'n mean?", correctAnswer: 'bear', options: ['bear', 'rabbit', 'salmon', 'owl'] },
    { prompt: "What does apli'gmuj mean?", correctAnswer: 'rabbit', options: ['moose', 'rabbit', 'deer', 'star'] },
    { prompt: 'What does plamu mean?', correctAnswer: 'salmon', options: ['cloud', 'moon', 'salmon', 'bird'] },
];

export default function QuizGamePreview() {
    const [key, setKey] = useState(0);
    const restart = useCallback(() => setKey((k) => k + 1), []);
    return <QuizGame key={key} questions={QUESTIONS} onRestart={restart} />;
}
