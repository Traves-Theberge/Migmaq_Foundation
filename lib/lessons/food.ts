import { Lesson } from './types';

export const foodLessons: Lesson[] = [
    {
        id: 'berries',
        title: 'Berries',
        description: 'Common berries',
        difficulty: 'beginner',
        estimatedMinutes: 2,
        steps: [
            {
                type: 'vocabulary',
                term: "atuomgomin",
                translation: "Strawberry",
                pronunciation: "ah-too-om-go-min"
            },
            {
                type: 'vocabulary',
                term: "ajioqjemin",
                translation: "Blackberry",
                pronunciation: "ah-jee-ok-jeh-min"
            },
            {
                type: 'vocabulary',
                term: "glitaw",
                translation: "Strawberry / Berry",
                pronunciation: "glee-taw"
            }
        ]
    }
];
