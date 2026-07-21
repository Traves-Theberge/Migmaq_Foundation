import { NextResponse } from 'next/server';
import { getRandomWords } from '../../../../lib/games';
import { FlashcardResponseSchema } from '@/lib/validation/games';

export async function GET() {
    try {
        const words = await getRandomWords();
        return NextResponse.json(FlashcardResponseSchema.parse(words));
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
