"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

// lucide-react 1.x removed brand icons; inline GitHub mark (from simple-icons).
const GithubIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/LocaleProvider";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const t = useTranslations('nav');

    React.useEffect(() => setMounted(true), []);

    const navItems = [
        { name: t('home'), href: "/" },
        { name: t('dictionary'), href: "/dictionary" },
        { name: t('education'), href: "/education" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-360">
                            <img
                                src="/assets/Images/fn_logo.png"
                                alt="Mi'gmaq Foundation"
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase">
                            {t('brand')}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "relative text-lg font-bold uppercase tracking-wide hover:text-accent-ink transition-colors",
                                            isActive ? "text-accent-ink" : "text-foreground"
                                        )}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="underline"
                                                className="absolute -bottom-2 left-0 right-0 h-1 bg-accent"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="https://github.com/Traves-Theberge/Migmaq_Foundation"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('github')}
                            className="p-2 border-2 border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                        >
                            <GithubIcon className="w-5 h-5" />
                        </a>
                        {mounted && (
                            <>
                                <LanguageToggle />
                                <button
                                    type="button"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    aria-label={theme === "dark" ? t('lightMode') : t('darkMode')}
                                    aria-pressed={theme === "dark"}
                                    className="p-2 border-2 border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            className="p-2 border-2 border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="md:hidden border-t-4 border-foreground bg-background overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block text-2xl font-black uppercase tracking-tight hover:text-accent-ink transition-colors",
                                        pathname === item.href ? "text-accent-ink" : "text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {mounted && (
                                <div className="flex items-center gap-4 pt-2">
                                    <LanguageToggle />
                                    <button
                                        type="button"
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        aria-label={theme === "dark" ? t('lightMode') : t('darkMode')}
                                        aria-pressed={theme === "dark"}
                                        className="p-2 border-2 border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                                    >
                                        {theme === "dark" ? (
                                            <Sun className="w-5 h-5" />
                                        ) : (
                                            <Moon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
