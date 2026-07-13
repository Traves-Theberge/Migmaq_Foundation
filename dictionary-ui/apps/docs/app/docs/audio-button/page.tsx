import fs from 'fs';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
import { DocHeader, DocSection, DocNote } from '@/components/DocPage';
import AudioButtonPreview from './preview';

export const metadata = { title: 'AudioButton — Dictionary UI' };

function readSource(relPath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

export default function AudioButtonDocsPage() {
    const source = readSource('../../packages/react/src/audio/AudioButton.tsx');
    const playAudioSource = readSource('../../packages/react/src/audio/play-audio.ts');

    return (
        <div className="max-w-3xl">
            <DocHeader
                eyebrow="Audio"
                title="Audio Button"
                description={
                    <>
                        A play/stop button for one recording. Clicking one stops any other playing{' '}
                        <code>AudioButton</code> (or a manual <code>playRecording()</code> call), so multiple
                        buttons on a page never overlap. Includes a fix for the audio-clipping-on-first-play
                        issue some browsers and OSes exhibit before the audio output device has been used once.
                    </>
                }
            />

            <DocSection title="Preview">
                <div className="dui-preview p-8 border-4 border-foreground flex items-center justify-center">
                    <AudioButtonPreview />
                </div>
            </DocSection>

            <DocSection title="Install">
                <p className="text-sm font-bold mb-2">As a package:</p>
                <CodeBlock lang="bash" code="npm install @dictionary-ui/react" />
                <DocNote>Or copy the source directly into your project (no dependency to track):</DocNote>
                <CodeBlock lang="bash" code={`npx shadcn@latest add ${'{your-domain}'}/r/audio-button.json`} />
            </DocSection>

            <DocSection title="Usage">
                <CodeBlock
                    lang="tsx"
                    code={`import { AudioButton } from '@dictionary-ui/react';

<AudioButton url="/audio/mui'n.mp3" label="Speaker A" />`}
                />
            </DocSection>

            <DocSection title="Source" badge="2 files">
                <p className="text-sm font-bold mb-2"><code>audio/AudioButton.tsx</code></p>
                <CodeBlock code={source} />
                <p className="text-sm font-bold mt-6 mb-2"><code>audio/play-audio.ts</code></p>
                <CodeBlock code={playAudioSource} />
            </DocSection>
        </div>
    );
}
