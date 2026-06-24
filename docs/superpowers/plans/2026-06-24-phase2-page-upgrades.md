# Phase 2 — Page Upgrades Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade About (job history → vertical timeline), Projects (tech filter + featured/archive), and Contact (Web3Forms form + socials grid + location/timezone + copy-email + schedule + services + response-time).

**Architecture:** Continue the Astro 7 + Tailwind v4 + astro-icon (Phosphor) stack on branch `site-v2`. Reuse existing content collections (`jobs`, `projects`) and `settings.json`. Prefer plain Astro + tiny vanilla scripts over React islands (consistent with Phase 1 decisions — the contact form is a plain HTML form POSTing to Web3Forms, no React). Add a small reusable `Badge.astro` for chips/labels.

**Tech Stack:** Astro 7, Tailwind v4, astro-icon `ph:` set, bun, Web3Forms (free form endpoint).

**Verification:** No unit-test runner. Each task: `bun run build` must succeed + `grep`/`ls` assertions on `dist/`, plus a visual check via `bun run dev`.

**Branch:** `site-v2` (continues Phase 1).

---

### Task 1: Badge component

**Files:**
- Create: `src/components/Badge.astro`

- [ ] **Step 1: Create the component**

```astro
---
interface Props {
  variant?: 'tech' | 'label'
  class?: string
}
const { variant = 'tech', class: cls = '' } = Astro.props
---

<span class:list={['badge', `badge-${variant}`, cls]}><slot /></span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    border-radius: 9999px;
    white-space: nowrap;
  }
  .badge-tech {
    padding: 0.15rem 0.55rem;
    font-size: 0.72rem;
    color: #e5e7eb;
    background: rgba(255, 255, 255, 0.12);
    border: 0.5px solid rgba(255, 255, 255, 0.18);
  }
  .badge-label {
    padding: 0.1rem 0.5rem;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    color: #e5e7eb;
    background: rgba(255, 255, 255, 0.1);
    border: 0.5px solid rgba(255, 255, 255, 0.16);
  }
</style>
```

- [ ] **Step 2: Build**

Run: `bun run build` — Expected: "Complete!".

- [ ] **Step 3: Commit**

```bash
git add src/components/Badge.astro
git commit -m "feat(ui): add Badge component (tech chip + uppercase label variants)"
```

---

### Task 2: About — job history as vertical timeline

**Files:**
- Modify: `src/components/sections/JobHistory.astro` (full rewrite)

- [ ] **Step 1: Rewrite JobHistory.astro**

```astro
---
import { getCollection, render } from 'astro:content'
import { Icon } from 'astro-icon/components'

const jobs = (await getCollection('jobs')).sort((a, b) => b.data.order - a.data.order)
const rendered = await Promise.all(
  jobs.map(async (job) => ({ data: job.data, Content: (await render(job)).Content }))
)
---

<div>
  <div class="font-heading w-fit text-5xl text-gray-200 md:text-6xl">Job History</div>
  <div class="hairline my-4 w-full"></div>

  <ol class="timeline">
    {rendered.map(({ data, Content }) => (
      <li class="tl-item">
        <span class="tl-node"><Icon name="ph:briefcase" /></span>
        <div class="tl-body glass">
          <div class="tl-role">{data.title}</div>
          <div class="tl-company">{data.company} · <span class="tl-loc">{data.location}</span></div>
          <div class="tl-date">{data.startDate} – {data.endDate}</div>
          <div class="tl-desc"><Content /></div>
        </div>
      </li>
    ))}
  </ol>
</div>

<style>
  .timeline {
    position: relative;
    margin: 0;
    padding: 0 0 0 1.75rem;
    list-style: none;
  }
  /* vertical line */
  .timeline::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.25rem;
    bottom: 0.25rem;
    width: 1px;
    background: rgba(255, 255, 255, 0.18);
  }
  .tl-item { position: relative; margin-bottom: 1.5rem; }
  .tl-item:last-child { margin-bottom: 0; }
  .tl-node {
    position: absolute;
    left: -1.75rem;
    top: 0.4rem;
    width: 1.4rem;
    height: 1.4rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background: rgba(10, 12, 16, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #e5e7eb;
  }
  .tl-node :global(svg) { width: 0.8rem; height: 0.8rem; }
  .tl-body { border-radius: 0.6rem; padding: 1rem 1.1rem; }
  .tl-role { font-size: 1.25rem; color: #e5e7eb; }
  .tl-company { font-size: 0.95rem; color: #e5e7eb; opacity: 0.9; margin-top: 0.1rem; }
  .tl-loc { font-weight: 300; opacity: 0.8; }
  .tl-date { font-size: 0.8rem; font-style: italic; opacity: 0.7; margin-top: 0.15rem; }
  .tl-desc { font-size: 0.9rem; font-weight: 300; margin-top: 0.5rem; }
  .tl-desc :global(p) { margin: 0; }
</style>
```

