"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import {
    DictionaryWordFormSchema,
    DictionaryWordIdSchema,
    DictionaryWordUsagesFormSchema,
} from '@/lib/validation/admin-dictionary';
import { logError } from '@/lib/log';

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
        alternate_forms: str('alternate_forms'),
        document_references: str('document_references'),
        fr_reviewed: formData.get('fr_reviewed') === 'on' ? 'on' as const : 'off' as const,
    };
}

/**
 * Replaces every dictionary_word_usages row for `wordId` with `usages` —
 * simpler than diffing, and safe given there are only ever a handful per
 * word. Inserts the new rows *before* deleting the old ones (there's no
 * unique constraint on word_id/sort_order, so the two sets can briefly
 * coexist) and only deletes rows outside the newly-inserted ids — if the
 * insert fails, the delete never runs and the word's existing usages are
 * left untouched instead of being silently wiped with nothing to show
 * for it.
 */
async function replaceUsages(supabase: Awaited<ReturnType<typeof createClient>>, wordId: string, usages: { migmaq: string; english: string; french?: string }[]) {
    if (usages.length === 0) {
        const { error } = await supabase.from('dictionary_word_usages').delete().eq('word_id', wordId);
        return error;
    }

    const rows = usages.map((u, i) => ({
        word_id: wordId,
        sort_order: i,
        migmaq: u.migmaq,
        english: u.english,
        french: u.french ?? null,
    }));
    const { data: inserted, error: insError } = await supabase.from('dictionary_word_usages').insert(rows).select('id');
    if (insError) return insError;

    const newIds = (inserted ?? []).map((r) => r.id);
    if (newIds.length === 0) return null;

    const { error: delError } = await supabase
        .from('dictionary_word_usages')
        .delete()
        .eq('word_id', wordId)
        .not('id', 'in', `(${newIds.join(',')})`);
    return delError;
}

export async function createDictionaryWordAction(_prev: DictionaryFormState, formData: FormData): Promise<DictionaryFormState> {
    await requireStaffProfile();
    const parsed = DictionaryWordFormSchema.safeParse(readForm(formData));
    const usagesResult = DictionaryWordUsagesFormSchema.safeParse(String(formData.get('usages') ?? '[]'));
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }
    if (!usagesResult.success) {
        return { error: usagesResult.error.issues[0]?.message ?? 'Check the usage examples for errors.' };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from('dictionary_words').insert(parsed.data).select('id').single();
    if (error) {
        if (!error.message.includes('duplicate')) logError('createDictionaryWordAction', 'insert into dictionary_words failed', error, { word: parsed.data.word });
        return { error: error.message.includes('duplicate') ? 'That word already exists.' : 'Could not create the word.' };
    }

    const usagesError = await replaceUsages(supabase, data.id, usagesResult.data);
    if (usagesError) {
        logError('createDictionaryWordAction', 'saving usage examples failed', usagesError, { wordId: data.id });
        return { error: 'Word created, but saving the usage examples failed.' };
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
    const usagesResult = DictionaryWordUsagesFormSchema.safeParse(String(formData.get('usages') ?? '[]'));
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }
    if (!usagesResult.success) {
        return { error: usagesResult.error.issues[0]?.message ?? 'Check the usage examples for errors.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('dictionary_words').update(parsed.data).eq('id', idResult.data);
    if (error) {
        logError('updateDictionaryWordAction', 'update to dictionary_words failed', error, { wordId: idResult.data });
        return { error: 'Could not save changes.' };
    }

    const usagesError = await replaceUsages(supabase, idResult.data, usagesResult.data);
    if (usagesError) {
        logError('updateDictionaryWordAction', 'saving usage examples failed', usagesError, { wordId: idResult.data });
        return { error: 'Word saved, but saving the usage examples failed.' };
    }

    revalidatePath('/admin/dictionary');
    revalidatePath(`/admin/dictionary/${idResult.data}`);
    return {};
}

/**
 * Deliberately does not redirect() — it's called directly from a client
 * onClick handler (see DictionaryWordForm), which navigates itself only
 * after confirming the delete actually succeeded.
 */
export async function deleteDictionaryWordAction(id: string): Promise<DictionaryFormState> {
    await requireStaffProfile();
    const idResult = DictionaryWordIdSchema.safeParse(id);
    if (!idResult.success) {
        return { error: idResult.error.issues[0]?.message ?? 'Missing word id.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('dictionary_words').delete().eq('id', idResult.data);
    if (error) {
        logError('deleteDictionaryWordAction', 'delete from dictionary_words failed', error, { wordId: idResult.data });
        return { error: 'Could not delete the word.' };
    }

    revalidatePath('/admin/dictionary');
    return {};
}
