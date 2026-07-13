import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import { ThemeToggle } from '@dictionary-ui/react';

export const metadata = { title: 'ThemeToggle — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function ThemeToggleDocsPage() {
    const source = readSource('../../packages/react/src/theme/ThemeToggle.tsx');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Theme"
                title="Theme Toggle"
                description={
                    <>
                        A light/dark toggle with no theming library required — it adds/removes a{' '}
                        <code>.dark</code> class on <code>&lt;html&gt;</code> and persists the choice to
                        localStorage. This is the exact convention the{' '}
                        <a href="/docs/storybook-reader" className="underline">StoryBook reader</a>&apos;s
                        dark mode already looks for, so the two work together with zero extra wiring. Already
                        use next-themes or similar? Skip this and just make sure it also toggles a{' '}
                        <code>.dark</code> class.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-8 border-4 border-foreground flex items-center justify-center">
                    <ThemeToggle />
                </div>
            </DocSection>

            <DocSection title="Install">
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly:</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/theme-toggle.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock lang="tsx" code={`import { ThemeToggle } from '@dictionary-ui/react';\n\n<ThemeToggle />`} />
            </DocSection>

            <DocSection title="Source">
                <p className="text-sm font-bold mb-2"><code>theme/ThemeToggle.tsx</code></p>
                <CodeBlock code={source} />
            </DocSection>
        </div>
    );
}
