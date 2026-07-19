/** Plain-language explanations of the grammatical labels used in the dictionary. */
export const POS_GLOSSARY: Record<string, string> = {
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
};

export function getPosDescription(type: string): string | undefined {
    return POS_GLOSSARY[type.trim().toLowerCase()];
}
