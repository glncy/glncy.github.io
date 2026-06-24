# Phase 3 — Writing (Blog + TIL) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Writing section — **Blog** (long-form) and **TIL** (short-form) — as MDX content collections with SEO-friendly real routes: `/writing` hub, `/blog` + `/til` indexes, and `/blog/[slug]` + `/til/[slug]` detail pages. Posts support images + embeds (existing astro-embed setup), `date` (created) + `updated`, optional `thumbnail`, `tags`, `description`. CMS-editable via Sveltia.

**Architecture:** Two new content collections (`blog`, `til`) sharing a schema. Reusable `PostCard.astro` for listings, small `reading-time` + `date` utils, `Badge` (from Phase 2) for type/tags. Detail pages via `getStaticPaths`. Replace the Phase-1 stub pages. Wire Sveltia.

**Tech Stack:** Astro 7 content collections (glob loader), MDX + astro-embed, Tailwind v4, astro-icon `ph:`, bun, Sveltia CMS.

**Verification:** No unit-test runner. Each task: `bun run build` must succeed + `grep`/`ls` on `dist/`, plus `bun run dev` visual check.

**Branch:** `site-v2`. **Depends on:** Phase 2 (uses `Badge.astro`).

---

### Task 1: Blog + TIL collections

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Add the collections**

In `src/content.config.ts`, add after the `projects` collection definition and before `export const collections`:

```ts
const writingSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).optional().default([]),
  thumbnail: z.string().optional().default(''),
  description: z.string().optional().default(''),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: writingSchema,
})

const til = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/til' }),
  schema: writingSchema,
})
```

Then update the export line to include them:

```ts
export const collections = { profile, jobs, projects, blog, til }
```

- [ ] **Step 2: Create sample posts** (so collections + pages render)

Create `src/content/blog/2026-06-24-hello-world.mdx`:

```mdx
---
title: Hello, world
date: 2026-06-24
tags: [meta, astro]
description: First post on the rebuilt site — why I rebuilt it and what's next.
---

This is the first post on the rebuilt site. Here's a video on its own line (auto-embeds):

https://youtu.be/8nXqcugV2Y4

More to come.
```

Create `src/content/til/2026-06-24-astro-content-layer.mdx`:

```mdx
---
title: Astro's content layer uses a glob loader
date: 2026-06-24
tags: [astro]
description: Collections now load via glob() in content.config.ts.
---

Today I learned Astro's content collections load files with `glob({ pattern, base })` in `src/content.config.ts`, and you render an entry's body with `render(entry)`.
```

- [ ] **Step 3: Build**

Run: `bun run build` — Expected: "Complete!" (collections compile; pages still stubs).

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/blog src/content/til
git commit -m "feat(writing): add blog + til MDX collections with sample posts"
```

---

### Task 2: reading-time + date utils

**Files:**
- Create: `src/lib/reading-time.ts`
- Create: `src/lib/format-date.ts`

- [ ] **Step 1: reading-time.ts**

```ts
// Rough reading time from raw markdown body (~200 wpm).
export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}
```

- [ ] **Step 2: format-date.ts**

```ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
```

- [ ] **Step 3: Build + commit**

Run: `bun run build` — Expected: "Complete!".

```bash
git add src/lib/reading-time.ts src/lib/format-date.ts
git commit -m "feat(writing): reading-time + date format utils"
```

---

### Task 3: PostCard component

**Files:**
- Create: `src/components/PostCard.astro`

- [ ] **Step 1: Create PostCard.astro**

```astro
---
import { Icon } from 'astro-icon/components'
import Badge from './Badge.astro'
import { formatDate } from '../lib/format-date'

interface Props {
  href: string
  type: 'Blog' | 'TIL'
  title: string
  date: Date
  description?: string
  thumbnail?: string
  tags?: string[]
  compact?: boolean
}
const { href, type, title, date, description = '', thumbnail = '', tags = [], compact = false } = Astro.props
---

