import type { Metadata } from 'next';
import { getLessonById } from '@/lib/lessons/index';
import LessonPageClient from './LessonPageClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

/**
 * Split out from the interactive lesson player (LessonPageClient, "use
 * client") specifically so this route can export generateMetadata —
 * a client component can't. Every lesson previously inherited the
 * site-wide default title/description instead of its own.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const lesson = getLessonById(id);
    if (!lesson) return { title: 'Lesson Not Found' };

    const title = `${lesson.title} — ${lesson.categoryTitle}`;
    const description = lesson.description || `A ${lesson.difficulty} Mi'gmaq lesson: ${lesson.title}, part of the ${lesson.categoryTitle} category.`;
    return {
        title,
        description,
        alternates: { canonical: `/education/lessons/${lesson.id}` },
        openGraph: { title, description, type: 'article' },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default function LessonPage() {
    return <LessonPageClient />;
}
