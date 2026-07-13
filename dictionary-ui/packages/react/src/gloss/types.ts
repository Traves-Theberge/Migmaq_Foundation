export interface GlossData {
    /** The definition/gloss shown in the tooltip. */
    gloss: string;
    /** Pronunciation guide, e.g. "mu·iin". */
    pron?: string;
    /** Playable audio URL — if set, the word becomes clickable and plays it. */
    audioUrl?: string;
    /** Link to a full dictionary entry — if set, the tooltip offers it. */
    href?: string;
}

export type GlossToken = { word: string; display?: string } | { literal: string };
