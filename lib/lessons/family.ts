import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const familyLessons: Lesson[] = [
    lesson({
        id: "immediate-family",
        title: "Immediate Family",
        description: "Parents and siblings",
        estimatedMinutes: 4,
        steps: [
            info("Family is the foundation of Mi'gmaq society and culture."),
            vocab("giju'", "Mother / Mom", "gee-joo"),
            vocab("tata't", "Father / Dad", "tah-taht"),
            vocab("uggwe'ji'jl", "Younger sister", "oog-way-jee-jil"),
            vocab("ugjignaml", "Younger brother", "oog-jig-naml"),
            info("Family relationships are deeply valued and respected in Mi'gmaq culture."),
        ]
    }),
    lesson({
        id: "grandparents",
        title: "Grandparents",
        description: "Grandmother and grandfather",
        estimatedMinutes: 3,
        steps: [
            info("Elders hold wisdom and are greatly respected in Mi'gmaq communities."),
            vocab("nmi'", "Grandmother / Granny", "n-mee"),
            vocab("nemijgami'", "Grandfather / Grampa", "neh-mij-gah-mee"),
            info("Grandparents pass down stories, traditions, and language to younger generations."),
        ]
    }),
    lesson({
        id: "extended-family",
        title: "Extended Family",
        description: "Aunts, uncles, cousins, and more",
        estimatedMinutes: 4,
        steps: [
            info("Extended family plays an important role in Mi'gmaq communities, often living close together and sharing responsibilities."),
            vocab("ugsugwisl", "Aunt", "uk-su-gwi-sel"),
            vocab("ugtlamugsisl", "Uncle", "uk-te-la-muk-si-sel"),
            vocab("wo'gumal", "Cousin / Relative", "woo-gu-mal"),
            vocab("ulugsl", "Nephew", "u-lug-sl"),
            vocab("ugsml", "Niece", "uk-se-mel"),
        ]
    }),
    lesson({
        id: "marriage-and-children",
        title: "Marriage & Children",
        description: "Husband, wife, son, and daughter",
        estimatedMinutes: 4,
        steps: [
            info("These words describe the closest family bonds beyond parents and siblings."),
            vocab("uggwisl", "Son", "uk-kwi-sel"),
            vocab("ugtusl", "Daughter", "uk-tu-sel"),
            vocab("ugji'nmuml", "Husband", "uk-chii-ne-mu-mel"),
            vocab("ugte'piteml", "Wife", "uk-tee-bi-de-mel"),
        ]
    })
];
