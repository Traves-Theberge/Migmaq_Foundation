import Link from 'next/link';
import { Search } from 'lucide-react';
import T from '@/components/i18n/T';

export default function WordNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full text-center">
                <h1 className="text-4xl sm:text-5xl font-black uppercase mb-4"><T ns="dictionaryWord" k="wordNotFound" /></h1>
                <p className="text-lg text-muted-foreground mb-8">
                    <T ns="dictionaryWord" k="wordNotFoundBody" />
                </p>
                <Link
                    href="/dictionary"
                    className="inline-flex items-center px-5 py-3 bg-foreground text-background font-bold uppercase text-sm hover:bg-accent hover:text-foreground transition-colors"
                >
                    <Search className="w-4 h-4 mr-2" aria-hidden="true" />
                    <T ns="dictionaryWord" k="searchTheArchive" />
                </Link>
            </div>
        </div>
    );
}
