import { Lesson } from './types';

export const foodLessons: Lesson[] = [
    {
        id: 'berries',
        title: 'Berries',
        description: 'Common berries and fruits',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Berry picking is a traditional activity that connects Mi'gmaq people to the land and seasons."
            },
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
                term: "gmu'jmin",
                translation: "Raspberry",
                pronunciation: "gmoodge-min"
            },
            {
                type: 'vocabulary',
                term: "gawaqtejg",
                translation: "Gooseberry",
                pronunciation: "gah-wahk-tedge"
            }
        ]
    }
];
