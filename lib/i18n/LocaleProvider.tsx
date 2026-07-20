"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { messages, type Locale, type Namespace } from './messages';

const STORAGE_KEY = 'migmaq-locale';

interface LocaleContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
    locale: 'en',
    setLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'fr') setLocaleState(stored);
    }, []);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const setLocale = (next: Locale) => {
        setLocaleState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    return useContext(LocaleContext);
}

/** Returns t(key), reading from messages[locale][namespace], falling back to English. */
export function useTranslations<N extends Namespace>(namespace: N) {
    const { locale } = useLocale();
    const dict = messages[locale][namespace] as Record<string, string>;
    const fallback = messages.en[namespace] as Record<string, string>;
    return (key: keyof typeof fallback & string) => dict[key] ?? fallback[key] ?? key;
}
