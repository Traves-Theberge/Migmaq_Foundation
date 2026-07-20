import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { BOOKS } from '@/lib/books/registry';
import type { LineToken } from '@/lib/books/types';
import T from '@/components/i18n/T';

export const metadata = {
    title: "Storybooks — Mi'gmaq Foundation",
    description: "Illustrated Mi'gmaq storybooks with speaker recordings and dictionary glosses.",
};

function plainText(tokens: LineToken[]): string {
    return tokens.map((t) => ('literal' in t ? t.literal : t.display ?? t.word)).join('');
}

export default function BooksIndexPage() {
    return (
        <div className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/education"
                    className="inline-flex items-center text-lg font-bold uppercase tracking-wide hover:text-accent-ink transition-colors group mb-10"
                >
                    <ArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-2 transition-transform" aria-hidden="true" />
                    <T ns="books" k="backToEducation" />
                </Link>

                <div className="mb-12 border-b-4 border-foreground pb-8">
                    <h1 className="text-5xl sm:text-8xl font-black tracking-tighter mb-4 uppercase"><T ns="books" k="title" /></h1>
                    <p className="text-xl sm:text-2xl font-medium max-w-2xl">
                        <T ns="books" k="intro" />
                    </p>
                </div>

                {BOOKS.length === 0 ? (
                    <p className="text-lg text-muted-foreground"><T ns="books" k="empty" /></p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {BOOKS.map((book) => (
                            <li key={book.slug}>
                                <Link
                                    href={`/education/books/${book.slug}`}
                                    className="block bg-accent text-foreground p-6 sm:p-10 border-4 border-foreground hover:-translate-y-2 transition-transform group"
                                >
                                    <div className="flex justify-between items-start mb-8 sm:mb-12">
                                        <div className="p-3 bg-white text-foreground border-2 border-foreground">
                                            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                                        </div>
                                        <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-black uppercase mb-2 tracking-tighter">
                                        {plainText(book.title)}
                                    </h2>
                                    <p className="text-base sm:text-lg italic opacity-80 mb-4">{book.subtitle}</p>
                                    <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">
                                        {book.teaser}
                                    </p>
                                    <p className="text-xs font-bold uppercase tracking-widest mt-6 opacity-90">
                                        {book.pages.length} <T ns="books" k="pages" />
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
