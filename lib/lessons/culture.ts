import { Lesson } from './types';
import { info, vocab, lesson } from './helpers';

export const cultureLessons: Lesson[] = [
    lesson({
        id: "traditional-items",
        title: "Traditional Items",
        description: "Canoe, basket, fire, and more",
        estimatedMinutes: 4,
        steps: [
            info("These items have played a central role in Mi'gmaq life for generations — from travel and craft to medicine and ceremony."),
            vocab("gwitn", "Canoe", "gwi-den"),
            vocab("ligpenign", "Basket", "lik-pe-ni-gen"),
            vocab("pugtew", "Fire", "buk-tew"),
            vocab("npisun", "Medicine", "en-pi-sun"),
            vocab("pi'gun", "Feather", "bii-gun"),
            info("Ash splint baskets, birchbark canoes, and traditional medicines are still practiced crafts in many Mi'gmaq communities today."),
        ]
    })
];
