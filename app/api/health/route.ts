import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { HealthResponseSchema } from '@/lib/validation/health';

const DB_CHECK_TIMEOUT_MS = 3000;

/** A real Supabase/Postgres round trip (not just "the process is running") — a public-read count against dictionary_words, bounded so a hung database can't hang this endpoint. */
async function checkDatabase(): Promise<'ok' | 'error'> {
    try {
        const supabase = await createClient();
        const query = supabase.from('dictionary_words').select('id', { count: 'exact', head: true }).limit(1);
        const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Database check timed out')), DB_CHECK_TIMEOUT_MS));
        const { error } = await Promise.race([query, timeout]);
        return error ? 'error' : 'ok';
    } catch (error) {
        console.error('GET /api/health: database check failed:', error);
        return 'error';
    }
}

export async function GET() {
    const database = await checkDatabase();
    const body = HealthResponseSchema.parse({
        status: database === 'ok' ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        checks: { database },
    });
    return NextResponse.json(body, { status: database === 'ok' ? 200 : 503 });
}
