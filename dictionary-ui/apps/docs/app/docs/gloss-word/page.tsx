import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import GlossWordPreview from './preview';

export const metadata = { title: 'GlossWord — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function GlossWordDocsPage() {
    const source = readSource('../../packages/react/src/gloss/GlossWord.tsx');
    const typesSource = readSource('../../packages/react/src/gloss/types.ts');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Gloss & tooltip"
                title="Gloss Word"
                description={
                    <>
                        A word with a hover/focus definition tooltip and click-to-play pronunciation — the
                        building block for interlinear or annotated text. Hover a word below, then move your
                        mouse up into the tooltip itself — it stays open, and the link inside is clickable.
                        Click a word to hear it.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-8 border-4 border-foreground">
                    <GlossWordPreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <p className="text-sm font-bold mb-2">As a package:</p>
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/gloss-word.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { GlossWord, GlossLine, type GlossData } from '@dictionary-ui/react';

const glosses: Record<string, GlossData> = {
  "mui'n": { gloss: 'bear', pron: 'mu·iin', audioUrl: '/audio/mui-n.mp3', href: '/dictionary/mui-n' },
};

<GlossWord word="mui'n" data={glosses["mui'n"]} />

// Or render a whole line of mixed word/literal tokens at once:
<GlossLine
  tokens={[{ word: "mui'n" }, { literal: ', who do you see?' }]}
  glosses={glosses}
/>`}
                />
            </DocSection>

            <DocSection title="Source" badge="2 files">
                <p className="text-sm font-bold mb-2"><code>gloss/GlossWord.tsx</code></p>
                <CodeBlock code={source} />
                <p className="text-sm font-bold mt-6 mb-2"><code>gloss/types.ts</code></p>
                <CodeBlock code={typesSource} />
            </DocSection>
        </div>
    );
}
