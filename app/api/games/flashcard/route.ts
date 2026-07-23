import { NextResponse } from 'next/server';
import { getRandomWords } from '../../../../lib/games';
import { FlashcardResponseSchema } from '@/lib/validation/games';
import { logError } from '@/lib/log';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
    const limited = rateLimit(request, 'games-flashcard', 30);
    if (limited) return limited;

    try {
        const words = await getRandomWords();
        return NextResponse.json(FlashcardResponseSchema.parse(words));
    } catch (error) {
        logError('GET /api/games/flashcard', 'building a flashcard round failed', error);
        return NextResponse.json({ error: 'Could not build a flashcard round.' }, { status: 500 });
    }
}
