import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function LessonsListPage({ searchParams }: PageProps) {
    await requireStaffProfile();
    const { q } = await searchParams;
    const supabase = await createClient();

    let categoryQuery = supabase.from('lesson_categories').select('id, title, description, sort_order').order('sort_order', { ascending: true });
    if (q) categoryQuery = categoryQuery.ilike('title', `%${q.replace(/[%_\\]/g, (c) => `\\${c}`)}%`);

    const [{ data: categories, error: categoriesError }, { data: lessons }] = await Promise.all([
        categoryQuery,
        supabase.from('lessons').select('id, category_id'),
    ]);
    if (categoriesError) console.error('LessonsListPage: categories query failed:', categoriesError);

    const lessonCounts = new Map<string, number>();
    for (const l of lessons ?? []) {
        lessonCounts.set(l.category_id, (lessonCounts.get(l.category_id) ?? 0) + 1);
    }

    return (
        <div>
            <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Lessons</h1>
                    <p className="text-sm text-muted-foreground mt-1">{(categories ?? []).length} categories · {(lessons ?? []).length} lessons</p>
                </div>
                <Link href="/admin/lessons/new" className="bg-foreground text-background text-xs font-bold uppercase tracking-wide px-4 py-2.5 shrink-0 hover:opacity-90">
                    + New category
                </Link>
            </div>

            <form action="/admin/lessons" className="mb-5 max-w-sm">
                <label className="sr-only" htmlFor="q">Search categories</label>
                <input id="q" name="q" defaultValue={q ?? ''} placeholder="Search categories…" className="w-full border-2 border-foreground bg-card px-3 py-2 text-sm" />
            </form>

            <div className="border-[3px] border-foreground bg-card">
                {categoriesError ? (
                    <p className="text-sm font-bold text-secondary p-6 text-center" role="alert">
                        Couldn&apos;t load categories — try reloading the page.
                    </p>
                ) : (categories ?? []).length === 0 ? (
                    <p className="text-sm text-muted-foreground p-6 text-center">{q ? 'No categories match.' : 'No categories yet.'}</p>
                ) : (
                    <div className="divide-y-2 divide-muted">
                        {(categories ?? []).map((c) => (
                            <Link key={c.id} href={`/admin/lessons/${c.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold truncate">{c.title}</div>
                                    {c.description && <div className="text-[11.5px] text-muted-foreground truncate">{c.description}</div>}
                                </div>
                                <span className="text-[11px] tabular-nums text-muted-foreground shrink-0">{lessonCounts.get(c.id) ?? 0} lessons</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
