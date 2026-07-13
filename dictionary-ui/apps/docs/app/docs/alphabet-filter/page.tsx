import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import AlphabetFilterPreview from './preview';

export const metadata = { title: 'AlphabetFilter — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function AlphabetFilterDocsPage() {
    const source = readSource('../../packages/react/src/dictionary/AlphabetFilter.tsx');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Dictionary primitives"
                title="Alphabet Filter"
                description={
                    <>
                        A row of letter buttons for jumping to a section of a word list, plus an
                        &ldquo;all&rdquo; button to clear the filter. Pass only the letters that actually
                        have entries — derive them from your own word list.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-8 border-4 border-foreground">
                    <AlphabetFilterPreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/alphabet-filter.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { AlphabetFilter } from '@dictionary-ui/react';

const letters = [...new Set(words.map(w => w.word[0].toUpperCase()))].sort();
const [selected, setSelected] = useState<string | null>(null);

<AlphabetFilter letters={letters} selected={selected} onSelect={setSelected} />`}
                />
            </DocSection>

            <DocSection title="Source">
                <p className="text-sm font-bold mb-2"><code>dictionary/AlphabetFilter.tsx</code></p>
                <CodeBlock code={source} />
            </DocSection>
        </div>
    );
}