<a href={href} class="post glass glass-hover" data-compact={compact ? 'true' : undefined}>
  {thumbnail && !compact && (
    <img src={thumbnail} alt={title} class="post-thumb" loading="lazy" />
  )}
  <div class="post-body">
    <div class="post-meta">
      <Badge variant="label">{type}</Badge>
      <span class="post-date"><Icon name="ph:calendar-blank" /> {formatDate(date)}</span>
    </div>
    <div class="post-title font-heading">{title}</div>
    {description && !compact && <p class="post-desc">{description}</p>}
    {tags.length > 0 && (
      <div class="post-tags">{tags.map((t) => <Badge>#{t}</Badge>)}</div>
    )}
  </div>
</a>

<style>
  .post { display: flex; flex-direction: column; border-radius: 0.7rem; overflow: hidden; }
  .post-thumb { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
  .post-body { padding: 1rem 1.1rem; }
  .post-meta { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem; }
  .post-date { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; opacity: 0.7; color: #e5e7eb; }
  .post-date :global(svg) { width: 0.85rem; height: 0.85rem; }
  .post-title { font-size: 1.35rem; color: #e5e7eb; line-height: 1.2; }
  .post[data-compact='true'] .post-title { font-size: 1.05rem; }
  .post-desc { margin-top: 0.4rem; font-size: 0.9rem; font-weight: 300; color: #e5e7eb; opacity: 0.85; }
  .post-tags { margin-top: 0.6rem; display: flex; flex-wrap: wrap; gap: 0.35rem; }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `bun run build` — Expected: "Complete!".

```bash
git add src/components/PostCard.astro
git commit -m "feat(writing): PostCard component (thumbnail, type badge, date, tags)"
```

---

### Task 4: /blog and /til index pages

**Files:**
- Modify (replace stub): `src/pages/blog/index.astro`
- Modify (replace stub): `src/pages/til/index.astro`

- [ ] **Step 1: blog/index.astro**

```astro
---
import Layout from '../../layouts/Layout.astro'
import TitleBox from '../../components/TitleBox.astro'
import PostCard from '../../components/PostCard.astro'
import { getCollection } from 'astro:content'

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
)
---

<Layout title="Blog | glncy">
  <div class="mx-auto max-w-4xl px-4 pb-24 pt-32">
    <TitleBox title="Blog" subtitle="Long-form posts." />
    <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
      {posts.map((p) => (
        <PostCard
          href={`/blog/${p.id}`}
          type="Blog"
          title={p.data.title}
          date={p.data.date}
          description={p.data.description}
          thumbnail={p.data.thumbnail}
          tags={p.data.tags}
        />
      ))}
    </div>
    {posts.length === 0 && <p class="mt-8 text-center text-gray-400">No posts yet.</p>}
  </div>
</Layout>
```

- [ ] **Step 2: til/index.astro** (compact)

```astro
---
import Layout from '../../layouts/Layout.astro'
import TitleBox from '../../components/TitleBox.astro'
import PostCard from '../../components/PostCard.astro'
import { getCollection } from 'astro:content'

const posts = (await getCollection('til')).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
)
---

<Layout title="TIL | glncy">
  <div class="mx-auto max-w-2xl px-4 pb-24 pt-32">
    <TitleBox title="TIL" subtitle="Today I Learned — short notes." />
    <div class="mt-8 flex flex-col gap-3">
      {posts.map((p) => (
        <PostCard href={`/til/${p.id}`} type="TIL" title={p.data.title} date={p.data.date} tags={p.data.tags} compact />
      ))}
    </div>
    {posts.length === 0 && <p class="mt-8 text-center text-gray-400">No TILs yet.</p>}
  </div>
</Layout>
```

- [ ] **Step 3: Build + assert**

Run: `bun run build`
Then: `grep -c "post " dist/blog/index.html` — Expected: `>=1`. Build "Complete!".

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/index.astro src/pages/til/index.astro
git commit -m "feat(writing): real /blog and /til index pages"
```

---

### Task 5: /blog/[slug] and /til/[slug] detail pages

**Files:**
- Create: `src/pages/blog/[...slug].astro`
- Create: `src/pages/til/[...slug].astro`
- Modify: delete old `src/pages/blog/index.astro`? No — keep index; the `[...slug]` handles posts.

- [ ] **Step 1: blog/[...slug].astro**

```astro
---
import { getCollection, render } from 'astro:content'
import Layout from '../../layouts/Layout.astro'
import Badge from '../../components/Badge.astro'
import { Icon } from 'astro-icon/components'
import { formatDate } from '../../lib/format-date'
import { readingTime } from '../../lib/reading-time'

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }))
}

const { post } = Astro.props
const { Content } = await render(post)
const d = post.data
---

<Layout title={`${d.title} | glncy`} description={d.description}>
  <article class="mx-auto max-w-2xl px-4 pb-24 pt-32">
    {d.thumbnail && <img src={d.thumbnail} alt={d.title} class="mb-6 w-full rounded-xl object-cover" />}
    <div class="mb-2 flex items-center gap-2"><Badge variant="label">Blog</Badge></div>
    <h1 class="font-heading text-4xl text-gray-100 md:text-5xl">{d.title}</h1>
    <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
      <span class="inline-flex items-center gap-1"><Icon name="ph:calendar-blank" /> {formatDate(d.date)}</span>
      {d.updated && <span class="inline-flex items-center gap-1"><Icon name="ph:pencil-simple" /> Updated {formatDate(d.updated)}</span>}
      <span class="inline-flex items-center gap-1"><Icon name="ph:clock" /> {readingTime(post.body)}</span>
    </div>
    {d.tags.length > 0 && <div class="mt-3 flex flex-wrap gap-2">{d.tags.map((t) => <Badge>#{t}</Badge>)}</div>}
    <div class="prose-glncy mt-8"><Content /></div>
    <a href="/blog" class="cta glass mt-10 inline-flex"><Icon name="ph:arrow-left" /> All posts</a>
  </article>
</Layout>
```

- [ ] **Step 2: til/[...slug].astro** (same, "TIL" badge, back to /til)

```astro
---
import { getCollection, render } from 'astro:content'
import Layout from '../../layouts/Layout.astro'
import Badge from '../../components/Badge.astro'
import { Icon } from 'astro-icon/components'
import { formatDate } from '../../lib/format-date'

export async function getStaticPaths() {
  const posts = await getCollection('til')
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }))
}

const { post } = Astro.props
const { Content } = await render(post)
const d = post.data
---

<Layout title={`${d.title} | glncy`} description={d.description}>
  <article class="mx-auto max-w-2xl px-4 pb-24 pt-32">
    <div class="mb-2 flex items-center gap-2"><Badge variant="label">TIL</Badge></div>
    <h1 class="font-heading text-3xl text-gray-100 md:text-4xl">{d.title}</h1>
    <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
      <span class="inline-flex items-center gap-1"><Icon name="ph:calendar-blank" /> {formatDate(d.date)}</span>
      {d.updated && <span class="inline-flex items-center gap-1"><Icon name="ph:pencil-simple" /> Updated {formatDate(d.updated)}</span>}
    </div>
    {d.tags.length > 0 && <div class="mt-3 flex flex-wrap gap-2">{d.tags.map((t) => <Badge>#{t}</Badge>)}</div>}
    <div class="prose-glncy mt-8"><Content /></div>
    <a href="/til" class="cta glass mt-10 inline-flex"><Icon name="ph:arrow-left" /> All TILs</a>
  </article>
</Layout>
```

- [ ] **Step 3: Add `.prose-glncy` styles to global.css**

Append to `src/styles/global.css`:

```css
/* ---- Article body (blog/TIL) ----------------------------------------- */
.prose-glncy { color: #e5e7eb; font-weight: 300; line-height: 1.75; }
.prose-glncy :global(h2) { font-family: var(--font-heading); font-size: 1.6rem; margin: 1.6rem 0 0.6rem; }
.prose-glncy :global(h3) { font-family: var(--font-heading); font-size: 1.3rem; margin: 1.4rem 0 0.5rem; }
.prose-glncy :global(p) { margin: 0 0 1rem; }
.prose-glncy :global(a) { color: #93c5fd; text-decoration: underline; }
.prose-glncy :global(ul), .prose-glncy :global(ol) { margin: 0 0 1rem 1.25rem; }
.prose-glncy :global(li) { margin: 0.25rem 0; }
.prose-glncy :global(img) { border-radius: 0.6rem; margin: 1rem 0; max-width: 100%; }
.prose-glncy :global(code) { background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 0.3rem; font-size: 0.9em; }
.prose-glncy :global(pre) { background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 0.6rem; overflow:auto; margin: 0 0 1rem; }
.prose-glncy :global(blockquote) { border-left: 2px solid rgba(255,255,255,0.3); padding-left: 1rem; opacity: 0.85; margin: 0 0 1rem; }
```

- [ ] **Step 4: Build + assert**

Run: `bun run build`
Then: `ls dist/blog/2026-06-24-hello-world/index.html dist/til/2026-06-24-astro-content-layer/index.html`
Expected: both exist. Build "Complete!".

Note on `prose-glncy` global rules using `:global()` — these are in a plain `.css` file (not a scoped Astro `<style>`), so write them WITHOUT `:global()`. Correct form for global.css: use plain selectors, e.g. `.prose-glncy h2 { ... }` (no `:global`). Apply that here.

- [ ] **Step 5: Commit**

```bash
git add src/pages/blog/ src/pages/til/ src/styles/global.css
git commit -m "feat(writing): blog/til detail pages + article prose styles"
```

---

### Task 6: /writing hub

**Files:**
- Modify (replace stub): `src/pages/writing.astro`

- [ ] **Step 1: Rewrite writing.astro**

```astro
---
import Layout from '../layouts/Layout.astro'
import TitleBox from '../components/TitleBox.astro'
import PostCard from '../components/PostCard.astro'
import { Icon } from 'astro-icon/components'
import { getCollection } from 'astro:content'

const blog = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 4)
const til = (await getCollection('til')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 4)
---

<Layout title="Writing | glncy">
  <div class="mx-auto max-w-4xl px-4 pb-24 pt-32">
    <TitleBox title="Writing" subtitle="Long-form posts and quick TILs." />

    <div class="mt-8 flex items-center justify-between">
      <h2 class="font-heading text-3xl text-gray-200">Latest Blog</h2>
      <a href="/blog" class="text-sm text-gray-300 hover:text-white">All blog <Icon name="ph:arrow-right" /></a>
    </div>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {blog.map((p) => (
        <PostCard href={`/blog/${p.id}`} type="Blog" title={p.data.title} date={p.data.date} description={p.data.description} thumbnail={p.data.thumbnail} tags={p.data.tags} />
      ))}
    </div>
    {blog.length === 0 && <p class="mt-4 text-gray-400">No posts yet.</p>}

    <div class="mt-10 flex items-center justify-between">
      <h2 class="font-heading text-3xl text-gray-200">Latest TIL</h2>
      <a href="/til" class="text-sm text-gray-300 hover:text-white">All TIL <Icon name="ph:arrow-right" /></a>
    </div>
    <div class="mt-4 flex flex-col gap-3">
      {til.map((p) => (
        <PostCard href={`/til/${p.id}`} type="TIL" title={p.data.title} date={p.data.date} tags={p.data.tags} compact />
      ))}
    </div>
    {til.length === 0 && <p class="mt-4 text-gray-400">No TILs yet.</p>}
  </div>
</Layout>
```

- [ ] **Step 2: Build + assert**

Run: `bun run build`
Then: `grep -c "Latest Blog" dist/writing/index.html` — Expected: `1`. Build "Complete!".

- [ ] **Step 3: Commit**

```bash
git add src/pages/writing.astro
git commit -m "feat(writing): /writing hub with latest Blog + TIL"
```

---

### Task 7: Sveltia CMS — Blog + TIL collections

**Files:**
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Add two folder collections**

Append under `collections:` in `public/admin/config.yml` (after the `projects` collection):

```yaml
  - name: blog
    label: Blog
    folder: src/content/blog
    extension: mdx
    format: frontmatter
    create: true
    slug: '{{year}}-{{month}}-{{day}}-{{slug}}'
    fields:
      - { name: title, label: Title, widget: string }
      - { name: date, label: Date created, widget: datetime }
      - { name: updated, label: Date updated, widget: datetime, required: false }
      - { name: description, label: Description, widget: text, required: false }
      - { name: thumbnail, label: Thumbnail, widget: image, required: false }
      - { name: tags, label: Tags, widget: list, required: false, field: { name: tag, label: Tag, widget: string } }
      - { name: body, label: Body, widget: markdown }

  - name: til
    label: TIL
    folder: src/content/til
    extension: mdx
    format: frontmatter
    create: true
    slug: '{{year}}-{{month}}-{{day}}-{{slug}}'
    fields:
      - { name: title, label: Title, widget: string }
      - { name: date, label: Date created, widget: datetime }
      - { name: updated, label: Date updated, widget: datetime, required: false }
      - { name: description, label: Description, widget: text, required: false }
      - { name: thumbnail, label: Thumbnail, widget: image, required: false }
      - { name: tags, label: Tags, widget: list, required: false, field: { name: tag, label: Tag, widget: string } }
      - { name: body, label: Body, widget: markdown }
```

- [ ] **Step 2: Build (config.yml is static; just confirm site still builds)**

Run: `bun run build` — Expected: "Complete!".

- [ ] **Step 3: Commit**

```bash
git add public/admin/config.yml
git commit -m "feat(cms): add Blog + TIL collections to Sveltia"
```

---

### Task 8: Final verification

- [ ] **Step 1: Full build + route check**

Run: `bun run build`
Then:
```bash
ls dist/writing/index.html dist/blog/index.html dist/til/index.html \
   dist/blog/2026-06-24-hello-world/index.html \
   dist/til/2026-06-24-astro-content-layer/index.html
```
Expected: all exist; build "Complete!", 12+ pages.

- [ ] **Step 2: Embed in post works**

Run: `grep -c "lite-youtube" dist/blog/2026-06-24-hello-world/index.html`
Expected: `>=1` (the bare YouTube link in the sample post auto-embedded).

- [ ] **Step 3: Commit anything remaining.** Push/MR per user instruction.

---

## Self-Review

- **Spec coverage:** blog + til MDX collections with date/updated/tags/thumbnail/description ✅ (Task 1); images+embeds via existing astro-embed ✅ (verified Task 8 Step 2); SEO real routes `/writing` ✅ (Task 6), `/blog` `/til` ✅ (Task 4), `/blog/[slug]` `/til/[slug]` ✅ (Task 5); reading time (blog) ✅; Sveltia Blog+TIL ✅ (Task 7); nav already points to these (Phase 1).
- **Placeholder scan:** none — real code throughout. Note in Task 5 Step 3 corrects `:global()` usage for a plain CSS file (use bare selectors).
- **Consistency:** `PostCard` uses `Badge` (Phase 2) + `formatDate`; detail pages use `readingTime(post.body)`, `render(post)`, `Content`; `p.id` used consistently as slug in links and `getStaticPaths`.
- **Dependency:** requires `Badge.astro` from Phase 2 Task 1 — run Phase 2 first (or at least that task).
