import type { Metadata } from 'next';
import LessonsListClient from './LessonsListClient';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const TITLE = 'Lessons';
const DESCRIPTION = "Browse every Mi'gmaq lesson by category — vocabulary, phrases, and cultural context, from beginner to advanced.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/education/lessons` },
    openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: `${SITE_URL}/education/lessons` },
    twitter: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION },
};

export default function LessonsPage() {
    return <LessonsListClient />;
}
