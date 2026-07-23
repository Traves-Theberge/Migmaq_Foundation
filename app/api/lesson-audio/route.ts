import { NextResponse } from 'next/server';
import { getRecordings } from '@/lib/audio';
import { LessonAudioQuerySchema, LessonAudioResponseSchema } from '@/lib/validation/audio';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
    const limited = rateLimit(request, 'lesson-audio', 120);
    if (limited) return limited;

    const { searchParams } = new URL(request.url);
    const parsed = LessonAudioQuerySchema.safeParse({ word: searchParams.get('word') ?? undefined });
    if (!parsed.success) {
        return NextResponse.json({ error: 'Missing word parameter' }, { status: 400 });
    }
    const recordings = await getRecordings(parsed.data.word);
    return NextResponse.json(LessonAudioResponseSchema.parse({ recordings }));
}
