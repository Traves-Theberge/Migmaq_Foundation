import type { BookDefinition, BookLine, BookPage } from './types';

/**
 * Mui'n, Mui'n, Wen Nemi't? — Bear, Bear, Who Do You See?
 *
 * An original call-and-response book (chained "who do you see next?"
 * question-and-answer structure — a generic, uncopyrightable pattern common
 * to many early readers). All text, wording, animal choices, and ordering
 * here are original to this project, not derived from any copyrighted work.
 * Every Mi'kmaq form is
 * attested in the Micmac project corpus and checked against the grammar
 * cheatsheet's VTA present-indicative matrix (see
 * Micmac/docs/childrens-book-muin-muin.md for full sourcing).
 *
 * Draft for speaker review — see the closing note.
 */

const CHAIN = [
    "mui'n", "apli'gmuj", "jipji'j", "antawe's", "gopgwej",
    "sasqatu", "gopit", "lentug", "tia'm", "plamu", "mijua'ji'j",
] as const;

const EN: Record<string, string> = {
    "mui'n": 'bear', "apli'gmuj": 'rabbit', "jipji'j": 'bird', "antawe's": 'woodpecker',
    "gopgwej": 'owl', "sasqatu": 'flying squirrel', "gopit": 'beaver', "lentug": 'deer',
    "tia'm": 'moose', "plamu": 'salmon', "mijua'ji'j": 'child',
};

const EN_ARTICLE: Record<string, string> = {
    "mui'n": 'a bear', "apli'gmuj": 'a rabbit', "jipji'j": 'a bird', "antawe's": 'a woodpecker',
    "gopgwej": 'a saw-whet owl', "sasqatu": 'a flying squirrel', "gopit": 'a beaver',
    "lentug": 'a deer', "tia'm": 'a moose', "plamu": 'a salmon', "mijua'ji'j": 'a child',
};

const SCENE_DESCRIPTIONS = [
    'The bear sits in a sunny clearing and looks toward a snowshoe hare at the forest edge.',
    'The hare looks up at a small bird perched on a spruce branch.',
    'The little bird watches a woodpecker at work on a white birch trunk.',
    'The woodpecker peers at a tiny saw-whet owl tucked into a tree hollow.',
    'Night falls. From a stump, the owl watches a flying squirrel glide past the moon.',
    'From a branch above the pond, the squirrel watches a beaver swim by, towing a fresh stick.',
    "The beaver rests on its stick lodge while a deer comes down to drink at the pond's edge.",
    'Across the meadow, the deer looks up at a tall moose standing on the hill.',
    'The moose stands shin-deep in the river as a salmon leaps from the water beside it.',
    'In the clear water, the salmon looks up at a child kneeling on the riverbank.',
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function askLine(speaker: string): BookLine {
    return {
        mikmaq: [
            { word: speaker, display: cap(speaker) }, { literal: ', ' },
            { word: speaker }, { literal: ', ' },
            { word: 'wen' }, { literal: ' ' },
            { word: "nemi't" }, { literal: '?' },
        ],
        english: `${cap(EN[speaker])}, ${EN[speaker]}, who do you see?`,
    };
}

function answerLine(seen: string): BookLine {
    return {
        mikmaq: [
            { word: "nemi'g", display: "Nemi'g" }, { literal: ' ' },
            { word: seen }, { literal: '.' },
        ],
        english: `I see ${EN_ARTICLE[seen]}.`,
    };
}

export const muinMuin: BookDefinition = {
    slug: 'muin-muin',
    title: [
        { word: "mui'n", display: "Mui'n" }, { literal: ', ' },
        { word: "mui'n" }, { literal: ', ' },
        { word: 'wen' }, { literal: ' ' },
        { word: "nemi't" }, { literal: '?' },
    ],
    subtitle: 'Bear, bear, who do you see?',
    teaser: "An illustrated call-and-response picture book — every word plays a speaker recording and links to its dictionary entry.",
    coverImageAlt: 'A bear sitting in a forest clearing under the sun',

    pages: CHAIN.slice(0, -1).map((speaker, i): BookPage => {
        const seen = CHAIN[i + 1];
        return {
            id: speaker,
            label: `${speaker} — ${EN[speaker]}`,
            lines: [askLine(speaker), answerLine(seen)],
            imageAlt: SCENE_DESCRIPTIONS[i],
        };
    }).concat([{
        id: 'mijua-ji-j-finale',
        label: "mijua'ji'j — child",
        lines: [
            askLine("mijua'ji'j"),
            {
                mikmaq: CHAIN.slice(0, -1).flatMap((w): BookLine['mikmaq'] => [
                    { word: "nemi'g", display: "Nemi'g" }, { literal: ' ' }, { word: w }, { literal: '. ' },
                ]),
                english: CHAIN.slice(0, -1).map((w) => `I see ${EN_ARTICLE[w]}.`).join(' '),
            },
        ],
        imageAlt: 'In a sunlit clearing the child turns in a circle, and every animal from the book is there, all looking back.',
    }]),

    glossOverrides: {
        "nemi't": {
            gloss: "you see him/her — verb nemi- with the you-to-him/her ending -(V)'t",
            source: "VTA matrix §10.1; corpus: Gi's gi'l nemi't sasqatu?",
        },
        "nemi'g": {
            gloss: "I see him/her — verb nemi- with the I-to-him/her ending -(V)'g",
            source: "VTA matrix §10.1; cheatsheet: nemi'g epit “I see the woman”",
        },
        "gopgwej": {
            gloss: 'saw-whet owl',
            pron: 'kop·kwej',
            source: "Clark p. 117; Pacifique p. 423 (dictionary citation form: gopgej)",
        },
    },

    note: "Every animal in this book is grammatically **animate**, so the whole story runs on one verb stem, *nemi-*, in two forms: the question **wen nemi't?** (“who do you see?”) and the answer **nemi'g** (“I see him/her”). Each animal's name is heard twice — once being asked, once being seen.\n\nDraft for speaker review: text assembled from forms attested in the Rand, Clark, and Pacifique materials on mikmaqonline.org (CC BY-NC 4.0), with verb endings checked against the project's VTA present-indicative paradigm. Recordings are of the individual words, by the archive's speakers.",
};
