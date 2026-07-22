import type { Metadata } from 'next';
import QuizGameClient from './QuizGameClient';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const TITLE = 'Translation Quiz';
const DESCRIPTION = "Test your Mi'gmaq vocabulary with multiple-choice translation questions — five rounds, instant feedback, play again anytime.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/games/quiz` },
    openGraph: {
        type: 'website',
        siteName: SITE_NAME,
        title: `${TITLE} | ${SITE_NAME}`,
        description: DESCRIPTION,
        url: `${SITE_URL}/games/quiz`,
    },
    twitter: {
        card: 'summary_large_image',
        title: `${TITLE} | ${SITE_NAME}`,
        description: DESCRIPTION,
    },
};

export default function QuizGamePage() {
    return <QuizGameClient />;
}
