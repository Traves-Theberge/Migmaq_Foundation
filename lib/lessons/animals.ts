import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const animalsLessons: Lesson[] = [
    lesson({
        id: "land-animals",
        title: "Land Animals",
        description: "Moose, rabbit, and more",
        estimatedMinutes: 3,
        steps: [
            info("Animals are central to Mi'gmaq stories and teachings."),
            vocab("tia'm", "Moose", "tee-ahm"),
            vocab("apli'gmuj", "Rabbit / Hare", "ah-plee-gmoodge"),
            vocab("apalqaqamej", "Chipmunk / Ground squirrel", "ah-pahl-kah-kah-medge"),
        ]
    }),
    lesson({
        id: "water-animals",
        title: "Water Animals",
        description: "Fish and sea creatures",
        estimatedMinutes: 3,
        steps: [
            info("Fishing has always been vital to Mi'gmaq communities."),
            vocab("plamu", "Salmon", "plah-moo"),
            vocab("atoqwa'su", "Trout", "ah-tok-wah-soo"),
        ]
    }),
    lesson({
        id: "birds",
        title: "Birds",
        description: "Eagle, crow, and duck",
        estimatedMinutes: 4,
        steps: [
            info("Birds hold special significance in Mi'gmaq culture and spirituality."),
            vocab("gitpu", "Eagle", "git-poo"),
            vocab("ga'qaquj", "Crow", "gah-kah-koodge"),
            vocab("apji'jgmuj", "Black duck", "ah-pjee-jig-moodge"),
        ]
    })
];
