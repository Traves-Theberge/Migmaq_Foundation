/** Small stroke-icon set for the admin — kept separate from lucide-react so sizing/weight stays consistent with the admin's own design pass. */

type IconProps = { className?: string; size?: number };

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function HomeIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M3 10l7-6 7 6" />
            <path d="M5 9v8a1 1 0 0 0 1 1h3v-5h2v5h3a1 1 0 0 0 1-1V9" />
        </svg>
    );
}

export function DictionaryIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M4 4.5C6 3.5 8.5 3.5 10 4.5v11c-1.5-1-4-1-6 0z" />
            <path d="M16 4.5c-1.5-1-4-1-6 0v11c1.5-1 4-1 6 0z" />
        </svg>
    );
}

export function LessonsIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M2 8l8-4 8 4-8 4z" />
            <path d="M5.5 9.8V13c0 1.4 2.2 2.5 4.5 2.5s4.5-1.1 4.5-2.5V9.8" />
            <path d="M18 8v4.5" />
        </svg>
    );
}

export function BooksIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <rect x="3" y="3" width="4" height="14" rx="0.8" />
            <rect x="8" y="5" width="4" height="12" rx="0.8" />
            <rect x="13" y="2" width="4" height="15" rx="0.8" />
        </svg>
    );
}

export function AudioIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M3 12v-1a7 7 0 0 1 14 0v1" />
            <rect x="2" y="12" width="3.5" height="5" rx="1.2" />
            <rect x="14.5" y="12" width="3.5" height="5" rx="1.2" />
        </svg>
    );
}

export function ActivityIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M3 10a7 7 0 1 1 7 7" />
            <path d="M3 5v5h5" />
            <path d="M10 7v3.5l2.5 1.5" />
        </svg>
    );
}

export function UsersIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <circle cx="7" cy="6.5" r="2.5" />
            <path d="M2.5 17c0-2.8 2-5 4.5-5s4.5 2.2 4.5 5" />
            <circle cx="14.5" cy="7.5" r="2" />
            <path d="M13 12.2c1.9.4 3.5 2.3 3.5 4.8" />
        </svg>
    );
}

export function ExternalLinkIcon({ className, size = 14 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M11 4h5v5" />
            <path d="M16 4l-7 7" />
            <path d="M8 4H4.5A1.5 1.5 0 0 0 3 5.5v10A1.5 1.5 0 0 0 4.5 17h10a1.5 1.5 0 0 0 1.5-1.5V12" />
        </svg>
    );
}

export function SearchIcon({ className, size = 15 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="9" cy="9" r="6.5" />
            <path d="m18 18-4.3-4.3" />
        </svg>
    );
}

export function MenuIcon({ className, size = 18 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M3 5h14" /><path d="M3 10h14" /><path d="M3 15h14" />
        </svg>
    );
}

export function CloseIcon({ className, size = 15 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M5 5l10 10" /><path d="M15 5L5 15" />
        </svg>
    );
}

export function LogOutIcon({ className, size = 14 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17H7" />
            <path d="M13 13l4-4-4-4" />
            <path d="M17 9H7" />
        </svg>
    );
}

export function PencilIcon({ className, size = 13 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M12.5 3.5l4 4L6 18H2v-4z" />
        </svg>
    );
}

export function TrashIcon({ className, size = 13 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M4 6h12" />
            <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6" />
            <path d="M5.5 6l.6 10a1.5 1.5 0 0 0 1.5 1.4h4.8a1.5 1.5 0 0 0 1.5-1.4l.6-10" />
        </svg>
    );
}

export function ApiDocsIcon({ className, size = 17 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" {...base}>
            <path d="M6 2.5h6l4 4V16a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 16V4A1.5 1.5 0 0 1 5.5 2.5z" />
            <path d="M12 2.5V6a1 1 0 0 0 1 1h3.4" />
            <path d="M7 11l-2 2 2 2" />
            <path d="M11 11l2 2-2 2" />
        </svg>
    );
}

export function CameraIcon({ className, size = 13 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15.5V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-.5" />
            <rect x="5" y="6" width="10" height="8" rx="1.5" />
            <path d="M8 6l1-2h2l1 2" />
            <circle cx="10" cy="10" r="2" />
        </svg>
    );
}
