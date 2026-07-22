"use client";

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Feather, Sparkles } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/LocaleProvider';

interface PagePlaceholderProps {
    alt: string;
    imageUrl?: string;
    /** Derives a stable warm tint per page so a book doesn't look flat. */
    seed?: number;
}

// Quillwork-inspired palette (terracotta, spruce, ochre, river) — the same
// family used elsewhere in this project, rather than a generic pastel tint.
const TINTS = [
    'linear-gradient(155deg, #c1583f, #8f331f)',
    'linear-gradient(155deg, #4a7363, #294038)',
    'linear-gradient(155deg, #dab465, #a97a2e)',
    'linear-gradient(155deg, #5a8598, #2c4a56)',
];
const INK = '#f3e6c8';

/**
 * A page's illustration slot. Renders the real image once a book supplies
 * `imageUrl`; until then, a warm placeholder that reads as "the art for this
 * page is on its way" rather than a broken image — an ink-feather mark and a
 * gentle ambient sparkle, styled to sit comfortably inside the book itself.
 */
export default function PagePlaceholder({ alt, imageUrl, seed = 0 }: PagePlaceholderProps) {
    const reduceMotion = useReducedMotion();
    const t = useTranslations('storybook');

    if (imageUrl) {
        return (
            <div className="relative w-full h-full">
                <Image src={imageUrl} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
        );
    }

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ background: TINTS[seed % TINTS.length] }}
        >
            <motion.div
                className="flex flex-col items-center gap-3 text-center px-8"
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="relative" aria-hidden="true">
                    <Feather className="w-10 h-10 opacity-80" strokeWidth={1.5} style={{ color: INK }} />
                    <motion.span
                        className="absolute -top-2 -right-4"
                        animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
                        transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Sparkles className="w-4 h-4" style={{ color: '#e6c987' }} />
                    </motion.span>
                </div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest opacity-90" style={{ color: INK }}>
                    {t('illustrationComing')}
                </p>
                <p className="text-sm italic opacity-95 max-w-[20rem]" style={{ color: INK }}>{alt}</p>
            </motion.div>
        </div>
    );
}
