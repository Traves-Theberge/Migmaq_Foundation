"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveLessonAction, deleteLessonAction, type FormState } from '@/app/admin/lessons/actions';
import { useToast } from './ToastProvider';

const initialState: FormState = {};
const fieldClass = 'w-full border-2 border-foreground bg-card px-3 py-2 text-sm font-medium';
const labelClass = 'block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5';

export interface LessonFormValues {
    id: string;
    category_id: string;
    title: string;
    description: string | null;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimated_minutes: number | null;
    sort_order: number;
}

export default function LessonForm({ lesson, isNew }: { lesson: LessonFormValues; isNew: boolean }) {
    const [state, formAction] = useActionState(saveLessonAction, initialState);
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
            <input type="hidden" name="category_id" value={lesson.category_id} />

            <div>
                <label className={labelClass} htmlFor="id">Lesson id (slug)</label>
                <input id="id" name="id" defaultValue={lesson.id} disabled={!isNew} required className={`${fieldClass} disabled:opacity-60`} />
            </div>
            <div>
                <label className={labelClass} htmlFor="title">Title</label>
                <input id="title" name="title" defaultValue={lesson.title} required className={fieldClass} />
            </div>
            <div>
                <label className={labelClass} htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={2} defaultValue={lesson.description ?? ''} className={fieldClass} />
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
                <div>
                    <label className={labelClass} htmlFor="difficulty">Difficulty</label>
                    <select id="difficulty" name="difficulty" defaultValue={lesson.difficulty} className={fieldClass}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass} htmlFor="estimated_minutes">Estimated minutes</label>
                    <input id="estimated_minutes" name="estimated_minutes" type="number" min={0} defaultValue={lesson.estimated_minutes ?? ''} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="sort_order">Sort order</label>
                    <input id="sort_order" name="sort_order" type="number" defaultValue={lesson.sort_order} className={fieldClass} />
                </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t-2 border-muted">
                <button type="submit" className="bg-foreground text-background text-xs font-bold uppercase tracking-wide px-5 py-2.5 hover:opacity-90">
                    {isNew ? 'Create lesson' : 'Save changes'}
                </button>
                {!isNew && (
                    <button
                        type="button"
                        onClick={async () => {
                            if (confirm(`Delete "${lesson.title}"? This can't be undone.`)) {
                                await deleteLessonAction(lesson.id, lesson.category_id);
                                router.push(`/admin/lessons/${lesson.category_id}`);
                            }
                        }}
                        className="text-xs font-bold uppercase tracking-wide text-secondary hover:underline ml-auto"
                    >
                        Delete lesson
                    </button>
                )}
            </div>
        </form>
    );
}
