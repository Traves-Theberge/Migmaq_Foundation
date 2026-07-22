"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    createDictionaryWordAction,
    updateDictionaryWordAction,
    deleteDictionaryWordAction,
    type DictionaryFormState,
} from '@/app/admin/dictionary/actions';
import { useToast } from './ToastProvider';
import UsagesEditor, { type UsageRow } from './UsagesEditor';

const initialState: DictionaryFormState = {};

const fieldClass = 'w-full border-2 border-foreground bg-card px-3 py-2 text-sm font-medium';
const labelClass = 'block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5';

export interface DictionaryWordFormValues {
    id?: string;
    word: string;
    type: string | null;
    definitions: string[];
    translations: string[];
    pronunciation_guide: string | null;
    entry_url: string | null;
    fr_definitions: string[] | null;
    fr_translations: string[] | null;
    alternate_forms: string[] | null;
    document_references: string[] | null;
    fr_reviewed: boolean;
    usages: UsageRow[];
}

export default function DictionaryWordForm({ word }: { word: DictionaryWordFormValues }) {
    const isNew = !word.id;
    const [state, formAction] = useActionState(isNew ? createDictionaryWordAction : updateDictionaryWordAction, initialState);
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
        <form action={formAction} className="flex flex-col gap-5 max-w-2xl">
            {!isNew && <input type="hidden" name="id" value={word.id} />}

            <div>
                <label className={labelClass} htmlFor="word">Headword</label>
                <input id="word" name="word" defaultValue={word.word} required className={fieldClass} />
            </div>

            <div>
                <label className={labelClass} htmlFor="type">Part of speech</label>
                <input id="type" name="type" defaultValue={word.type ?? ''} placeholder="e.g. noun animate" className={fieldClass} />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className={labelClass} htmlFor="definitions">Definitions (one per line)</label>
                    <textarea id="definitions" name="definitions" rows={4} defaultValue={word.definitions.join('\n')} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="translations">English translations (one per line)</label>
                    <textarea id="translations" name="translations" rows={4} defaultValue={word.translations.join('\n')} className={fieldClass} />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className={labelClass} htmlFor="fr_definitions">French definitions (one per line)</label>
                    <textarea id="fr_definitions" name="fr_definitions" rows={3} defaultValue={(word.fr_definitions ?? []).join('\n')} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="fr_translations">French translations (one per line)</label>
                    <textarea id="fr_translations" name="fr_translations" rows={3} defaultValue={(word.fr_translations ?? []).join('\n')} className={fieldClass} />
                </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                <input type="checkbox" name="fr_reviewed" defaultChecked={word.fr_reviewed} className="w-4 h-4" />
                French translation has been reviewed by a human
            </label>

            <div>
                <label className={labelClass} htmlFor="pronunciation_guide">Pronunciation guide</label>
                <input id="pronunciation_guide" name="pronunciation_guide" defaultValue={word.pronunciation_guide ?? ''} className={fieldClass} />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className={labelClass} htmlFor="alternate_forms">
                        Alternate forms (one per line — <code>word -- gloss -- note</code>)
                    </label>
                    <textarea id="alternate_forms" name="alternate_forms" rows={3} defaultValue={(word.alternate_forms ?? []).join('\n')} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="document_references">Source document references (one per line)</label>
                    <textarea id="document_references" name="document_references" rows={3} defaultValue={(word.document_references ?? []).join('\n')} className={fieldClass} />
                </div>
            </div>

            <div>
                <label className={labelClass} htmlFor="entry_url">Source entry URL</label>
                <input id="entry_url" name="entry_url" type="url" defaultValue={word.entry_url ?? ''} className={fieldClass} />
            </div>

            <UsagesEditor initialUsages={word.usages} />

            <div className="flex items-center gap-3 pt-2 border-t-2 border-muted">
                <button type="submit" className="bg-foreground text-background text-xs font-bold uppercase tracking-wide px-5 py-2.5 hover:opacity-90">
                    {isNew ? 'Create word' : 'Save changes'}
                </button>
                {!isNew && word.id && (
                    <button
                        type="button"
                        onClick={async () => {
                            if (!confirm(`Delete "${word.word}"? This can't be undone.`)) return;
                            const result = await deleteDictionaryWordAction(word.id!);
                            if (result.error) {
                                showToast(result.error);
                                return;
                            }
                            router.push('/admin/dictionary');
                        }}
                        className="text-xs font-bold uppercase tracking-wide text-secondary hover:underline ml-auto"
                    >
                        Delete word
                    </button>
                )}
            </div>
        </form>
    );
}
