import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBook, BOOKS } from '@/lib/books/registry';
import { resolveBookWords } from '@/lib/books/resolve';
import StoryBook from '@/components/storybook/StoryBook';

export function generateStaticParams() {
    return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const book = getBook(slug);
    if (!book) return {};
    return {
        title: `${book.subtitle} — Mi'gmaq Foundation`,
        description: book.teaser,
    };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const book = getBook(slug);
    if (!book) notFound();

    const glosses = await resolveBookWords(book);

    return (
        <div className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto mb-10">
                <Link
                    href="/education/books"
                    className="inline-flex items-center text-lg font-bold uppercase tracking-wide hover:text-accent-ink transition-colors group"
                >
                    <ArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-2 transition-transform" />
                    All Storybooks
                </Link>
            </div>
            <StoryBook book={book} glosses={glosses} />
        </div>
    );
}
