# Static Markdown Blog (MVP with 1 real post)

Ship the blog system end-to-end using the uploaded file as the seed post. No DB, no CMS, no auth.

## Scope
- Use the uploaded `why-female-entrepreneurs-need-business-coaching.md` as the only post for now.
- Future posts: drop another `.md` file into `src/content/blog/` — site auto-picks it up.

## Files added
- `src/content/blog/why-female-entrepreneurs-need-business-coaching.md` — copy of upload, verbatim.
- `src/lib/blog.ts` — loads all `.md` via `import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true })`, parses frontmatter with `gray-matter`, sorts by date desc, exports `getAllPosts()` and `getPostBySlug(slug)`.
- `src/pages/Blog.tsx` — index page. Section header "Journal" + grid of cards (title, date, category badge, excerpt, "Read →"). Reuses existing white-card + `hover:scale-105` pattern from the project.
- `src/pages/BlogPost.tsx` — single post. Back link, title (Playfair), meta row (date · category · Krusha), `prose` body via `react-markdown` + `remark-gfm`. 404 redirect if slug missing.

## Files edited
- `src/App.tsx` — add `/blog` and `/blog/:slug` routes.
- `src/components/SiteHeader.tsx` — add `{ to: "/blog", label: "Blog" }` to `links`.
- `tailwind.config.ts` — register `@tailwindcss/typography`; tune `prose` colors to brand (headings = Playfair, body = Lato, link = brand teal).
- `public/sitemap.xml` — add `/blog` and `/blog/why-female-entrepreneurs-need-business-coaching`.

## Dependencies
`gray-matter`, `react-markdown`, `remark-gfm`, `@tailwindcss/typography`.

## SEO per post
`<SEO>` with title (`{post.title} | Butterfly Effect`), meta description = excerpt, canonical, OG tags. Inline JSON-LD `BlogPosting` (headline, datePublished, author "Krusha", description).

## Out of scope
Categories index, tag pages, search, pagination, related posts, images, drafts, RSS, comments, admin UI. Easy to add later.

## How Krusha adds post #2
1. Create `src/content/blog/<slug>.md` with the same frontmatter shape.
2. Save — it appears on `/blog` automatically.
