import { Lesson } from './types';

export const natureLessons: Lesson[] = [
    {
        id: 'elements',
        title: 'Natural Elements',
        description: 'Water and wood',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "samqwan",
                translation: "Water",
                pronunciation: "sahm-kwahn"
            },
            {
                type: 'vocabulary',
                term: "gmu'j",
                translation: "Wood / Stick",
                pronunciation: "gmoodge"
            }
        ]
    },
    {
        id: 'weather',
        title: 'Weather',
        description: 'Cloud and seasons',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "alug",
                translation: "Cloud",
                pronunciation: "ah-loog"
            },
            {
                type: 'vocabulary',
                term: "gesig",
                translation: "Winter",
                pronunciation: "geh-sig"
            }
        ]
    },
    {
        id: 'colors',
        title: 'Colors',
        description: 'Basic color words',
        difficulty: 'beginner',
        estimatedMinutes: 1,
        steps: [
            {
                type: 'vocabulary',
                term: "wape'g",
                translation: "White",
                pronunciation: "wah-peg"
            }
        ]
    }
];
