import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import { relativeTime, AUDIT_ACTION_LABEL, AUDIT_TABLE_LABEL } from '@/lib/admin/format';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 30;
const FILTERABLE_TABLES = Object.keys(AUDIT_TABLE_LABEL);

interface AuditRow {
    id: string;
    table_name: string;
    record_id: string;
    action: 'insert' | 'update' | 'delete';
    actor_email: string | null;
    diff: { old?: Record<string, unknown>; new?: Record<string, unknown> };
    created_at: string;
}

/** Update rows show which fields actually changed, ignoring bookkeeping columns nobody cares to see diffed. */
const IGNORED_DIFF_KEYS = new Set(['updated_at', 'updated_by', 'created_at', 'created_by']);

function changedFields(row: AuditRow): string[] {
    if (row.action !== 'update' || !row.diff.old || !row.diff.new) return [];
    const keys = new Set([...Object.keys(row.diff.old), ...Object.keys(row.diff.new)]);
    const changed: string[] = [];
    for (const key of keys) {
        if (IGNORED_DIFF_KEYS.has(key)) continue;
        if (JSON.stringify(row.diff.old[key]) !== JSON.stringify(row.diff.new[key])) changed.push(key);
    }
    return changed;
}

interface PageProps {
    searchParams: Promise<{ table?: string; action?: string; page?: string }>;
}

export default async function ActivityPage({ searchParams }: PageProps) {
    await requireStaffProfile();
    const { table, action, page: pageParam } = await searchParams;
    const page = Math.max(1, Number(pageParam) || 1);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const supabase = await createClient();
    let query = supabase
        .from('audit_log')
        .select('id, table_name, record_id, action, actor_email, diff, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (table) query = query.eq('table_name', table);
    if (action === 'insert' || action === 'update' || action === 'delete') query = query.eq('action', action);

    const { data, count } = await query;
    const rows = (data ?? []) as unknown as AuditRow[];
    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const withParam = (overrides: Record<string, string | undefined>) => {
        const params = new URLSearchParams();
        const next = { table, action, page: undefined as string | undefined, ...overrides };
        if (next.table) params.set('table', next.table);
        if (next.action) params.set('action', next.action);
        if (next.page) params.set('page', next.page);
        const qs = params.toString();
        return qs ? `/admin/activity?${qs}` : '/admin/activity';
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-black uppercase tracking-tight">Activity</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    A full history of every content change — {total.toLocaleString('en-US')} events logged.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-5">
                <FilterChip label="All content" active={!table} href={withParam({ table: undefined, page: undefined })} />
                {FILTERABLE_TABLES.map((t) => (
                    <FilterChip key={t} label={AUDIT_TABLE_LABEL[t]} active={table === t} href={withParam({ table: t, page: undefined })} />
                ))}
                <span className="w-px h-5 bg-muted mx-1" />
                {(['insert', 'update', 'delete'] as const).map((a) => (
                    <FilterChip
                        key={a}
                        label={AUDIT_ACTION_LABEL[a]}
                        active={action === a}
                        href={withParam({ action: action === a ? undefined : a, page: undefined })}
                    />
                ))}
            </div>

            <div className="border-[3px] border-foreground bg-card">
                {rows.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-6 text-center">No matching activity.</p>
                ) : (
                    <div className="divide-y-2 divide-muted">
                        {rows.map((row) => {
                            const fields = changedFields(row);
                            return (
                                <div key={row.id} className="flex items-start gap-3 px-4 py-3">
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 shrink-0 mt-0.5 ${
                                            row.action === 'insert'
                                                ? 'bg-success/10 text-success'
                                                : row.action === 'delete'
                                                  ? 'bg-secondary/10 text-secondary'
                                                  : 'bg-primary/10 text-primary'
                                        }`}
                                    >
                                        {AUDIT_ACTION_LABEL[row.action] ?? row.action}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold truncate">
                                            {AUDIT_TABLE_LABEL[row.table_name] ?? row.table_name}{' '}
                                            <span className="font-normal text-muted-foreground">· {row.record_id}</span>
                                        </div>
                                        <div className="text-[11.5px] text-muted-foreground mt-0.5">
                                            {row.actor_email ?? 'System'}
                                            {fields.length > 0 && <> · changed {fields.join(', ')}</>}
                                        </div>
                                    </div>
                                    <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5" title={new Date(row.created_at).toLocaleString()}>
                                        {relativeTime(row.created_at)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-xs font-bold uppercase tracking-wide">
                    <Link
                        href={withParam({ page: String(page - 1) })}
                        aria-disabled={page <= 1}
                        className={page <= 1 ? 'pointer-events-none opacity-30' : 'text-primary hover:underline'}
                    >
                        ← Newer
                    </Link>
                    <span className="text-muted-foreground normal-case font-normal">
                        Page {page} of {totalPages}
                    </span>
                    <Link
                        href={withParam({ page: String(page + 1) })}
                        aria-disabled={page >= totalPages}
                        className={page >= totalPages ? 'pointer-events-none opacity-30' : 'text-primary hover:underline'}
                    >
                        Older →
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
            className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-full border-2 transition-colors ${
                active ? 'bg-foreground text-background border-foreground' : 'border-muted text-muted-foreground hover:border-foreground hover:text-foreground'
            }`}
        >
            {label}
        </Link>
    );
}
