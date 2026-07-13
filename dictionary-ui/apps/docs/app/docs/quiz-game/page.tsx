import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import QuizGamePreview from './preview';

export const metadata = { title: 'QuizGame — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function QuizGameDocsPage() {
    const source = readSource('../../packages/react/src/games/QuizGame.tsx');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Games"
                title="Quiz Game"
                description={
                    <>
                        A multiple-choice quiz: one question at a time, immediate right/wrong feedback with a
                        celebratory burst on correct answers, and a score screen at the end.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-4 sm:p-8 border-4 border-foreground">
                    <QuizGamePreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <p className="text-sm font-bold mb-2">As a package (also installs canvas-confetti):</p>
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/quiz-game.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { QuizGame, type QuizQuestion } from '@dictionary-ui/react';

const questions: QuizQuestion[] = [
  { prompt: "What does mui'n mean?", correctAnswer: 'bear', options: shuffle(['bear', 'rabbit', 'salmon', 'owl']) },
];

<QuizGame key={attempt} questions={questions} onRestart={() => setAttempt(a => a + 1)} />
// key= forces a remount to reset state on restart — or pass a fresh questions array each time`}
                />
            </DocSection>

            <DocSection title="Source">
                <p className="text-sm font-bold mb-2"><code>games/QuizGame.tsx</code></p>
                <CodeBlock code={source} />
            </DocSection>
        </div>
    );
}
