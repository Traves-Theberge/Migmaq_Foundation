import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/games';
import { QuizResponseSchema } from '@/lib/validation/games';
import { logError } from '@/lib/log';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
    const limited = rateLimit(request, 'games-quiz', 30);
    if (limited) return limited;

    try {
        const questions = await getQuizQuestions(5);
        return NextResponse.json(QuizResponseSchema.parse(questions));
    } catch (error) {
        logError('GET /api/games/quiz', 'building a quiz round failed', error);
        return NextResponse.json({ error: 'Could not build a quiz round.' }, { status: 500 });
    }
}
