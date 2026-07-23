import type { Metadata } from 'next';
import DictionaryListClient from './DictionaryListClient';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const TITLE = 'Dictionary';
const DESCRIPTION = "Search the full Mi'gmaq–English–French dictionary — browse by letter, filter by part of speech, and listen to word pronunciations.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/dictionary` },
    openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: `${SITE_URL}/dictionary` },
    twitter: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION },
};

export default function DictionaryPage() {
    return <DictionaryListClient />;
}
