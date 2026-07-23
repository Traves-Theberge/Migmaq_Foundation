"use client";

import { useEffect, useState } from 'react';
import { Share2, Bookmark, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n/LocaleProvider';

const STORAGE_KEY = 'migmaq-saved-words';

function readSaved(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
        return [];
    }
}

export default function WordActions({ word }: { word: string }) {
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const t = useTranslations('dictionaryWord');

    useEffect(() => {
        // Deferred to a microtask — reading localStorage has to happen
        // client-side only, which is exactly what an effect is for, but
        // the setState call itself still can't run synchronously within
        // the effect body (react-hooks/set-state-in-effect).
        queueMicrotask(() => setSaved(readSaved().includes(word)));
    }, [word]);

    const toggleSave = () => {
        const list = readSaved();
        const next = list.includes(word) ? list.filter((w) => w !== word) : [...list, word];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSaved(next.includes(word));
    };

    const share = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: word, url });
            } catch {
                // user dismissed the native share sheet
            }
            return;
        }
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={share}
                className="inline-flex items-center px-4 py-2 border-2 border-foreground font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
            >
                <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
                {copied ? t('shareCopied') : t('share')}
            </button>
            <button
                type="button"
                onClick={toggleSave}
                aria-pressed={saved}
                className={cn(
                    "inline-flex items-center px-4 py-2 border-2 border-foreground font-bold uppercase text-sm transition-colors",
                    saved ? "bg-foreground text-background" : "hover:bg-foreground hover:text-background"
                )}
            >
                {saved ? <Check className="w-4 h-4 mr-2" aria-hidden="true" /> : <Bookmark className="w-4 h-4 mr-2" aria-hidden="true" />}
                {saved ? t('saved') : t('save')}
            </button>
            <span className="sr-only" aria-live="polite">
                {copied ? t('linkCopied') : ''}
            </span>
        </div>
    );
}