- [ ] **Step 2: Verify Phosphor icon exists**

Run: `node -e "const i=require('@iconify-json/ph/icons.json'); console.log(!!i.icons['briefcase'])"`
Expected: `true`. (If `false`, substitute `ph:suitcase-simple` and note it.)

- [ ] **Step 3: Build + assert**

Run: `bun run build`
Then: `grep -c "timeline" dist/about/index.html` — Expected: `>=1`. Build "Complete!".

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/JobHistory.astro
git commit -m "feat(about): job history as vertical timeline"
```

---

### Task 3: Projects — add `featured` flag to schema

**Files:**
- Modify: `src/content.config.ts` (projects schema)

- [ ] **Step 1: Add `featured` to the projects schema**

In `src/content.config.ts`, inside the `projects` collection `schema: z.object({ ... })`, add after the `youtube` line:

```ts
    featured: z.boolean().optional().default(false),
```

- [ ] **Step 2: Mark a few projects featured**

Edit the frontmatter of these 4 files, adding `featured: true` (top recent ones):
- `src/content/projects/21-petpal.mdx`
- `src/content/projects/20-expo-up-server.mdx`
- `src/content/projects/18-resource-tracker.mdx`
- `src/content/projects/17-ttap-me.mdx`

Add the line `featured: true` under the `order:` line in each file's frontmatter. (If a filename differs, pick the 4 highest-`order` projects.)

- [ ] **Step 3: Build**

Run: `bun run build` — Expected: "Complete!" (schema accepts `featured`).

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/projects
git commit -m "feat(projects): add featured flag to schema + mark featured projects"
```

---

### Task 4: Projects — featured/archive split + tech filter

**Files:**
- Modify: `src/components/sections/Projects.astro` (full rewrite)

- [ ] **Step 1: Rewrite Projects.astro**

