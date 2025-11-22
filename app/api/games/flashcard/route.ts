import { NextResponse } from 'next/server';
import { getRandomWords } from '../../../../lib/games';

export async function GET() {
    try {
        const words = await getRandomWords();
        return NextResponse.json(words);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
