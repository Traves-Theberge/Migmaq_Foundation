"use client";

import { useLocale, useTranslations } from '@/lib/i18n/LocaleProvider';

/** EN/FR switch, styled and positioned to match the theme toggle beside it. */
export default function LanguageToggle() {
    const { locale, setLocale } = useLocale();
    const t = useTranslations('nav');

    return (
        <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
            aria-label={locale === 'en' ? t('french') : t('english')}
            aria-pressed={locale === 'fr'}
            className="px-3 py-2 border-2 border-foreground rounded-lg font-black text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
        >
            {locale === 'en' ? 'FR' : 'EN'}
        </button>
    );
}
