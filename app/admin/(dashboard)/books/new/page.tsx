import Link from 'next/link';
import { requireStaffProfile } from '@/lib/supabase/auth';
import BookForm from '@/components/admin/BookForm';

const BLANK = {
    slug: '',
    title: [],
    subtitle: '',
    teaser: null,
    cover_image_alt: null,
    cover_image_url: null,
    note: null,
    gloss_overrides: {},
    sort_order: 0,
};

export default async function NewBookPage() {
    await requireStaffProfile();

    return (
        <div>
            <Link href="/admin/books" className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Storybooks
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">New book</h1>
            <BookForm book={BLANK} isNew />
        </div>
    );
}
