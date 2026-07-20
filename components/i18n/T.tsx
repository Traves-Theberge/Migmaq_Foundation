"use client";

import { useTranslations } from '@/lib/i18n/LocaleProvider';
import type { Namespace } from '@/lib/i18n/messages';

interface TProps {
    /** Message namespace, e.g. 'dictionaryWord'. */
    ns: Namespace;
    /** Key within that namespace. */
    k: string;
}

/**
 * Renders one translated string as a tiny client island inside a server
 * component — needed anywhere a page can't use useTranslations() directly
 * (e.g. app/dictionary/[word]/page.tsx, kept as a server component for its
 * generateMetadata/SSR data fetching).
 */
export default function T({ ns, k }: TProps) {
    const t = useTranslations(ns);
    return <>{t(k as never)}</>;
}
