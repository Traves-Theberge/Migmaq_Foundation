export interface Usage {
    translation: string;
    english: string;
}

export interface Recording {
    file: string;
    speaker: string;
    kind: 'word' | 'example';
    url: string;
}

export interface ResolvedAlternateForm {
    raw: string;
    migmaq: string;
    gloss?: string;
    note?: string;
    /** Set only when `migmaq` resolves to its own dictionary entry. */
    href?: string;
}

export interface Word {
    word: string;
    type?: string;
    definitions: string[];
    translations?: string[];
    usages?: Usage[];
    audio?: string;
    pronunciation_guide?: string;
    alternate_forms?: string[];
    document_references?: string[];
    entry_url?: string;
    /** Populated via getRecordings() from the audio manifest. */
    recordings?: Recording[];
    /** Populated via resolveAlternateForms(): alternate_forms parsed, with hrefs where linkable. */
    resolved_alternate_forms?: ResolvedAlternateForm[];
}
