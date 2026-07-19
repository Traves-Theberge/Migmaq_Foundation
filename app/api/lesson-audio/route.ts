import { NextResponse } from 'next/server';
import { getRecordings } from '@/lib/audio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');
    if (!word) {
        return NextResponse.json({ error: 'Missing word parameter' }, { status: 400 });
    }
    const recordings = await getRecordings(word);
    return NextResponse.json({ recordings });
}
