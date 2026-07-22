import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function BooksListPage({ searchParams }: PageProps) {
    await requireStaffProfile();
    const { q } = await searchParams;
    const supabase = await createClient();

    let bookQuery = supabase.from('books').select('slug, subtitle, teaser, sort_order').order('sort_order', { ascending: true });
    if (q) bookQuery = bookQuery.ilike('subtitle', `%${q.replace(/[%_\\]/g, (c) => `\\${c}`)}%`);

    const [{ data: books, error: booksError }, { data: pages }] = await Promise.all([
        bookQuery,
        supabase.from('book_pages').select('book_slug'),
    ]);
    if (booksError) console.error('BooksListPage: books query failed:', booksError);

    const pageCounts = new Map<string, number>();
    for (const p of pages ?? []) {
        pageCounts.set(p.book_slug, (pageCounts.get(p.book_slug) ?? 0) + 1);
    }

    return (
        <div>
            <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Storybooks</h1>
                    <p className="text-sm text-muted-foreground mt-1">{(books ?? []).length} books</p>
                </div>
                <Link href="/admin/books/new" className="bg-foreground text-background text-xs font-bold uppercase tracking-wide px-4 py-2.5 shrink-0 hover:opacity-90">
                    + New book
                </Link>
            </div>

            <form action="/admin/books" className="mb-5 max-w-sm">
                <label className="sr-only" htmlFor="q">Search storybooks</label>
                <input id="q" name="q" defaultValue={q ?? ''} placeholder="Search storybooks…" className="w-full border-2 border-foreground bg-card px-3 py-2 text-sm" />
            </form>

            <div className="border-[3px] border-foreground bg-card">
                {booksError ? (
                    <p className="text-sm font-bold text-secondary p-6 text-center" role="alert">
                        Couldn&apos;t load storybooks — try reloading the page.
                    </p>
                ) : (books ?? []).length === 0 ? (
                    <p className="text-sm text-muted-foreground p-6 text-center">{q ? 'No storybooks match.' : 'No storybooks yet.'}</p>
                ) : (
                    <div className="divide-y-2 divide-muted">
                        {(books ?? []).map((b) => (
                            <Link key={b.slug} href={`/admin/books/${b.slug}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold truncate">{b.subtitle}</div>
                                    {b.teaser && <div className="text-[11.5px] text-muted-foreground truncate">{b.teaser}</div>}
                                </div>
                                <span className="text-[11px] tabular-nums text-muted-foreground shrink-0">{pageCounts.get(b.slug) ?? 0} pages</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
