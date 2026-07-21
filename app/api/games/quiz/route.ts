import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/games';
import { QuizResponseSchema } from '@/lib/validation/games';

export async function GET() {
    try {
        const questions = await getQuizQuestions(5);
        return NextResponse.json(QuizResponseSchema.parse(questions));
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
