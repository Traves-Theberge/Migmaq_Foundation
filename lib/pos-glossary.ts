/** Plain-language explanations of the grammatical labels used in the dictionary. */
export const POS_GLOSSARY = {
    en: {
        noun: 'A word that names a person, place, thing, or idea.',
        'noun animate': "A noun in Mi'gmaq's animate grammatical class — used for people, animals, spirits, and other things treated as animate. Animate nouns take their own set of plural and verb agreement forms.",
        'noun inanimate': "A noun in Mi'gmaq's inanimate grammatical class — used for most objects, substances, and abstract things. Inanimate nouns take a different set of plural and verb agreement forms than animate nouns.",
        pronoun: 'A word that stands in for a noun, such as "he," "this," or "it."',
        particle: "An unchanging word — like a conjunction, adverb, or exclamation — that doesn't take the prefixes and suffixes nouns and verbs do.",
        'verb animate intransitive': 'A verb with an animate subject and no object (e.g. "he/she sits"). Often abbreviated AI.',
        'verb animate transitive': 'A verb with an animate object (e.g. "he/she bandages him"). Often abbreviated TA.',
        'verb inanimate intransitive': 'A verb with an inanimate subject and no object (e.g. "it stands in the way"). Often abbreviated II.',
        'verb inanimate transitive': 'A verb with an inanimate object (e.g. "he/she bandages it"). Often abbreviated TI.',
        vii: 'Verb Inanimate Intransitive — a verb with an inanimate subject and no object.',
        loc: 'Locative — a word or form that indicates location or place.',
        'unclassified part of speech': "This entry's grammatical category hasn't been classified in the source material yet.",
    },
    fr: {
        noun: "Un mot qui désigne une personne, un lieu, une chose ou une idée.",
        'noun animate': "Un nom appartenant à la classe grammaticale animée du mi'gmaq — utilisé pour les personnes, les animaux, les esprits et les autres choses considérées comme animées. Les noms animés ont leurs propres formes de pluriel et d'accord verbal.",
        'noun inanimate': "Un nom appartenant à la classe grammaticale inanimée du mi'gmaq — utilisé pour la plupart des objets, des substances et des choses abstraites. Les noms inanimés ont des formes de pluriel et d'accord verbal différentes de celles des noms animés.",
        pronoun: "Un mot qui remplace un nom, comme « il », « ceci » ou « cela ».",
        particle: "Un mot invariable — comme une conjonction, un adverbe ou une exclamation — qui ne prend pas les préfixes et suffixes des noms et des verbes.",
        'verb animate intransitive': "Un verbe avec un sujet animé et sans objet (p. ex. « il/elle s'assoit »). Souvent abrégé AI.",
        'verb animate transitive': "Un verbe avec un objet animé (p. ex. « il/elle le bande »). Souvent abrégé TA.",
        'verb inanimate intransitive': "Un verbe avec un sujet inanimé et sans objet (p. ex. « ça bloque le passage »). Souvent abrégé II.",
        'verb inanimate transitive': "Un verbe avec un objet inanimé (p. ex. « il/elle le bande »). Souvent abrégé TI.",
        vii: "Verbe inanimé intransitif — un verbe avec un sujet inanimé et sans objet.",
        loc: "Locatif — un mot ou une forme qui indique un lieu ou un emplacement.",
        'unclassified part of speech': "La catégorie grammaticale de cette entrée n'a pas encore été classée dans le matériel source.",
    },
} as const;

type Locale = keyof typeof POS_GLOSSARY;

export function getPosDescription(type: string, locale: Locale = 'en'): string | undefined {
    const key = type.trim().toLowerCase() as keyof typeof POS_GLOSSARY['en'];
    return POS_GLOSSARY[locale][key] ?? POS_GLOSSARY.en[key];
}
