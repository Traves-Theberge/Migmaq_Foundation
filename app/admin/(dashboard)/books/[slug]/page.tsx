import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import BookForm from '@/components/admin/BookForm';
import PageEditor from '@/components/admin/PageEditor';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BookDetailPage({ params }: PageProps) {
    await requireStaffProfile();
    const { slug } = await params;
    const supabase = await createClient();

    const [{ data: book }, { data: pages }] = await Promise.all([
        supabase.from('books').select('slug, title, subtitle, teaser, cover_image_alt, cover_image_url, note, gloss_overrides, sort_order').eq('slug', slug).single(),
        supabase.from('book_pages').select('id, sort_order, label, lines, image_alt, image_url').eq('book_slug', slug).order('sort_order', { ascending: true }),
    ]);

    if (!book) notFound();

    return (
        <div>
            <Link href="/admin/books" className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Storybooks
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">{book.subtitle}</h1>

            <BookForm book={book} isNew={false} />

            <div className="mt-9 max-w-2xl">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Pages</h2>
                <PageEditor bookSlug={slug} pages={pages ?? []} />
            </div>
        </div>
    );
}
