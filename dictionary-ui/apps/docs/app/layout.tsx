import type { Metadata } from 'next';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import '@dictionary-ui/react/styles.css';
import './globals.css';

export const metadata: Metadata = {
    title: 'Dictionary UI',
    description: 'Reusable React components for building language dictionary sites.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="font-sans antialiased">
                <header className="border-b-4 border-foreground">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="font-black uppercase tracking-tighter text-xl">
                            dictionary-ui
                        </Link>
                        <nav className="flex items-center gap-6 text-sm font-bold uppercase tracking-wide">
                            <a
                                href="https://github.com"
                                className="hover:text-accent transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </nav>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    <div className="w-full lg:w-56 lg:shrink-0 lg:sticky lg:top-24">
                        <Sidebar />
                    </div>
                    <div className="min-w-0 flex-1 w-full">{children}</div>
                </main>
            </body>
        </html>
    );
}
