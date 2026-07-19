import { Lesson } from './types';

export const actionsLessons: Lesson[] = [
    {
        id: 'everyday-actions',
        title: 'Everyday Actions',
        description: 'Eat, sleep, speak, and work',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Verbs are at the heart of Mi'gmaq — these everyday actions are a great place to start."
            },
            {
                type: 'vocabulary',
                term: "etlatalg",
                translation: "Eat",
                pronunciation: "e-de-la-dalk"
            },
            {
                type: 'vocabulary',
                term: "nepat",
                translation: "Sleep / Asleep",
                pronunciation: "ne-bat"
            },
            {
                type: 'vocabulary',
                term: "gelusit",
                translation: "Speak / Talk",
                pronunciation: "ge-lu-sit"
            },
            {
                type: 'vocabulary',
                term: "elugwet",
                translation: "Work",
                pronunciation: "e-lu-gwet"
            },
            {
                type: 'vocabulary',
                term: "nemiatl",
                translation: "See",
                pronunciation: "ne-mi-a-del"
            },
            {
                type: 'vocabulary',
                term: "nutg",
                translation: "Hear",
                pronunciation: "nutk"
            }
        ]
    },
    {
        id: 'movement-and-play',
        title: 'Movement & Play',
        description: 'Walk, run, dance, and sing',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Movement, music, and play are part of everyday life and celebration in Mi'gmaq communities."
            },
            {
                type: 'vocabulary',
                term: "uggwata'q",
                translation: "Walk",
                pronunciation: "uk-kwa-daahk"
            },
            {
                type: 'vocabulary',
                term: "getgwi'g",
                translation: "Run",
                pronunciation: "get-kwiig"
            },
            {
                type: 'vocabulary',
                term: "tegismit",
                translation: "Swim",
                pronunciation: "de-gi-se-mit"
            },
            {
                type: 'vocabulary',
                term: "amalgat",
                translation: "Dance",
                pronunciation: "a-mal-kat"
            },
            {
                type: 'vocabulary',
                term: "etlintoq",
                translation: "Sing",
                pronunciation: "e-de-lin-tohk"
            },
            {
                type: 'vocabulary',
                term: "mila'sit",
                translation: "Play",
                pronunciation: "mi-laa-sit"
            }
        ]
    }
];
