import Link from 'next/link';
import { requireStaffProfile } from '@/lib/supabase/auth';
import CategoryForm from '@/components/admin/CategoryForm';

const BLANK = { id: '', title: '', description: null, icon: null, color: null, sort_order: 0 };

export default async function NewCategoryPage() {
    await requireStaffProfile();

    return (
        <div>
            <Link href="/admin/lessons" className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Lessons
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">New category</h1>
            <CategoryForm category={BLANK} isNew />
        </div>
    );
}
