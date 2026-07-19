"use client";

import { useId, useState } from 'react';
import { getPosDescription } from '@/lib/pos-glossary';
import { cn } from '@/lib/utils';

interface PartOfSpeechBadgeProps {
    type: string;
    className?: string;
}

/** A part-of-speech tag that shows a plain-language explanation on hover, focus, or tap. */
export default function PartOfSpeechBadge({ type, className }: PartOfSpeechBadgeProps) {
    const [open, setOpen] = useState(false);
    const tooltipId = useId();
    const description = getPosDescription(type);

    const toggle = (e: React.SyntheticEvent) => {
        // The badge can sit inside a <Link> (dictionary list rows) — don't let
        // taps on it also trigger navigation to the word's page.
        e.preventDefault();
        e.stopPropagation();
        setOpen((o) => !o);
    };

    return (
        <span className="relative inline-block">
            <span
                tabIndex={0}
                role="button"
                aria-describedby={description ? tooltipId : undefined}
                aria-expanded={open}
                onClick={toggle}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggle(e);
                }}
                className={cn(className, description && 'cursor-help')}
            >
                {type}
            </span>
            {description && open && (
                <span
                    id={tooltipId}
                    role="tooltip"
                    className="absolute z-50 bottom-full left-0 mb-2 w-64 max-w-[80vw] p-3 bg-foreground text-background text-sm font-medium normal-case tracking-normal leading-snug border-2 border-foreground shadow-lg"
                >
                    {description}
                </span>
            )}
        </span>
    );
}
