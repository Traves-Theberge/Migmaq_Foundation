import { Lesson } from './types';

export const natureLessons: Lesson[] = [
    {
        id: 'elements',
        title: 'Natural Elements',
        description: 'Water, wood, fire, and stone',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "The four elements are important in Mi'gmaq culture and spirituality."
            },
            {
                type: 'vocabulary',
                term: "samqwan",
                translation: "Water",
                pronunciation: "sahm-kwahn"
            },
            {
                type: 'vocabulary',
                term: "gmu'j",
                translation: "Wood / Stick",
                pronunciation: "gmoodge"
            },
            {
                type: 'vocabulary',
                term: "a'petna's'g",
                translation: "Wind / Whirlwind",
                pronunciation: "ah-pet-nahs-g"
            }
        ]
    },
    {
        id: 'weather',
        title: 'Weather',
        description: 'Cloud, winter, and seasons',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Understanding weather and seasons is essential for traditional Mi'gmaq life."
            },
            {
                type: 'vocabulary',
                term: "alug",
                translation: "Cloud",
                pronunciation: "ah-loog"
            },
            {
                type: 'vocabulary',
                term: "gesig",
                translation: "Winter",
                pronunciation: "geh-sig"
            },
            {
                type: 'vocabulary',
                term: "aqtatpa'q",
                translation: "Midnight",
                pronunciation: "ahk-taht-pahk"
            }
        ]
    },
    {
        id: 'colors',
        title: 'Colors',
        description: 'Basic color words',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Colors play an important role in Mi'gmaq art and traditional designs."
            },
            {
                type: 'vocabulary',
                term: "wape'g",
                translation: "White",
                pronunciation: "wah-peg"
            },
            {
                type: 'info',
                description: "More color words will be added as you progress in your learning journey!"
            }
        ]
    },
    {
        id: 'landscape',
        title: 'Landscape',
        description: 'Rivers, mountains, and forests',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Mi'gma'ki, the traditional Mi'gmaq territory, spans rivers, coastlines, forests, and mountains across Atlantic Canada."
            },
            {
                type: 'vocabulary',
                term: "sipu",
                translation: "River",
                pronunciation: "si-bu"
            },
            {
                type: 'vocabulary',
                term: "qospem",
                translation: "Lake",
                pronunciation: "hgos-pem"
            },
            {
                type: 'vocabulary',
                term: "gta'n",
                translation: "Ocean",
                pronunciation: "ek-taan"
            },
            {
                type: 'vocabulary',
                term: "gmtn",
                translation: "Mountain",
                pronunciation: "gem-den"
            },
            {
                type: 'vocabulary',
                term: "menigu",
                translation: "Island",
                pronunciation: "me-ni-gu"
            },
            {
                type: 'vocabulary',
                term: "nipugt",
                translation: "Forest / Woods",
                pronunciation: "ni-bukt"
            }
        ]
    },
    {
        id: 'sky-and-space',
        title: 'Sky & Space',
        description: 'Sun, moon, and stars',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "The sun, moon, and stars have long guided timekeeping, travel, and storytelling in Mi'gmaq culture."
            },
            {
                type: 'vocabulary',
                term: "na'gu'set",
                translation: "Sun",
                pronunciation: "naa-guu-zet"
            },
            {
                type: 'vocabulary',
                term: "tepgunset",
                translation: "Moon / Month",
                pronunciation: "dep-kun-zet"
            },
            {
                type: 'vocabulary',
                term: "gloqowej",
                translation: "Star",
                pronunciation: "ge-lo-hgo-wech"
            },
            {
                type: 'vocabulary',
                term: "musgun",
                translation: "Sky / Atmosphere",
                pronunciation: "mus-kun"
            }
        ]
    },
    {
        id: 'seasons',
        title: 'Seasons',
        description: 'Spring, summer, and fall',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "You already learned gesig (winter) in the Weather lesson — here are the other three seasons."
            },
            {
                type: 'vocabulary',
                term: "siggw",
                translation: "Spring",
                pronunciation: "sikkw"
            },
            {
                type: 'vocabulary',
                term: "nipg",
                translation: "Summer",
                pronunciation: "nipk"
            },
            {
                type: 'vocabulary',
                term: "toqwa'q",
                translation: "Fall / Autumn",
                pronunciation: "dohk-waahk"
            }
        ]
    }
];
