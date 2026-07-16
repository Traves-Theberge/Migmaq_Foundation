import { NextResponse } from 'next/server';
import { getWordDetails, resolveAlternateForms } from '@/lib/dictionary';
import { getRecordings } from '@/lib/audio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');
    if (!word) {
        return NextResponse.json({ error: 'Missing word parameter' }, { status: 400 });
    }
    try {
        const result = await getWordDetails(word);
        const recordings = await getRecordings(result.word);
        const resolved_alternate_forms = await resolveAlternateForms(result.alternate_forms);
        return NextResponse.json({ ...result, recordings, resolved_alternate_forms });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 404 });
    }
}
