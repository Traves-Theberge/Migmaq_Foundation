import { Lesson } from './types';

export const basicsLessons: Lesson[] = [
    {
        id: 'basic-greetings',
        title: 'Basic Greetings',
        description: 'Hello and goodbye',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "pusu'l",
                translation: "Hello / Greetings",
                pronunciation: "poo-sool"
            },
            {
                type: 'vocabulary',
                term: "atiu",
                translation: "Goodbye",
                pronunciation: "ah-tee-oo"
            }
        ]
    },
    {
        id: 'polite-phrases',
        title: 'Polite Phrases',
        description: 'Thank you, sorry, welcome',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'vocabulary',
                term: "wela'lin",
                translation: "Thank you",
                pronunciation: "wel-ah-lin"
            },
            {
                type: 'vocabulary',
                term: "mesge'g",
                translation: "Sorry",
                pronunciation: "mes-geg"
            },
            {
                type: 'vocabulary',
                term: "pjila'si",
                translation: "Welcome / Come in",
                pronunciation: "pjee-lah-see"
            }
        ]
    },
    {
        id: 'numbers-1-5',
        title: 'Numbers 1-5',
        description: 'Count from one to five',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'vocabulary',
                term: "newt",
                translation: "One",
                pronunciation: "newt"
            },
            {
                type: 'vocabulary',
                term: "ta'pu",
                translation: "Two",
                pronunciation: "dah-boo"
            },
            {
                type: 'vocabulary',
                term: "si'st",
                translation: "Three",
                pronunciation: "seest"
            },
            {
                type: 'vocabulary',
                term: "ne'w",
                translation: "Four",
                pronunciation: "nay-oo"
            },
            {
                type: 'vocabulary',
                term: "na'n",
                translation: "Five",
                pronunciation: "nahn"
            }
        ]
    },
    {
        id: 'numbers-6-10',
        title: 'Numbers 6-10',
        description: 'Count from six to ten',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'vocabulary',
                term: "as'gom",
                translation: "Six",
                pronunciation: "ahs-gom"
            },
            {
                type: 'vocabulary',
                term: "lluigneg",
                translation: "Seven",
                pronunciation: "loo-ig-neg"
            },
            {
                type: 'vocabulary',
                term: "ugumuljin",
                translation: "Eight",
                pronunciation: "oo-goo-mool-jin"
            },
            {
                type: 'vocabulary',
                term: "pesgunateg",
                translation: "Nine",
                pronunciation: "pes-goo-nah-teg"
            },
            {
                type: 'vocabulary',
                term: "newtisga'q",
                translation: "Ten",
                pronunciation: "newt-is-gahk"
            }
        ]
    },
    {
        id: 'time-of-day',
        title: 'Time of Day',
        description: 'Morning, day, night',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "egsitpu'g",
                translation: "Morning",
                pronunciation: "eg-sit-poog"
            },
            {
                type: 'vocabulary',
                term: "aqantie'umg",
                translation: "Sunday / Holy day",
                pronunciation: "ah-kwan-tee-oomg"
            }
        ]
    }
];
