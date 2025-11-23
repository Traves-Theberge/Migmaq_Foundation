# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
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
