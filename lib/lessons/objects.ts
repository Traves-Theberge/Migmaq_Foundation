import { Lesson } from './types';

export const objectsLessons: Lesson[] = [
    {
        id: 'household',
        title: 'Household Items',
        description: 'Common objects',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "a'su'n",
                translation: "Blanket",
                pronunciation: "ah-soon"
            },
            {
                type: 'vocabulary',
                term: "awa'qi'gn",
                translation: "Crooked knife",
                pronunciation: "ah-wah-keen"
            }
        ]
    },
    {
        id: 'transportation',
        title: 'Transportation',
        description: 'Boats and travel',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "asoqomm'taqan",
                translation: "Ferry / Boat",
                pronunciation: "ah-so-kom-tah-kahn"
            }
        ]
    }
];
