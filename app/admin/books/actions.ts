"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import { BookFormSchema, BookPageFormSchema, BookPageIdSchema } from '@/lib/validation/admin-books';
import { logError } from '@/lib/log';

export interface FormState {
    error?: string;
}

const str = (formData: FormData, key: string) => String(formData.get(key) ?? '');

// ── Books ────────────────────────────────────────────────────────────────

export async function saveBookAction(_prev: FormState, formData: FormData): Promise<FormState> {
    await requireStaffProfile();
    const isNew = formData.get('_new') === '1';
    const parsed = BookFormSchema.safeParse({
        slug: str(formData, 'slug'),
        title: str(formData, 'title'),
        subtitle: str(formData, 'subtitle'),
        teaser: str(formData, 'teaser'),
        cover_image_alt: str(formData, 'cover_image_alt'),
        cover_image_url: str(formData, 'cover_image_url'),
        note: str(formData, 'note'),
        gloss_overrides: str(formData, 'gloss_overrides'),
        sort_order: str(formData, 'sort_order'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }

    const supabase = await createClient();
    const { error } = isNew
        ? await supabase.from('books').insert(parsed.data)
        : await supabase.from('books').update(parsed.data).eq('slug', parsed.data.slug);
    if (error) {
        if (!error.message.includes('duplicate')) logError('saveBookAction', 'save to books failed', error, { slug: parsed.data.slug });
        return { error: error.message.includes('duplicate') ? 'That slug is already taken.' : 'Could not save the book.' };
    }

    revalidatePath('/admin/books');
    if (isNew) redirect(`/admin/books/${parsed.data.slug}`);
    return {};
}

export async function deleteBookAction(slug: string): Promise<FormState> {
    await requireStaffProfile();
    const supabase = await createClient();
    const { error } = await supabase.from('books').delete().eq('slug', slug);
    if (error) {
        logError('deleteBookAction', 'delete from books failed', error, { slug });
        return { error: 'Could not delete the book.' };
    }
    revalidatePath('/admin/books');
    return {};
}

// ── Pages ────────────────────────────────────────────────────────────────

export async function savePageAction(_prev: FormState, formData: FormData): Promise<FormState> {
    await requireStaffProfile();
    const pageId = str(formData, 'id');
    const parsed = BookPageFormSchema.safeParse({
        book_slug: str(formData, 'book_slug'),
        sort_order: str(formData, 'sort_order'),
        label: str(formData, 'label'),
        lines: str(formData, 'lines'),
        image_alt: str(formData, 'image_alt'),
        image_url: str(formData, 'image_url'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the page for errors.' };
    }

    const supabase = await createClient();
    const { error } = pageId
        ? await supabase.from('book_pages').update(parsed.data).eq('id', pageId)
        : await supabase.from('book_pages').insert(parsed.data);
    if (error) {
        if (!error.message.includes('duplicate')) logError('savePageAction', 'save to book_pages failed', error, { pageId, bookSlug: parsed.data.book_slug });
        return { error: error.message.includes('duplicate') ? 'That sort order is already used by another page.' : 'Could not save the page.' };
    }

    revalidatePath(`/admin/books/${parsed.data.book_slug}`);
    return {};
}

export async function deletePageAction(id: string, bookSlug: string): Promise<FormState> {
    await requireStaffProfile();
    const idResult = BookPageIdSchema.safeParse(id);
    if (!idResult.success) {
        return { error: idResult.error.issues[0]?.message ?? 'Missing page id.' };
    }
    const supabase = await createClient();
    const { error } = await supabase.from('book_pages').delete().eq('id', idResult.data);
    if (error) {
        logError('deletePageAction', 'delete from book_pages failed', error, { pageId: idResult.data, bookSlug });
        return { error: 'Could not delete the page.' };
    }
    revalidatePath(`/admin/books/${bookSlug}`);
    return {};
}

/** Swaps sort_order with the adjacent page — same reorder primitive as lesson steps. */
export async function movePageAction(pageId: string, bookSlug: string, direction: 'up' | 'down'): Promise<FormState> {
    await requireStaffProfile();
    const supabase = await createClient();
    const { data: pages, error: readError } = await supabase
        .from('book_pages')
        .select('id, sort_order')
        .eq('book_slug', bookSlug)
        .order('sort_order', { ascending: true });
    if (readError) {
        logError('movePageAction', 'reading book_pages for reorder failed', readError, { bookSlug });
        return { error: 'Could not reorder — try reloading the page.' };
    }
    if (!pages) return {};

    const index = pages.findIndex((p) => p.id === pageId);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (index === -1 || swapIndex < 0 || swapIndex >= pages.length) return {};

    const a = pages[index];
    const b = pages[swapIndex];
    // Swap through a temporary value first — (book_slug, sort_order) is
    // unique, so writing b's sort_order onto a while b still holds it would
    // violate the constraint mid-swap. Each step is checked; if step 2 or 3
    // fails, best-effort revert `a` back to its original sort_order rather
    // than leaving it stuck at the temporary value.
    const TEMP_SORT_ORDER = -1;
    const step1 = await supabase.from('book_pages').update({ sort_order: TEMP_SORT_ORDER }).eq('id', a.id);
    if (step1.error) {
        logError('movePageAction', 'reorder step 1 (temp sort_order) failed', step1.error, { bookSlug, pageId: a.id });
        return { error: 'Could not reorder — try again.' };
    }

    const step2 = await supabase.from('book_pages').update({ sort_order: a.sort_order }).eq('id', b.id);
    if (step2.error) {
        logError('movePageAction', 'reorder step 2 failed, reverting', step2.error, { bookSlug, pageId: b.id });
        await supabase.from('book_pages').update({ sort_order: a.sort_order }).eq('id', a.id);
        return { error: 'Reorder failed partway — reload the page and check the page order.' };
    }

    const step3 = await supabase.from('book_pages').update({ sort_order: b.sort_order }).eq('id', a.id);
    if (step3.error) {
        logError('movePageAction', 'reorder step 3 failed', step3.error, { bookSlug, pageId: a.id });
        return { error: 'Reorder failed partway — reload the page and check the page order.' };
    }

    revalidatePath(`/admin/books/${bookSlug}`);
    return {};
}
