# dictionary-ui

Reusable React components for building language dictionary sites — audio
playback, gloss/tooltip words, dictionary search primitives, and an animated
storybook reader. Built while shipping a real dictionary site, then pulled
out into a standalone library.

Two ways to use it, same source either way:

- **Install the package** — `npm install @dictionary-ui/react`
- **Copy the source** — browse the docs site, copy a component's code
  directly into your project, or run `npx shadcn@latest add <url>/r/<slug>.json`

## Structure

```
dictionary-ui/
  packages/
    react/            @dictionary-ui/react — the installable package
      src/
        audio/         AudioButton, playRecording/stopAudio
        gloss/          GlossWord, GlossLine
        dictionary/     SearchBox, WordCard, PartOfSpeechBadge
        storybook/      StoryBook, BookLeaves, PagePlaceholder
  apps/
    docs/             the component docs/demo site (Next.js)
  scripts/
    build-registry.mjs  generates apps/docs/public/r/*.json from packages/react/src,
                         so the copy-paste path and the installed package can never drift
```

## Development

```bash
npm install
npm run dev              # docs site at localhost:3000 (or pass -p <port>)
npm run build:package     # build @dictionary-ui/react only
npm run registry:build    # regenerate the shadcn-compatible registry JSON
npm run build             # build everything
```

Each component's docs page (`apps/docs/app/docs/<slug>/page.tsx`) reads its
own source straight off disk at build time and displays it with a copy
button — so the docs are never stale relative to the actual code.

## Components (v1)

| Component | What it is |
|---|---|
| `AudioButton` | Play/stop button for one recording; stops any other playing button automatically; works around the audio-clipping-on-first-play issue some browsers/OSes exhibit. |
| `GlossWord` / `GlossLine` | A word with a hover/focus definition tooltip and click-to-play pronunciation — the building block for interlinear or annotated text. |
| `SearchBox` / `WordCard` / `PartOfSpeechBadge` | Dictionary lookup primitives. `SearchBox` has no search engine baked in — bring your own filter/fuzzy-match. |
| `StoryBook` / `BookLeaves` / `PagePlaceholder` | An animated, page-flipping illustrated reader (built on [react-pageflip](https://github.com/Nodlik/react-pageflip)) driven entirely by a plain `BookDefinition` object. |

All components ship with sane default styling via inline styles and
`--dui-*` CSS custom properties — override them, or theme by redeclaring the
variables. Only `StoryBook` needs an actual stylesheet import
(`@dictionary-ui/react/styles.css`); everything else is self-contained.

## License

MIT
