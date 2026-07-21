import { NextResponse } from 'next/server';
import { createApiClient } from '@/lib/supabase/api-auth';
import { AdminSearchQuerySchema, AdminSearchResponseSchema, type SearchResultSchema } from '@/lib/validation/admin-search';
import type { z } from 'zod';

export type SearchResult = z.infer<typeof SearchResultSchema>;

/** Escapes ilike's own wildcard characters so a literal `%` or `_` in a user's search text is matched literally, not as a wildcard. */
function escapeIlike(value: string): string {
    return value.replace(/[%_\\]/g, (char) => `\\${char}`);
}

/**
 * Admin quick-search — accepts either the admin UI's session cookie or an
 * `Authorization: Bearer` token (see lib/supabase/api-auth.ts) and goes
 * through the caller's own RLS-scoped session either way, so an
 * unauthenticated request just gets empty results rather than leaking data.
 */
export async function GET(request: Request) {
    const parsed = AdminSearchQuerySchema.safeParse({
        q: new URL(request.url).searchParams.get('q') ?? '',
    });
    const q = parsed.success ? parsed.data.q : '';
    if (q.length < 2) return NextResponse.json(AdminSearchResponseSchema.parse({ results: [] }));

    const { supabase, user } = await createApiClient(request);
    if (!user) return NextResponse.json(AdminSearchResponseSchema.parse({ results: [] }));

    const pattern = `%${escapeIlike(q)}%`;
    const [words, lessons, books] = await Promise.all([
        supabase
            .from('dictionary_words')
            .select('id, word, type')
            .ilike('word', pattern)
            .limit(5),
        supabase
            .from('lessons')
            .select('id, title, category_id')
            .ilike('title', pattern)
            .limit(4),
        supabase
            .from('books')
            .select('slug, subtitle')
            .ilike('subtitle', pattern)
            .limit(3),
    ]);

    const results: SearchResult[] = [
        ...(words.data ?? []).map((w) => ({ kind: 'dictionary' as const, id: w.id, title: w.word, subtitle: w.type ?? '' })),
        ...(lessons.data ?? []).map((l) => ({ kind: 'lesson' as const, id: l.id, title: l.title, subtitle: l.category_id })),
        ...(books.data ?? []).map((b) => ({ kind: 'book' as const, id: b.slug, title: b.subtitle, subtitle: '' })),
    ];

    return NextResponse.json(AdminSearchResponseSchema.parse({ results }));
}
