import Link from 'next/link';
import { COMPONENTS } from '@/components/registry';

export default function HomePage() {
    return (
        <div>
            <p className="text-sm font-black uppercase tracking-widest text-secondary mb-3">
                Components for language dictionary sites
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 max-w-2xl uppercase leading-none">
                Audio, glosses, word lookup, and a storybook reader.
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-10 text-lg">
                Built while shipping a real Mi&apos;gmaq dictionary site. Copy the source or install the
                package — each component is dependency-light and ships with sane default styling you can
                override.
            </p>

            <div className="grid gap-7 sm:grid-cols-2">
                {COMPONENTS.map((c) => (
                    <Link
                        key={c.slug}
                        href={c.status === 'ready' ? `/docs/${c.slug}` : '#'}
                        aria-disabled={c.status !== 'ready'}
                        className={`block p-8 border-4 border-foreground transition-all ${
                            c.status === 'ready' ? 'hard-shadow' : 'opacity-40 cursor-not-allowed'
                        }`}
                    >
                        <div className="flex items-start justify-between gap-3 mb-4">
                            {/* Component names are PascalCase identifiers (e.g. WordDetailPage) —
                                uppercasing them smashes the words together unreadably, so this
                                stays mixed-case instead of following the all-caps eyebrow style. */}
                            <h2 className="text-xl font-black tracking-normal">{c.displayName}</h2>
                            {c.status === 'planned' && (
                                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground shrink-0 mt-1">
                                    coming soon
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">{c.category}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
