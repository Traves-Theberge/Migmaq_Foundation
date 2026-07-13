/** The single source of truth for what components exist and their status —
 *  drives the landing page list and (later) the registry-build script. */
export interface ComponentEntry {
    slug: string;
    /** The real export/import identifier, e.g. "AudioButton" — used in code snippets. */
    name: string;
    /** Space-separated for display (card titles, sidebar) — component names are
     *  PascalCase identifiers with no natural word breaks otherwise. */
    displayName: string;
    category: 'Audio' | 'Gloss & tooltip' | 'Dictionary primitives' | 'Storybook reader' | 'Theme' | 'Games';
    description: string;
    status: 'ready' | 'planned';
}

export const COMPONENTS: ComponentEntry[] = [
    {
        slug: 'audio-button',
        name: 'AudioButton',
        displayName: 'Audio Button',
        category: 'Audio',
        description: 'A play/stop button for one recording. Stops any other AudioButton automatically, and works around the browser audio-clipping-on-first-play issue.',
        status: 'ready',
    },
    {
        slug: 'gloss-word',
        name: 'GlossWord',
        displayName: 'Gloss Word',
        category: 'Gloss & tooltip',
        description: 'A word with a hover/focus gloss tooltip and click-to-play pronunciation — the building block for interlinear or annotated text.',
        status: 'ready',
    },
    {
        slug: 'word-card',
        name: 'WordCard / SearchBox',
        displayName: 'Word Card / Search Box',
        category: 'Dictionary primitives',
        description: 'Word list card, search input, pronunciation and part-of-speech display — the core "look up a word" primitives.',
        status: 'ready',
    },
    {
        slug: 'storybook-reader',
        name: 'StoryBook reader',
        displayName: 'Story Book Reader',
        category: 'Storybook reader',
        description: 'An animated, page-flipping illustrated reader driven by a plain data object — feed it pages, get a physical-feeling book.',
        status: 'ready',
    },
    {
        slug: 'alphabet-filter',
        name: 'AlphabetFilter',
        displayName: 'Alphabet Filter',
        category: 'Dictionary primitives',
        description: 'A row of letter buttons for jumping to a section of a word list.',
        status: 'ready',
    },
    {
        slug: 'theme-toggle',
        name: 'ThemeToggle',
        displayName: 'Theme Toggle',
        category: 'Theme',
        description: 'A light/dark toggle with no theming library required — toggles a .dark class and persists the choice.',
        status: 'ready',
    },
    {
        slug: 'spelling-cycler',
        name: 'SpellingCycler',
        displayName: 'Spelling Cycler',
        category: 'Theme',
        description: 'Cycles through alternate spellings/orthographies of a language or word name.',
        status: 'ready',
    },
    {
        slug: 'word-detail',
        name: 'WordDetailPage',
        displayName: 'Word Detail Page',
        category: 'Dictionary primitives',
        description: 'The full entry page — translations, numbered definitions, usage examples with audio, alternate forms, and sources.',
        status: 'ready',
    },
    {
        slug: 'flashcard-game',
        name: 'FlashcardGame',
        displayName: 'Flashcard Game',
        category: 'Games',
        description: 'A memory-match game: flip cards two at a time, matching pairs clear from the board.',
        status: 'ready',
    },
    {
        slug: 'quiz-game',
        name: 'QuizGame',
        displayName: 'Quiz Game',
        category: 'Games',
        description: 'A multiple-choice quiz with immediate feedback and a score screen.',
        status: 'ready',
    },
];
