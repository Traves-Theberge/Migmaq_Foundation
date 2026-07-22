"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import { DictionaryWordFormSchema, DictionaryWordIdSchema } from '@/lib/validation/admin-dictionary';

export interface DictionaryFormState {
    error?: string;
}

function readForm(formData: FormData) {
    const str = (key: string) => String(formData.get(key) ?? '');
    return {
        word: str('word'),
        type: str('type'),
        definitions: str('definitions'),
        translations: str('translations'),
        pronunciation_guide: str('pronunciation_guide'),
        entry_url: str('entry_url'),
        fr_definitions: str('fr_definitions'),
        fr_translations: str('fr_translations'),
        fr_reviewed: formData.get('fr_reviewed') === 'on' ? 'on' as const : 'off' as const,
    };
}

export async function createDictionaryWordAction(_prev: DictionaryFormState, formData: FormData): Promise<DictionaryFormState> {
    await requireStaffProfile();
    const parsed = DictionaryWordFormSchema.safeParse(readForm(formData));
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from('dictionary_words').insert(parsed.data).select('id').single();
    if (error) {
        return { error: error.message.includes('duplicate') ? 'That word already exists.' : 'Could not create the word.' };
    }

    revalidatePath('/admin/dictionary');
    redirect(`/admin/dictionary/${data.id}`);
}

export async function updateDictionaryWordAction(_prev: DictionaryFormState, formData: FormData): Promise<DictionaryFormState> {
    await requireStaffProfile();
    const idResult = DictionaryWordIdSchema.safeParse(formData.get('id'));
    if (!idResult.success) {
        return { error: idResult.error.issues[0]?.message ?? 'Missing word id.' };
    }
    const parsed = DictionaryWordFormSchema.safeParse(readForm(formData));
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('dictionary_words').update(parsed.data).eq('id', idResult.data);
    if (error) {
        return { error: 'Could not save changes.' };
    }

    revalidatePath('/admin/dictionary');
    revalidatePath(`/admin/dictionary/${idResult.data}`);
    return {};
}

/** Deliberately does not redirect() — it's called directly from a client onClick handler (see DictionaryWordForm), which navigates itself after the delete resolves. */
export async function deleteDictionaryWordAction(id: string) {
    await requireStaffProfile();
    const idResult = DictionaryWordIdSchema.safeParse(id);
    if (!idResult.success) return;

    const supabase = await createClient();
    await supabase.from('dictionary_words').delete().eq('id', idResult.data);
    revalidatePath('/admin/dictionary');
}
