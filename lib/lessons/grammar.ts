import { Lesson } from './types';
import { info, vocab, phrase, lesson } from './helpers';

export const grammarLessons: Lesson[] = [
    lesson({
        id: "personal-pronouns",
        title: "Personal Pronouns",
        description: "I, you, he, she, we, and they",
        estimatedMinutes: 5,
        steps: [
            info("Pronouns replace a person's name. Mi'gmaq marks a difference between \"we\" that includes the person you're talking to and \"we\" that doesn't — and between \"you\" (one person) and \"you all\" (more than one)."),
            vocab("ni'n", "I / Me", "niin"),
            vocab("gi'l", "You (singular)", "giil"),
            vocab("negm", "He / She / Him / Her", "ne-gem"),
            vocab("ginu", "We / Us (includes the listener)", "gi-nu"),
            vocab("ninen", "We / Us (does not include the listener)", "ni-nen"),
            vocab("gilew", "You all (two or more people)", "gi-lew"),
            vocab("negmow", "They / Them", "ne-ge-mow"),
            info("ginu and ninen both mean \"we\" — ginu includes the person you're speaking to, while ninen doesn't. Try using each pronoun with someone you know!"),
        ]
    }),
    lesson({
        id: "this-and-that",
        title: "This & That",
        description: "Pointing to people and things",
        estimatedMinutes: 4,
        steps: [
            info("Demonstratives point to people or things instead of naming them — Mi'gmaq distinguishes singular from plural here too."),
            vocab("u't", "This", "uud"),
            vocab("ula", "This / Here", "u-la"),
            vocab("negla", "That", "ne-ge-la"),
            vocab("weget", "These", "we-get"),
            vocab("neget", "Those", "ne-get"),
            info("Notice each singular form has a matching plural — u't/weget, negla/neget. Practice pairing them with objects around you."),
        ]
    }),
    lesson({
        id: "question-words",
        title: "Question Words",
        description: "Who, what, where, when, and how many",
        estimatedMinutes: 4,
        steps: [
            info("Question words usually come first in a Mi'gmaq sentence, just like in English."),
            vocab("wen", "Who", "wen"),
            vocab("goqwei", "What", "gohk-wey"),
            vocab("ta'n", "Where / When", "daan"),
            vocab("goqwei_ugjit", "Why / What for?", "gohk-wey-uk-chit"),
            vocab("ta'sit", "How much? / How many?", "daa-sit"),
            phrase("Wen na?", "Who is that?", "A simple question built from wen (who) plus na — try building your own with the words above."),
        ]
    }),
    lesson({
        id: "yes-and-no",
        title: "Yes & No",
        description: "Answering questions and agreeing or disagreeing",
        estimatedMinutes: 3,
        steps: [
            info("Short answers are some of the most useful words you can learn first."),
            vocab("e'e", "Yes", "ee-e"),
            vocab("amuj", "Yes, definitely (used to contradict a negative statement)", "a-much"),
            vocab("moqwa'", "No", "mohk-waa"),
            phrase("Tegen mussew \"moqwa'\" mu' nestasiwun?", "Which part of \"no\" don't you understand?", "A dictionary example sentence showing moqwa' in context."),
        ]
    })
];
