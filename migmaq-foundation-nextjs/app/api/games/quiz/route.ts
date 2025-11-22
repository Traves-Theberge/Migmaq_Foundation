import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/games';

export async function GET() {
    try {
        const questions = await getQuizQuestions(5);
        return NextResponse.json(questions);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
