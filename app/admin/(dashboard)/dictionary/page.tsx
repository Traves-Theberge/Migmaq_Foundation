import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 40;

interface PageProps {
    searchParams: Promise<{ q?: string; filter?: string; page?: string }>;
}

export default async function DictionaryListPage({ searchParams }: PageProps) {
    await requireStaffProfile();
    const { q, filter, page: pageParam } = await searchParams;
    const page = Math.max(1, Number(pageParam) || 1);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const supabase = await createClient();
    let query = supabase
        .from('dictionary_words')
        .select('id, word, type, translations, fr_definitions, fr_reviewed', { count: 'exact' })
        .order('word', { ascending: true })
        .range(from, to);

    if (q) query = query.ilike('word', `%${q.replace(/[%_\\]/g, (c) => `\\${c}`)}%`);
    if (filter === 'missing-fr') query = query.is('fr_definitions', null);
    if (filter === 'unreviewed') query = query.eq('fr_reviewed', false).not('fr_definitions', 'is', null);

    const { data, count, error } = await query;
    if (error) console.error('DictionaryListPage: words query failed:', error);
    const words = data ?? [];
    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const withParam = (overrides: Record<string, string | undefined>) => {
        const params = new URLSearchParams();
        const next = { q, filter, page: undefined as string | undefined, ...overrides };
        if (next.q) params.set('q', next.q);
        if (next.filter) params.set('filter', next.filter);
        if (next.page) params.set('page', next.page);
        const qs = params.toString();
        return qs ? `/admin/dictionary?${qs}` : '/admin/dictionary';
    };

    return (
        <div>
            <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Dictionary</h1>
                    <p className="text-sm text-muted-foreground mt-1">{total.toLocaleString('en-US')} words</p>
                </div>
                <Link href="/admin/dictionary/new" className="bg-foreground text-background text-xs font-bold uppercase tracking-wide px-4 py-2.5 shrink-0 hover:opacity-90">
                    + New word
                </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-5">
                <form action="/admin/dictionary" className="flex-1 min-w-[220px]">
                    {filter && <input type="hidden" name="filter" value={filter} />}
                    <label className="sr-only" htmlFor="q">Search words</label>
                    <input
                        id="q"
                        name="q"
                        defaultValue={q ?? ''}
                        placeholder="Search words…"
                        className="w-full border-2 border-foreground bg-card px-3 py-2 text-sm"
                    />
                </form>
                <FilterChip label="All" active={!filter} href={withParam({ filter: undefined, page: undefined })} />
                <FilterChip label="Missing French" active={filter === 'missing-fr'} href={withParam({ filter: 'missing-fr', page: undefined })} />
                <FilterChip label="Unreviewed" active={filter === 'unreviewed'} href={withParam({ filter: 'unreviewed', page: undefined })} />
            </div>

            <div className="border-[3px] border-foreground bg-card">
                {error ? (
                    <p className="text-sm font-bold text-secondary p-6 text-center" role="alert">
                        Couldn&apos;t load the dictionary — try reloading the page.
                    </p>
                ) : words.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-6 text-center">No words match.</p>
                ) : (
                    <div className="divide-y-2 divide-muted">
                        {words.map((w) => (
                            <Link key={w.id} href={`/admin/dictionary/${w.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold truncate">{w.word}</div>
                                    <div className="text-[11.5px] text-muted-foreground truncate">
                                        {w.type ?? '—'} · {(w.translations ?? []).join(', ') || 'No translation yet'}
                                    </div>
                                </div>
                                {!w.fr_definitions?.length ? (
                                    <span className="text-[10.5px] font-bold uppercase tracking-wide bg-accent/15 text-accent-ink rounded-full px-2 py-0.5 shrink-0">No French</span>
                                ) : !w.fr_reviewed ? (
                                    <span className="text-[10.5px] font-bold uppercase tracking-wide bg-primary/10 text-primary rounded-full px-2 py-0.5 shrink-0">Unreviewed</span>
                                ) : (
                                    <span className="text-[10.5px] font-bold uppercase tracking-wide bg-success/10 text-success rounded-full px-2 py-0.5 shrink-0">Reviewed</span>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-xs font-bold uppercase tracking-wide">
                    <Link href={withParam({ page: String(page - 1) })} aria-disabled={page <= 1} className={page <= 1 ? 'pointer-events-none opacity-30' : 'text-primary hover:underline'}>
                        ← Previous
                    </Link>
                    <span className="text-muted-foreground normal-case font-normal">Page {page} of {totalPages}</span>
                    <Link href={withParam({ page: String(page + 1) })} aria-disabled={page >= totalPages} className={page >= totalPages ? 'pointer-events-none opacity-30' : 'text-primary hover:underline'}>
                        Next →
                    </Link>
                </div>
            )}
        </div>
    );
}

function FilterChip({ label, active, href }: { label: string; active: boolean; href: string }) {
    return (
        <Link
            href={href}
            aria-pressed={active}
            className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-full border-2 transition-colors shrink-0 ${
                active ? 'bg-foreground text-background border-foreground' : 'border-muted text-muted-foreground hover:border-foreground hover:text-foreground'
            }`}
        >
            {label}
        </Link>
    );
}
