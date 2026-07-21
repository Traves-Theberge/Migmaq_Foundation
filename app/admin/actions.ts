"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export interface AvatarUploadState {
    error?: string;
    url?: string;
}

/** Uploads a profile photo and points profiles.avatar_url at it — used both for "my own photo" and, by staff, another user's row from Users & Roles. */
export async function uploadAvatarAction(_prev: AvatarUploadState, formData: FormData): Promise<AvatarUploadState> {
    const file = formData.get('file');
    const targetUserId = String(formData.get('userId') ?? '');

    if (!(file instanceof File) || file.size === 0) {
        return { error: 'Choose an image first.' };
    }
    if (!file.type.startsWith('image/')) {
        return { error: 'That file isn\'t an image.' };
    }
    if (!targetUserId) {
        return { error: 'Missing user id.' };
    }

    const supabase = await createClient();
    const ext = file.name.split('.').pop() ?? 'png';
    const path = `${targetUserId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
        contentType: file.type,
        upsert: true,
    });
    if (uploadError) {
        return { error: 'Upload failed — you may not have permission to change this photo.' };
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', targetUserId);
    if (updateError) {
        return { error: 'Photo uploaded, but saving it to the profile failed.' };
    }

    revalidatePath('/admin', 'layout');
    return { url: publicUrl };
}
