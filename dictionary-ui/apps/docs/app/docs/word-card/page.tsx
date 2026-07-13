import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import WordCardPreview from './preview';

export const metadata = { title: 'WordCard & SearchBox — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function WordCardDocsPage() {
    const cardSource = readSource('../../packages/react/src/dictionary/WordCard.tsx');
    const searchSource = readSource('../../packages/react/src/dictionary/SearchBox.tsx');
    const typesSource = readSource('../../packages/react/src/dictionary/types.ts');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Dictionary primitives"
                title="Word Card & Search Box"
                description={
                    <>
                        The core &ldquo;look up a word&rdquo; building blocks: a search input with no search
                        engine baked in (bring your own filter/fuzzy-match), and a word list card with
                        pronunciation and part-of-speech badge built in. Type in the box below — it filters
                        the three demo words client-side.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-8 border-4 border-foreground">
                    <WordCardPreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <p className="text-sm font-bold mb-2">As a package:</p>
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/word-card.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { SearchBox, WordCard, type DictionaryWord } from '@dictionary-ui/react';

const words: DictionaryWord[] = [
  { word: "mui'n", pronunciation: 'mu·iin', partOfSpeech: 'noun animate', definitions: ['bear'], href: '/dictionary/mui-n' },
];

const [query, setQuery] = useState('');
const filtered = words.filter(w => w.word.includes(query)); // bring your own filter

<SearchBox value={query} onChange={setQuery} resultCount={filtered.length} />
{filtered.map(w => <WordCard key={w.word} word={w} />)}`}
                />
            </DocSection>

            <DocSection title="Source" badge="3 files">
                <p className="text-sm font-bold mb-2"><code>dictionary/WordCard.tsx</code></p>
                <CodeBlock code={cardSource} />
                <p className="text-sm font-bold mt-6 mb-2"><code>dictionary/SearchBox.tsx</code></p>
                <CodeBlock code={searchSource} />
                <p className="text-sm font-bold mt-6 mb-2"><code>dictionary/types.ts</code></p>
                <CodeBlock code={typesSource} />
            </DocSection>
        </div>
    );
}