```astro
---
import { getCollection, render } from 'astro:content'
import { Icon } from 'astro-icon/components'
import Badge from '../Badge.astro'

const all = (await getCollection('projects')).sort((a, b) => b.data.order - a.data.order)
const rendered = await Promise.all(
  all.map(async (p) => ({ data: p.data, Content: (await render(p)).Content }))
)
const featured = rendered.filter((p) => p.data.featured)
const archive = rendered.filter((p) => !p.data.featured)

// Unique tech tags across all projects, for the filter chips.
const techs = [...new Set(rendered.flatMap((p) => p.data.stack))].sort()

const ytId = (url: string) => {
  if (!url) return ''
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  return m ? m[1] : url
}
---

<!-- Filter chips -->
<div class="filters" role="group" aria-label="Filter projects by tech">
  <button class="chip active" data-tech="all">All</button>
  {techs.map((t) => <button class="chip" data-tech={t}>{t}</button>)}
</div>

{featured.length > 0 && (
  <section class="mb-10">
    <div class="font-heading mb-4 w-fit text-4xl text-gray-200">Featured</div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      {featured.map(({ data, Content }) => (
        <article class="proj glass glass-hover flex flex-col rounded-lg" data-stack={data.stack.join('|')}>
          {data.youtube ? (
            <iframe class="aspect-video w-full rounded-t-lg" src={`https://www.youtube-nocookie.com/embed/${ytId(data.youtube)}`} title={data.name} loading="lazy" allowfullscreen></iframe>
          ) : data.thumbnail ? (
            <img src={data.thumbnail} alt={data.name} class="w-full rounded-t-lg object-cover" />
          ) : null}
          <div class="p-4">
            <div class="text-xl text-gray-200">{data.name}</div>
            <div class="text-sm font-extralight italic text-gray-200">{data.year}</div>
            <div class="mb-2 mt-2 flex flex-wrap gap-1.5">
              {data.stack.map((s) => <Badge>{s}</Badge>)}
            </div>
            <ul class="ml-4 list-disc text-sm font-light text-gray-200">
              {data.contributions.map((c) => <li>{c}</li>)}
            </ul>
            <div class="hairline my-2"></div>
            <div class="remarks text-sm text-gray-200"><Content /></div>
          </div>
        </article>
      ))}
    </div>
  </section>
)}

<section>
  <div class="font-heading mb-4 w-fit text-4xl text-gray-200">All Projects</div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" id="archive-grid">
    {archive.map(({ data, Content }) => (
      <article class="proj glass glass-hover flex flex-col rounded-lg" data-stack={data.stack.join('|')}>
        <div class="p-4">
          <div class="text-xl text-gray-200">{data.name}</div>
          <div class="text-sm font-extralight italic text-gray-200">{data.year}</div>
          <div class="mb-2 mt-2 flex flex-wrap gap-1.5">
            {data.stack.map((s) => <Badge>{s}</Badge>)}
          </div>
          <ul class="ml-4 list-disc text-sm font-light text-gray-200">
            {data.contributions.map((c) => <li>{c}</li>)}
          </ul>
          <div class="hairline my-2"></div>
          <div class="remarks text-sm text-gray-200"><Content /></div>
        </div>
      </article>
    ))}
  </div>
  <p class="no-results mt-6 hidden text-center text-gray-400">No projects with that tech.</p>
</section>

