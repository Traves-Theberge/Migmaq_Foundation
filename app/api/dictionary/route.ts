import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/dictionary';

export async function GET() {
    try {
        const dict = await getDictionary();
        return NextResponse.json(dict);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
