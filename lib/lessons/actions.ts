import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const actionsLessons: Lesson[] = [
    lesson({
        id: "everyday-actions",
        title: "Everyday Actions",
        description: "Eat, sleep, speak, and work",
        estimatedMinutes: 4,
        steps: [
            info("Verbs are at the heart of Mi'gmaq — these everyday actions are a great place to start."),
            vocab("etlatalg", "Eat", "e-de-la-dalk"),
            vocab("nepat", "Sleep / Asleep", "ne-bat"),
            vocab("gelusit", "Speak / Talk", "ge-lu-sit"),
            vocab("elugwet", "Work", "e-lu-gwet"),
            vocab("nemiatl", "See", "ne-mi-a-del"),
            vocab("nutg", "Hear", "nutk"),
        ]
    }),
    lesson({
        id: "movement-and-play",
        title: "Movement & Play",
        description: "Walk, run, dance, and sing",
        estimatedMinutes: 4,
        steps: [
            info("Movement, music, and play are part of everyday life and celebration in Mi'gmaq communities."),
            vocab("uggwata'q", "Walk", "uk-kwa-daahk"),
            vocab("getgwi'g", "Run", "get-kwiig"),
            vocab("tegismit", "Swim", "de-gi-se-mit"),
            vocab("amalgat", "Dance", "a-mal-kat"),
            vocab("etlintoq", "Sing", "e-de-lin-tohk"),
            vocab("mila'sit", "Play", "mi-laa-sit"),
        ]
    })
];
