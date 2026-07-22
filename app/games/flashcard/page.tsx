import type { Metadata } from 'next';
import FlashcardGameClient from './FlashcardGameClient';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const TITLE = 'Memory Match';
const DESCRIPTION = "Match Mi'gmaq words to their English translations in a timed memory game — a playful way to build vocabulary.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/games/flashcard` },
    openGraph: {
        type: 'website',
        siteName: SITE_NAME,
        title: `${TITLE} | ${SITE_NAME}`,
        description: DESCRIPTION,
        url: `${SITE_URL}/games/flashcard`,
    },
    twitter: {
        card: 'summary_large_image',
        title: `${TITLE} | ${SITE_NAME}`,
        description: DESCRIPTION,
    },
};

export default function FlashcardGamePage() {
    return <FlashcardGameClient />;
}
