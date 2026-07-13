"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Feather, Sparkles } from 'lucide-react';

export interface PagePlaceholderProps {
    alt: string;
    imageUrl?: string;
    /** Derives a stable tint per page so a book doesn't look flat. Change TINTS to your own palette. */
    seed?: number;
}

const TINTS = [
    'linear-gradient(155deg, #c1583f, #8f331f)',
    'linear-gradient(155deg, #4a7363, #294038)',
    'linear-gradient(155deg, #dab465, #a97a2e)',
    'linear-gradient(155deg, #5a8598, #2c4a56)',
];
const INK = '#f3e6c8';

/**
 * A page's illustration slot. Renders the real image once you supply
 * `imageUrl`; until then, a placeholder that reads as "the art for this
 * page is on its way" rather than a broken image.
 */
export default function PagePlaceholder({ alt, imageUrl, seed = 0 }: PagePlaceholderProps) {
    const reduceMotion = useReducedMotion();

    if (imageUrl) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        );
    }

    return (
        <div
            style={{
                position: 'relative', width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                background: TINTS[seed % TINTS.length],
            }}
        >
            <motion.div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textAlign: 'center', padding: '0 2rem' }}
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div style={{ position: 'relative' }}>
                    <Feather size={40} strokeWidth={1.5} style={{ opacity: 0.8, color: INK }} />
                    <motion.span
                        style={{ position: 'absolute', top: '-0.5rem', right: '-1rem' }}
                        animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
                        transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Sparkles size={16} style={{ color: '#e6c987' }} />
                    </motion.span>
                </div>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9, color: INK, margin: 0 }}>
                    Illustration on its way
                </p>
                <p style={{ fontSize: '0.875rem', fontStyle: 'italic', opacity: 0.95, maxWidth: '20rem', color: INK, margin: 0 }}>
                    {alt}
                </p>
            </motion.div>
        </div>
    );
}
