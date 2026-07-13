export interface DictionaryWord {
    word: string;
    pronunciation?: string;
    partOfSpeech?: string;
    /** Short definitions/glosses, first one used as the card's summary line. */
    definitions: string[];
    /** Link to the word's full detail page, if any. */
    href?: string;
}
