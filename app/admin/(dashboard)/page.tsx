import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

async function getStats() {
    const supabase = await createClient();

    const [
        words,
        frReviewed,
        frMissing,
        lessons,
        categories,
        books,
        audio,
        audioWords,
        recentActivity,
    ] = await Promise.all([
        supabase.from('dictionary_words').select('id', { count: 'exact', head: true }),
        supabase.from('dictionary_words').select('id', { count: 'exact', head: true }).eq('fr_reviewed', true),
        supabase.from('dictionary_words').select('word').is('fr_definitions', null).not('definitions', 'eq', '{}').limit(6),
        supabase.from('lessons').select('id', { count: 'exact', head: true }),
        supabase.from('lesson_categories').select('id', { count: 'exact', head: true }),
        supabase.from('books').select('slug', { count: 'exact', head: true }),
        supabase.from('audio_recordings').select('id', { count: 'exact', head: true }),
        supabase.from('audio_recordings').select('word'),
        supabase
            .from('audit_log')
            .select('id, table_name, record_id, action, actor_email, created_at')
            .order('created_at', { ascending: false })
            .limit(5),
    ]);

    const totalWords = words.count ?? 0;
    const reviewed = frReviewed.count ?? 0;

    return {
        totalWords,
        frReviewed: reviewed,
        frUnreviewedCount: totalWords - reviewed,
        frMissingWords: (frMissing.data ?? []).map((w) => w.word),
        lessons: lessons.count ?? 0,
        categories: categories.count ?? 0,
        books: books.count ?? 0,
        audioCount: audio.count ?? 0,
        audioWordsCovered: new Set((audioWords.data ?? []).map((r) => r.word)).size,
        recentActivity: recentActivity.data ?? [],
    };
}

function relativeTime(iso: string) {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.round(diffMs / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
}

const ACTION_LABEL: Record<string, string> = { insert: 'Created', update: 'Updated', delete: 'Deleted' };

export default async function AdminHomePage() {
    const profile = await requireStaffProfile();
    const stats = await getStats();
    const firstName = profile.email.split('@')[0];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-black uppercase tracking-tight">Welcome back, {firstName}</h1>
                <p className="text-sm text-muted-foreground mt-1">Here&apos;s what&apos;s happening across the site.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-7">
                <StatTile label="Words" value={stats.totalWords} href="/admin/dictionary" />
                <StatTile label="FR unreviewed" value={stats.frUnreviewedCount} href="/admin/dictionary" warn note="needs a human pass" />
                <StatTile label="Lessons" value={stats.lessons} href="/admin/lessons" note={`${stats.categories} categories`} />
                <StatTile label="Storybooks" value={stats.books} href="/admin/books" />
                <StatTile label="Recordings" value={stats.audioCount} href="/admin/audio" note={`${stats.audioWordsCovered} words covered`} />
            </div>

            <div className="grid md:grid-cols-[1.3fr_1fr] gap-5 items-start">
                <div className="border-[3px] border-foreground bg-card p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3.5">Needs attention</h3>
                    <div className="flex flex-col">
                        {stats.frMissingWords.length > 0 && (
                            <AttentionRow
                                dotClass="bg-accent"
                                title={`${stats.frMissingWords.length}+ words have no French translation yet`}
                                sub={stats.frMissingWords.join(', ')}
                                href="/admin/dictionary?filter=missing-fr"
                                cta="View"
                            />
                        )}
                        <AttentionRow
                            dotClass="bg-muted-foreground"
                            title="Some lesson phrases may have no audio recording"
                            sub="Checked automatically by data:validate-lessons — run it locally for the exact list."
                            href="/admin/lessons"
                            cta="View"
                        />
                        {stats.frMissingWords.length === 0 && (
                            <p className="text-sm text-muted-foreground py-2">Nothing flagged right now.</p>
                        )}
                    </div>
                </div>

                <div className="border-[3px] border-foreground bg-card p-5">
                    <div className="flex items-center justify-between mb-3.5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent activity</h3>
                        <Link href="/admin/activity" className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                            View all →
                        </Link>
                    </div>
                    {stats.recentActivity.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2">No changes logged yet.</p>
                    ) : (
                        <div className="flex flex-col">
                            {stats.recentActivity.map((row) => (
                                <div key={row.id} className="flex items-center gap-2.5 py-2 border-b border-muted last:border-0 text-[12.5px]">
                                    <span className={`text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 shrink-0 ${
                                        row.action === 'insert' ? 'bg-success/10 text-success' : row.action === 'delete' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                                    }`}>
                                        {ACTION_LABEL[row.action] ?? row.action}
                                    </span>
                                    <span className="flex-1 min-w-0 truncate">
                                        {row.actor_email ?? 'System'} · {row.table_name}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground shrink-0">{relativeTime(row.created_at)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatTile({ label, value, href, note, warn }: { label: string; value: number; href: string; note?: string; warn?: boolean }) {
    return (
        <Link
            href={href}
            className={`block border-[3px] border-foreground p-4 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${warn ? 'bg-accent/15' : 'bg-card'}`}
        >
            <div className={`text-[10.5px] font-bold uppercase tracking-wider mb-2 ${warn ? 'text-accent-ink' : 'text-muted-foreground'}`}>{label}</div>
            <div className="font-display font-black text-3xl tabular-nums leading-none">{value.toLocaleString('en-US')}</div>
            {note && <div className="text-[11px] text-muted-foreground mt-1.5">{note}</div>}
        </Link>
    );
}

function AttentionRow({ dotClass, title, sub, href, cta }: { dotClass: string; title: string; sub: string; href: string; cta: string }) {
    return (
        <Link href={href} className="flex items-start gap-3 py-2.5 border-b border-muted last:border-0 hover:bg-muted -mx-1 px-1">
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotClass}`} />
            <div className="flex-1 min-w-0">
                <div className="text-sm font-bold">{title}</div>
                <div className="text-[11.5px] text-muted-foreground mt-0.5">{sub}</div>
            </div>
            <span className="text-[11px] font-bold text-primary shrink-0 mt-0.5">{cta} →</span>
        </Link>
    );
}
