"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveBookAction, deleteBookAction, type FormState } from '@/app/admin/books/actions';
import { useToast } from './ToastProvider';

const initialState: FormState = {};
const fieldClass = 'w-full border-2 border-foreground bg-card px-3 py-2 text-sm font-medium';
const monoFieldClass = 'w-full border-2 border-foreground bg-card px-3 py-2 text-xs font-mono';
const labelClass = 'block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5';

export interface BookFormValues {
    slug: string;
    title: unknown;
    subtitle: string;
    teaser: string | null;
    cover_image_alt: string | null;
    cover_image_url: string | null;
    note: string | null;
    gloss_overrides: unknown;
    sort_order: number;
}

export default function BookForm({ book, isNew }: { book: BookFormValues; isNew: boolean }) {
    const [state, formAction] = useActionState(saveBookAction, initialState);
    const showToast = useToast();
    const router = useRouter();
    const lastErrorRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (state.error && state.error !== lastErrorRef.current) {
            lastErrorRef.current = state.error;
            showToast(state.error);
        } else if (state !== initialState && !state.error && !isNew) {
            showToast('Saved');
        }
    }, [state, showToast, isNew]);

    return (
        <form action={formAction} className="flex flex-col gap-5 max-w-2xl">
            {isNew && <input type="hidden" name="_new" value="1" />}

            <div>
                <label className={labelClass} htmlFor="slug">Slug</label>
                <input id="slug" name="slug" defaultValue={book.slug} disabled={!isNew} required className={`${fieldClass} disabled:opacity-60`} />
            </div>
            <div>
                <label className={labelClass} htmlFor="title">
                    Title tokens (JSON — array of <code>{'{ word }'}</code> or <code>{'{ literal }'}</code>)
                </label>
                <textarea id="title" name="title" rows={2} defaultValue={JSON.stringify(book.title ?? [], null, 2)} className={monoFieldClass} />
            </div>
            <div>
                <label className={labelClass} htmlFor="subtitle">Subtitle</label>
                <input id="subtitle" name="subtitle" defaultValue={book.subtitle} required className={fieldClass} />
            </div>
            <div>
                <label className={labelClass} htmlFor="teaser">Teaser</label>
                <textarea id="teaser" name="teaser" rows={2} defaultValue={book.teaser ?? ''} className={fieldClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className={labelClass} htmlFor="cover_image_alt">Cover image alt text</label>
                    <input id="cover_image_alt" name="cover_image_alt" defaultValue={book.cover_image_alt ?? ''} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="cover_image_url">Cover image URL</label>
                    <input id="cover_image_url" name="cover_image_url" type="url" defaultValue={book.cover_image_url ?? ''} className={fieldClass} />
                </div>
            </div>
            <div>
                <label className={labelClass} htmlFor="note">Closing note</label>
                <textarea id="note" name="note" rows={2} defaultValue={book.note ?? ''} className={fieldClass} />
            </div>
            <div>
                <label className={labelClass} htmlFor="gloss_overrides">
                    Gloss overrides (JSON — <code>{'{ "word": { "gloss": "…" } }'}</code>)
                </label>
                <textarea id="gloss_overrides" name="gloss_overrides" rows={3} defaultValue={JSON.stringify(book.gloss_overrides ?? {}, null, 2)} className={monoFieldClass} />
            </div>
            <div>
                <label className={labelClass} htmlFor="sort_order">Sort order</label>
                <input id="sort_order" name="sort_order" type="number" defaultValue={book.sort_order} className={fieldClass} />
            </div>

            <div className="flex items-center gap-3 pt-2 border-t-2 border-muted">
                <button type="submit" className="bg-foreground text-background text-xs font-bold uppercase tracking-wide px-5 py-2.5 hover:opacity-90">
                    {isNew ? 'Create book' : 'Save changes'}
                </button>
                {!isNew && (
                    <button
                        type="button"
                        onClick={async () => {
                            if (!confirm(`Delete "${book.subtitle}" and every page inside it? This can't be undone.`)) return;
                            const result = await deleteBookAction(book.slug);
                            if (result.error) {
                                showToast(result.error);
                                return;
                            }
                            router.push('/admin/books');
                        }}
                        className="text-xs font-bold uppercase tracking-wide text-secondary hover:underline ml-auto"
                    >
                        Delete book
                    </button>
                )}
            </div>
        </form>
    );
}
