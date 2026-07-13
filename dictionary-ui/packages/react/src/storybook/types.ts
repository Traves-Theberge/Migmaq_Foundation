import type { GlossData, GlossToken } from '../gloss/types';

/**
 * A book is pure data — <StoryBook> renders any book fitting this shape, so
 * adding book #2 through book #200 means writing a data file, not new code.
 *
 * A line of text is a sequence of tokens: dictionary words (rendered with a
 * gloss tooltip and click-to-play audio via <GlossLine>) interleaved with
 * literal punctuation/spacing. Glosses are resolved by YOU (from your own
 * dictionary data, however it's stored) and passed in as a plain
 * `Record<string, GlossData>` — the reader itself doesn't fetch anything.
 */
export interface BookLine {
    /** The line's tokens — words (gloss-linked) and literal text mixed together. */
    text: GlossToken[];
    /** A translation/gloss shown beneath the line, if bilingual. */
    translation?: string;
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
    title: GlossToken[];
    subtitle: string;
    coverImageAlt: string;
    coverImageUrl?: string;
    pages: BookPage[];
    /** Closing note, plain text with **bold** / *italic* markdown-lite emphasis. */
    note?: string;
}

export type { GlossData };
