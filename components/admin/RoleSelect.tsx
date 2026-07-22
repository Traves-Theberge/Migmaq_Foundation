"use client";

import { useActionState, useEffect, useRef } from 'react';
import { updateUserRoleAction, type UpdateUserRoleState } from '@/app/admin/users/actions';
import { useToast } from './ToastProvider';
import type { AppRole } from '@/lib/supabase/database.types';

const initialState: UpdateUserRoleState = {};
const ROLES: AppRole[] = ['editor', 'admin', 'super_admin'];

export default function RoleSelect({ userId, role }: { userId: string; role: AppRole }) {
    const [state, formAction] = useActionState(updateUserRoleAction, initialState);
    const showToast = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const announcedRef = useRef<UpdateUserRoleState>(initialState);

    useEffect(() => {
        if (state === announcedRef.current) return;
        announcedRef.current = state;
        if (state.success) showToast('Role updated');
        if (state.error) showToast(state.error);
    }, [state, showToast]);

    return (
        <form ref={formRef} action={formAction} className="flex items-center gap-2">
            <input type="hidden" name="userId" value={userId} />
            <label className="sr-only" htmlFor={`role-${userId}`}>Role</label>
            <select
                id={`role-${userId}`}
                name="role"
                defaultValue={role}
                onChange={() => formRef.current?.requestSubmit()}
                className="text-[11px] font-bold uppercase tracking-wide border-2 border-foreground bg-card px-2 py-1 rounded-sm"
            >
                {ROLES.map((r) => (
                    <option key={r} value={r}>{r.replace('_', ' ')}</option>
                ))}
            </select>
        </form>
    );
}
