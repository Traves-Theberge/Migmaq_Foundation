import { Lesson } from './types';

export const basicsLessons: Lesson[] = [
    {
        id: 'basic-greetings',
        title: 'Basic Greetings',
        description: 'Hello and goodbye',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Greetings are the foundation of respectful communication in Mi'gmaq culture."
            },
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
            },
            {
                type: 'info',
                description: "Practice using these greetings when you meet someone or part ways!"
            }
        ]
    },
    {
        id: 'polite-phrases',
        title: 'Polite Phrases',
        description: 'Thank you, sorry, welcome',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Politeness and respect are core values in Mi'gmaq interactions."
            },
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
            },
            {
                type: 'info',
                description: "Using these phrases shows respect and builds strong relationships."
            }
        ]
    },
    {
        id: 'numbers-1-5',
        title: 'Numbers 1-5',
        description: 'Count from one to five',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Numbers are used in daily life, ceremonies, and traditional counting systems."
            },
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
            },
            {
                type: 'info',
                description: "Practice counting objects around you to reinforce these numbers!"
            }
        ]
    },
    {
        id: 'numbers-6-10',
        title: 'Numbers 6-10',
        description: 'Count from six to ten',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Continue building your counting skills with numbers six through ten."
            },
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
            },
            {
                type: 'info',
                description: "You can now count from newt to newtisga'q (one to ten)!"
            }
        ]
    },
    {
        id: 'time-of-day',
        title: 'Time of Day',
        description: 'Morning, midnight, and special days',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Understanding time helps you talk about daily activities and special occasions."
            },
            {
                type: 'vocabulary',
                term: "egsitpu'g",
                translation: "Morning",
                pronunciation: "eg-sit-poog"
            },
            {
                type: 'vocabulary',
                term: "aqtatpa'q",
                translation: "Midnight",
                pronunciation: "ahk-taht-pahk"
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
