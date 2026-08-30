# HJ Devlog Next MDX Blog Migration

## Summary

Replace the current HJ Devlog application with a minimal static MDX blog based closely on `leerob/next-mdx-blog`. Preserve the existing post content, images, public domain, and `/blog/<slug>` URLs while removing the application's dynamic product features and legacy architecture.

The migrated site should use the upstream template's layout, typography, motion, code highlighting, system color scheme, and deliberately small dependency surface. HJ identity and content replace the template's placeholder identity; the visual and structural model otherwise remains close to upstream.

## Source Baseline

The implementation baseline is the `main` branch of `leerob/next-mdx-blog` as reviewed on 2026-08-30. Its relevant characteristics are:

- Next.js 16 and React 19.
- Tailwind CSS 4.
- First-party `@next/mdx` integration.
- File-based MDX pages.
- `sugar-high` syntax highlighting.
- A centered `60ch` reading column.
- System-driven light and dark appearance.
- Static sitemap generation.
- Vercel Analytics.

The optional Postgres redirect system is not included because HJ Devlog retains its existing post URLs and does not need database-managed redirects.

## Goals

- Replace the current application architecture instead of adapting it incrementally.
- Migrate every existing Markdown post to a statically compiled MDX page.
- Preserve every existing `/blog/<slug>` URL and its canonical URL.
- Preserve existing post images that are referenced by migrated content.
- Preserve the `https://hj-devlog.vercel.app` site identity and relevant SEO metadata.
- Produce a dependency-light application that builds without Firebase, Prisma, BigQuery, or other runtime services.
- Match the upstream template's visual treatment with only identity and content substitutions.

## Explicit Removals

The migration removes the following features and their supporting code:

- Categories and category routes.
- Search.
- Guestbook and Firebase integration.
- Visitor counts, view counts, and analytics dashboards.
- Reporting.
- Comments and Giscus.
- RSS.
- Back office.
- Custom theme state and theme toggle.
- API routes.
- React Query, Recoil, styled-components, SEED, Storybook, Prisma, Sentry, BigQuery, and related configuration.

Removed routes return the standard Next.js 404 response. They are not redirected to the home page because such redirects would misrepresent the destination content.

## Target Repository Structure

The application is reduced to the following primary structure:

```text
app/
  blog/
    <slug>/
      page.mdx
  globals.css
  layout.tsx
  page.mdx
  sitemap.ts
public/
  images/
    postImg/
mdx-components.tsx
next.config.ts
package.json
pnpm-lock.yaml
postcss.config.mjs
tsconfig.json
```

Only image assets referenced by retained site metadata or migrated posts need to survive. Legacy source directories and configuration are deleted after the new app compiles successfully.

## Application Shell

`app/layout.tsx` follows the upstream shell:

- Korean document language.
- Inter as the primary typeface.
- White and zinc system-color backgrounds.
- A centered `60ch` main content column.
- Compact HJ-specific footer links.
- Vercel Analytics.
- Metadata for HJ Devlog, the existing description, canonical home URL, and the existing production domain.

There is no client-side theme provider. Light and dark appearance follow `prefers-color-scheme`, matching the upstream template.

## Home Page

`app/page.mdx` is an MDX document that contains:

- The HJ Devlog heading.
- A concise Korean description.
- A reverse-chronological list of every migrated post.

The post list uses text links and dates. It does not use cards, thumbnails, filters, pagination, or client-side fetching. The complete list is generated as part of migration and remains static until posts change.

## Post Conversion

Each source file under `posts/*.md` is converted to `app/blog/<slug>/page.mdx`.

### Metadata mapping

- `title` becomes the page title and the visible level-one heading.
- `excerpt` becomes the metadata description and the short introduction beneath the heading when non-empty.
- `date` is preserved as visible post metadata.
- The canonical URL is `/blog/<slug>`.
- `author`, `category`, and legacy image metadata are not exposed as navigation features. An image remains only when referenced by the post or needed for Open Graph metadata.

