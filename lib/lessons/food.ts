import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const foodLessons: Lesson[] = [
    lesson({
        id: "berries",
        title: "Berries",
        description: "Common berries and fruits",
        estimatedMinutes: 4,
        steps: [
            info("Berry picking is a traditional activity that connects Mi'gmaq people to the land and seasons."),
            vocab("atuomgomin", "Strawberry", "ah-too-om-go-min"),
            vocab("ajioqjemin", "Blackberry", "ah-jee-ok-jeh-min"),
            vocab("gmu'jmin", "Raspberry", "gmoodge-min"),
            vocab("gawaqtejg", "Gooseberry", "gah-wahk-tedge"),
        ]
    })
];
