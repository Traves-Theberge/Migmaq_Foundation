"use client";

import { usePathname } from 'next/navigation';

/** Re-mounts (via key=pathname) on every navigation so the .admin-view fade-in plays each time, matching the mockup's page-transition polish. */
export default function AdminViewTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div key={pathname} className="admin-view">
            {children}
        </div>
    );
}
