import Link from 'next/link';
import { requireStaffProfile } from '@/lib/supabase/auth';
import LessonForm from '@/components/admin/LessonForm';

interface PageProps {
    params: Promise<{ categoryId: string }>;
}

export default async function NewLessonPage({ params }: PageProps) {
    await requireStaffProfile();
    const { categoryId } = await params;
    const blank = { id: '', category_id: categoryId, title: '', description: null, difficulty: 'beginner' as const, estimated_minutes: null, sort_order: 0 };

    return (
        <div>
            <Link href={`/admin/lessons/${categoryId}`} className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Back to category
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">New lesson</h1>
            <LessonForm lesson={blank} isNew />
        </div>
    );
}
