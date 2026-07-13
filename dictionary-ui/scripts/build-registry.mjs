#!/usr/bin/env node
/**
 * Builds shadcn-compatible registry JSON files from packages/react/src, so
 * `npx shadcn add <url>/r/<slug>.json` copies the exact same source the
 * npm package ships and the docs site displays — one source of truth.
 *
 * Usage: node scripts/build-registry.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'packages', 'react', 'src');
const OUT = path.join(root, 'apps', 'docs', 'public', 'r');

/** slug -> source files (relative to packages/react/src) that make up that component. */
const REGISTRY = {
    'audio-button': {
        title: 'AudioButton',
        description: 'A play/stop button for one recording, with cross-browser audio-clipping fix.',
        files: ['audio/AudioButton.tsx', 'audio/play-audio.ts', 'utils.ts'],
        dependencies: ['lucide-react'],
    },
    'gloss-word': {
        title: 'GlossWord',
        description: 'A word with a hover/focus gloss tooltip and click-to-play pronunciation.',
        files: ['gloss/GlossWord.tsx', 'gloss/types.ts', 'audio/play-audio.ts', 'utils.ts'],
        dependencies: [],
    },
    'word-card': {
        title: 'WordCard / SearchBox',
        description: 'Word list card and search input primitives for dictionary lookups.',
        files: ['dictionary/WordCard.tsx', 'dictionary/SearchBox.tsx', 'dictionary/types.ts'],
        dependencies: ['lucide-react'],
    },
    'storybook-reader': {
        title: 'StoryBook reader',
        description: 'An animated, page-flipping illustrated reader driven by a plain BookDefinition object.',
        files: [
            'storybook/StoryBook.tsx',
            'storybook/BookLeaves.tsx',
            'storybook/PagePlaceholder.tsx',
            'storybook/types.ts',
            'gloss/GlossWord.tsx',
            'gloss/types.ts',
            'audio/play-audio.ts',
            'utils.ts',
        ],
        dependencies: ['lucide-react', 'framer-motion', 'react-pageflip'],
    },
    'alphabet-filter': {
        title: 'AlphabetFilter',
        description: 'A row of letter buttons for jumping to a section of a word list.',
        files: ['dictionary/AlphabetFilter.tsx', 'utils.ts'],
        dependencies: [],
    },
    'theme-toggle': {
        title: 'ThemeToggle',
        description: 'A light/dark toggle with no theming library required.',
        files: ['theme/ThemeToggle.tsx', 'utils.ts'],
        dependencies: ['lucide-react'],
    },
    'spelling-cycler': {
        title: 'SpellingCycler',
        description: 'Cycles through alternate spellings/orthographies of a language or word name.',
        files: ['theme/SpellingCycler.tsx'],
        dependencies: [],
    },
    'word-detail': {
        title: 'WordDetailPage',
        description: 'The full word entry page — translations, definitions, usage examples, alternate forms, sources.',
        files: ['dictionary/WordDetailPage.tsx', 'dictionary/WordCard.tsx', 'audio/AudioButton.tsx', 'audio/play-audio.ts', 'utils.ts'],
        dependencies: ['lucide-react'],
    },
    'flashcard-game': {
        title: 'FlashcardGame',
        description: 'A memory-match game: flip cards two at a time, matching pairs clear from the board.',
        files: ['games/FlashcardGame.tsx'],
        dependencies: ['lucide-react', 'framer-motion', 'canvas-confetti'],
    },
    'quiz-game': {
        title: 'QuizGame',
        description: 'A multiple-choice quiz with immediate feedback and a score screen.',
        files: ['games/QuizGame.tsx'],
        dependencies: ['lucide-react', 'framer-motion', 'canvas-confetti'],
    },
};

fs.mkdirSync(OUT, { recursive: true });

for (const [slug, entry] of Object.entries(REGISTRY)) {
    const files = entry.files.map((relPath) => ({
        path: `components/dictionary-ui/${relPath}`,
        content: fs.readFileSync(path.join(SRC, relPath), 'utf8'),
        type: 'registry:component',
    }));

    const registryItem = {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: slug,
        type: 'registry:component',
        title: entry.title,
        description: entry.description,
        dependencies: entry.dependencies,
        files,
    };

    fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(registryItem, null, 2));
    console.log(`Wrote r/${slug}.json (${files.length} files)`);
}
