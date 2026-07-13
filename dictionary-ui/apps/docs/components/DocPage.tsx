import React from 'react';

export function DocHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: React.ReactNode }) {
    return (
        <div className="mb-14 pb-8 border-b-4 border-foreground">
            <p className="text-xs font-black uppercase tracking-widest text-secondary mb-3">{eyebrow}</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">{title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">{description}</p>
        </div>
    );
}

/** A titled section with a bold rule extending from the heading — consistent
 *  rhythm and visual weight across every doc page instead of ad hoc h2/mt spacing. */
export function DocSection({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
    return (
        <section className="mt-14 first:mt-0">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-black uppercase tracking-widest whitespace-nowrap">{title}</h2>
                <div className="flex-1 h-[3px] bg-foreground" />
                {badge && (
                    <span className="text-[0.65rem] font-black uppercase tracking-widest bg-accent text-accent-foreground px-2 py-1">
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </section>
    );
}

export function DocNote({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-muted-foreground mt-4 mb-2 leading-relaxed">{children}</p>;
}
