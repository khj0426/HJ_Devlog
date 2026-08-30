# HJ Devlog SEED Design System Redesign

## Summary

Redesign every visitor-facing HJ Devlog screen around the actual SEED Design System packages. The redesign covers the home page, post detail, category pages, guestbook, loading states, and error states. Back-office screens are explicitly out of scope.

The visual direction is **Warm Product**: friendly orange accents, generous whitespace, clear information hierarchy, and restrained surfaces. It should feel informed by SEED without looking like a copy of a Daangn product.

## Goals

- Install and use `@seed-design/react` and `@seed-design/css` rather than imitating SEED visually.
- Establish one coherent light and dark theme using SEED color and component tokens.
- Make posts the dominant content while retaining search, category navigation, visitor counts, view counts, reporting, RSS, comments, and the guestbook.
- Preserve current URLs, data behavior, SEO metadata, and user-facing features.
- Deliver responsive, accessible interfaces across mobile and desktop.

## Non-goals

- Redesigning back-office pages.
- Changing post, category, analytics, or guestbook APIs.
- Reworking routing, SEO semantics, or content storage.
- Reproducing Daangn product screens or introducing unrelated features.
- Removing styled-components solely for technology consistency.

## Technical Direction

Add the official SEED React and CSS packages and load the SEED base and theme styles at the application boundary. Replace the current custom theme as the primary source of colors, typography, spacing, radii, and interaction states.

Migration is incremental internally:

1. Connect SEED CSS, tokens, and theme behavior at the root.
2. Replace shared visitor-facing controls and layout primitives.
3. Redesign the home and shared post-list experience.
4. Redesign post detail and category pages.
5. Redesign the guestbook, loading, empty, and error states.

The completed visitor experience is released as one coherent design. styled-components may remain for blog-specific layout and Markdown rendering when SEED does not provide an appropriate abstraction. It must not duplicate SEED components or redefine token values.

## Application Shell

The visitor-facing shell consists of:

- A responsive header with brand, primary navigation, search entry point, and theme control.
- A centered content region with mobile-first horizontal padding and bounded reading widths.
- A quiet footer that retains secondary links and RSS access.
- Shared modal, drawer, toast, and scroll-to-top behavior implemented with SEED components where available.

Mobile is the baseline. Desktop layouts expand available whitespace and introduce a table of contents beside article content without making the main reading column excessively wide.

## Page Design

### Home

The home page uses this order:

1. A compact introduction hero expressing the blog's purpose.
2. SEED Chip-based category filtering.
3. A reusable post list.
4. Visitor information rendered as low-emphasis supporting metadata.

Search remains easy to reach but does not compete with the post list.

### Post Detail

The post page contains a post header, article body, desktop table of contents, supporting actions, related content where already available, and comments. The header presents title, category, publication date, reading metadata when derivable, and view information with clear hierarchy.

The article body receives a dedicated Markdown typography layer for headings, prose, links, lists, images, blockquotes, inline code, and code blocks. Its spacing and colors derive from SEED tokens even when implemented with custom CSS.

### Category

Category pages reuse the same category controls and post-card contract as the home page. Pagination and existing URL behavior remain unchanged.

### Guestbook

The guestbook uses SEED fields, buttons, feedback text, and list surfaces. Validation errors appear adjacent to their fields. Submission, loading, success, empty, and failure states are visually explicit without adding new backend behavior.

### Loading and Errors

Skeletons match the geometry of the content they replace to reduce layout shift. Empty results explain the current state and offer a relevant recovery action. Page-level failures and inline request failures remain distinct, and retry is available where the current flow supports it.

## Component Boundaries

- `BlogShell`: responsive page width, spacing, and shared chrome placement.
- `Hero`: blog identity and concise introduction.
- `CategoryFilter`: controlled SEED Chip-based category selection.
- `PostCard`: reusable title, excerpt, date, category, reading metadata, and optional thumbnail presentation.
- `PostHeader`: post identity and metadata.
- `ArticleBody`: Markdown-specific readable typography and embedded media rules.
- `Search`: SEED dialog and text input presentation around the existing search flow.
- `GuestbookForm`: controlled form presentation and validation feedback.
- `GuestbookItem`: one guestbook entry and its metadata.
- `ThemeToggle`: accessible light/dark theme selection.
- Shared loading, empty, and error state components.

Data-owning containers keep React Query, server-fetching, pagination, and mutation behavior. Presentational components accept explicit props and do not know about API clients.

## Visual Language

- Use SEED neutral surface and text tokens as the default palette.
- Use an orange accent sparingly for active navigation, selected filters, links, and primary actions.
- Use a warm near-white light background and a soft charcoal dark background through supported tokens rather than hard-coded theme colors.
- Prefer spacing, surface contrast, and dividers over shadows.
- Apply radii to interactive controls, thumbnails, and meaningful grouped surfaces instead of every content block.
- Preserve existing post imagery and content.
- Keep motion short and functional for hover, dialogs, drawers, and theme changes. Respect `prefers-reduced-motion`.

## Data and Behavior Preservation

The following contracts remain unchanged:

- Post and category fetching.
- React Query hydration, pagination, and infinite scrolling.
- Search behavior and result navigation.
- Guestbook reads and submissions.
- Visitor and view analytics.
- Reporting, RSS, comments, and existing post actions.
- Public routes, canonical URLs, metadata, Open Graph generation, and sitemap behavior.

The redesign may reorganize component ownership to separate data containers from presentation, but it must not change observable feature behavior without a separately approved decision.

## Theme Behavior

Both light and dark modes are retained and redesigned using SEED tokens. The current persisted user preference and system-preference behavior should be preserved where compatible. Theme changes must update SEED component styling and blog-specific Markdown styling together, without a mixed-theme frame.

## Accessibility

- Preserve semantic heading order and landmark elements.
- Ensure all controls work by keyboard and have visible focus treatment.
- Provide accessible names for icon-only actions.
- Meet readable foreground/background contrast in both themes.
- Keep touch targets suitable for mobile use.
- Avoid relying on color alone for selected, error, or loading states.
- Respect reduced-motion preferences.

## Verification

Implementation is complete only after:

- Type checking, linting, and the production build pass.
- Existing automated tests continue to pass.
- Focused tests cover new shared UI behavior and critical state rendering.
- Storybook stories cover important reusable components and loading, empty, and error variants where practical.
- Home, post detail, category, and guestbook are visually inspected on mobile and desktop.
- Light and dark modes are inspected on every visitor-facing page.
- Keyboard navigation, focus visibility, reduced motion, and representative screen-reader labels are checked.
- Existing search, category navigation, infinite scrolling or pagination, guestbook submission, comments, reporting, RSS, and analytics-related UI remain functional.

## Delivery Boundary

This specification covers one visitor-facing redesign. Back-office redesign is deferred to a separate design and implementation cycle. No visitor-facing page should ship in a partially migrated visual state.
