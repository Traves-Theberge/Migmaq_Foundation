"use client";

import { useActionState, useEffect, useRef, useState } from 'react';
import { saveStepAction, deleteStepAction, moveStepAction, type FormState } from '@/app/admin/lessons/actions';
import { useToast } from './ToastProvider';
import type { LessonStepType } from '@/lib/supabase/database.types';

const initialState: FormState = {};
const fieldClass = 'w-full border-2 border-foreground bg-background px-2.5 py-1.5 text-sm';
const labelClass = 'block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1';

export interface StepValues {
    id: string;
    sort_order: number;
    type: LessonStepType;
    term: string | null;
    translation: string | null;
    pronunciation: string | null;
    description: string | null;
}

export default function StepEditor({ lessonId, categoryId, steps }: { lessonId: string; categoryId: string; steps: StepValues[] }) {
    const [adding, setAdding] = useState(false);
    const nextSortOrder = steps.length > 0 ? Math.max(...steps.map((s) => s.sort_order)) + 1 : 0;

    return (
        <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
                <StepRow
                    key={step.id}
                    step={step}
                    lessonId={lessonId}
                    categoryId={categoryId}
                    canMoveUp={i > 0}
                    canMoveDown={i < steps.length - 1}
                />
            ))}
            {steps.length === 0 && !adding && <p className="text-sm text-muted-foreground">No steps yet.</p>}

            {adding ? (
                <div className="border-2 border-dashed border-foreground/40 p-4">
                    <StepFields
                        lessonId={lessonId}
                        categoryId={categoryId}
                        defaultSortOrder={nextSortOrder}
                        onDone={() => setAdding(false)}
                    />
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setAdding(true)}
                    className="self-start text-xs font-bold uppercase tracking-wide text-primary hover:underline"
                >
                    + Add step
                </button>
            )}
        </div>
    );
}

function StepRow({
    step,
    lessonId,
    categoryId,
    canMoveUp,
    canMoveDown,
}: {
    step: StepValues;
    lessonId: string;
    categoryId: string;
    canMoveUp: boolean;
    canMoveDown: boolean;
}) {
    const [editing, setEditing] = useState(false);
    const showToast = useToast();

    if (editing) {
        return (
            <div className="border-2 border-foreground p-4">
                <StepFields lessonId={lessonId} categoryId={categoryId} step={step} onDone={() => setEditing(false)} />
            </div>
        );
    }

    return (
        <div className="flex items-start gap-3 border-2 border-muted p-3">
            <div className="flex flex-col shrink-0 gap-0.5 pt-0.5">
                <button type="button" disabled={!canMoveUp} onClick={() => moveStepAction(step.id, lessonId, categoryId, 'up')} className="w-5 h-5 flex items-center justify-center disabled:opacity-20" aria-label="Move step up">▲</button>
                <button type="button" disabled={!canMoveDown} onClick={() => moveStepAction(step.id, lessonId, categoryId, 'down')} className="w-5 h-5 flex items-center justify-center disabled:opacity-20" aria-label="Move step down">▼</button>
            </div>
            <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{step.type}</span>
                {step.type === 'info' ? (
                    <p className="text-sm mt-0.5">{step.description}</p>
                ) : (
                    <p className="text-sm mt-0.5">
                        <strong>{step.term}</strong> — {step.translation}
                        {step.pronunciation && <span className="text-muted-foreground"> ({step.pronunciation})</span>}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={() => setEditing(true)} className="text-[11px] font-bold uppercase tracking-wide text-primary hover:underline">Edit</button>
                <button
                    type="button"
                    onClick={async () => {
                        if (!confirm('Delete this step?')) return;
                        const result = await deleteStepAction(step.id, lessonId, categoryId);
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

function StepFields({
    lessonId,
    categoryId,
    step,
    defaultSortOrder,
    onDone,
}: {
    lessonId: string;
    categoryId: string;
    step?: StepValues;
    defaultSortOrder?: number;
    onDone: () => void;
}) {
    const [state, formAction] = useActionState(saveStepAction, initialState);
    const [type, setType] = useState<LessonStepType>(step?.type ?? 'vocabulary');
    const showToast = useToast();
    const lastErrorRef = useRef<string | undefined>(undefined);
    const doneRef = useRef(false);

    useEffect(() => {
        if (state.error && state.error !== lastErrorRef.current) {
            lastErrorRef.current = state.error;
            showToast(state.error);
        } else if (state !== initialState && !state.error && !doneRef.current) {
            doneRef.current = true;
            showToast(step ? 'Step saved' : 'Step added');
            onDone();
        }
    }, [state, showToast, onDone, step]);

    return (
        <form action={formAction} className="flex flex-col gap-3">
            {step && <input type="hidden" name="id" value={step.id} />}
            <input type="hidden" name="lesson_id" value={lessonId} />
            <input type="hidden" name="category_id" value={categoryId} />
            <input type="hidden" name="sort_order" value={step?.sort_order ?? defaultSortOrder ?? 0} />

            <div>
                <label className={labelClass} htmlFor={`type-${step?.id ?? 'new'}`}>Step type</label>
                <select id={`type-${step?.id ?? 'new'}`} name="type" value={type} onChange={(e) => setType(e.target.value as LessonStepType)} className={fieldClass}>
                    <option value="vocabulary">Vocabulary</option>
                    <option value="phrase">Phrase</option>
                    <option value="info">Info</option>
                </select>
            </div>

            {type === 'info' ? (
                <div>
                    <label className={labelClass} htmlFor={`description-${step?.id ?? 'new'}`}>Description</label>
                    <textarea id={`description-${step?.id ?? 'new'}`} name="description" rows={2} defaultValue={step?.description ?? ''} className={fieldClass} />
                </div>
            ) : (
                <>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass} htmlFor={`term-${step?.id ?? 'new'}`}>Term</label>
                            <input id={`term-${step?.id ?? 'new'}`} name="term" defaultValue={step?.term ?? ''} className={fieldClass} />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor={`translation-${step?.id ?? 'new'}`}>Translation</label>
                            <input id={`translation-${step?.id ?? 'new'}`} name="translation" defaultValue={step?.translation ?? ''} className={fieldClass} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor={`pronunciation-${step?.id ?? 'new'}`}>Pronunciation</label>
                        <input id={`pronunciation-${step?.id ?? 'new'}`} name="pronunciation" defaultValue={step?.pronunciation ?? ''} className={fieldClass} />
                    </div>
                </>
            )}

            <div className="flex items-center gap-3">
                <button type="submit" className="bg-foreground text-background text-[11px] font-bold uppercase tracking-wide px-4 py-2 hover:opacity-90">
                    {step ? 'Save step' : 'Add step'}
                </button>
                <button type="button" onClick={onDone} className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground hover:underline">
                    Cancel
                </button>
            </div>
        </form>
    );
}
