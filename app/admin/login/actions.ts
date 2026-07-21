"use server";

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export interface LoginState {
    error?: string;
}

export async function signInAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const next = String(formData.get('next') ?? '/admin');

    if (!email || !password) {
        return { error: 'Enter your email and password.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { error: 'Incorrect email or password.' };
    }

    redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function signOutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/admin/login');
}
