import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import LessonForm from '@/components/admin/LessonForm';
import StepEditor from '@/components/admin/StepEditor';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ categoryId: string; lessonId: string }>;
}

export default async function LessonDetailPage({ params }: PageProps) {
    await requireStaffProfile();
    const { categoryId, lessonId } = await params;
    const supabase = await createClient();

    const [{ data: lesson }, { data: steps }] = await Promise.all([
        supabase.from('lessons').select('id, category_id, title, description, difficulty, estimated_minutes, sort_order').eq('id', lessonId).single(),
        supabase.from('lesson_steps').select('id, sort_order, type, term, translation, pronunciation, description').eq('lesson_id', lessonId).order('sort_order', { ascending: true }),
    ]);

    if (!lesson || lesson.category_id !== categoryId) notFound();

    return (
        <div>
            <Link href={`/admin/lessons/${categoryId}`} className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Back to category
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">{lesson.title}</h1>

            <LessonForm lesson={lesson} isNew={false} />

            <div className="mt-9 max-w-xl">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Steps</h2>
                <StepEditor lessonId={lessonId} categoryId={categoryId} steps={steps ?? []} />
            </div>
        </div>
    );
}
