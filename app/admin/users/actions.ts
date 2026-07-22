"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireSuperAdmin } from '@/lib/supabase/auth';
import { UpdateUserRoleSchema } from '@/lib/validation/users';
import { logError } from '@/lib/log';

export interface UpdateUserRoleState {
    error?: string;
    success?: boolean;
}

/**
 * Grants/revokes admin and super_admin. Gated twice: requireSuperAdmin()
 * here (so a non-super_admin never even reaches the query), and again at
 * the database layer by the profiles_prevent_role_escalation trigger
 * (migration 0006) — the trigger is the real security boundary, this is
 * just a faster, friendlier rejection in front of it.
 */
export async function updateUserRoleAction(_prev: UpdateUserRoleState, formData: FormData): Promise<UpdateUserRoleState> {
    const actor = await requireSuperAdmin();

    const parsed = UpdateUserRoleSchema.safeParse({
        userId: formData.get('userId'),
        role: formData.get('role'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Invalid role change.' };
    }
    const { userId, role } = parsed.data;

    if (userId === actor.id) {
        return { error: "You can't change your own role." };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
    if (error) {
        logError('updateUserRoleAction', 'update to profiles.role failed', error, { userId, role, actorId: actor.id });
        return { error: 'Role change failed — it may have been blocked by a database safety check.' };
    }

    revalidatePath('/admin/users');
    return { success: true };
}
