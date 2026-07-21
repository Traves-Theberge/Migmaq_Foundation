"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';
import CommandPalette from './CommandPalette';
import { signOutAction } from '@/app/admin/login/actions';
import {
    HomeIcon, DictionaryIcon, LessonsIcon, BooksIcon, AudioIcon,
    ActivityIcon, UsersIcon, ApiDocsIcon, ExternalLinkIcon, MenuIcon, CloseIcon, LogOutIcon,
} from './icons';
import type { SessionProfile } from '@/lib/supabase/auth';

interface NavCounts {
    dictionary: number;
    lessons: number;
    books: number;
    audio: number;
    dictionaryNeedsReview?: number;
}

const CONTENT_NAV = [
    { href: '/admin', label: 'Home', Icon: HomeIcon, exact: true, countKey: undefined },
    { href: '/admin/dictionary', label: 'Dictionary', Icon: DictionaryIcon, countKey: 'dictionary' as const },
    { href: '/admin/lessons', label: 'Lessons', Icon: LessonsIcon, countKey: 'lessons' as const },
    { href: '/admin/books', label: 'Storybooks', Icon: BooksIcon, countKey: 'books' as const },
    { href: '/admin/audio', label: 'Audio', Icon: AudioIcon, countKey: 'audio' as const },
];

const ADMIN_NAV = [
    { href: '/admin/activity', label: 'Activity', Icon: ActivityIcon },
    { href: '/admin/users', label: 'Users & Roles', Icon: UsersIcon },
];

function formatCount(n: number) {
    return n.toLocaleString('en-US');
}

export default function AdminSidebar({ profile, counts }: { profile: SessionProfile; counts: NavCounts }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

    const navItemClass = (active: boolean) =>
        `flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wide transition-colors ${
            active ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground hover:bg-muted'
        }`;

    return (
        <>
            {/* Mobile top bar */}
            <div className="md:hidden sticky top-0 z-[120] flex items-center gap-3 bg-card border-b-[3px] border-foreground px-3.5 py-2.5">
                <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="w-8 h-8 flex items-center justify-center">
                    <MenuIcon />
                </button>
                <div className="flex items-center gap-2.5">
                    <div className="w-[26px] h-[26px] rounded-full bg-accent flex items-center justify-center font-black text-[13px]">M</div>
                    <div className="font-black text-[13px] leading-tight">
                        MIGMAQ FOUNDATION
                        <small className="block font-normal text-[10px] tracking-wider uppercase opacity-60">Admin</small>
                    </div>
                </div>
            </div>

            {open && (
                <div
                    className="md:hidden fixed inset-0 bg-black/45 z-[150]"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Outer layer: background only, stretches to full page height (see mockup notes —
                a fixed-height sticky sidebar would leave a gap on pages taller than one viewport). */}
            <aside
                className={`bg-card border-r-[3px] border-foreground
                    md:sticky md:top-0 md:h-auto md:translate-x-0
                    fixed inset-y-0 left-0 z-[160] w-[82vw] max-w-[280px] transition-transform duration-200
                    ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="sticky top-0 h-dvh flex flex-col gap-3.5 p-4">
                    <div className="flex items-center gap-2.5 px-1.5">
                        <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="md:hidden ml-auto w-7 h-7 flex items-center justify-center order-3">
                            <CloseIcon />
                        </button>
                        <div className="w-[30px] h-[30px] rounded-full bg-accent flex items-center justify-center font-black text-[15px] shrink-0">M</div>
                        <div className="font-black text-sm leading-tight">
                            MIGMAQ FOUNDATION
                            <small className="block font-normal text-[10px] tracking-wider uppercase opacity-60 mt-0.5">Admin</small>
                        </div>
                    </div>

                    <CommandPalette />

                    <nav className="flex-1 overflow-y-auto flex flex-col gap-0.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 pt-0.5 pb-1">Content</div>
                        {CONTENT_NAV.map(({ href, label, Icon, exact, countKey }) => (
                            <Link key={href} href={href} className={navItemClass(isActive(href, exact))} onClick={() => setOpen(false)}>
                                <Icon className="opacity-85 shrink-0" />
                                <span className="flex-1">{label}</span>
                                {href === '/admin/dictionary' && !!counts.dictionaryNeedsReview && (
                                    <span
                                        className="text-[10.5px] font-bold tabular-nums bg-accent text-accent-foreground rounded-full px-1.5 py-0.5"
                                        title={`${counts.dictionaryNeedsReview} words awaiting French review`}
                                    >
                                        {counts.dictionaryNeedsReview}
                                    </span>
                                )}
                                {countKey && !(href === '/admin/dictionary' && counts.dictionaryNeedsReview) && (
                                    <span className="text-[10.5px] tabular-nums opacity-70">{formatCount(counts[countKey])}</span>
                                )}
                            </Link>
                        ))}

                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 pt-3.5 pb-1">Admin</div>
                        {ADMIN_NAV.map(({ href, label, Icon }) => (
                            <Link key={href} href={href} className={navItemClass(isActive(href))} onClick={() => setOpen(false)}>
                                <Icon className="opacity-85 shrink-0" />
                                <span className="flex-1">{label}</span>
                            </Link>
                        ))}
                        {profile.role === 'super_admin' && (
                            <Link
                                href="/admin/api-docs"
                                className={navItemClass(isActive('/admin/api-docs'))}
                                onClick={() => setOpen(false)}
                                title="Interactive OpenAPI/Swagger documentation — super_admin only"
                            >
                                <ApiDocsIcon className="opacity-85 shrink-0" />
                                <span className="flex-1">API Docs</span>
                            </Link>
                        )}
                    </nav>

                    <Link href="/" target="_blank" className="flex items-center gap-2 mt-1 px-3 py-2 text-[11.5px] font-bold uppercase tracking-wide text-foreground/60 hover:text-foreground">
                        <ExternalLinkIcon />
                        View public site
                    </Link>

                    <div className="flex items-center gap-2.5 border-t-2 border-muted pt-3.5">
                        <Avatar userId={profile.id} src={profile.avatar_url} editable title="Change your photo" />
                        <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold truncate">{profile.email}</div>
                            <div className="text-[10.5px] uppercase tracking-wide text-muted-foreground">{profile.role}</div>
                        </div>
                        <form action={signOutAction}>
                            <button type="submit" title="Sign out" className="w-7 h-7 flex items-center justify-center border-2 border-foreground hover:bg-muted transition-colors">
                                <LogOutIcon />
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    );
}
