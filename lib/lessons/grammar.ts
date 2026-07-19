import { Lesson } from './types';

export const grammarLessons: Lesson[] = [
    {
        id: 'personal-pronouns',
        title: 'Personal Pronouns',
        description: 'I, you, he, she, we, and they',
        difficulty: 'beginner',
        estimatedMinutes: 5,
        steps: [
            {
                type: 'info',
                description: "Pronouns replace a person's name. Mi'gmaq marks a difference between \"we\" that includes the person you're talking to and \"we\" that doesn't — and between \"you\" (one person) and \"you all\" (more than one)."
            },
            {
                type: 'vocabulary',
                term: "ni'n",
                translation: "I / Me",
                pronunciation: "niin"
            },
            {
                type: 'vocabulary',
                term: "gi'l",
                translation: "You (singular)",
                pronunciation: "giil"
            },
            {
                type: 'vocabulary',
                term: "negm",
                translation: "He / She / Him / Her",
                pronunciation: "ne-gem"
            },
            {
                type: 'vocabulary',
                term: "ginu",
                translation: "We / Us (includes the listener)",
                pronunciation: "gi-nu"
            },
            {
                type: 'vocabulary',
                term: "ninen",
                translation: "We / Us (does not include the listener)",
                pronunciation: "ni-nen"
            },
            {
                type: 'vocabulary',
                term: "gilew",
                translation: "You all (two or more people)",
                pronunciation: "gi-lew"
            },
            {
                type: 'vocabulary',
                term: "negmow",
                translation: "They / Them",
                pronunciation: "ne-ge-mow"
            },
            {
                type: 'info',
                description: "ginu and ninen both mean \"we\" — ginu includes the person you're speaking to, while ninen doesn't. Try using each pronoun with someone you know!"
            }
        ]
    },
    {
        id: 'this-and-that',
        title: 'This & That',
        description: 'Pointing to people and things',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Demonstratives point to people or things instead of naming them — Mi'gmaq distinguishes singular from plural here too."
            },
            {
                type: 'vocabulary',
                term: "u't",
                translation: "This",
                pronunciation: "uud"
            },
            {
                type: 'vocabulary',
                term: "ula",
                translation: "This / Here",
                pronunciation: "u-la"
            },
            {
                type: 'vocabulary',
                term: "negla",
                translation: "That",
                pronunciation: "ne-ge-la"
            },
            {
                type: 'vocabulary',
                term: "weget",
                translation: "These",
                pronunciation: "we-get"
            },
            {
                type: 'vocabulary',
                term: "neget",
                translation: "Those",
                pronunciation: "ne-get"
            },
            {
                type: 'info',
                description: "Notice each singular form has a matching plural — u't/weget, negla/neget. Practice pairing them with objects around you."
            }
        ]
    },
    {
        id: 'question-words',
        title: 'Question Words',
        description: 'Who, what, where, when, and how many',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        steps: [
            {
                type: 'info',
                description: "Question words usually come first in a Mi'gmaq sentence, just like in English."
            },
            {
                type: 'vocabulary',
                term: "wen",
                translation: "Who",
                pronunciation: "wen"
            },
            {
                type: 'vocabulary',
                term: "goqwei",
                translation: "What",
                pronunciation: "gohk-wey"
            },
            {
                type: 'vocabulary',
                term: "ta'n",
                translation: "Where / When",
                pronunciation: "daan"
            },
            {
                type: 'vocabulary',
                term: "goqwei_ugjit",
                translation: "Why / What for?",
                pronunciation: "gohk-wey-uk-chit"
            },
            {
                type: 'vocabulary',
                term: "ta'sit",
                translation: "How much? / How many?",
                pronunciation: "daa-sit"
            },
            {
                type: 'phrase',
                term: "Wen na?",
                translation: "Who is that?",
                description: "A simple question built from wen (who) plus na — try building your own with the words above."
            }
        ]
    },
    {
        id: 'yes-and-no',
        title: 'Yes & No',
        description: 'Answering questions and agreeing or disagreeing',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        steps: [
            {
                type: 'info',
                description: "Short answers are some of the most useful words you can learn first."
            },
            {
                type: 'vocabulary',
                term: "e'e",
                translation: "Yes",
                pronunciation: "ee-e"
            },
            {
                type: 'vocabulary',
                term: "amuj",
                translation: "Yes, definitely (used to contradict a negative statement)",
                pronunciation: "a-much"
            },
            {
                type: 'vocabulary',
                term: "moqwa'",
                translation: "No",
                pronunciation: "mohk-waa"
            },
            {
                type: 'phrase',
                term: "Tegen mussew \"moqwa'\" mu' nestasiwun?",
                translation: "Which part of \"no\" don't you understand?",
                description: "A dictionary example sentence showing moqwa' in context."
            }
        ]
    }
];
