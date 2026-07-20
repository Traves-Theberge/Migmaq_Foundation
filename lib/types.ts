export interface Usage {
    translation: string;
    english: string;
    /** Machine-translated French gloss of `english`, unreviewed. */
    french?: string;
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
    /** Machine-translated French glosses of `definitions`, unreviewed. */
    fr_definitions?: string[];
    /** Machine-translated French glosses of `translations`, unreviewed. */
    fr_translations?: string[];
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
