"use client";

import { useLocale, useTranslations } from '@/lib/i18n/LocaleProvider';
import type { Usage } from '@/lib/types';

interface LocalizedUsagesProps {
    usages: Usage[];
}

/**
 * Usage-example list. `usage.translation` is the Mi'gmaq example sentence and is
 * never translated; only the English/French gloss underneath swaps with locale.
 */
export default function LocalizedUsages({ usages }: LocalizedUsagesProps) {
    const { locale } = useLocale();
    const t = useTranslations('common');
    const anyFrench = locale === 'fr' && usages.some((u) => u.french);

    return (
        <>
            {anyFrench && (
                <p className="text-sm italic text-muted-foreground mb-4">{t('machineTranslated')}</p>
            )}
            <ul className="space-y-6">
                {usages.map((usage, idx) => (
                    <li key={idx} className="relative pl-4 border-l-4 border-accent/30">
                        <p className="text-lg sm:text-xl font-bold mb-2 leading-snug">{usage.translation}</p>
                        <p className="text-base sm:text-lg italic text-muted-foreground font-medium">
                            {locale === 'fr' && usage.french ? usage.french : usage.english}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}
