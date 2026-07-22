import { NextResponse } from 'next/server';
import { getRandomWords } from '../../../../lib/games';
import { FlashcardResponseSchema } from '@/lib/validation/games';
import { logError } from '@/lib/log';

export async function GET() {
    try {
        const words = await getRandomWords();
        return NextResponse.json(FlashcardResponseSchema.parse(words));
    } catch (error) {
        logError('GET /api/games/flashcard', 'building a flashcard round failed', error);
        return NextResponse.json({ error: 'Could not build a flashcard round.' }, { status: 500 });
    }
}
