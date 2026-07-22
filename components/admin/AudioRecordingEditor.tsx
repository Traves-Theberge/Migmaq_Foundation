"use client";

import { useActionState, useEffect, useRef, useState } from 'react';
import { saveRecordingAction, deleteRecordingAction, type FormState } from '@/app/admin/audio/actions';
import { useToast } from './ToastProvider';
import type { RecordingKind } from '@/lib/supabase/database.types';

const initialState: FormState = {};
const fieldClass = 'w-full border-2 border-foreground bg-background px-2.5 py-1.5 text-sm';
const labelClass = 'block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1';

export interface RecordingValues {
    id: string;
    word: string;
    file: string;
    speaker: string;
    kind: RecordingKind;
    url: string;
}

export default function AudioRecordingEditor({ recordings }: { recordings: RecordingValues[] }) {
    const [adding, setAdding] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            {recordings.map((r) => (
                <RecordingRow key={r.id} recording={r} />
            ))}
            {recordings.length === 0 && !adding && <p className="text-sm text-muted-foreground">No recordings match.</p>}

            {adding ? (
                <div className="border-2 border-dashed border-foreground/40 p-4">
                    <RecordingFields onDone={() => setAdding(false)} />
                </div>
            ) : (
                <button type="button" onClick={() => setAdding(true)} className="self-start text-xs font-bold uppercase tracking-wide text-primary hover:underline">
                    + Add recording
                </button>
            )}
        </div>
    );
}

function RecordingRow({ recording }: { recording: RecordingValues }) {
    const [editing, setEditing] = useState(false);

    if (editing) {
        return (
            <div className="border-2 border-foreground p-4">
                <RecordingFields recording={recording} onDone={() => setEditing(false)} />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 border-2 border-muted p-3">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{recording.word}</p>
                <p className="text-[11.5px] text-muted-foreground truncate">{recording.speaker} · {recording.kind} · {recording.file}</p>
            </div>
            <audio controls src={recording.url} className="h-8 shrink-0" style={{ maxWidth: 200 }} />
            <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={() => setEditing(true)} className="text-[11px] font-bold uppercase tracking-wide text-primary hover:underline">Edit</button>
                <button
                    type="button"
                    onClick={() => {
                        if (confirm(`Delete the recording for "${recording.word}"?`)) deleteRecordingAction(recording.id);
                    }}
                    className="text-[11px] font-bold uppercase tracking-wide text-secondary hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function RecordingFields({ recording, onDone }: { recording?: RecordingValues; onDone: () => void }) {
    const [state, formAction] = useActionState(saveRecordingAction, initialState);
    const showToast = useToast();
    const lastErrorRef = useRef<string | undefined>(undefined);
    const doneRef = useRef(false);
    const uid = recording?.id ?? 'new';

    useEffect(() => {
        if (state.error && state.error !== lastErrorRef.current) {
            lastErrorRef.current = state.error;
            showToast(state.error);
        } else if (state !== initialState && !state.error && !doneRef.current) {
            doneRef.current = true;
            showToast(recording ? 'Recording saved' : 'Recording added');
            onDone();
        }
    }, [state, showToast, onDone, recording]);

    return (
        <form action={formAction} className="flex flex-col gap-3">
            {recording && <input type="hidden" name="id" value={recording.id} />}

            <div className="grid sm:grid-cols-2 gap-3">
                <div>
                    <label className={labelClass} htmlFor={`word-${uid}`}>Word</label>
                    <input id={`word-${uid}`} name="word" defaultValue={recording?.word ?? ''} required className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass} htmlFor={`speaker-${uid}`}>Speaker</label>
                    <input id={`speaker-${uid}`} name="speaker" defaultValue={recording?.speaker ?? ''} required className={fieldClass} />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                <div>
                    <label className={labelClass} htmlFor={`kind-${uid}`}>Kind</label>
                    <select id={`kind-${uid}`} name="kind" defaultValue={recording?.kind ?? 'word'} className={fieldClass}>
                        <option value="word">Word</option>
                        <option value="example">Example sentence</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass} htmlFor={`file-${uid}`}>Filename</label>
                    <input id={`file-${uid}`} name="file" defaultValue={recording?.file ?? ''} required className={fieldClass} />
                </div>
            </div>
            <div>
                <label className={labelClass} htmlFor={`url-${uid}`}>Playable URL</label>
                <input id={`url-${uid}`} name="url" defaultValue={recording?.url ?? ''} required className={fieldClass} />
            </div>

            <div className="flex items-center gap-3">
                <button type="submit" className="bg-foreground text-background text-[11px] font-bold uppercase tracking-wide px-4 py-2 hover:opacity-90">
                    {recording ? 'Save recording' : 'Add recording'}
                </button>
                <button type="button" onClick={onDone} className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground hover:underline">
                    Cancel
                </button>
            </div>
        </form>
    );
}
