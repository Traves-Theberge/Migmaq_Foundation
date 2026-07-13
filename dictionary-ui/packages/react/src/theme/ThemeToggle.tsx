"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../utils';

export interface ThemeToggleProps {
    className?: string;
    /** localStorage key used to persist the choice. */
    storageKey?: string;
}

function applyTheme(dark: boolean) {
    document.documentElement.classList.toggle('dark', dark);
}

/**
 * A light/dark toggle with no framework theming library required — it just
 * adds/removes a `.dark` class on `<html>` and persists the choice to
 * localStorage. This is the exact convention the storybook reader's dark
 * mode already looks for (`.dark .dui-stage`), so this toggle and that
 * component work together with zero extra wiring.
 *
 * If you already use next-themes (or similar), skip this component and
 * just make sure whatever you use also toggles a `.dark` class.
 */
export default function ThemeToggle({ className, storageKey = 'dui-theme' }: ThemeToggleProps) {
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(storageKey);
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        const initial = stored ? stored === 'dark' : !!prefersDark;
        setDark(initial);
        applyTheme(initial);
        setMounted(true);
    }, [storageKey]);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        applyTheme(next);
        localStorage.setItem(storageKey, next ? 'dark' : 'light');
    };

    // Avoid a flash of the wrong icon before we know the real preference.
    if (!mounted) return <span className={className} style={{ display: 'inline-block', width: '2.25rem', height: '2.25rem' }} />;

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={cn('dui-theme-toggle', className)}
            style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '2.25rem', height: '2.25rem', borderRadius: 'var(--dui-radius, 9999px)',
                border: '1.5px solid var(--dui-border, currentColor)', background: 'var(--dui-bg, transparent)',
                color: 'var(--dui-fg, currentColor)', cursor: 'pointer',
            }}
        >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    );
}
