import { NextResponse } from 'next/server';
import { getRecordings } from '@/lib/audio';
import { LessonAudioQuerySchema, LessonAudioResponseSchema } from '@/lib/validation/audio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const parsed = LessonAudioQuerySchema.safeParse({ word: searchParams.get('word') ?? undefined });
    if (!parsed.success) {
        return NextResponse.json({ error: 'Missing word parameter' }, { status: 400 });
    }
    const recordings = await getRecordings(parsed.data.word);
    return NextResponse.json(LessonAudioResponseSchema.parse({ recordings }));
}
