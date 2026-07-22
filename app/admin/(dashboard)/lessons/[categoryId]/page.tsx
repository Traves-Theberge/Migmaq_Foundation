import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import CategoryForm from '@/components/admin/CategoryForm';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ categoryId: string }>;
}

export default async function CategoryDetailPage({ params }: PageProps) {
    await requireStaffProfile();
    const { categoryId } = await params;
    const supabase = await createClient();

    const [{ data: category }, { data: lessons }] = await Promise.all([
        supabase.from('lesson_categories').select('id, title, description, icon, color, sort_order').eq('id', categoryId).single(),
        supabase.from('lessons').select('id, title, difficulty, sort_order').eq('category_id', categoryId).order('sort_order', { ascending: true }),
    ]);

    if (!category) notFound();

    return (
        <div>
            <Link href="/admin/lessons" className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Lessons
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">{category.title}</h1>

            <CategoryForm category={category} isNew={false} />

            <div className="mt-9 max-w-xl">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lessons in this category</h2>
                    <Link href={`/admin/lessons/${category.id}/new`} className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                        + New lesson
                    </Link>
                </div>
                <div className="border-[3px] border-foreground bg-card">
                    {(lessons ?? []).length === 0 ? (
                        <p className="text-sm text-muted-foreground p-5 text-center">No lessons yet.</p>
                    ) : (
                        <div className="divide-y-2 divide-muted">
                            {(lessons ?? []).map((l) => (
                                <Link key={l.id} href={`/admin/lessons/${category.id}/${l.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                                    <span className="flex-1 text-sm font-bold truncate">{l.title}</span>
                                    <span className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground shrink-0">{l.difficulty}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
