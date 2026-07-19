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
    },
    {
        id: 'clothing',
        title: 'Clothing',
        description: 'Shirts, shoes, and moccasins',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Traditional Mi'gmaq clothing was often made from hide and decorated with quillwork and beadwork."
            },
            {
                type: 'vocabulary',
                term: "atlai",
                translation: "Shirt",
                pronunciation: "a-de-laay"
            },
            {
                type: 'vocabulary',
                term: "pita'qawe'l",
                translation: "Pants / Trousers",
                pronunciation: "bi-daa-hga-weel"
            },
            {
                type: 'vocabulary',
                term: "mg'sn",
                translation: "Shoe",
                pronunciation: "em-ke-sen"
            },
            {
                type: 'vocabulary',
                term: "ma'gn",
                translation: "Moccasin",
                pronunciation: "maa-gen"
            },
            {
                type: 'vocabulary',
                term: "a'gwesn",
                translation: "Hat",
                pronunciation: "aa-gwe-sen"
            }
        ]
    }
];
