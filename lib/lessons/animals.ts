import { Lesson } from './types';

export const animalsLessons: Lesson[] = [
    {
        id: 'land-animals',
        title: 'Land Animals',
        description: 'Moose and rabbit',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "tia'm",
                translation: "Moose",
                pronunciation: "tee-ahm"
            },
            {
                type: 'vocabulary',
                term: "apli'gmuj",
                translation: "Rabbit / Hare",
                pronunciation: "ah-plee-gmoodge"
            }
        ]
    },
    {
        id: 'water-animals',
        title: 'Water Animals',
        description: 'Fish and sea creatures',
        difficulty: 'beginner',
        estimatedMinutes: 1,
        steps: [
            {
                type: 'vocabulary',
                term: "plamu",
                translation: "Salmon",
                pronunciation: "plah-moo"
            }
        ]
    },
    {
        id: 'birds',
        title: 'Birds',
        description: 'Eagle, crow, and duck',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'vocabulary',
                term: "gitpu",
                translation: "Eagle",
                pronunciation: "git-poo"
            },
            {
                type: 'vocabulary',
                term: "ga'qaquj",
                translation: "Crow",
                pronunciation: "gah-kah-koodge"
            },
            {
                type: 'vocabulary',
                term: "apji'jgmuj",
                translation: "Black duck",
                pronunciation: "ah-pjee-jig-moodge"
            }
        ]
    }
];
