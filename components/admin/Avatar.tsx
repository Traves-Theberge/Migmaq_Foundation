"use client";

import { useActionState, useEffect, useRef } from 'react';
import { uploadAvatarAction, type AvatarUploadState } from '@/app/admin/actions';
import { useToast } from './ToastProvider';
import { CameraIcon } from './icons';

const initialState: AvatarUploadState = {};

interface AvatarProps {
    userId: string;
    /** Public Supabase Storage URL, or null to fall back to the org logo. */
    src: string | null;
    size?: number;
    editable?: boolean;
    title?: string;
}

/** Defaults to the Mi'gmaq Foundation logo when no photo has been uploaded. */
export default function Avatar({ userId, src, size = 30, editable = false, title = 'Change photo' }: AvatarProps) {
    const [state, formAction] = useActionState(uploadAvatarAction, initialState);
    const showToast = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const lastUrlRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (state.url && state.url !== lastUrlRef.current) {
            lastUrlRef.current = state.url;
            showToast('Photo updated');
        }
        if (state.error) showToast(state.error);
    }, [state, showToast]);

    const image = (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={state.url ?? src ?? '/assets/Images/fn_logo.png'}
            alt=""
            style={{ width: size, height: size }}
            className="rounded-full object-cover border border-foreground shrink-0"
        />
    );

    if (!editable) return image;

    return (
        <form ref={formRef} action={formAction}>
            <input type="hidden" name="userId" value={userId} />
            <label
                title={title}
                className="relative inline-block rounded-full cursor-pointer group"
                style={{ width: size, height: size }}
            >
                {image}
                <span className="absolute inset-0 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                    <CameraIcon size={Math.max(11, size * 0.42)} />
                </span>
                <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={() => formRef.current?.requestSubmit()}
                    name="file"
                />
            </label>
        </form>
    );
}
