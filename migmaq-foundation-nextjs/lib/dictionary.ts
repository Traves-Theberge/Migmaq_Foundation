import fs from 'fs/promises';
import path from 'path';

let cache: any = null;
let lastModified: number = 0;

export async function getDictionary() {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'dictionary.json');
    const stats = await fs.stat(filePath);
    if (!cache || stats.mtimeMs > lastModified) {
        const data = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        cache = parsed.message.words;
        lastModified = stats.mtimeMs;
    }
    return cache;
}

export async function getWordDetails(word: string) {
    const dict = await getDictionary();
    const result = dict.find((w: any) => w.word.toLowerCase() === word.toLowerCase());
    if (!result) throw new Error('Word not found');
    return result;
}
