import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const natureLessons: Lesson[] = [
    lesson({
        id: "elements",
        title: "Natural Elements",
        description: "Water, wood, fire, and stone",
        estimatedMinutes: 4,
        steps: [
            info("The four elements are important in Mi'gmaq culture and spirituality."),
            vocab("samqwan", "Water", "sahm-kwahn"),
            vocab("gmu'j", "Wood / Stick", "gmoodge"),
            vocab("a'petna's'g", "Wind / Whirlwind", "ah-pet-nahs-g"),
        ]
    }),
    lesson({
        id: "weather",
        title: "Weather",
        description: "Cloud, winter, and seasons",
        estimatedMinutes: 4,
        steps: [
            info("Understanding weather and seasons is essential for traditional Mi'gmaq life."),
            vocab("alug", "Cloud", "ah-loog"),
            vocab("gesig", "Winter", "geh-sig"),
            vocab("aqtatpa'q", "Midnight", "ahk-taht-pahk"),
        ]
    }),
    lesson({
        id: "colors",
        title: "Colors",
        description: "Basic color words",
        estimatedMinutes: 3,
        steps: [
            info("Colors play an important role in Mi'gmaq art and traditional designs."),
            vocab("wape'g", "White", "wah-peg"),
            info("More color words will be added as you progress in your learning journey!"),
        ]
    }),
    lesson({
        id: "landscape",
        title: "Landscape",
        description: "Rivers, mountains, and forests",
        estimatedMinutes: 4,
        steps: [
            info("Mi'gma'ki, the traditional Mi'gmaq territory, spans rivers, coastlines, forests, and mountains across Atlantic Canada."),
            vocab("sipu", "River", "si-bu"),
            vocab("qospem", "Lake", "hgos-pem"),
            vocab("gta'n", "Ocean", "ek-taan"),
            vocab("gmtn", "Mountain", "gem-den"),
            vocab("menigu", "Island", "me-ni-gu"),
            vocab("nipugt", "Forest / Woods", "ni-bukt"),
        ]
    }),
    lesson({
        id: "sky-and-space",
        title: "Sky & Space",
        description: "Sun, moon, and stars",
        estimatedMinutes: 4,
        steps: [
            info("The sun, moon, and stars have long guided timekeeping, travel, and storytelling in Mi'gmaq culture."),
            vocab("na'gu'set", "Sun", "naa-guu-zet"),
            vocab("tepgunset", "Moon / Month", "dep-kun-zet"),
            vocab("gloqowej", "Star", "ge-lo-hgo-wech"),
            vocab("musgun", "Sky / Atmosphere", "mus-kun"),
        ]
    }),
    lesson({
        id: "seasons",
        title: "Seasons",
        description: "Spring, summer, and fall",
        estimatedMinutes: 3,
        steps: [
            info("You already learned gesig (winter) in the Weather lesson — here are the other three seasons."),
            vocab("siggw", "Spring", "sikkw"),
            vocab("nipg", "Summer", "nipk"),
            vocab("toqwa'q", "Fall / Autumn", "dohk-waahk"),
        ]
    })
];
