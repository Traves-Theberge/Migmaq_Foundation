"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, HomeIcon, ActivityIcon, DictionaryIcon, LessonsIcon, BooksIcon } from './icons';
import type { SearchResult } from '@/app/api/admin/search/route';

const PAGES = [
    { href: '/admin', label: 'Home', Icon: HomeIcon },
    { href: '/admin/activity', label: 'Activity', Icon: ActivityIcon },
];

const KIND_ICON: Record<SearchResult['kind'], typeof DictionaryIcon> = {
    dictionary: DictionaryIcon,
    lesson: LessonsIcon,
    book: BooksIcon,
};

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        if (open) {
            // Deferred to a microtask: an effect body shouldn't call
            // setState synchronously (react-hooks/set-state-in-effect) —
            // this resets the palette's search box each time it opens.
            queueMicrotask(() => {
                setQuery('');
                setResults([]);
            });
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [open]);

    useEffect(() => {
        if (query.trim().length < 2) { queueMicrotask(() => setResults([])); return; }
        const handle = setTimeout(() => {
            fetch(`/api/admin/search?q=${encodeURIComponent(query)}`)
                .then((r) => r.json())
                .then((data) => setResults(data.results ?? []))
                .catch(() => setResults([]));
        }, 200);
        return () => clearTimeout(handle);
    }, [query]);

    const go = (href: string) => {
        setOpen(false);
        router.push(href);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 bg-muted border-2 border-foreground text-foreground px-2.5 py-2 w-full text-left hover:bg-background transition-colors"
            >
                <SearchIcon className="opacity-60 shrink-0" />
                <span className="flex-1 text-xs opacity-75">Search everything…</span>
                <span className="text-[10px] font-bold opacity-60 border border-foreground rounded px-1.5 py-0.5">⌘K</span>
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-[200] flex items-start justify-center pt-[12vh] px-3"
                    onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
                >
                    <div role="dialog" aria-modal="true" aria-label="Search everything" className="w-full max-w-xl bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.35)] max-h-[60vh] flex flex-col">
                        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b-2 border-foreground">
                            <SearchIcon size={16} className="opacity-50 shrink-0" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                placeholder="Jump to a word, lesson, storybook, or page…"
                                autoComplete="off"
                                className="flex-1 outline-none bg-transparent text-[15px]"
                            />
                            <span className="text-[10px] font-bold opacity-50 border border-foreground rounded px-1.5 py-0.5">ESC</span>
                        </div>
                        <div className="overflow-y-auto p-2">
                            <div className="px-2.5 pt-2 pb-1 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">Pages</div>
                            {PAGES.map(({ href, label, Icon }) => (
                                <button
                                    key={href}
                                    type="button"
                                    onClick={() => go(href)}
                                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm hover:bg-muted rounded-sm text-left"
                                >
                                    <Icon size={15} className="opacity-60 shrink-0" />
                                    {label}
                                </button>
                            ))}

                            {results.length > 0 && (
                                <>
                                    {(['dictionary', 'lesson', 'book'] as const).map((kind) => {
                                        const items = results.filter((r) => r.kind === kind);
                                        if (items.length === 0) return null;
                                        const Icon = KIND_ICON[kind];
                                        const label = kind === 'dictionary' ? 'Dictionary' : kind === 'lesson' ? 'Lessons' : 'Storybooks';
                                        return (
                                            <div key={kind}>
                                                <div className="px-2.5 pt-3 pb-1 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
                                                {items.map((r) => (
                                                    <button
                                                        key={r.id}
                                                        type="button"
                                                        onClick={() => go(r.href)}
                                                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm hover:bg-muted rounded-sm text-left"
                                                    >
                                                        <Icon size={15} className="opacity-60 shrink-0" />
                                                        <span className="flex-1">{r.title}</span>
                                                        {r.subtitle && <span className="text-xs text-muted-foreground">{r.subtitle}</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </>
                            )}

                            {query.trim().length >= 2 && results.length === 0 && (
                                <p className="px-2.5 py-4 text-sm text-muted-foreground">No matches for &quot;{query}&quot;.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
