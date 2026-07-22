import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/games';
import { QuizResponseSchema } from '@/lib/validation/games';

export async function GET() {
    try {
        const questions = await getQuizQuestions(5);
        return NextResponse.json(QuizResponseSchema.parse(questions));
    } catch (error) {
        console.error('GET /api/games/quiz failed:', error);
        return NextResponse.json({ error: 'Could not build a quiz round.' }, { status: 500 });
    }
}
