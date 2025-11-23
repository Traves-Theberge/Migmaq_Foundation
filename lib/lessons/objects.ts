import { Lesson } from './types';

export const objectsLessons: Lesson[] = [
    {
        id: 'household',
        title: 'Household Items',
        description: 'Common objects and tools',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Traditional Mi'gmaq items reflect a deep connection to the land and craftsmanship."
            },
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
        description: 'Boats, snowshoes, and travel',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Mi'gmaq people developed ingenious ways to travel across land and water."
            },
            {
                type: 'vocabulary',
                term: "asoqomm'taqan",
                translation: "Ferry / Boat",
                pronunciation: "ah-so-kom-tah-kahn"
            },
            {
                type: 'vocabulary',
                term: "alaqami'g",
                translation: "Snowshoe",
                pronunciation: "ah-lah-kah-meeg"
            },
            {
                type: 'vocabulary',
                term: "aptu'n",
                translation: "Walking stick / Cane",
                pronunciation: "ahp-toon"
            }
        ]
    }
];
