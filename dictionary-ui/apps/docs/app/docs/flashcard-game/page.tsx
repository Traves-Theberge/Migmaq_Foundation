import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import FlashcardGamePreview from './preview';

export const metadata = { title: 'FlashcardGame — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function FlashcardGameDocsPage() {
    const source = readSource('../../packages/react/src/games/FlashcardGame.tsx');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Games"
                title="Flashcard Game"
                description={
                    <>
                        A memory-match game: flip cards two at a time, matching pairs (e.g. a word and its
                        translation) clear from the board. You own the deck entirely — shuffle your own
                        words into pairs and pass a fresh array to restart.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-4 sm:p-8 border-4 border-foreground">
                    <FlashcardGamePreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <p className="text-sm font-bold mb-2">As a package (also installs canvas-confetti):</p>
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/flashcard-game.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { FlashcardGame, type FlashcardPair } from '@dictionary-ui/react';

function buildDeck(words: { word: string; en: string }[]): FlashcardPair[] {
  const pairs = words.flatMap((w, i) => [
    { id: \`\${i}-word\`, content: w.word, side: "Mi'gmaq", matchId: String(i) },
    { id: \`\${i}-en\`, content: w.en, side: 'English', matchId: String(i) },
  ]);
  return shuffle(pairs); // bring your own shuffle
}

const [deck, setDeck] = useState(() => buildDeck(words));

<FlashcardGame pairs={deck} onRestart={() => setDeck(buildDeck(words))} />`}
                />
            </DocSection>

            <DocSection title="Source">
                <p className="text-sm font-bold mb-2"><code>games/FlashcardGame.tsx</code></p>
                <CodeBlock code={source} />
            </DocSection>
        </div>
    );
}
