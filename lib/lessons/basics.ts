import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const basicsLessons: Lesson[] = [
    lesson({
        id: "basic-greetings",
        title: "Basic Greetings",
        description: "Hello and goodbye",
        estimatedMinutes: 3,
        steps: [
            info("Greetings are the foundation of respectful communication in Mi'gmaq culture."),
            vocab("pusu'l", "Hello / Greetings", "poo-sool"),
            vocab("atiu", "Goodbye", "ah-tee-oo"),
            info("Practice using these greetings when you meet someone or part ways!"),
        ]
    }),
    lesson({
        id: "polite-phrases",
        title: "Polite Phrases",
        description: "Thank you, sorry, welcome",
        estimatedMinutes: 4,
        steps: [
            info("Politeness and respect are core values in Mi'gmaq interactions."),
            vocab("wela'lin", "Thank you", "wel-ah-lin"),
            vocab("mesge'g", "Sorry", "mes-geg"),
            vocab("pjila'si", "Welcome / Come in", "pjee-lah-see"),
            info("Using these phrases shows respect and builds strong relationships."),
        ]
    }),
    lesson({
        id: "numbers-1-5",
        title: "Numbers 1-5",
        description: "Count from one to five",
        estimatedMinutes: 4,
        steps: [
            info("Numbers are used in daily life, ceremonies, and traditional counting systems."),
            vocab("newt", "One", "newt"),
            vocab("ta'pu", "Two", "dah-boo"),
            vocab("si'st", "Three", "seest"),
            vocab("ne'w", "Four", "nay-oo"),
            vocab("na'n", "Five", "nahn"),
            info("Practice counting objects around you to reinforce these numbers!"),
        ]
    }),
    lesson({
        id: "numbers-6-10",
        title: "Numbers 6-10",
        description: "Count from six to ten",
        estimatedMinutes: 4,
        steps: [
            info("Continue building your counting skills with numbers six through ten."),
            vocab("as'gom", "Six", "ahs-gom"),
            vocab("lluigneg", "Seven", "loo-ig-neg"),
            vocab("ugumuljin", "Eight", "oo-goo-mool-jin"),
            vocab("pesgunateg", "Nine", "pes-goo-nah-teg"),
            vocab("newtisga'q", "Ten", "newt-is-gahk"),
            info("You can now count from newt to newtisga'q (one to ten)!"),
        ]
    }),
    lesson({
        id: "time-of-day",
        title: "Time of Day",
        description: "Morning, midnight, and special days",
        estimatedMinutes: 4,
        steps: [
            info("Understanding time helps you talk about daily activities and special occasions."),
            vocab("egsitpu'g", "Morning", "eg-sit-poog"),
            vocab("aqtatpa'q", "Midnight", "ahk-taht-pahk"),
            vocab("aqantie'umg", "Sunday / Holy day", "ah-kwan-tee-oomg"),
        ]
    }),
    lesson({
        id: "days-of-the-week",
        title: "Days of the Week",
        description: "Monday through Sunday",
        estimatedMinutes: 5,
        steps: [
            info("Some day names describe their place in the week — amgwes_elugutimg literally means \"first work day.\""),
            vocab("amgwes_elugutimg", "Monday", "am-kwes-e-lu-gu-dimk"),
            vocab("ta'puowei", "Tuesday", "daa-bu-o-wey"),
            vocab("si'stewei", "Wednesday", "siis-te-wey"),
            vocab("ne'wowei", "Thursday", "nee-wo-wey"),
            vocab("weltamultimg", "Friday", "wel-ta-mul-timk"),
            vocab("gesp'teg", "Saturday", "ges-pe-dek"),
            vocab("aqantie'umg", "Sunday / Holy day", "ah-kwan-tee-oomg"),
        ]
    }),
    lesson({
        id: "today-and-tomorrow",
        title: "Today, Tomorrow & Yesterday",
        description: "Talking about when",
        estimatedMinutes: 3,
        steps: [
            info("These three words let you place an action in time relative to today."),
            vocab("gisgug", "Today", "gis-kuk"),
            vocab("sapo'nug", "Tomorrow", "sa-boo-nuk"),
            vocab("ulagu", "Yesterday", "u-la-gu"),
        ]
    })
];
