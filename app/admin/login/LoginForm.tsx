"use client";

import { useActionState } from 'react';
import { signInAction, type LoginState } from './actions';

const initialState: LoginState = {};

export default function LoginForm({ next, notAuthorized }: { next: string; notAuthorized: boolean }) {
    const [state, formAction, pending] = useActionState(signInAction, initialState);

    return (
        <form action={formAction} className="space-y-5">
            <input type="hidden" name="next" value={next} />

            {notAuthorized && (
                <p className="p-3 bg-secondary/10 border-2 border-secondary text-sm font-bold text-secondary">
                    That account isn&apos;t authorized for the admin. Ask an existing admin to grant you access.
                </p>
            )}
            {state.error && (
                <p className="p-3 bg-secondary/10 border-2 border-secondary text-sm font-bold text-secondary">
                    {state.error}
                </p>
            )}

            <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full bg-background border-4 border-foreground p-3 text-base font-medium focus:outline-none focus:border-accent transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full bg-background border-4 border-foreground p-3 text-base font-medium focus:outline-none focus:border-accent transition-colors"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-foreground text-background font-black uppercase tracking-wide border-4 border-foreground hover:brightness-110 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {pending ? 'Signing in…' : 'Sign in'}
            </button>
        </form>
    );
}
