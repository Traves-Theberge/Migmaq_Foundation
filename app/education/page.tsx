import type { Metadata } from 'next';
import EducationClient from './EducationClient';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const TITLE = 'Education';
const DESCRIPTION = "Guided Mi'gmaq lessons, illustrated storybooks, and learning games — organized by category, from beginner to advanced.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/education` },
    openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: `${SITE_URL}/education` },
    twitter: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION },
};

export default function EducationPage() {
    return <EducationClient />;
}
