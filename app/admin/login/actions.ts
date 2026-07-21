"use server";

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SignInFormSchema } from '@/lib/validation/auth';

export interface LoginState {
    error?: string;
}

export async function signInAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const parsed = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        next: formData.get('next') ?? undefined,
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? 'Enter your email and password.' };
    }
    const { email, password, next } = parsed.data;

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { error: 'Incorrect email or password.' };
    }

    redirect(next);
}

export async function signOutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/admin/login');
}
