export interface LessonStep {
    type: 'vocabulary' | 'phrase' | 'info';
    term?: string;
    translation?: string;
    pronunciation?: string;
    description?: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    steps: LessonStep[];
    estimatedMinutes: number;
}

export interface LessonCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    lessons: Lesson[];
}
