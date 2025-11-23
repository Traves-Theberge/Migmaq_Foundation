import { Lesson } from './types';

export const familyLessons: Lesson[] = [
    {
        id: 'immediate-family',
        title: 'Immediate Family',
        description: 'Parents and siblings',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Family is the foundation of Mi'gmaq society and culture."
            },
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
            },
            {
                type: 'info',
                description: "Family relationships are deeply valued and respected in Mi'gmaq culture."
            }
        ]
    },
    {
        id: 'grandparents',
        title: 'Grandparents',
        description: 'Grandmother and grandfather',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Elders hold wisdom and are greatly respected in Mi'gmaq communities."
            },
            {
                type: 'vocabulary',
                term: "nmi'",
                translation: "Grandmother / Granny",
                pronunciation: "n-mee"
            },
            {
                type: 'vocabulary',
                term: "nemijgami'",
                translation: "Grandfather / Grampa",
                pronunciation: "neh-mij-gah-mee"
            },
            {
                type: 'info',
                description: "Grandparents pass down stories, traditions, and language to younger generations."
            }
        ]
    }
];
