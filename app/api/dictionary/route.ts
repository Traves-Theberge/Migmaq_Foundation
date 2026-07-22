import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/dictionary';
import { DictionaryListResponseSchema } from '@/lib/validation/dictionary';
import { logError } from '@/lib/log';

export async function GET() {
    try {
        const dict = await getDictionary();
        return NextResponse.json(DictionaryListResponseSchema.parse(dict), {
            // The dictionary only changes on a new deploy (public/assets/
            // dictionary.json is rebuilt via scripts/build-dictionary.mjs,
            // not edited at runtime), so it's safe to cache aggressively —
            // a new deployment gets a new cache/edge network regardless.
            // stale-while-revalidate lets a client keep serving a cached
            // copy instantly while quietly refetching in the background.
            headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
        });
    } catch (error) {
        logError('GET /api/dictionary', 'loading the dictionary failed', error);
        return NextResponse.json({ error: 'The dictionary could not be loaded.' }, { status: 500 });
    }
}
