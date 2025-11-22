import fs from 'fs/promises';
import path from 'path';

let cache: any = null;
let lastModified: number = 0;

async function loadDictionary() {
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

export async function getRandomWords(count = 6) {
    const words = await loadDictionary();
    if (!Array.isArray(words) || words.length === 0) {
        throw new Error('Dictionary is empty');
    }

    // Filter words that have translations
    const validWords = words.filter((w: any) => w.translations && w.translations.length > 0);

    // Shuffle using Fisher-Yates
    const shuffled = [...validWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, count);

    // Create pairs: one with word, one with translation
    const pairs = selected.flatMap((w: any, idx: number) => [
        { id: `word_${idx}`, content: w.word, type: 'word', matchId: `pair_${idx}` },
        { id: `trans_${idx}`, content: w.translations[0], type: 'translation', matchId: `pair_${idx}` }
    ]);

    // Shuffle pairs
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    return pairs;
}

export async function getQuizQuestions(count = 5) {
    const words = await loadDictionary();
    const validWords = words.filter((w: any) => w.translations && w.translations.length > 0);

    const questions = [];

    for (let i = 0; i < count; i++) {
        // Pick a random correct word
        const correctIndex = Math.floor(Math.random() * validWords.length);
        const correctWord = validWords[correctIndex];

        // Pick 3 distractors
        const distractors = [];
        while (distractors.length < 3) {
            const dIndex = Math.floor(Math.random() * validWords.length);
            if (dIndex !== correctIndex && !distractors.includes(validWords[dIndex])) {
                distractors.push(validWords[dIndex]);
            }
        }

        // Shuffle options
        const options = [correctWord, ...distractors].map(w => w.translations[0]);
        for (let j = options.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [options[j], options[k]] = [options[k], options[j]];
        }

        questions.push({
            word: correctWord.word,
            correctAnswer: correctWord.translations[0],
            options
        });
    }

    return questions;
}
