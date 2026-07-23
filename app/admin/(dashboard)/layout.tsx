import { requireStaffProfile } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminViewTransition from '@/components/admin/AdminViewTransition';
import ToastProvider from '@/components/admin/ToastProvider';
import { logError } from '@/lib/log';

export const metadata = {
    title: 'Admin',
};

async function getNavCounts() {
    const supabase = await createClient();

    const [dictionary, lessons, books, audio, frNeedsReview] = await Promise.all([
        supabase.from('dictionary_words').select('id', { count: 'exact', head: true }),
        supabase.from('lessons').select('id', { count: 'exact', head: true }),
        supabase.from('books').select('slug', { count: 'exact', head: true }),
        supabase.from('audio_recordings').select('id', { count: 'exact', head: true }),
        supabase.from('dictionary_words').select('id', { count: 'exact', head: true }).eq('fr_reviewed', false).not('fr_definitions', 'is', null),
    ]);

    // A failed count query silently degrading to a "0" badge (rather than
    // an error) is fine for the UI — it's not worth a banner on every admin
    // page for a sidebar count — but it should never be silent in the
    // server logs, or a DB outage looks identical to "nothing here yet."
    for (const [label, result] of [
        ['dictionary', dictionary], ['lessons', lessons], ['books', books],
        ['audio', audio], ['dictionaryNeedsReview', frNeedsReview],
    ] as const) {
        if (result.error) logError('getNavCounts', `${label} query failed`, result.error);
    }

    return {
        dictionary: dictionary.count ?? 0,
        lessons: lessons.count ?? 0,
        books: books.count ?? 0,
        audio: audio.count ?? 0,
        // Words with an FR translation still awaiting human review — the one
        // count that's genuinely actionable from the sidebar (Activity is a
        // historical log, not a to-do list, so it doesn't get a badge).
        dictionaryNeedsReview: frNeedsReview.count ?? 0,
    };
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const profile = await requireStaffProfile();
    const counts = await getNavCounts();

    return (
        <ToastProvider>
            <div className="md:grid md:grid-cols-[232px_1fr] min-h-screen">
                <AdminSidebar profile={profile} counts={counts} />
                <main className="min-w-0 bg-background px-4 py-7 md:px-9 md:py-8 pb-16">
                    <AdminViewTransition>{children}</AdminViewTransition>
                </main>
            </div>
        </ToastProvider>
    );
}
