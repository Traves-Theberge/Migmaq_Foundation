/** Joins truthy class names. No Tailwind-merge semantics — kept dependency-free
 *  so this package doesn't force a specific styling toolchain on consumers. */
export function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(' ');
}
