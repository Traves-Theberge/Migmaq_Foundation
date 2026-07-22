import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import AudioRecordingEditor from '@/components/admin/AudioRecordingEditor';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 30;

interface PageProps {
    searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function AudioListPage({ searchParams }: PageProps) {
    await requireStaffProfile();
    const { q, page: pageParam } = await searchParams;
    const page = Math.max(1, Number(pageParam) || 1);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const supabase = await createClient();
    let query = supabase
        .from('audio_recordings')
        .select('id, word, file, speaker, kind, url', { count: 'exact' })
        .order('word', { ascending: true })
        .range(from, to);

    if (q) query = query.ilike('word', `%${q.replace(/[%_\\]/g, (c) => `\\${c}`)}%`);

    const { data, count } = await query;
    const recordings = data ?? [];
    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const withParam = (overrides: Record<string, string | undefined>) => {
        const params = new URLSearchParams();
        const next = { q, page: undefined as string | undefined, ...overrides };
        if (next.q) params.set('q', next.q);
        if (next.page) params.set('page', next.page);
        const qs = params.toString();
        return qs ? `/admin/audio?${qs}` : '/admin/audio';
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-black uppercase tracking-tight">Audio</h1>
                <p className="text-sm text-muted-foreground mt-1">{total.toLocaleString('en-US')} recordings</p>
            </div>

            <form action="/admin/audio" className="mb-5 max-w-sm">
                <label className="sr-only" htmlFor="q">Search by word</label>
                <input id="q" name="q" defaultValue={q ?? ''} placeholder="Search by word…" className="w-full border-2 border-foreground bg-card px-3 py-2 text-sm" />
            </form>

            <AudioRecordingEditor recordings={recordings} />

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-5 text-xs font-bold uppercase tracking-wide">
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
