"use client";

import { useLocale, useTranslations } from '@/lib/i18n/LocaleProvider';

interface LocalizedDefinitionsProps {
    en: string[];
    fr?: string[];
}

/** Numbered definitions list; swaps to the machine-translated French set in French mode, when available. */
export default function LocalizedDefinitions({ en, fr }: LocalizedDefinitionsProps) {
    const { locale } = useLocale();
    const t = useTranslations('common');
    const showFr = locale === 'fr' && !!fr && fr.length === en.length;
    const items = showFr ? fr! : en;

    return (
        <>
            {showFr && (
                <p className="text-sm italic text-muted-foreground mb-4">{t('machineTranslated')}</p>
            )}
            {items.map((def, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-white flex items-center justify-center border-4 border-transparent group-hover:border-foreground transition-colors">
                        <span className="text-2xl sm:text-3xl font-black">{idx + 1}</span>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight pt-2">
                        {def}
                    </p>
                </div>
            ))}
        </>
    );
}
