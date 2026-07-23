"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import { AvatarUploadFormSchema } from '@/lib/validation/auth';
import { logError } from '@/lib/log';

export interface AvatarUploadState {
    error?: string;
    url?: string;
}

/** Uploads a profile photo and points profiles.avatar_url at it — used both for "my own photo" and, by staff, another user's row from Users & Roles. */
export async function uploadAvatarAction(_prev: AvatarUploadState, formData: FormData): Promise<AvatarUploadState> {
    // Matches every other admin Server Action's explicit gate — RLS (the
    // avatars bucket's is_editor() write policy, profiles_update_self_or_staff)
    // already enforces this at the database layer, but that shouldn't be the
    // only line of defense; this also gives a friendly redirect instead of a
    // storage-layer permission error for a signed-out caller.
    await requireStaffProfile();

    const parsed = AvatarUploadFormSchema.safeParse({
        file: formData.get('file'),
        userId: formData.get('userId'),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Invalid upload.' };
    }
    const { file, userId: targetUserId } = parsed.data;

    const supabase = await createClient();
    const ext = file.name.split('.').pop() ?? 'png';
    const path = `${targetUserId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
        contentType: file.type,
        upsert: true,
    });
    if (uploadError) {
        logError('uploadAvatarAction', 'storage upload to avatars bucket failed', uploadError, { targetUserId });
        return { error: 'Upload failed — you may not have permission to change this photo.' };
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', targetUserId);
    if (updateError) {
        logError('uploadAvatarAction', 'update to profiles.avatar_url failed', updateError, { targetUserId });
        return { error: 'Photo uploaded, but saving it to the profile failed.' };
    }

    revalidatePath('/admin', 'layout');
    return { url: publicUrl };
}
