import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export interface SearchResult {
    kind: 'dictionary' | 'lesson' | 'book';
    id: string;
    title: string;
    subtitle: string;
}

/**
 * Admin quick-search — goes through the caller's own RLS-scoped session
 * (createClient() from lib/supabase/server.ts), so an unauthenticated
 * request just gets empty results rather than leaking data.
 */
export async function GET(request: Request) {
    const q = new URL(request.url).searchParams.get('q')?.trim() ?? '';
    if (q.length < 2) return NextResponse.json({ results: [] });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ results: [] });

    const [words, lessons, books] = await Promise.all([
        supabase
            .from('dictionary_words')
            .select('id, word, type')
            .ilike('word', `%${q}%`)
            .limit(5),
        supabase
            .from('lessons')
            .select('id, title, category_id')
            .ilike('title', `%${q}%`)
            .limit(4),
        supabase
            .from('books')
            .select('slug, subtitle')
            .ilike('subtitle', `%${q}%`)
            .limit(3),
    ]);

    const results: SearchResult[] = [
        ...(words.data ?? []).map((w) => ({ kind: 'dictionary' as const, id: w.id, title: w.word, subtitle: w.type ?? '' })),
        ...(lessons.data ?? []).map((l) => ({ kind: 'lesson' as const, id: l.id, title: l.title, subtitle: l.category_id })),
        ...(books.data ?? []).map((b) => ({ kind: 'book' as const, id: b.slug, title: b.subtitle, subtitle: '' })),
    ];

    return NextResponse.json({ results });
}
