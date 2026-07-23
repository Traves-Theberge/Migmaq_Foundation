# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Admin CMS, accessibility, i18n, and platform hardening (2026-07-20 – 2026-07-23)
- **Supabase-backed admin CMS**: full schema/RLS/audit-log migrations (`supabase/migrations/0001`–`0010`), auth-gated `/admin` shell, and full CRUD pages for the dictionary, lessons (categories → lessons → steps), storybooks (books → pages), and audio recordings.
- **Roles & security**: `editor`/`admin`/`super_admin` roles enforced by Postgres RLS (not just UI-hidden), role-escalation and cross-user-profile-edit prevention triggers, an audit log of every content change (`/admin/activity`), and a Users & Roles page. Multiple follow-up security audits fixed real gaps (RLS scoping, error-message leakage, missing auth gates).
- **API layer**: every route validated at runtime with Zod, the same schemas generating an OpenAPI 3.1 spec served at `/api/openapi.json` and rendered as Swagger UI at `/admin/api-docs` (`super_admin` only). Dual cookie/bearer auth for programmatic clients.
- **Accessibility**: axe-core regression suite (`npm run test:a11y`) covering every public route family; fixes for keyboard operability, focus-visible styling, a skip-to-content link, ARIA labeling, and color-only state indication.
- **Internationalization**: English/French UI toggle (dictionary/lesson content itself stays Mi'gmaq/English) with a message-parity validator (`npm run data:validate-i18n`).
- **Lesson data integrity**: `npm run data:validate-lessons` checks lesson vocabulary against the real dictionary/audio data it references.
- **SEO & social sharing**: `robots.ts`/`sitemap.ts` (previously nonexistent), `metadataBase`/title templates/OG+Twitter defaults, dynamic OG image generation, JSON-LD structured data, per-page metadata across every public route (including the games and index pages), and self-hosted fonts (previously declared but never loaded).
- **Performance**: `next/image` adopted everywhere, `Cache-Control` headers on public API routes, missing database indexes added.
- **Operability**: `/api/health` now performs a real, timeout-bounded Supabase connectivity check instead of a static stub; structured server-side error logging (`lib/log.ts`) wired into every admin write path and API route.
- **CI**: typecheck, lint, data validation, build, the full Playwright suite (accessibility + admin auth-gating), and a job that applies every `supabase/migrations/*.sql` file against a real local Supabase stack, run on every push/PR — the migration check caught a real bug on its first run (`0006_super_admin.sql` referenced a newly-added Postgres enum value in the same transaction that added it).
- **Rate limiting**: every public API route now rejects excessive requests from a single client IP with `429 Too Many Requests` (`lib/rate-limit.ts` — dependency-free, per-instance).
- **Documentation**: `docs/DATA_MODEL.md` — full schema/RLS/trigger reference cross-referenced against the Zod validation layer and API surface.
- Refined home page layout to fit within a single viewport height.
- Updated hero section spacing, image size, and added responsive text scaling.
- Changed rotating "Mi'gmaq" text color to orange and made it larger.
- Updated navigation bar:
  - Logo now spins a full 360° on hover.
  - Hover and active link colors switched from blue to red, then to orange, and finally to purple for primary elements.
  - Added full‑color spin animation and removed background/border on the logo.
- Replaced primary color palette from blue → green → purple (deep purple `#7c3aed`).
- Set secondary color to red and accent color to orange.
- Updated background to warm cream/beige (`#f5f1e8`).
- Removed all hard‑shadow utilities from feature cards and sidebar components.
- Made hero image visible on all screen sizes with responsive max‑widths.
- Centered hero text on mobile and increased spacing between elements.
- Updated dictionary word detail page:
  - Added translations section.
  - Cleaned up layout, removed hard‑shadows, improved spacing.
  - Adjusted back button text and styling.
- Updated feature cards:
  - Dictionary card now has white background with black text.
  - Adjusted hover effects and spacing.
- Fixed flashcard game UI issues:
  - Card text visibility, flip animation, and sizing.
  - Removed hard‑shadow from card faces.
- Updated global CSS variables and removed dotted grid pattern.
- Fixed TypeScript lint warning in `lib/games.ts` by adding explicit type for `distractors` (pending implementation).
- Various minor UI polish and responsiveness improvements across pages.

### Education & Lessons System (Major Update)
- **Implemented scalable lessons system** with category-based organization:
  - Created modular file structure (`lib/lessons/`) with separate files per category
  - Built 18 comprehensive lessons across 7 categories
  - Added TypeScript interfaces for `Lesson`, `LessonStep`, and `LessonCategory`
  
- **Lesson Categories:**
  - **Basics** (5 lessons): Greetings, polite phrases, numbers 1-10, time of day
  - **Family** (2 lessons): Immediate family, grandparents
  - **Animals** (3 lessons): Land animals, water animals, birds
  - **Nature** (3 lessons): Natural elements, weather, colors
  - **Body** (1 lesson): Face parts
  - **Food** (1 lesson): Berries
  - **Objects** (2 lessons): Household items, transportation

- **Education Page Redesign:**
  - Transformed "Word of the Day" to "Learn a New Word" with dynamic random word fetching
  - Implemented responsive grid layout (1-4 columns) for lesson cards
  - Added category sections with icons and descriptions
  - Integrated difficulty badges, time estimates, and step counts on cards
  - Swapped Games and Education card order on home page

- **Lesson Viewer:**
  - Created interactive step-by-step lesson viewer (`/education/lessons/[id]`)
  - Added progress bar and breadcrumb navigation
  - Implemented Previous/Next navigation with completion flow
  - Support for vocabulary, phrase, and info step types
  - Smooth animations with Framer Motion

- **Content Improvements:**
  - All 58+ vocabulary words verified against dictionary
  - Added cultural context info steps to every lesson
  - Expanded lessons from average 2.5 to 4.2 steps each
  - Increased total learning content by 67% (~75 steps total)
  - Added 8 new verified words in Phase 1 improvements

- **New Vocabulary Added:**
  - Greetings: pusu'l, atiu, mesge'g, pjila'si
  - Numbers: Complete 1-10 counting system
  - Animals: tia'm, apli'gmuj, plamu, gitpu, ga'qaquj, apji'jgmuj, apalqaqamej, atoqwa'su
  - Nature: samqwan, gmu'j, alug, gesig, wape'g, a'petna's'g, aqtatpa'q
  - Body: ugsisgw, lamipgigwan, alpatl
  - Food: atuomgomin, ajioqjemin, glitaw, gmu'jmin, gawaqtejg
  - Objects: a'su'n, awa'qi'gn, asoqomm'taqan, alaqami'g, aptu'n
  - Time: egsitpu'g, aqantie'umg, aqtatpa'q

- **Technical Implementation:**
  - Helper functions: `getAllLessons()`, `getLessonById()`
  - Icon mapping system for dynamic category icons
  - Proper TypeScript typing throughout
  - Responsive design with Tailwind CSS
  - No breaking changes to existing functionality

## [0.1.0] - 2025-11-22
- Initial release with core pages (Home, Dictionary, Education, Games) and basic functionality.

---
