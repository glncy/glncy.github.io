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

Markdown bodies (bio, jobs, projects, future blog) support:
- **Images** natively: `![alt](/img/foo.png)`
- **YouTube / Vimeo**: paste a bare link on its own line -> auto-embeds
  (via `src/lib/rehype-embeds.mjs`).

## TODO

- [ ] **Convert content to `.mdx` soon** — to allow richer embeds/components
  (X/Twitter, link previews, custom components) inside posts, especially for the
  planned **blog**. Trade-off: MDX is less forgiving for CMS editing (a stray
  `<`/`{` can break the build), so likely make **only the blog** MDX and keep
  profile/jobs/projects on safe `.md`. See `astro-embed` (auto-embed is MDX-only).
- [ ] Add a **blog** collection (`src/content/blog/`) + `/blog` pages.

