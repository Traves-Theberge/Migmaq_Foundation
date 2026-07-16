import fs from 'fs/promises';
import path from 'path';

export interface Recording {
    file: string;
    speaker: string;
    kind: 'word' | 'example';
    /** Playable URL: the Vercel Blob URL once uploaded, else the local dev fallback route. */
    url: string;
}

interface ManifestRecording {
    file: string;
    speaker: string;
    kind: 'word' | 'example';
    url: string | null;
}

let cache: Record<string, ManifestRecording[]> | null = null;
let lastModified = 0;

async function getManifest() {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'audio-manifest.json');
    try {
        const stats = await fs.stat(filePath);
        if (!cache || stats.mtimeMs > lastModified) {
            const data = await fs.readFile(filePath, 'utf8');
            cache = JSON.parse(data).words;
            lastModified = stats.mtimeMs;
        }
    } catch {
        cache = cache ?? {};
    }
    return cache!;
}

/** All recordings for a word (every speaker, word + example), with playable URLs. */
export async function getRecordings(word: string): Promise<Recording[]> {
    const manifest = await getManifest();
    const recs = manifest[word] ?? manifest[word.toLowerCase()] ?? [];
    return recs.map((r) => ({
        ...r,
        url: r.url ?? `/api/audio/${encodeURIComponent(r.file)}`,
    }));
}
