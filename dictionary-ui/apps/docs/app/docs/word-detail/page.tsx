import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import WordDetailPreview from './preview';

export const metadata = { title: 'WordDetailPage — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function WordDetailDocsPage() {
    const source = readSource('../../packages/react/src/dictionary/WordDetailPage.tsx');

    return (
        <div className="max-w-4xl">
            <DocHeader
                eyebrow="Dictionary primitives"
                title="Word Detail Page"
                description={
                    <>
                        The full entry page — pronunciation, part of speech, audio, translations, numbered
                        definitions, usage examples with their own audio, alternate/inflected forms, and
                        source citations. <code>WordCard</code> is the list item; this is the page you land
                        on when you click one.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-4 sm:p-8 border-4 border-foreground">
                    <WordDetailPreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/word-detail.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { WordDetailPage, type WordDetailData } from '@dictionary-ui/react';

const data: WordDetailData = {
  word: "mui'n",
  pronunciation: 'mu·iin',
  partOfSpeech: 'noun animate',
  translations: ['Bear'],
  definitions: ['bear'],
  audio: [{ url: '/audio/mui-n.mp3', label: 'Speaker A' }],
  usages: [{ example: "Mui'n na to'q maw wigt'gl pgumann.", translation: 'A bear apparently really likes blueberries.' }],
  alternateForms: [{ text: "mui'naq", gloss: 'bears', note: '(plural)' }],
  sources: ['Pacifique Dictionary Manuscript, Page Image #517'],
};

<WordDetailPage data={data} />`}
                />
            </DocSection>

            <DocSection title="Source">
                <p className="text-sm font-bold mb-2"><code>dictionary/WordDetailPage.tsx</code></p>
                <CodeBlock code={source} />
            </DocSection>
        </div>
    );
}
