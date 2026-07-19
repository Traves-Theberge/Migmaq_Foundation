import { LessonCategory } from './types';
import { basicsLessons } from './basics';
import { familyLessons } from './family';
import { natureLessons } from './nature';
import { animalsLessons } from './animals';
import { bodyLessons } from './body';
import { foodLessons } from './food';
import { objectsLessons } from './objects';
import { grammarLessons } from './grammar';

export * from './types';

export const lessonCategories: LessonCategory[] = [
    {
        id: 'basics',
        title: 'Basics',
        description: 'Essential words and phrases',
        icon: 'BookOpen',
        color: 'bg-primary',
        lessons: basicsLessons
    },
    {
        id: 'family',
        title: 'Family',
        description: 'Family members and relationships',
        icon: 'Users',
        color: 'bg-accent',
        lessons: familyLessons
    },
    {
        id: 'animals',
        title: 'Animals',
        description: 'Creatures and wildlife',
        icon: 'Squirrel',
        color: 'bg-secondary',
        lessons: animalsLessons
    },
    {
        id: 'nature',
        title: 'Nature',
        description: 'Natural world and elements',
        icon: 'Trees',
        color: 'bg-primary',
        lessons: natureLessons
    },
    {
        id: 'body',
        title: 'Body',
        description: 'Body parts',
        icon: 'Hand',
        color: 'bg-accent',
        lessons: bodyLessons
    },
    {
        id: 'food',
        title: 'Food',
        description: 'Foods and berries',
        icon: 'Apple',
        color: 'bg-secondary',
        lessons: foodLessons
    },
    {
        id: 'objects',
        title: 'Objects',
        description: 'Household items and tools',
        icon: 'Package',
        color: 'bg-primary',
        lessons: objectsLessons
    },
    {
        id: 'grammar',
        title: 'Words & Grammar',
        description: 'Pronouns, question words, and other building blocks',
        icon: 'Puzzle',
        color: 'bg-accent',
        lessons: grammarLessons
    }
];

// Helper function to get all lessons flattened
export const getAllLessons = () => {
    return lessonCategories.flatMap(category =>
        category.lessons.map(lesson => ({
            ...lesson,
            categoryId: category.id,
            categoryTitle: category.title
        }))
    );
};

// Helper function to find a lesson by ID
export const getLessonById = (id: string) => {
    for (const category of lessonCategories) {
        const lesson = category.lessons.find(l => l.id === id);
        if (lesson) {
            return {
                ...lesson,
                categoryId: category.id,
                categoryTitle: category.title
            };
        }
    }
    return null;
};
