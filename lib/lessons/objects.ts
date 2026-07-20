import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const objectsLessons: Lesson[] = [
    lesson({
        id: "household",
        title: "Household Items",
        description: "Common objects and tools",
        estimatedMinutes: 3,
        steps: [
            info("Traditional Mi'gmaq items reflect a deep connection to the land and craftsmanship."),
            vocab("a'su'n", "Blanket", "ah-soon"),
            vocab("awa'qi'gn", "Crooked knife", "ah-wah-keen"),
        ]
    }),
    lesson({
        id: "transportation",
        title: "Transportation",
        description: "Boats, snowshoes, and travel",
        estimatedMinutes: 4,
        steps: [
            info("Mi'gmaq people developed ingenious ways to travel across land and water."),
            vocab("asoqomm'taqan", "Ferry / Boat", "ah-so-kom-tah-kahn"),
            vocab("alaqami'g", "Snowshoe", "ah-lah-kah-meeg"),
            vocab("aptu'n", "Walking stick / Cane", "ahp-toon"),
        ]
    }),
    lesson({
        id: "clothing",
        title: "Clothing",
        description: "Shirts, shoes, and moccasins",
        estimatedMinutes: 4,
        steps: [
            info("Traditional Mi'gmaq clothing was often made from hide and decorated with quillwork and beadwork."),
            vocab("atlai", "Shirt", "a-de-laay"),
            vocab("pita'qawe'l", "Pants / Trousers", "bi-daa-hga-weel"),
            vocab("mg'sn", "Shoe", "em-ke-sen"),
            vocab("ma'gn", "Moccasin", "maa-gen"),
            vocab("a'gwesn", "Hat", "aa-gwe-sen"),
        ]
    })
];
