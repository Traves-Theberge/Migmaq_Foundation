"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveCategoryAction, deleteCategoryAction, type FormState } from '@/app/admin/lessons/actions';
import { useToast } from './ToastProvider';

const initialState: FormState = {};
const fieldClass = 'w-full border-2 border-foreground bg-card px-3 py-2 text-sm font-medium';
const labelClass = 'block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5';

export interface CategoryFormValues {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
    color: string | null;
    sort_order: number;
}

export default function CategoryForm({ category, isNew }: { category: CategoryFormValues; isNew: boolean }) {
    const [state, formAction] = useActionState(saveCategoryAction, initialState);
    const showToast = useToast();
    const router = useRouter();
    const lastErrorRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (state.error && state.error !== lastErrorRef.current) {
            lastErrorRef.current = state.error;
            showToast(state.error);
        } else if (!state.error && !isNew) {
            showToast('Saved');
        }
    }, [state, showToast, isNew]);

    return (
        <form action={formAction} className="flex flex-col gap-5 max-w-xl">
            {isNew && <input type="hidden" name="_new" value="1" />}

            <div>
                <label className={labelClass} htmlFor="id">Category id (slug)</label>
                <input id="id" name="id" defaultValue={category.id} disabled={!isNew} required className={`${fieldClass} disabled:opacity-60`} />
            </div>
            <div>
                <label className={labelClass} htmlFor="title">Title</label>
                <input id="title" name="title" defaultValue={category.title} required className={fieldClass} />
            </div>
            <div>
                <label className={labelClass} htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={2} defaultValue={category.description ?? ''} className={fieldClass} />
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
                <div>
                    <label className={labelClass} htmlFor="icon">Icon</label>
                    <input id="icon" name="icon" defaultValue={category.icon ?? ''} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="color">Color</label>
                    <input id="color" name="color" defaultValue={category.color ?? ''} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="sort_order">Sort order</label>
                    <input id="sort_order" name="sort_order" type="number" defaultValue={category.sort_order} className={fieldClass} />
                </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t-2 border-muted">
                <button type="submit" className="bg-foreground text-background text-xs font-bold uppercase tracking-wide px-5 py-2.5 hover:opacity-90">
                    {isNew ? 'Create category' : 'Save changes'}
                </button>
                {!isNew && (
                    <button
                        type="button"
                        onClick={async () => {
                            if (confirm(`Delete "${category.title}" and every lesson inside it? This can't be undone.`)) {
                                await deleteCategoryAction(category.id);
                                router.push('/admin/lessons');
                            }
                        }}
                        className="text-xs font-bold uppercase tracking-wide text-secondary hover:underline ml-auto"
                    >
                        Delete category
                    </button>
                )}
            </div>
        </form>
    );
}
