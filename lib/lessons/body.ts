import { Lesson } from './types';

export const bodyLessons: Lesson[] = [
    {
        id: 'face',
        title: 'Face',
        description: 'Parts of the face',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Learning body parts helps you describe yourself and others."
            },
            {
                type: 'vocabulary',
                term: "ugsisgw",
                translation: "Face",
                pronunciation: "oog-sisgw"
            },
            {
                type: 'vocabulary',
                term: "lamipgigwan",
                translation: "Eyeball / Eye",
                pronunciation: "lah-mip-gig-wahn"
            },
            {
                type: 'vocabulary',
                term: "alpatl",
                translation: "Mouth / Gums",
                pronunciation: "ahl-pahtl"
            },
            {
                type: 'info',
                description: "These words are useful for describing people and expressing yourself."
            }
        ]
    }
];
