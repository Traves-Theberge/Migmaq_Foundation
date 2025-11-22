import { NextResponse } from 'next/server';
import { getWordDetails } from '@/lib/dictionary';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');
    if (!word) {
        return NextResponse.json({ error: 'Missing word parameter' }, { status: 400 });
    }
    try {
        const result = await getWordDetails(word);
        return NextResponse.json(result);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 404 });
    }
}