<style>
  .filters { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem; }
  .chip {
    padding: 0.25rem 0.7rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    color: #e5e7eb;
    background: rgba(255, 255, 255, 0.08);
    border: 0.5px solid rgba(255, 255, 255, 0.16);
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .chip:hover { background: rgba(255, 255, 255, 0.16); }
  .chip.active { background: rgba(255, 255, 255, 0.85); color: #111; }
  .remarks :global(a) { color: #3b82f6; text-decoration: underline; }
  .remarks :global(p) { margin: 0; }
</style>

<script is:inline>
  function initProjectFilter() {
    const chips = document.querySelectorAll('.chip')
    if (!chips.length) return
    const cards = document.querySelectorAll('.proj')
    const noResults = document.querySelector('.no-results')
    chips.forEach((chip) => {
      if (chip.dataset.bound) return
      chip.dataset.bound = '1'
      chip.addEventListener('click', () => {
        const tech = chip.dataset.tech
        document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === chip))
        let shown = 0
        cards.forEach((card) => {
          const stacks = (card.dataset.stack || '').split('|')
          const match = tech === 'all' || stacks.includes(tech)
          card.style.display = match ? '' : 'none'
          if (match) shown++
        })
        if (noResults) noResults.classList.toggle('hidden', shown > 0)
      })
    })
  }
  document.addEventListener('astro:page-load', initProjectFilter)
</script>
```

Note: the filter applies to all `.proj` cards (featured + archive). Featured cards also hide when filtered.

- [ ] **Step 2: Build + assert**

Run: `bun run build`
Then: `grep -c "filters" dist/projects/index.html` — Expected: `>=1`.
Then: `grep -c "data-stack" dist/projects/index.html` — Expected: `>=1`. Build "Complete!".

- [ ] **Step 3: Visual check**

`bun run dev` → `/projects`: chips filter the grid; "All" shows everything; a tech shows only matching; featured section appears above.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects.astro
git commit -m "feat(projects): featured/archive split + client-side tech filter chips"
```

---

### Task 5: Contact settings fields

**Files:**
- Modify: `src/data/settings.json`

- [ ] **Step 1: Add contact-related fields**

In `src/data/settings.json`, add these keys at the top level (alongside `github`):

```json
  "web3formsKey": "",
  "scheduleUrl": "",
  "location": "Philippines · GMT+8",
  "responseTime": "I usually reply within 24h.",
  "services": "Web & mobile development, UI/UX, design & multimedia."
```

(Leave `web3formsKey` and `scheduleUrl` empty — user fills via CMS. Keep valid JSON: add a comma after the previous last key.)

- [ ] **Step 2: Build**

Run: `bun run build` — Expected: "Complete!".

- [ ] **Step 3: Commit**

```bash
git add src/data/settings.json
git commit -m "feat(contact): add web3formsKey, scheduleUrl, location, responseTime, services settings"
```

---

### Task 6: Contact page — form + socials + extras

**Files:**
- Modify: `src/pages/contact.astro` (full rewrite)

- [ ] **Step 1: Rewrite contact.astro**

```astro
---
import Layout from '../layouts/Layout.astro'
import TitleBox from '../components/TitleBox.astro'
import { Icon } from 'astro-icon/components'
import settings from '../data/settings.json'

const { email, linkedin, messenger } = settings.contact
const { github, web3formsKey, scheduleUrl, location, responseTime, services } = settings

const socials = [
  { name: 'Email', href: `mailto:${email}`, icon: 'ph:envelope-simple' },
  { name: 'LinkedIn', href: linkedin, icon: 'ph:linkedin-logo', external: true },
  { name: 'Messenger', href: messenger, icon: 'ph:messenger-logo', external: true },
  { name: 'GitHub', href: github, icon: 'ph:github-logo', external: true },
].filter((s) => s.href)
---

<Layout title="Contact | glncy">
  <div class="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 py-28">
    <TitleBox title="Contact" subtitle={settings.pages.contactSubtitle} />

    <p class="mt-4 text-center text-sm text-gray-300">{services}</p>
    <p class="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-400">
      <span class="inline-flex items-center gap-1"><Icon name="ph:map-pin" /> {location}</span>
      <span class="inline-flex items-center gap-1"><Icon name="ph:clock" /> {responseTime}</span>
    </p>

    {web3formsKey && (
      <form id="contact-form" class="glass mt-6 w-full rounded-xl p-5">
        <input type="hidden" name="access_key" value={web3formsKey} />
        <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" />
        <label class="block">
          <span class="mb-1 block text-xs text-gray-300">Name</span>
          <input name="name" required class="field" type="text" autocomplete="name" />
        </label>
        <label class="mt-3 block">
          <span class="mb-1 block text-xs text-gray-300">Email</span>
          <input name="email" required class="field" type="email" autocomplete="email" />
        </label>
        <label class="mt-3 block">
          <span class="mb-1 block text-xs text-gray-300">Message</span>
          <textarea name="message" required rows="4" class="field"></textarea>
        </label>
        <button type="submit" class="cta glass mt-4 w-full justify-center">Send <Icon class="arrow" name="ph:paper-plane-tilt" /></button>
        <p id="form-status" class="mt-3 hidden text-center text-sm"></p>
      </form>
    )}

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      {socials.map((s) => (
        <a class="cta glass" href={s.href} {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          <Icon name={s.icon} /> {s.name}
        </a>
      ))}
      <button id="copy-email" class="cta glass" data-email={email}>
        <Icon name="ph:copy" /> Copy email
      </button>
      {scheduleUrl && (
        <a class="cta glass" href={scheduleUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="ph:calendar-dots" /> Schedule a call
        </a>
      )}
    </div>
  </div>
</Layout>

<style>
  .field {
    width: 100%;
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.25);
    border: 0.5px solid rgba(255, 255, 255, 0.2);
    padding: 0.55rem 0.7rem;
    color: #e5e7eb;
    font-size: 0.9rem;
  }
  .field:focus { outline: none; border-color: rgba(255, 255, 255, 0.5); }
</style>

<script is:inline>
  function initContact() {
    const copy = document.getElementById('copy-email')
    if (copy && !copy.dataset.bound) {
      copy.dataset.bound = '1'
      copy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(copy.dataset.email || '')
          const label = copy.querySelector('span') || copy
          copy.classList.add('copied')
          setTimeout(() => copy.classList.remove('copied'), 1500)
        } catch {}
      })
    }
    const form = document.getElementById('contact-form')
    if (form && !form.dataset.bound) {
      form.dataset.bound = '1'
      const status = document.getElementById('form-status')
      form.addEventListener('submit', async (e) => {
        e.preventDefault()
        if (status) { status.classList.remove('hidden'); status.textContent = 'Sending…'; status.style.color = '#e5e7eb' }
        try {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
          })
          const data = await res.json()
          if (data.success) {
            form.reset()
            if (status) { status.textContent = 'Thanks! I’ll get back to you soon.'; status.style.color = '#86efac' }
          } else throw new Error()
        } catch {
          if (status) { status.textContent = 'Something went wrong — email me directly.'; status.style.color = '#fca5a5' }
        }
      })
    }
  }
  document.addEventListener('astro:page-load', initContact)
</script>
```

- [ ] **Step 2: Verify Phosphor icon names exist**

Run:
```bash
node -e "const i=require('@iconify-json/ph/icons.json'); ['map-pin','clock','copy','paper-plane-tilt','calendar-dots','envelope-simple','linkedin-logo','messenger-logo','github-logo'].forEach(n=>console.log((i.icons[n]?'ok':'MISSING'),n))"
```
Expected: all `ok`. If any MISSING, substitute (e.g. `calendar-dots`→`calendar`, `paper-plane-tilt`→`paper-plane-right`) and note it.

- [ ] **Step 3: Build + assert**

Run: `bun run build`
Then: `grep -c "copy-email" dist/contact/index.html` — Expected: `1`. (The form block only renders once `web3formsKey` is set; that's expected — empty key = no form yet.) Build "Complete!".

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat(contact): Web3Forms form (key-gated) + socials grid, copy-email, location, schedule, services"
```

---

### Task 7: Final verification

- [ ] **Step 1: Full build**

Run: `bun run build` — Expected: "Complete!", 8 page(s).

- [ ] **Step 2: Assert pages**

Run: `grep -c "timeline" dist/about/index.html && grep -c "filters" dist/projects/index.html && grep -c "Contact" dist/contact/index.html`
Expected: each `>=1`.

- [ ] **Step 3: Commit any remaining + stop (do not push)**

Push/MR handled separately after Phase 3 (or per user instruction).

---

## Self-Review

- **Spec coverage:** About timeline ✅ (Task 2); Projects featured/archive ✅ + tech filter ✅ (Tasks 3–4); Contact form (Web3Forms, key-gated) ✅, socials grid ✅, location/timezone ✅, copy-email ✅, schedule (url-gated) ✅, services ✅, response-time ✅ (Tasks 5–6). Badge component ✅ (Task 1).
- **Deviation from spec:** Contact form is plain Astro + vanilla fetch (not shadcn React) — consistent with the Phase-1 decision to avoid React islands; lighter and no hydration. shadcn remains available if a richer form is wanted later.
- **Placeholder scan:** none — all steps have real code/commands. Icon-name existence is verified in Tasks 2 & 6 with substitution guidance.
- **Consistency:** Badge used by Projects; `.cta`/`.glass`/`.hairline`/tokens reused; settings fields read by Contact; jobs/projects collections already exist.
