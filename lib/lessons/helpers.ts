import { Lesson, LessonStep } from './types';

/** An info card step — context or a teaching note between vocabulary. */
export function info(description: string): LessonStep {
    return { type: 'info', description };
}

/** A single vocabulary card: a dictionary headword, its translation, and pronunciation. */
export function vocab(term: string, translation: string, pronunciation?: string): LessonStep {
    return { type: 'vocabulary', term, translation, ...(pronunciation ? { pronunciation } : {}) };
}

/** A full-sentence example, shown the same way as vocab() but not checked against the dictionary. */
export function phrase(term: string, translation: string, description?: string): LessonStep {
    return { type: 'phrase', term, translation, ...(description ? { description } : {}) };
}

/** Defines a lesson. `difficulty` defaults to 'beginner', the level every lesson uses today. */
export function lesson(config: Omit<Lesson, 'difficulty'> & { difficulty?: Lesson['difficulty'] }): Lesson {
    return { difficulty: 'beginner', ...config };
}
