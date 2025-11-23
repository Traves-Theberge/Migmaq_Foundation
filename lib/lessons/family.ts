import { Lesson } from './types';

export const familyLessons: Lesson[] = [
    {
        id: 'immediate-family',
        title: 'Immediate Family',
        description: 'Parents and siblings',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'vocabulary',
                term: "giju'",
                translation: "Mother / Mom",
                pronunciation: "gee-joo"
            },
            {
                type: 'vocabulary',
                term: "tata't",
                translation: "Father / Dad",
                pronunciation: "tah-taht"
            },
            {
                type: 'vocabulary',
                term: "uggwe'ji'jl",
                translation: "Younger sister",
                pronunciation: "oog-way-jee-jil"
            },
            {
                type: 'vocabulary',
                term: "ugjignaml",
                translation: "Younger brother",
                pronunciation: "oog-jig-naml"
            }
        ]
    },
    {
        id: 'grandparents',
        title: 'Grandparents',
        description: 'Grandmother and grandfather',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "nmi'",
                translation: "Grandmother",
                pronunciation: "n-mee"
            },
            {
                type: 'vocabulary',
                term: "nemijgami'",
                translation: "Grandfather",
                pronunciation: "neh-mij-gah-mee"
            }
        ]
    }
];
