# Mi'gmaq Foundation (Next.js Version)

A modern Next.js 16 reimplementation of the Mi'gmaq Foundation web application: a public language-learning site (dictionary, lessons, storybooks, games) backed by a Supabase-powered admin CMS for the staff who maintain that content.

## Features

**Public site**
- **Dictionary**: Searchable Mi'gmaq–English–French dictionary with usage examples, pronunciation guides, and audio.
- **Lessons**: Category-organized, step-by-step lessons with vocabulary/phrase/info steps.
- **Storybooks**: Bilingual, page-flipping illustrated readers with click-to-play word audio.
- **Games**: Flashcard matching and multiple-choice quiz.
- **i18n**: English/French UI (dictionary and lesson content itself stays Mi'gmaq/English — see `lib/i18n/messages.ts`).
- **Accessibility**: Regression-tested with axe-core (`npm run test:a11y`).
- **Dark mode** and responsive design throughout.

**Admin CMS** (`/admin`)
- Full CRUD over dictionary words, lessons (categories → lessons → steps), storybooks (books → pages), and audio recordings.
- Role-based access: `editor` / `admin` / `super_admin` (Postgres RLS-enforced, not just UI-hidden).
- Audit log of every content change (`/admin/activity`), user & role management (`/admin/users`).
- Interactive OpenAPI/Swagger docs at `/admin/api-docs` (`super_admin` only), generated from the same Zod schemas every API route validates against at runtime.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database/Auth**: [Supabase](https://supabase.com/) (Postgres, Row Level Security, Auth, Storage)
- **Validation**: [Zod](https://zod.dev/) — every API route and admin Server Action validates at runtime; the same schemas generate the OpenAPI spec via [`@asteasolutions/zod-to-openapi`](https://github.com/asteasolutions/zod-to-openapi)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Search**: [Fuse.js](https://fusejs.io/) (public dictionary search)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Testing**: [Playwright](https://playwright.dev/) + [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm) for accessibility regressions

## Getting Started

### Prerequisites

- Node.js 22+
- A [Supabase](https://supabase.com/) project (free tier is fine) — required even for local development, since the admin CMS and its auth/RLS run against it.

### Installation

```bash
npm install
```

### Set up Supabase

1. Create a Supabase project, then copy `.env.local.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` from **Project Settings → API**.
2. Apply every migration in `supabase/migrations/` **in order** (`0001_init_schema.sql` through the highest-numbered file) via the Supabase SQL editor, or `supabase db push` if you're using the Supabase CLI locally.
3. Create your first user via Supabase Auth (dashboard or `supabase.auth.signUp`), then promote it to `super_admin` directly in the SQL editor — this is the one step that must be done outside the app, since nobody starts as `super_admin` and the app's own role-change UI (`/admin/users`) requires already being one:
   ```sql
   update profiles set role = 'super_admin' where email = 'you@example.com';
   ```
4. (Optional) Seed the CMS from the site's existing static content — the dictionary, lessons, storybooks, and audio manifest already checked into this repo:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=... npm run data:migrate-to-supabase
   ```
   Get the service role key from **Project Settings → API** — it bypasses RLS, so treat it like a root password: server-only, never committed, never used outside one-off scripts like this one.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, or [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS (sign in with the account you promoted above).

### Building for Production

```bash
npm run build
npm start
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Standard Next.js dev/build/start |
| `npm run lint` | ESLint |
| `npm run test:a11y` | Playwright + axe-core accessibility regression tests |
| `npm run data:validate-lessons` | Checks `lib/lessons/**` against the dictionary/audio data it references |
| `npm run data:validate-i18n` | Checks `lib/i18n/messages.ts` for missing/mismatched EN/FR keys |
| `npm run data:migrate-to-supabase` | One-time (re-runnable) load of local content into Supabase — see above |
| `npm run data:dictionary` / `data:audio-manifest` / `data:audio-upload` / `data:fr-coverage` | Content-pipeline scripts for rebuilding `public/assets/*.json` from source archives — see each script's header comment |

CI (`.github/workflows/ci.yml`) runs typecheck, data validation, build, and the a11y suite on every push/PR.

## Project Structure

- `app/`: Routes and pages (App Router). Public site at the root; admin CMS under `app/admin/**` (auth-gated pages live in the `(dashboard)` route group); API routes under `app/api/**`.
- `components/`: Reusable UI components (`components/admin/**` for the CMS, the rest for the public site).
- `lib/`: Business logic, Supabase clients (`lib/supabase/**`), Zod validation schemas (`lib/validation/**`), OpenAPI generation (`lib/openapi/**`), and content-domain helpers (dictionary, lessons, books, audio, i18n).
- `supabase/migrations/`: The full Postgres schema, RLS policies, and triggers, as sequential SQL files — the source of truth for the database shape.
- `public/assets/`: Static content the public site reads directly (`dictionary.json`, `audio-manifest.json`) — also what `data:migrate-to-supabase` loads into the CMS.
- `scripts/`: One-off/CLI tooling (data pipeline, validation, Supabase migration).
- `e2e/`: Playwright tests.

## License

MIT
