import { NextResponse } from 'next/server';
import { getWordDetails, resolveAlternateForms, WordNotFoundError } from '@/lib/dictionary';
import { getRecordings } from '@/lib/audio';
import { WordDetailsQuerySchema, WordDetailsResponseSchema } from '@/lib/validation/dictionary';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const parsed = WordDetailsQuerySchema.safeParse({ word: searchParams.get('word') ?? undefined });
    if (!parsed.success) {
        return NextResponse.json({ error: 'Missing word parameter' }, { status: 400 });
    }
    try {
        const result = await getWordDetails(parsed.data.word);
        const recordings = await getRecordings(result.word);
        const resolved_alternate_forms = await resolveAlternateForms(result.alternate_forms);
        return NextResponse.json(WordDetailsResponseSchema.parse({ ...result, recordings, resolved_alternate_forms }));
    } catch (e) {
        if (e instanceof WordNotFoundError) {
            return NextResponse.json({ error: 'Word not found' }, { status: 404 });
        }
        console.error('GET /api/word-details failed:', e);
        return NextResponse.json({ error: 'Could not load the word.' }, { status: 500 });
    }
}
