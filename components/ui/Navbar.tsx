"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Moon, Sun, Hexagon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Dictionary", href: "/dictionary" },
    { name: "Education", href: "/education" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

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
                            Language Dictionary
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "relative text-lg font-bold uppercase tracking-wide hover:text-accent transition-colors",
                                            isActive ? "text-accent" : "text-foreground"
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
                            className="p-2 border-2 border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 border-2 border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                            >
                                {theme === "dark" ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
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
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="md:hidden border-t-4 border-foreground bg-background overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block text-2xl font-black uppercase tracking-tight hover:text-accent transition-colors",
                                        pathname === item.href ? "text-accent" : "text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
