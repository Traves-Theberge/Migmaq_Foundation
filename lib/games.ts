import { getDictionary } from './dictionary';

export async function getRandomWords(count = 6) {
    const words = await getDictionary();
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
    const words = await getDictionary();
    const validWords = words.filter((w: any) => w.translations && w.translations.length > 0);

    // A quiz question needs 1 correct answer + 3 distinct distractors — with
    // fewer than 4 valid words, the distractor loop below can never fill up
    // and would spin forever.
    if (validWords.length < 4) {
        throw new Error('Not enough dictionary words with translations to build a quiz');
    }

    const questions = [];

    for (let i = 0; i < count; i++) {
        // Pick a random correct word
        const correctIndex = Math.floor(Math.random() * validWords.length);
        const correctWord = validWords[correctIndex];

        // Pick 3 distractors
        const distractors: any[] = [];
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
