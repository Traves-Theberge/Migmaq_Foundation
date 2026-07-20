import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const bodyLessons: Lesson[] = [
    lesson({
        id: "face",
        title: "Face",
        description: "Parts of the face",
        estimatedMinutes: 4,
        steps: [
            info("Learning body parts helps you describe yourself and others."),
            vocab("ugsisgw", "Face", "oog-sisgw"),
            vocab("lamipgigwan", "Eyeball / Eye", "lah-mip-gig-wahn"),
            vocab("alpatl", "Mouth / Gums", "ahl-pahtl"),
            info("These words are useful for describing people and expressing yourself."),
        ]
    }),
    lesson({
        id: "body-parts",
        title: "Body Parts",
        description: "Hands, arms, and more",
        estimatedMinutes: 5,
        steps: [
            info("Many Mi'gmaq body-part words already include a possessive prefix — ug- means \"his/her\" — because body parts are always thought of as belonging to someone."),
            vocab("ugpitn", "Hand", "uk-pi-den"),
            vocab("ugpitnoqom", "Arm", "uk-pi-de-nohk-om"),
            vocab("ugtluign", "Finger", "uk-te-lu-i-gen"),
            vocab("unji", "Head", "unn-ji"),
            vocab("ugs'tuaqan", "Ear", "uk-se-du-a-hgan"),
            vocab("wipit", "Tooth", "wi-bit"),
            vocab("usapun", "Hair", "u-sa-bun"),
            info("Notice each word literally translates closer to \"his/her hand,\" \"his/her arm,\" and so on — the dictionary lists them this way because they're rarely said without an owner."),
        ]
    })
];
