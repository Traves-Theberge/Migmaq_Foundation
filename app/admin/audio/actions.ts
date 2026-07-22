"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import { AudioRecordingFormSchema, AudioRecordingIdSchema } from '@/lib/validation/admin-audio';
import { logError } from '@/lib/log';

export interface FormState {
    error?: string;
}

const str = (formData: FormData, key: string) => String(formData.get(key) ?? '');

export async function saveRecordingAction(_prev: FormState, formData: FormData): Promise<FormState> {
    await requireStaffProfile();
    const recordingId = str(formData, 'id');
    const parsed = AudioRecordingFormSchema.safeParse({
        word: str(formData, 'word'),
        file: str(formData, 'file'),
        speaker: str(formData, 'speaker'),
        kind: str(formData, 'kind'),
        url: str(formData, 'url'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }

    const supabase = await createClient();
    const { error } = recordingId
        ? await supabase.from('audio_recordings').update(parsed.data).eq('id', recordingId)
        : await supabase.from('audio_recordings').insert(parsed.data);
    if (error) {
        if (!error.message.includes('duplicate')) logError('saveRecordingAction', 'save to audio_recordings failed', error, { recordingId, file: parsed.data.file });
        return { error: error.message.includes('duplicate') ? 'That filename is already used by another recording.' : 'Could not save the recording.' };
    }

    revalidatePath('/admin/audio');
    return {};
}

export async function deleteRecordingAction(id: string): Promise<FormState> {
    await requireStaffProfile();
    const idResult = AudioRecordingIdSchema.safeParse(id);
    if (!idResult.success) {
        return { error: idResult.error.issues[0]?.message ?? 'Missing recording id.' };
    }
    const supabase = await createClient();
    const { error } = await supabase.from('audio_recordings').delete().eq('id', idResult.data);
    if (error) {
        logError('deleteRecordingAction', 'delete from audio_recordings failed', error, { recordingId: idResult.data });
        return { error: 'Could not delete the recording.' };
    }
    revalidatePath('/admin/audio');
    return {};
}
