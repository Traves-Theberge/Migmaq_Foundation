import { Lesson } from './types';

export const animalsLessons: Lesson[] = [
    {
        id: 'land-animals',
        title: 'Land Animals',
        description: 'Moose, rabbit, and more',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Animals are central to Mi'gmaq stories and teachings."
            },
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
            },
            {
                type: 'vocabulary',
                term: "apalqaqamej",
                translation: "Chipmunk / Ground squirrel",
                pronunciation: "ah-pahl-kah-kah-medge"
            }
        ]
    },
    {
        id: 'water-animals',
        title: 'Water Animals',
        description: 'Fish and sea creatures',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Fishing has always been vital to Mi'gmaq communities."
            },
            {
                type: 'vocabulary',
                term: "plamu",
                translation: "Salmon",
                pronunciation: "plah-moo"
            },
            {
                type: 'vocabulary',
                term: "atoqwa'su",
                translation: "Trout",
                pronunciation: "ah-tok-wah-soo"
            }
        ]
    },
    {
        id: 'birds',
        title: 'Birds',
        description: 'Eagle, crow, and duck',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Birds hold special significance in Mi'gmaq culture and spirituality."
            },
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
