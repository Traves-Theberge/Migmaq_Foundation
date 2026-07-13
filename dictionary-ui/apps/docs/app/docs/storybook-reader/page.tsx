import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import StoryBookPreview from './preview';

export const metadata = { title: 'StoryBook reader — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function StoryBookDocsPage() {
    const readerSource = readSource('../../packages/react/src/storybook/StoryBook.tsx');
    const leavesSource = readSource('../../packages/react/src/storybook/BookLeaves.tsx');
    const placeholderSource = readSource('../../packages/react/src/storybook/PagePlaceholder.tsx');
    const typesSource = readSource('../../packages/react/src/storybook/types.ts');
    const demoBookSource = readSource('app/docs/storybook-reader/demo-book.ts');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Storybook reader"
                title="Story Book"
                description={
                    <>
                        An animated, page-flipping illustrated reader (built on{' '}
                        <a href="https://github.com/Nodlik/react-pageflip" className="underline">react-pageflip</a>)
                        driven entirely by a plain <code>BookDefinition</code> object — feed it pages and a
                        gloss map, get a physical-feeling book with drag-to-turn pages, corner curl, and
                        click-to-play word audio. Drag a page corner or use the arrow keys below.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-4 sm:p-8 border-4 border-foreground">
                    <StoryBookPreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <p className="text-sm font-bold mb-2">As a package (also installs react-pageflip):</p>
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Import the stylesheet once in your app — this is the one component in the library that needs it:</DocNote>
                <CodeBlock lang="tsx" code={`import '@dictionary-ui/react/styles.css';`} />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/storybook-reader.json`} />
            </DocSection>

            <DocSection title="Usage">
                <p className="text-sm text-muted-foreground mb-3">
                    A book is pure data. This demo&apos;s full definition, generic and copy-pasteable:
                </p>
                <CodeBlock code={demoBookSource} />
                <DocNote>Then just:</DocNote>
                <CodeBlock lang="tsx" code={`import { StoryBook } from '@dictionary-ui/react';
import { demoBook, glosses } from './demo-book';

<StoryBook book={demoBook} glosses={glosses} />`} />
            </DocSection>

            <DocSection title="Source" badge="4 files">
                <p className="text-sm font-bold mb-2"><code>storybook/StoryBook.tsx</code></p>
                <CodeBlock code={readerSource} />
                <p className="text-sm font-bold mt-6 mb-2"><code>storybook/BookLeaves.tsx</code></p>
                <CodeBlock code={leavesSource} />
                <p className="text-sm font-bold mt-6 mb-2"><code>storybook/PagePlaceholder.tsx</code></p>
                <CodeBlock code={placeholderSource} />
                <p className="text-sm font-bold mt-6 mb-2"><code>storybook/types.ts</code></p>
                <CodeBlock code={typesSource} />
            </DocSection>
        </div>
    );
}
