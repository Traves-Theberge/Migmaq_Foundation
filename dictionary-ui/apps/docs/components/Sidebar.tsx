"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPONENTS } from './registry';

const CATEGORY_ORDER = ['Audio', 'Gloss & tooltip', 'Dictionary primitives', 'Storybook reader', 'Games', 'Theme'] as const;

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="w-full lg:w-56 lg:shrink-0 pb-8 lg:pb-0 border-b-4 lg:border-b-0 border-foreground" aria-label="Components">
            {CATEGORY_ORDER.map((category) => {
                const items = COMPONENTS.filter((c) => c.category === category);
                if (items.length === 0) return null;
                return (
                    <div key={category} className="mb-7">
                        <p className="text-[0.65rem] font-black uppercase tracking-widest text-muted-foreground mb-2">
                            {category}
                        </p>
                        <ul className="space-y-0.5">
                            {items.map((c) => {
                                const href = c.status === 'ready' ? `/docs/${c.slug}` : '#';
                                const active = pathname === href;
                                return (
                                    <li key={c.slug}>
                                        <Link
                                            href={href}
                                            aria-disabled={c.status !== 'ready'}
                                            className={`block pl-3 py-1.5 text-sm font-bold border-l-4 transition-colors ${
                                                active
                                                    ? 'border-accent text-foreground bg-accent/10'
                                                    : c.status === 'ready'
                                                        ? 'border-transparent text-muted-foreground hover:text-foreground hover:border-foreground'
                                                        : 'border-transparent text-muted-foreground/40 cursor-not-allowed'
                                            }`}
                                        >
                                            {c.displayName}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </nav>
    );
}
