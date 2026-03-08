# AGENTS.md

This repository is a Hugo-based marketing/blog site for Drift Cascade, with content in `site/`, CMS previews in `src/`, and generated output in `dist/`.

## Tooling and package manager

- Use `yarn`, not `npm`.
- In normal development, assume a hot-reload process may already be running.
- Typical commands are `yarn install`, `yarn build`, and `yarn start`.

## Project structure

- `site/content/`
  - Authoritative content source for pages, blog posts, and games.
- `site/content/blog/`
  - Blog post markdown files with frontmatter.
- `site/content/games/`
  - Individual game markdown files with frontmatter.
- `site/layouts/`
  - Hugo templates for pages, sections, terms, and partials.
- `site/layouts/partials/`
  - Shared reusable rendering fragments like `blog-card.html`.
- `site/static/`
  - Static assets and Decap CMS config.
- `site/static/admin/config.yml`
  - Decap CMS field definitions; update this when content schema changes.
- `src/js/cms-preview-templates/`
  - Decap CMS previews that should stay aligned with the live Hugo renderers.
- `dist/`
  - Build output.

## Working rules for this repo

- Prefer reusing existing partials and layout patterns before creating new ones.
- Keep the site responsive across phone, tablet, and desktop breakpoints.
- When changing content schema, update all affected layers together.
- Keep implementation changes minimal and aligned with the existing Tachyons-style utility classes and inline accent styling already used in the repo.

## Schema sync rules

When you add or change frontmatter fields, update all relevant places together:

1. `site/static/admin/config.yml`
2. The live Hugo renderer in `site/layouts/...`
3. The matching Decap CMS preview in `src/js/cms-preview-templates/...`
4. Any existing sample content that should exercise the feature

Examples already in use:

- Blog `youtube_video`
  - Rendered in `site/layouts/blog/single.html`
  - Rendered in `site/layouts/partials/blog-card.html`
  - Previewed in `src/js/cms-preview-templates/blog.js`
- Game `trailer_video`
  - Rendered in `site/layouts/games/single.html`
  - Previewed in `src/js/cms-preview-templates/game.js`
- Blog `related_game`
  - Configured in `site/static/admin/config.yml`
  - Rendered in `site/layouts/blog/single.html`
  - Previewed in `src/js/cms-preview-templates/blog.js`

## Blog and game content conventions

### Blog posts

Blog posts live in `site/content/blog/` and commonly use:

- `title`
- `slug`
- `date`
- `author`
- `description`
- `tags`
- `youtube_video`
- `image`
- `image_alt`
- `unlisted`
- `related_game`

Key behavior:

- `description` is used as the intro blurb on blog pages and cards.
- `youtube_video` replaces the normal hero image when present.
- `related_game` stores a game slug such as `salvage-wars` and is used to resolve a game page.
- `tags` are still managed manually, even when `related_game` is set.
- `unlisted: true` means the page remains directly accessible but should be excluded from listings, tags, and RSS.

### Game pages

Game pages live in `site/content/games/` and commonly use:

- `title`
- `weight`
- `status`
- `tag`
- `description`
- `titleImage`
- `conceptArt`
- `trailer_video`
- `primaryCta`
- `secondaryCtas`

Key behavior:

- `tag` is the authoritative blog-tag bridge for a game.
- Game pages can surface related blog posts by matching the game `tag` against blog post tags.
- `trailer_video` embeds a YouTube trailer inline on the game page.

## Tags, slugs, and linking rules

### Tags

- Game-to-blog association is currently tag-based for related post listings.
- A game page uses its `tag` field to find related posts.
- Blog posts must include the matching tag manually if they should appear in a game page's related-post list.
- Tag listings should exclude `unlisted: true` content.

### Slugs

- `related_game` should store the game content slug, for example `salvage-wars`.
- Blog post `slug` controls the URL when no custom `url` overrides it.
- Do not assume title text is a stable identifier when a slug exists.

### Unlisted handling

Whenever building blog collections, compare against boolean `true`, not string values.

Preferred pattern:

- `where (where .Site.RegularPages "Section" "blog") ".Params.unlisted" "!=" true`

This rule applies to:

- blog listing pages
- home page recent posts
- tag pages
- RSS feeds
- in-post next/previous navigation where applicable
- game-page related post sections

## Template-specific notes

### `site/layouts/blog/single.html`

- Handles single blog post rendering.
- Resolves YouTube embeds from `youtube_video`.
- Resolves a related game from `related_game` using `site.GetPage`.
- The related-game block belongs at the end of the article, before prev/next navigation.

### `site/layouts/partials/blog-card.html`

- Shared card used by homepage, blog listing pages, and game-page related posts.
- Must stay in sync with blog content behavior, especially media handling and tag display.
- Supports inline YouTube embeds for posts with `youtube_video`.

### `site/layouts/games/single.html`

- Handles single game pages.
- Supports optional `trailer_video` embed.
- Uses the game `tag` to find recent related blog posts.
- Taxonomy lookups can return Hugo `WeightedPages`; sort them safely before ranging.

## CMS preview rules

- If the live page gains a new major visual element, the matching CMS preview should usually gain a lightweight equivalent.
- The preview does not need to be pixel-perfect, but it should reflect layout intent and important field interactions.
- For blog/game relationship features, keep preview behavior understandable even if some linked content is only fully resolvable in Hugo templates.

## Current UX decisions already established

- Blog posts can optionally link back to a game via `related_game`.
- The related-game section on blog posts is rendered after the article content and before next/previous post navigation.
- That section includes:
  - game title
  - game description
  - `Game Info Page` button
  - `Other Blog Posts` button when the game has a `tag`
- Game pages include a dynamic `Recent Blog Posts` section based on the game `tag`.
- Private/unlisted playtest pages remain a separate pattern and should not be exposed automatically unless explicitly requested.

## Change checklist for future agents

Before finishing a change, check whether you also need to update:

- `site/static/admin/config.yml`
- `src/js/cms-preview-templates/blog.js`
- `src/js/cms-preview-templates/game.js`
- `site/layouts/blog/single.html`
- `site/layouts/games/single.html`
- `site/layouts/partials/blog-card.html`
- any sample content in `site/content/blog/` or `site/content/games/`

If a feature affects both live pages and CMS editing, keep both sides aligned.
