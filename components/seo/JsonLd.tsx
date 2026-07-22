/**
 * Renders a JSON-LD structured-data block. `dangerouslySetInnerHTML` is the
 * standard/recommended Next.js pattern for this (see the App Router docs'
 * JSON-LD example) — the content here is always server-generated from our
 * own data (never raw user input), so there's no injection risk to guard
 * against the way there would be with arbitrary HTML.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
