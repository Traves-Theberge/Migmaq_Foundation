import { NextResponse } from 'next/server';
import { getRandomWords } from '../../../../lib/games';
import { FlashcardResponseSchema } from '@/lib/validation/games';

export async function GET() {
    try {
        const words = await getRandomWords();
        return NextResponse.json(FlashcardResponseSchema.parse(words));
    } catch (error) {
        console.error('GET /api/games/flashcard failed:', error);
        return NextResponse.json({ error: 'Could not build a flashcard round.' }, { status: 500 });
    }
}
