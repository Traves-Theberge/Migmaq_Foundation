import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import SpellingCyclerPreview from './preview';

export const metadata = { title: 'SpellingCycler — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function SpellingCyclerDocsPage() {
    const source = readSource('../../packages/react/src/theme/SpellingCycler.tsx');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Theme"
                title="Spelling Cycler"
                description={
                    <>
                        Cycles through alternate spellings of a language or word name. Many languages have
                        more than one accepted orthography — a dictionary site&apos;s header is a natural
                        place to acknowledge that rather than pick just one.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-8 border-4 border-foreground flex items-center justify-center">
                    <SpellingCyclerPreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/spelling-cycler.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { SpellingCycler } from '@dictionary-ui/react';\n\n<SpellingCycler variants={["Mi'gmaq", "Mi'gmaaq", "Mi'gma'k"]} />`}
                />
            </DocSection>

            <DocSection title="Source">
                <p className="text-sm font-bold mb-2"><code>theme/SpellingCycler.tsx</code></p>
                <CodeBlock code={source} />
            </DocSection>
        </div>
    );
}
