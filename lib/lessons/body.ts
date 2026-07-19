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
    },
    {
        id: 'body-parts',
        title: 'Body Parts',
        description: 'Hands, arms, and more',
        difficulty: 'beginner',
        estimatedMinutes: 5,
        steps: [
            {
                type: 'info',
                description: "Many Mi'gmaq body-part words already include a possessive prefix — ug- means \"his/her\" — because body parts are always thought of as belonging to someone."
            },
            {
                type: 'vocabulary',
                term: "ugpitn",
                translation: "Hand",
                pronunciation: "uk-pi-den"
            },
            {
                type: 'vocabulary',
                term: "ugpitnoqom",
                translation: "Arm",
                pronunciation: "uk-pi-de-nohk-om"
            },
            {
                type: 'vocabulary',
                term: "ugtluign",
                translation: "Finger",
                pronunciation: "uk-te-lu-i-gen"
            },
            {
                type: 'vocabulary',
                term: "unji",
                translation: "Head",
                pronunciation: "unn-ji"
            },
            {
                type: 'vocabulary',
                term: "ugs'tuaqan",
                translation: "Ear",
                pronunciation: "uk-se-du-a-hgan"
            },
            {
                type: 'vocabulary',
                term: "wipit",
                translation: "Tooth",
                pronunciation: "wi-bit"
            },
            {
                type: 'vocabulary',
                term: "usapun",
                translation: "Hair",
                pronunciation: "u-sa-bun"
            },
            {
                type: 'info',
                description: "Notice each word literally translates closer to \"his/her hand,\" \"his/her arm,\" and so on — the dictionary lists them this way because they're rarely said without an owner."
            }
        ]
    }
];
