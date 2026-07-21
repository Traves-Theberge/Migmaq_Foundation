"use client";

import { createContext, useCallback, useContext, useRef, useState } from 'react';

interface Toast {
    id: number;
    message: string;
    leaving?: boolean;
}

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
    return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const nextId = useRef(0);

    const showToast = useCallback((message: string) => {
        const id = nextId.current++;
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
            setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 200);
        }, 2600);
    }, []);

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <div className="fixed bottom-5 right-5 z-[300] flex flex-col-reverse gap-2">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        role="status"
                        className={`flex items-center gap-2 bg-foreground text-background border-2 border-foreground px-4 py-2.5 text-xs font-semibold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] ${
                            t.leaving ? 'animate-[toast-out_0.18s_ease_forwards]' : 'animate-[toast-in_0.2s_ease]'
                        }`}
                    >
                        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success shrink-0">
                            <circle cx="10" cy="10" r="7.5" />
                            <path d="M6.8 10.2l2.2 2.2 4.2-4.6" />
                        </svg>
                        <span>{t.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
