import { Lesson } from './types';

export const cultureLessons: Lesson[] = [
    {
        id: 'traditional-items',
        title: 'Traditional Items',
        description: 'Canoe, basket, fire, and more',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "These items have played a central role in Mi'gmaq life for generations — from travel and craft to medicine and ceremony."
            },
            {
                type: 'vocabulary',
                term: "gwitn",
                translation: "Canoe",
                pronunciation: "gwi-den"
            },
            {
                type: 'vocabulary',
                term: "ligpenign",
                translation: "Basket",
                pronunciation: "lik-pe-ni-gen"
            },
            {
                type: 'vocabulary',
                term: "pugtew",
                translation: "Fire",
                pronunciation: "buk-tew"
            },
            {
                type: 'vocabulary',
                term: "npisun",
                translation: "Medicine",
                pronunciation: "en-pi-sun"
            },
            {
                type: 'vocabulary',
                term: "pi'gun",
                translation: "Feather",
                pronunciation: "bii-gun"
            },
            {
                type: 'info',
                description: "Ash splint baskets, birchbark canoes, and traditional medicines are still practiced crafts in many Mi'gmaq communities today."
            }
        ]
    }
];
