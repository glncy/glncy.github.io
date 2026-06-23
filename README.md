# glncy

Personal site of Glency Tirao — **Astro 7** rebuild (was Nuxt 2 / Vue 2).

- **Framework:** Astro 7 (Tailwind v4, React islands, shadcn/ui)
- **Content:** git-based, editable via **Sveltia CMS** at `/admin`
- **Source of truth:** GitLab `glncy/glncy` → push-mirrored to GitHub `glncy/glncy.github.io`
- **Hosting:** GitHub Pages at **glncy.is-a.dev** (`public/CNAME`)
- **Media:** images in git (`public/img`), videos via YouTube embeds

## Develop

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # -> dist/
```

## Content

| Type | Location | Edited as |
| --- | --- | --- |
| Profile / bio | `src/data/profile.json` | Sveltia file |
| Skills | `src/data/skills.json` | Sveltia file |
| Site settings + lofi videos | `src/data/settings.json` | Sveltia file |
| Job history | `src/content/jobs/*.md` | Sveltia folder |
| Projects | `src/content/projects/*.md` | Sveltia folder |

## Admin (Sveltia CMS)

Live at `https://glncy.is-a.dev/admin/`. Auth is **GitLab PKCE — no backend server**.

### One-time setup: GitLab OAuth application

There is no API/CLI to create a user OAuth app on gitlab.com — do it in the UI:

1. Go to **GitLab → User Settings → Applications**
   (`https://gitlab.com/-/user_settings/applications`)
2. **Name:** `Sveltia CMS — glncy`
3. **Redirect URI** (add both):
   - `https://glncy.is-a.dev/admin/`
   - `http://localhost:4321/admin/` (local dev)
4. **Confidential:** unchecked (PKCE public client)
5. **Scopes:** `api`
6. Save, copy the **Application ID**, and set it in `public/admin/config.yml`:
   ```yaml
   backend:
     app_id: <your Application ID>
   ```

## Deploy

Push to GitLab `main` -> mirror to GitHub -> GitHub Actions (`.github/workflows/deploy.yml`)
builds with Bun and deploys to Pages.

> GitHub repo setting required: **Settings -> Pages -> Source = GitHub Actions.**

## Embeds in content

Content bodies are **`.mdx`** (`src/content/**`), powered by **[astro-embed](https://astro-embed.netlify.app/)**:
- **Images** natively: `![alt](/img/foo.png)`
- **Auto-embed** — paste a bare link on its own line -> embeds automatically:
  YouTube, Vimeo, Tweet/X, Bluesky, Gist, and generic link previews.
- **Manual components** (optional, for power use):
  `import { YouTube } from 'astro-embed'` then `<YouTube id="..." />`.

> Astro 7 note: astro-embed's remark plugin needs the unified pipeline, so
> `astro.config.mjs` sets `markdown: { processor: unified() }` and installs
> `@astrojs/markdown-remark`. Without that, Astro 7's default (Sätteri) processor
> ignores remark/rehype plugins and auto-embed silently no-ops.

## TODO

- [ ] Add a **blog** collection (`src/content/blog/`) + `/blog` pages (MDX, so
  embeds work out of the box).
- [ ] Add a **blog** collection (`src/content/blog/`) + `/blog` pages.

