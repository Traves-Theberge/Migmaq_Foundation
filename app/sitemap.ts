import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getDictionary } from '@/lib/dictionary';
import { lessonCategories } from '@/lib/lessons/index';
import { BOOKS } from '@/lib/books/registry';

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/dictionary', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/education', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/education/lessons', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/education/books', changeFrequency: 'monthly', priority: 0.7 },
    // /games itself only redirects to /education (see app/games/page.tsx) —
    // deliberately excluded here; a sitemap should list final destination
    // URLs, not a redirect.
    { path: '/games/flashcard', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/games/quiz', changeFrequency: 'monthly', priority: 0.5 },
];

/**
 * Every real content page on the public site — every dictionary headword,
 * lesson, and storybook gets its own URL, on top of the static top-level
 * routes. Regenerated on each build/request (Next caches this route
 * automatically), so it stays in sync with public/assets/dictionary.json
 * and lib/lessons, lib/books without any manual step.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const words: Array<{ word: string }> = await getDictionary();

    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
        url: `${SITE_URL}${r.path}`,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
    }));

    const wordEntries: MetadataRoute.Sitemap = words.map((w) => ({
        url: `${SITE_URL}/dictionary/${encodeURIComponent(w.word)}`,
        changeFrequency: 'yearly',
        priority: 0.5,
    }));

    const lessonEntries: MetadataRoute.Sitemap = lessonCategories.flatMap((category) =>
        category.lessons.map((lesson) => ({
            url: `${SITE_URL}/education/lessons/${lesson.id}`,
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        })),
    );

    const bookEntries: MetadataRoute.Sitemap = BOOKS.map((book) => ({
        url: `${SITE_URL}/education/books/${book.slug}`,
        changeFrequency: 'yearly',
        priority: 0.6,
    }));

    return [...staticEntries, ...wordEntries, ...lessonEntries, ...bookEntries];
}
