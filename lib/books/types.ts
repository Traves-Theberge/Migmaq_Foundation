/**
 * Generic storybook schema. A book is pure data — the reusable <StoryBook>
 * reader renders any book that fits this shape, so adding book #2 through
 * book #200 means writing a data file, not new UI code.
 *
 * A line of text is a sequence of tokens: dictionary words (rendered with a
 * gloss tooltip and click-to-play audio) interleaved with literal
 * punctuation/spacing. This is intentionally more general than a fixed
 * "X sees Y" template so it also fits future books with different shapes.
 */

export type LineToken =
    | { word: string; display?: string }
    | { literal: string };

export interface BookLine {
    /** Mi'kmaq line, as dictionary-word + literal tokens. */
    mikmaq: LineToken[];
    /** English gloss of the whole line. */
    english: string;
}

export interface BookPage {
    id: string;
    /** Short label for the progress rail, e.g. "mui'n — bear". */
    label: string;
    lines: BookLine[];
    /** Alt text / placeholder caption describing the scene. */
    imageAlt: string;
    /** Real illustration, once available. Falls back to a placeholder. */
    imageUrl?: string;
}

export interface BookDefinition {
    slug: string;
    title: LineToken[];
    subtitle: string;
    /** One-line teaser for the book index card. */
    teaser: string;
    coverImageAlt: string;
    coverImageUrl?: string;
    pages: BookPage[];
    /** Closing note for parents/teachers, plain text with **word** emphasis. */
    note?: string;
    /**
     * Glosses for tokens that aren't findable as dictionary citation forms —
     * inflected verb forms used for teaching, or spelling variants. Keyed by
     * the literal `word` string used in tokens above.
     */
    glossOverrides?: Record<string, { gloss: string; pron?: string; source?: string }>;
}

/** Resolved per-word data the reader needs: gloss text and a playable audio URL. */
export interface ResolvedWord {
    gloss: string;
    pron?: string;
    /** True if this word has its own /dictionary/[word] entry to link to. */
    inDictionary: boolean;
    audioUrl?: string;
}
