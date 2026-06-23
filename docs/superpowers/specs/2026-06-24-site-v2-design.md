# glncy site v2 — Design

Date: 2026-06-24
Status: Approved (pending spec review)

Builds on the current Astro 7 site (Tailwind v4, React islands, astro-icon/Phosphor,
MDX + astro-embed, Sveltia CMS, GitLab→GitHub mirror → Pages at glncy.is-a.dev).

## Goals

1. Redesign the shared **header + hero**.
2. Upgrade **About**, **Projects**, **Contact** pages.
3. Add a **Writing** section: **Blog** (long-form) + **TIL** (short-form), SEO-friendly real routes.

Designed as one spec; implemented in 3 phases (each its own plan + MR, site stays shippable).

---

## Phase 1 — Shared header + hero

### Header (Direction A)
- Top bar: **logo left, nav right**. Nav items: `About · Projects · Writing ▾ · Contact`.
- `Writing ▾` = dropdown → **Blog** (`/blog`), **TIL** (`/til`). Parent label links to `/writing`.
- **Sticky**, condenses slightly on scroll (smaller padding / subtle bg).
- Lives in `Layout.astro` → shared by every page (About, Projects, Contact, Writing, Blog, TIL).
- Mobile: nav collapses to a menu (hamburger) with the same items; Writing expands to Blog/TIL.

### Hero
- Shared per-page hero = existing centered glass `TitleBox` (title + subtitle). Reused by all pages.
- **Home hero only** adds:
  - **Social row**: GitHub, LinkedIn, Email, Messenger (Phosphor icons), from `settings.json`.
  - **Two CTAs**: `About Me` (→ `/about`) and `Writing →` (→ `/writing`).
  - Minimal — no status chip.

### Data / CMS
- `settings.json` already holds contact links; reuse for the social row.

---

## Phase 2 — Page upgrades

### About
- **Job history → vertical timeline** (company, role, dates, blurb) replacing the card grid.
- Information (bio) + Skills grid kept, with light spacing/polish.

### Projects
- **Filter by tech**: clickable stack chips filter the grid client-side; deep-linkable (`?tech=`).
- **Featured + archive**: `featured: true` projects shown large at top; the rest as a compact list.
- Card polish (media, hover, layout).

### Contact (selected elements)
- **Contact form** — Formspree/Web3Forms (free, static-friendly). Fields: name, email, message →
  POST to endpoint; show thank-you state. Endpoint/key stored in `settings.json` (or env).
- **Socials grid** — Email, LinkedIn, Messenger, GitHub (+ room for X/Bluesky/IG/YouTube); CMS-editable.
- **Location & timezone** — "Philippines · GMT+8".
- **Copy-email button** — copies email to clipboard.
- **Schedule a call** — Cal.com/Calendly link (CMS field).
- **"What I can help with"** — short services line (web & mobile dev, UI/UX, multimedia).
- **Response-time note** — "I usually reply within 24h".
- (Availability badge intentionally omitted.)

---

## Phase 3 — Writing (Blog + TIL)

### Content model (MDX collections)
Two collections in `src/content/`:
- **`blog`** (long-form), **`til`** (short-form). Shared frontmatter:
  - `title` (string)
  - `date` (created, datetime)
  - `updated` (datetime, optional)
  - `tags` (string[], optional)
  - `thumbnail` (image path, optional)
  - `description` (string, for cards + SEO)
  - body = MDX (images + embeds via astro-embed)

### Routes (all real, prerendered → SEO-friendly)
- **`/writing`** — combined hub: latest Blog + TIL, filter tabs (All · Blog · TIL) that **link** to
  `/blog` and `/til`.
- **`/blog`** — blog-only index (cards: thumbnail if set, title, date, tags, excerpt).
- **`/til`** — TIL-only index (more compact cards).
- **`/blog/[slug]`**, **`/til/[slug]`** — detail pages: title, created date (+ "Updated" if present),
  tags, thumbnail header, reading time (blog), MDX body with embeds.

### Nav / hero wiring
- `Writing ▾` → `/writing`; dropdown `Blog` → `/blog`, `TIL` → `/til`.
- Home hero `Writing →` → `/writing`.

### CMS
- Sveltia gets **Blog** and **TIL** folder collections (`.mdx`, `extension: mdx`, frontmatter above),
  editable from `/admin`.

---

## Cross-cutting

- **Styling**: keep dark glassmorphism, Playfair/Poppins, Phosphor icons (astro-icon).
- **Icons**: continue `<Icon name="ph:..." />`.
- **Deploy**: unchanged pipeline (GitLab `main` → mirror → GitHub Actions → Pages).
- **No new heavy deps** beyond a reading-time util and the form endpoint (3rd-party, no server).

## Out of scope (for now)
- Real-time/back-end features, comments, search across posts, RSS (could add later), i18n.

## Open items to confirm at build time
- Formspree vs Web3Forms (both free; pick when building Contact).
- Cal.com vs Calendly link (user provides).
- Exact "featured" projects list.
