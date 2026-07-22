"use client";

import { useState } from 'react';

export interface UsageRow {
    migmaq: string;
    english: string;
    french: string;
}

const fieldClass = 'w-full border-2 border-foreground bg-card px-2.5 py-1.5 text-sm';
const labelClass = 'block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1';

/**
 * Repeatable-row editor for a word's usage examples (dictionary_word_usages),
 * kept as local component state and serialized to a single hidden JSON field
 * on every change — the surrounding DictionaryWordForm submits it alongside
 * the word's other fields as one form, and the server action replaces the
 * word's whole usage set on save (see replaceUsages() in
 * app/admin/dictionary/actions.ts).
 */
export default function UsagesEditor({ initialUsages }: { initialUsages: UsageRow[] }) {
    const [rows, setRows] = useState<UsageRow[]>(initialUsages);

    const update = (index: number, field: keyof UsageRow, value: string) => {
        setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    // A row with nothing typed in it yet is a harmless placeholder and gets
    // dropped silently on submit. A row with only ONE of the two required
    // fields filled in is a real mistake — kept in the payload (so the
    // server's Zod schema rejects it with a clear error) and flagged here
    // so the user doesn't have to find out via a round trip.
    const isEmpty = (row: UsageRow) => !row.migmaq.trim() && !row.english.trim();
    const isIncomplete = (row: UsageRow) => !isEmpty(row) && (!row.migmaq.trim() || !row.english.trim());

    return (
        <div>
            <input type="hidden" name="usages" value={JSON.stringify(rows.filter((r) => !isEmpty(r)))} />
            <label className={labelClass}>Usage examples</label>
            <div className="flex flex-col gap-3">
                {rows.map((row, i) => (
                    <div key={i} className={`border-2 p-3 flex flex-col gap-2 ${isIncomplete(row) ? 'border-secondary' : 'border-muted'}`}>
                        <div className="grid sm:grid-cols-2 gap-2">
                            <div>
                                <label className={labelClass} htmlFor={`usage-migmaq-${i}`}>Mi&apos;gmaq sentence</label>
                                <input id={`usage-migmaq-${i}`} value={row.migmaq} onChange={(e) => update(i, 'migmaq', e.target.value)} className={fieldClass} />
                            </div>
                            <div>
                                <label className={labelClass} htmlFor={`usage-english-${i}`}>English</label>
                                <input id={`usage-english-${i}`} value={row.english} onChange={(e) => update(i, 'english', e.target.value)} className={fieldClass} />
                            </div>
                        </div>
                        {isIncomplete(row) && (
                            <p className="text-[11px] font-bold text-secondary">Both Mi&apos;gmaq and English are required for this example — or clear both to remove it.</p>
                        )}
                        <div className="flex items-end gap-2">
                            <div className="flex-1">
                                <label className={labelClass} htmlFor={`usage-french-${i}`}>French (optional)</label>
                                <input id={`usage-french-${i}`} value={row.french} onChange={(e) => update(i, 'french', e.target.value)} className={fieldClass} />
                            </div>
                            <button
                                type="button"
                                onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
                                className="text-[11px] font-bold uppercase tracking-wide text-secondary hover:underline pb-1.5 shrink-0"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={() => setRows((prev) => [...prev, { migmaq: '', english: '', french: '' }])}
                className="mt-2 text-xs font-bold uppercase tracking-wide text-primary hover:underline"
            >
                + Add usage example
            </button>
        </div>
    );
}
