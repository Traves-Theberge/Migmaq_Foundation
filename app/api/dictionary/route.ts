import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/dictionary';
import { DictionaryListResponseSchema } from '@/lib/validation/dictionary';

export async function GET() {
    try {
        const dict = await getDictionary();
        return NextResponse.json(DictionaryListResponseSchema.parse(dict));
    } catch (error) {
        console.error('GET /api/dictionary failed:', error);
        return NextResponse.json({ error: 'The dictionary could not be loaded.' }, { status: 500 });
    }
}