Each MDX page exports a static `metadata` object compatible with Next.js 16.

### Slug and route rules

- The frontmatter slug is authoritative when present.
- A missing slug falls back to the source filename without its extension.
- Slugs are decoded for comparison and encoded by links where required.
- Duplicate slugs stop migration and must be resolved before source deletion.
- Every current `/blog/<slug>` path must resolve to exactly one MDX page.

### Body conversion rules

- Preserve Markdown headings, paragraphs, lists, tables, blockquotes, links, and fenced code.
- Preserve valid embedded HTML only when MDX accepts it safely.
- Convert HTML or Markdown constructs that collide with JSX syntax into equivalent valid MDX.
- Normalize malformed or mismatched code fences.
- Preserve public image paths and update only paths that no longer resolve from the new route.
- Rewrite internal links to removed category routes when a corresponding post slug can be determined. Unresolvable removed-route links are reported for manual correction.
- Do not silently discard unsupported content. Record the source file and conversion reason.

The original Markdown files remain available in Git history and are deleted from the new tree only after all conversion checks pass.

## MDX Components and Styling

`mdx-components.tsx` follows the upstream component map for headings, paragraphs, ordered and unordered lists, list items, emphasis, links, code, tables, and blockquotes.

Internal links use `next/link`; external links open safely in a new tab. Code uses `sugar-high`. Global styles retain the upstream code palette, inline-code treatment, scrollbar behavior, balanced headings, responsive tables, and system dark mode.

No alternate design system or component library is layered on top of the template.

## Sitemap and SEO

The sitemap recursively discovers `app/blog/**/page.mdx`, emits `https://hj-devlog.vercel.app/blog/<slug>` entries, and includes the home page.

Every post exports:

- Title.
- Description when available.
- Canonical `/blog/<slug>` URL.

Global metadata retains the HJ Devlog title, description, production domain, favicon where retained, and crawler behavior. Existing URLs are preserved, so no post redirects are required.

## Error Handling

The site has no runtime data dependency. Unknown routes use the standard Next.js 404 response. Migration-time failures are preferred over runtime fallbacks:

- Invalid MDX stops the production build.
- Duplicate or missing route mappings stop conversion.
- Missing referenced images are reported.
- Broken internal links to known content are reported.
- Unsupported source constructs are reported with their source path.

## Migration Sequence

1. Inventory source post count, slugs, metadata, internal links, and referenced images.
2. Create the Next.js 16 template shell and dependency set.
3. Convert all posts to route-local MDX pages.
4. Generate the home list and sitemap discovery.
5. Validate content parity, routes, images, MDX compilation, and visual output.
6. Remove legacy application code, dynamic services, configuration, and unused assets.
7. Run the final clean install and production build.

The repository must not spend a commit or deploy in a mixed old/new runtime state. Intermediate local conversion scripts may be used, but the committed application is the final minimal structure.

## Verification

Migration is complete only when all of the following pass:

- Source and migrated post counts match.
- Every authoritative source slug has a corresponding `/blog/<slug>` page.
- No duplicate destination slug exists.
- Every migrated MDX file compiles in `pnpm build`.
- The sitemap post count matches the migrated page count.
- Referenced local images exist.
- Known internal post links resolve.
- No Firebase, Prisma, Sentry, SEED, Recoil, React Query, styled-components, Storybook, or legacy API runtime dependency remains.
- Home and representative posts render correctly on mobile and desktop.
- Light and dark system appearances render correctly.
- A Korean post, a code-heavy post, an image-heavy post, a table-containing post, and a post containing embedded HTML are inspected.

## Git and Delivery

The already-merged SEED redesign is treated as the starting state on `main`, but the migration removes it along with the rest of the legacy UI. New work proceeds on `refactor-next-mdx-blog` because a local `refactor` branch prevents the originally proposed `refactor/next-mdx-blog` name.

The final pull request should clearly identify the full replacement, enumerate removed features, and include post-count and build-validation evidence.
