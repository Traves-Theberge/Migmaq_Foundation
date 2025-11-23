import { Lesson } from './types';

export const natureLessons: Lesson[] = [
    {
        id: 'elements',
        title: 'Natural Elements',
        description: 'Water, wood, fire, and stone',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "The four elements are important in Mi'gmaq culture and spirituality."
            },
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
            },
            {
                type: 'vocabulary',
                term: "a'petna's'g",
                translation: "Wind / Whirlwind",
                pronunciation: "ah-pet-nahs-g"
            }
        ]
    },
    {
        id: 'weather',
        title: 'Weather',
        description: 'Cloud, winter, and seasons',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Understanding weather and seasons is essential for traditional Mi'gmaq life."
            },
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
            },
            {
                type: 'vocabulary',
                term: "aqtatpa'q",
                translation: "Midnight",
                pronunciation: "ahk-taht-pahk"
            }
        ]
    },
    {
        id: 'colors',
        title: 'Colors',
        description: 'Basic color words',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Colors play an important role in Mi'gmaq art and traditional designs."
            },
            {
                type: 'vocabulary',
                term: "wape'g",
                translation: "White",
                pronunciation: "wah-peg"
            },
            {
                type: 'info',
                description: "More color words will be added as you progress in your learning journey!"
            }
        ]
    }
];
