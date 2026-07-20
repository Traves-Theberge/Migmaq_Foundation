"use client";

import { useLocale, useTranslations } from '@/lib/i18n/LocaleProvider';

interface LocalizedTranslationsProps {
    en: string[];
    fr?: string[];
}

/** Bulleted translations list; swaps to the machine-translated French set in French mode, when available. */
export default function LocalizedTranslations({ en, fr }: LocalizedTranslationsProps) {
    const { locale } = useLocale();
    const t = useTranslations('common');
    const showFr = locale === 'fr' && !!fr && fr.length === en.length;
    const items = showFr ? fr! : en;

    return (
        <>
            {showFr && (
                <p className="text-sm italic text-muted-foreground mb-2">{t('machineTranslated')}</p>
            )}
            <ul className="space-y-2">
                {items.map((translation, idx) => (
                    <li key={idx} className="text-xl font-bold flex items-start">
                        <span className="text-secondary mr-3">•</span>
                        {translation}
                    </li>
                ))}
            </ul>
        </>
    );
}
