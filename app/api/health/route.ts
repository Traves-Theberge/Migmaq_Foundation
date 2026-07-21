import { NextResponse } from 'next/server';
import { HealthResponseSchema } from '@/lib/validation/health';

export async function GET() {
    return NextResponse.json(HealthResponseSchema.parse({ status: 'ok', timestamp: new Date().toISOString() }));
}
