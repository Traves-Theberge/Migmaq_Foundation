"use client";

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative group border-4 border-foreground bg-muted overflow-hidden">
            <button
                onClick={copy}
                aria-label="Copy code"
                className="absolute top-3 right-3 p-1.5 border-2 border-foreground bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code className={`language-${lang}`}>{code}</code>
            </pre>
        </div>
    );
}
