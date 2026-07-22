"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import {
    LessonCategoryFormSchema,
    LessonFormSchema,
    LessonStepFormSchema,
    LessonStepIdSchema,
} from '@/lib/validation/admin-lessons';

export interface FormState {
    error?: string;
}

const str = (formData: FormData, key: string) => String(formData.get(key) ?? '');

// ── Categories ───────────────────────────────────────────────────────────

export async function saveCategoryAction(_prev: FormState, formData: FormData): Promise<FormState> {
    await requireStaffProfile();
    const isNew = formData.get('_new') === '1';
    const parsed = LessonCategoryFormSchema.safeParse({
        id: str(formData, 'id'),
        title: str(formData, 'title'),
        description: str(formData, 'description'),
        icon: str(formData, 'icon'),
        color: str(formData, 'color'),
        sort_order: str(formData, 'sort_order'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }

    const supabase = await createClient();
    const { error } = isNew
        ? await supabase.from('lesson_categories').insert(parsed.data)
        : await supabase.from('lesson_categories').update(parsed.data).eq('id', parsed.data.id);
    if (error) {
        return { error: error.message.includes('duplicate') ? 'That category id is already taken.' : 'Could not save the category.' };
    }

    revalidatePath('/admin/lessons');
    if (isNew) redirect(`/admin/lessons/${parsed.data.id}`);
    return {};
}

export async function deleteCategoryAction(id: string) {
    await requireStaffProfile();
    const supabase = await createClient();
    await supabase.from('lesson_categories').delete().eq('id', id);
    revalidatePath('/admin/lessons');
}

// ── Lessons ──────────────────────────────────────────────────────────────

export async function saveLessonAction(_prev: FormState, formData: FormData): Promise<FormState> {
    await requireStaffProfile();
    const isNew = formData.get('_new') === '1';
    const parsed = LessonFormSchema.safeParse({
        id: str(formData, 'id'),
        category_id: str(formData, 'category_id'),
        title: str(formData, 'title'),
        description: str(formData, 'description'),
        difficulty: str(formData, 'difficulty'),
        estimated_minutes: str(formData, 'estimated_minutes'),
        sort_order: str(formData, 'sort_order'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the form for errors.' };
    }

    const supabase = await createClient();
    const { error } = isNew
        ? await supabase.from('lessons').insert(parsed.data)
        : await supabase.from('lessons').update(parsed.data).eq('id', parsed.data.id);
    if (error) {
        return { error: error.message.includes('duplicate') ? 'That lesson id is already taken.' : 'Could not save the lesson.' };
    }

    revalidatePath(`/admin/lessons/${parsed.data.category_id}`);
    if (isNew) redirect(`/admin/lessons/${parsed.data.category_id}/${parsed.data.id}`);
    return {};
}

export async function deleteLessonAction(id: string, categoryId: string) {
    await requireStaffProfile();
    const supabase = await createClient();
    await supabase.from('lessons').delete().eq('id', id);
    revalidatePath(`/admin/lessons/${categoryId}`);
}

// ── Steps ────────────────────────────────────────────────────────────────

export async function saveStepAction(_prev: FormState, formData: FormData): Promise<FormState> {
    await requireStaffProfile();
    const stepId = str(formData, 'id');
    const parsed = LessonStepFormSchema.safeParse({
        lesson_id: str(formData, 'lesson_id'),
        sort_order: str(formData, 'sort_order'),
        type: str(formData, 'type'),
        term: str(formData, 'term'),
        translation: str(formData, 'translation'),
        pronunciation: str(formData, 'pronunciation'),
        description: str(formData, 'description'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Check the step for errors.' };
    }

    const supabase = await createClient();
    const { error } = stepId
        ? await supabase.from('lesson_steps').update(parsed.data).eq('id', stepId)
        : await supabase.from('lesson_steps').insert(parsed.data);
    if (error) {
        return { error: 'Could not save the step.' };
    }

    revalidatePath(`/admin/lessons/${formData.get('category_id')}/${parsed.data.lesson_id}`);
    return {};
}

export async function deleteStepAction(id: string, lessonId: string, categoryId: string) {
    await requireStaffProfile();
    const idResult = LessonStepIdSchema.safeParse(id);
    if (!idResult.success) return;
    const supabase = await createClient();
    await supabase.from('lesson_steps').delete().eq('id', idResult.data);
    revalidatePath(`/admin/lessons/${categoryId}/${lessonId}`);
}

/** Swaps sort_order with the adjacent step in the given direction — the simplest correct reorder primitive without a full drag-and-drop UI. */
export async function moveStepAction(stepId: string, lessonId: string, categoryId: string, direction: 'up' | 'down') {
    await requireStaffProfile();
    const supabase = await createClient();
    const { data: steps } = await supabase
        .from('lesson_steps')
        .select('id, sort_order')
        .eq('lesson_id', lessonId)
        .order('sort_order', { ascending: true });
    if (!steps) return;

    const index = steps.findIndex((s) => s.id === stepId);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (index === -1 || swapIndex < 0 || swapIndex >= steps.length) return;

    const a = steps[index];
    const b = steps[swapIndex];
    await Promise.all([
        supabase.from('lesson_steps').update({ sort_order: b.sort_order }).eq('id', a.id),
        supabase.from('lesson_steps').update({ sort_order: a.sort_order }).eq('id', b.id),
    ]);

    revalidatePath(`/admin/lessons/${categoryId}/${lessonId}`);
}
