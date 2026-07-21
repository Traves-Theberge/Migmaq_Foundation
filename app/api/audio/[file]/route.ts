import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { AudioFileParamSchema } from '@/lib/validation/audio';

/**
 * Local-development fallback: streams recordings straight from the Micmac
 * audio archive on disk. Once scripts/upload-audio-blob.mjs has run, the
 * manifest carries Vercel Blob URLs and this route is no longer used.
 */
const AUDIO_DIR = process.env.MICMAC_AUDIO_DIR
    ?? path.resolve(process.cwd(), '..', 'Micmac', 'audio');

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ file: string }> }
) {
    const { file } = await params;
    const parsed = AudioFileParamSchema.safeParse({ file: decodeURIComponent(file) });
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }
    const name = parsed.data.file;
    try {
        const data = await fs.readFile(path.join(AUDIO_DIR, name));
        return new NextResponse(new Uint8Array(data), {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=86400',
            },
        });
    } catch {
        return NextResponse.json({ error: 'Recording not found' }, { status: 404 });
    }
}
