"use client";

import { useActionState, useEffect, useRef, useState } from 'react';
import { savePageAction, deletePageAction, movePageAction, type FormState } from '@/app/admin/books/actions';
import { useToast } from './ToastProvider';

const initialState: FormState = {};
const fieldClass = 'w-full border-2 border-foreground bg-background px-2.5 py-1.5 text-sm';
const monoFieldClass = 'w-full border-2 border-foreground bg-background px-2.5 py-1.5 text-xs font-mono';
const labelClass = 'block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1';

export interface PageValues {
    id: string;
    sort_order: number;
    label: string;
    lines: unknown;
    image_alt: string;
    image_url: string | null;
}

export default function PageEditor({ bookSlug, pages }: { bookSlug: string; pages: PageValues[] }) {
    const [adding, setAdding] = useState(false);
    const nextSortOrder = pages.length > 0 ? Math.max(...pages.map((p) => p.sort_order)) + 1 : 0;

    return (
        <div className="flex flex-col gap-3">
            {pages.map((page, i) => (
                <PageRow key={page.id} page={page} bookSlug={bookSlug} canMoveUp={i > 0} canMoveDown={i < pages.length - 1} />
            ))}
            {pages.length === 0 && !adding && <p className="text-sm text-muted-foreground">No pages yet.</p>}

            {adding ? (
                <div className="border-2 border-dashed border-foreground/40 p-4">
                    <PageFields bookSlug={bookSlug} defaultSortOrder={nextSortOrder} onDone={() => setAdding(false)} />
                </div>
            ) : (
                <button type="button" onClick={() => setAdding(true)} className="self-start text-xs font-bold uppercase tracking-wide text-primary hover:underline">
                    + Add page
                </button>
            )}
        </div>
    );
}

function PageRow({ page, bookSlug, canMoveUp, canMoveDown }: { page: PageValues; bookSlug: string; canMoveUp: boolean; canMoveDown: boolean }) {
    const [editing, setEditing] = useState(false);
    const showToast = useToast();

    if (editing) {
        return (
            <div className="border-2 border-foreground p-4">
                <PageFields bookSlug={bookSlug} page={page} onDone={() => setEditing(false)} />
            </div>
        );
    }

    const lineCount = Array.isArray(page.lines) ? page.lines.length : 0;

    return (
        <div className="flex items-start gap-3 border-2 border-muted p-3">
            <div className="flex flex-col shrink-0 gap-0.5 pt-0.5">
                <button type="button" disabled={!canMoveUp} onClick={() => movePageAction(page.id, bookSlug, 'up')} className="w-5 h-5 flex items-center justify-center disabled:opacity-20" aria-label="Move page up">▲</button>
                <button type="button" disabled={!canMoveDown} onClick={() => movePageAction(page.id, bookSlug, 'down')} className="w-5 h-5 flex items-center justify-center disabled:opacity-20" aria-label="Move page down">▼</button>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">{page.label}</p>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">{lineCount} line{lineCount === 1 ? '' : 's'} · {page.image_alt}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={() => setEditing(true)} className="text-[11px] font-bold uppercase tracking-wide text-primary hover:underline">Edit</button>
                <button
                    type="button"
                    onClick={async () => {
                        if (!confirm('Delete this page?')) return;
                        const result = await deletePageAction(page.id, bookSlug);
                        if (result.error) showToast(result.error);
                    }}
                    className="text-[11px] font-bold uppercase tracking-wide text-secondary hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function PageFields({ bookSlug, page, defaultSortOrder, onDone }: { bookSlug: string; page?: PageValues; defaultSortOrder?: number; onDone: () => void }) {
    const [state, formAction] = useActionState(savePageAction, initialState);
    const showToast = useToast();
    const lastErrorRef = useRef<string | undefined>(undefined);
    const doneRef = useRef(false);

    useEffect(() => {
        if (state.error && state.error !== lastErrorRef.current) {
            lastErrorRef.current = state.error;
            showToast(state.error);
        } else if (state !== initialState && !state.error && !doneRef.current) {
            doneRef.current = true;
            showToast(page ? 'Page saved' : 'Page added');
            onDone();
        }
    }, [state, showToast, onDone, page]);

    const uid = page?.id ?? 'new';

    return (
        <form action={formAction} className="flex flex-col gap-3">
            {page && <input type="hidden" name="id" value={page.id} />}
            <input type="hidden" name="book_slug" value={bookSlug} />
            <input type="hidden" name="sort_order" value={page?.sort_order ?? defaultSortOrder ?? 0} />

            <div>
                <label className={labelClass} htmlFor={`label-${uid}`}>Label</label>
                <input id={`label-${uid}`} name="label" defaultValue={page?.label ?? ''} required className={fieldClass} />
            </div>
            <div>
                <label className={labelClass} htmlFor={`lines-${uid}`}>
                    Lines (JSON — array of <code>{'{ mikmaq: [...], english }'}</code>)
                </label>
                <textarea id={`lines-${uid}`} name="lines" rows={4} defaultValue={JSON.stringify(page?.lines ?? [], null, 2)} className={monoFieldClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                <div>
                    <label className={labelClass} htmlFor={`image_alt-${uid}`}>Image alt text</label>
                    <input id={`image_alt-${uid}`} name="image_alt" defaultValue={page?.image_alt ?? ''} required className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor={`image_url-${uid}`}>Image URL</label>
                    <input id={`image_url-${uid}`} name="image_url" type="url" defaultValue={page?.image_url ?? ''} className={fieldClass} />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button type="submit" className="bg-foreground text-background text-[11px] font-bold uppercase tracking-wide px-4 py-2 hover:opacity-90">
                    {page ? 'Save page' : 'Add page'}
                </button>
                <button type="button" onClick={onDone} className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground hover:underline">
                    Cancel
                </button>
            </div>
        </form>
    );
}
