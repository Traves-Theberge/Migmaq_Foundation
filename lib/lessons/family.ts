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
    },
    {
        id: 'extended-family',
        title: 'Extended Family',
        description: 'Aunts, uncles, cousins, and more',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Extended family plays an important role in Mi'gmaq communities, often living close together and sharing responsibilities."
            },
            {
                type: 'vocabulary',
                term: "ugsugwisl",
                translation: "Aunt",
                pronunciation: "uk-su-gwi-sel"
            },
            {
                type: 'vocabulary',
                term: "ugtlamugsisl",
                translation: "Uncle",
                pronunciation: "uk-te-la-muk-si-sel"
            },
            {
                type: 'vocabulary',
                term: "wo'gumal",
                translation: "Cousin / Relative",
                pronunciation: "woo-gu-mal"
            },
            {
                type: 'vocabulary',
                term: "ulugsl",
                translation: "Nephew",
                pronunciation: "u-lug-sl"
            },
            {
                type: 'vocabulary',
                term: "ugsml",
                translation: "Niece",
                pronunciation: "uk-se-mel"
            }
        ]
    },
    {
        id: 'marriage-and-children',
        title: 'Marriage & Children',
        description: 'Husband, wife, son, and daughter',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "These words describe the closest family bonds beyond parents and siblings."
            },
            {
                type: 'vocabulary',
                term: "uggwisl",
                translation: "Son",
                pronunciation: "uk-kwi-sel"
            },
            {
                type: 'vocabulary',
                term: "ugtusl",
                translation: "Daughter",
                pronunciation: "uk-tu-sel"
            },
            {
                type: 'vocabulary',
                term: "ugji'nmuml",
                translation: "Husband",
                pronunciation: "uk-chii-ne-mu-mel"
            },
            {
                type: 'vocabulary',
                term: "ugte'piteml",
                translation: "Wife",
                pronunciation: "uk-tee-bi-de-mel"
            }
        ]
    }
];
