# Phase 1 — Header + Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the shared site header (Direction A: logo-left / nav-right, `Writing ▾` dropdown, sticky + condensing) and enrich the home hero (social row + `About Me` and `Writing →` CTAs), on a unified glass design-token + component foundation.

**Architecture:** Extract the header out of `Layout.astro` into a focused `Header.astro` component. Add small reusable components (`Button.astro`, `SocialRow.astro`) and CSS design tokens in `global.css`. Add stub pages for `/writing`, `/blog`, `/til` so the new nav links resolve (Phase 3 replaces them). Pure Astro + astro-icon (Phosphor); a tiny inline script handles sticky-condense and the mobile menu/dropdown.

**Tech Stack:** Astro 7, Tailwind v4, astro-icon (`ph:` Phosphor), bun.

**Verification note:** No unit-test runner in this project. Each task verifies via `bun run build` (must succeed) and `grep` assertions on `dist/` output, plus a visual check at `http://localhost:4321` (`bun run dev`).

**Branch:** `site-v2` (already created off `main`).

---

### Task 1: Design tokens in global.css

**Files:**
- Modify: `src/styles/global.css` (the `:root` block and `.glass` rules)

- [ ] **Step 1: Add tokens to `:root`**

In `src/styles/global.css`, find the existing `:root {` block (the shadcn one with `--background:` etc.) and add these variables just before its closing `}`:

```css
    /* glncy glass + UI tokens */
    --glass-bg: rgba(0, 0, 0, 0.2);
    --glass-bg-strong: rgba(0, 0, 0, 0.5);
    --glass-border: rgba(255, 255, 255, 0.2);
    --glass-border-strong: rgba(255, 255, 255, 0.8);
    --glass-blur: 8px;
    --hairline: rgba(255, 255, 255, 0.5);
    --pill: 9999px;
```

- [ ] **Step 2: Refactor `.glass`, `.glass-hover`, `.hairline` to use tokens**

Replace the existing `.glass`, `.glass-hover`, and `.hairline` rule blocks with:

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 0.5px solid var(--glass-border);
}
.glass-hover {
  transition: all 0.2s ease-in-out;
}
.glass-hover:hover {
  transform: scale(1.02);
  background: var(--glass-bg-strong);
  border: 0.5px solid var(--glass-border-strong);
  backdrop-filter: blur(var(--glass-blur));
}
.hairline {
  height: 0.2px;
  background: var(--hairline);
}
```

- [ ] **Step 3: Build to verify no regressions**

Run: `bun run build`
Expected: "Complete!", 5 page(s) built, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(ui): add glass design tokens; refactor glass utilities to use them"
```

---

### Task 2: Button (CTA) component

**Files:**
- Create: `src/components/Button.astro`

- [ ] **Step 1: Create the component**

```astro
---
import { Icon } from 'astro-icon/components'

interface Props {
  href: string
  icon?: string // optional Phosphor icon name, e.g. "ph:arrow-right"
  external?: boolean
  class?: string
}
const { href, icon, external = false, class: cls = '' } = Astro.props
const attrs = external ? { target: '_blank', rel: 'noopener' } : {}
---

<a href={href} class={`cta glass ${cls}`} {...attrs}>
  <slot />
  {icon && <Icon class="arrow" name={icon} />}
</a>
```

(Reuses the existing global `.cta` and `.glass` classes — no new CSS needed.)

- [ ] **Step 2: Build to verify it compiles**

Run: `bun run build`
Expected: "Complete!", no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Button.astro
git commit -m "feat(ui): add reusable Button (glass CTA) component"
```

---

### Task 3: SocialRow component

**Files:**
- Create: `src/components/SocialRow.astro`

- [ ] **Step 1: Create the component**

```astro
---
import { Icon } from 'astro-icon/components'
import settings from '../data/settings.json'

const { email, linkedin, messenger } = settings.contact
const github = settings.github

const links = [
  github && { name: 'GitHub', href: github, icon: 'ph:github-logo', external: true },
  linkedin && { name: 'LinkedIn', href: linkedin, icon: 'ph:linkedin-logo', external: true },
  email && { name: 'Email', href: `mailto:${email}`, icon: 'ph:envelope-simple', external: false },
  messenger && { name: 'Messenger', href: messenger, icon: 'ph:messenger-logo', external: true },
].filter(Boolean) as { name: string; href: string; icon: string; external: boolean }[]
---

<div class="social-row">
  {links.map((l) => (
    <a
      href={l.href}
      aria-label={l.name}
      {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      <Icon name={l.icon} />
    </a>
  ))}
</div>

<style>
  .social-row {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  .social-row a {
    color: #e5e7eb;
    line-height: 0;
    transition: transform 0.15s ease, opacity 0.15s ease;
    opacity: 0.85;
  }
  .social-row a:hover {
    transform: translateY(-2px) scale(1.1);
    opacity: 1;
  }
  .social-row :global(svg) {
    width: 1.35rem;
    height: 1.35rem;
  }
</style>
```

- [ ] **Step 2: Build and assert icons render**

Run: `bun run build` (then add a temporary include is not needed; SocialRow is used in Task 6).
Expected: "Complete!", no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SocialRow.astro
git commit -m "feat(ui): add SocialRow component (GitHub/LinkedIn/Email/Messenger)"
```

---

### Task 4: Header component (Direction A)

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create the component**

```astro
---
import { Icon } from 'astro-icon/components'
import settings from '../data/settings.json'

const path = Astro.url.pathname
const isActive = (href: string) =>
  href === '/' ? path === '/' : path.startsWith(href)
---

<header class="site-header" id="site-header">
  <div class="header-inner">
    <a href="/" class="font-heading brand">{settings.siteTitle}</a>

    <nav class="nav" aria-label="Primary">
      <a href="/about" class:list={['nav-link', { active: isActive('/about') }]}>About</a>
      <a href="/projects" class:list={['nav-link', { active: isActive('/projects') }]}>Projects</a>

      <div class="nav-dd">
        <a href="/writing" class:list={['nav-link', 'dd-toggle', { active: isActive('/writing') || isActive('/blog') || isActive('/til') }]}>
          Writing <Icon name="ph:caret-down" />
        </a>
        <div class="dd-menu">
          <a href="/blog" class="dd-item">Blog</a>
          <a href="/til" class="dd-item">TIL</a>
        </div>
      </div>

      <a href="/contact" class:list={['nav-link', { active: isActive('/contact') }]}>Contact</a>
    </nav>

    <button class="menu-btn" id="menu-btn" aria-label="Menu" aria-expanded="false">
      <Icon name="ph:list" />
    </button>
  </div>
</header>

<style>
  .site-header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 40;
    transition: padding 0.2s ease, background 0.2s ease, backdrop-filter 0.2s ease;
    padding: 1rem 1.25rem;
  }
  /* condensed on scroll */
  .site-header.scrolled {
    padding: 0.4rem 1.25rem;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(var(--glass-blur));
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 72rem;
    margin: 0 auto;
  }
  .brand {
    font-style: italic;
    font-weight: 500;
    font-size: 1.6rem;
    color: #e5e7eb;
  }
  .nav {
    display: none;
    align-items: center;
    gap: 1.4rem;
  }
  @media (min-width: 768px) {
    .nav { display: flex; }
    .menu-btn { display: none; }
  }
  .nav-link {
    color: #e5e7eb;
    font-size: 1rem;
    opacity: 0.85;
    transition: opacity 0.15s ease, transform 0.15s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
  }
  .nav-link:hover { opacity: 1; transform: translateY(-1px); }
  .nav-link.active { opacity: 1; text-decoration: underline; text-underline-offset: 6px; }
  .nav-link :global(svg) { width: 0.9rem; height: 0.9rem; }

  /* dropdown */
  .nav-dd { position: relative; }
  .dd-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    display: flex;
    flex-direction: column;
    min-width: 9rem;
    padding: 0.4rem;
    border-radius: 0.6rem;
    background: var(--glass-bg-strong);
    backdrop-filter: blur(var(--glass-blur));
    border: 0.5px solid var(--glass-border);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .nav-dd:hover .dd-menu,
  .nav-dd:focus-within .dd-menu {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(2px);
  }
  .dd-item {
    color: #e5e7eb;
    padding: 0.4rem 0.6rem;
    border-radius: 0.4rem;
    font-size: 0.95rem;
    opacity: 0.85;
  }
  .dd-item:hover { opacity: 1; background: rgba(255, 255, 255, 0.08); }

  /* mobile */
  .menu-btn {
    background: none;
    border: none;
    color: #e5e7eb;
    cursor: pointer;
    line-height: 0;
  }
  .menu-btn :global(svg) { width: 1.5rem; height: 1.5rem; }

  .nav.open {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    position: absolute;
    top: 100%;
    right: 1.25rem;
    margin-top: 0.5rem;
    padding: 1rem 1.25rem;
    border-radius: 0.7rem;
    background: var(--glass-bg-strong);
    backdrop-filter: blur(var(--glass-blur));
    border: 0.5px solid var(--glass-border);
  }
  .nav.open .dd-menu {
    position: static;
    transform: none;
    opacity: 1;
    visibility: visible;
    background: none;
    border: none;
    padding: 0.2rem 0 0 0.8rem;
  }
</style>

<script is:inline>
  // Sticky-condense on scroll + mobile menu toggle. Runs on every page load
  // (View Transitions re-fire astro:page-load), so re-bind each time.
  function initHeader() {
    const header = document.getElementById('site-header')
    const btn = document.getElementById('menu-btn')
    const nav = header && header.querySelector('.nav')
    if (!header) return

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    if (btn && nav) {
      btn.addEventListener('click', () => {
        const open = nav.classList.toggle('open')
        btn.setAttribute('aria-expanded', String(open))
      })
    }
  }
  document.addEventListener('astro:page-load', initHeader)
  initHeader()
</script>
```

- [ ] **Step 2: Build to verify it compiles**

Run: `bun run build`
Expected: "Complete!", no errors. (Header isn't wired in yet — Task 5.)

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat(ui): add Header component (logo left, nav right, Writing dropdown, sticky, mobile)"
```

---

### Task 5: Wire Header into Layout; remove inline header

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Import Header**

In the frontmatter of `src/layouts/Layout.astro`, add after the `ClientRouter` import line:

```astro
import Header from '../components/Header.astro'
```

- [ ] **Step 2: Replace the inline `<header>…</header>` block**

Find the existing `<header class="fixed inset-x-0 top-0 z-20"> … </header>` block in the `<body>` and replace the WHOLE block with:

```astro
    <Header />
```

(Leave `<Background />`, `<main>`, and the `showNav` prop handling. The old `showNav` prop is now unused; keep the prop in the interface for compatibility but it no longer controls header rendering.)

- [ ] **Step 3: Build and assert header renders on a page**

Run: `bun run build`
Then: `grep -c "site-header" dist/about/index.html`
Expected: `1` (or more). Build "Complete!".

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat(ui): use Header component in Layout; drop inline header"
```

---

### Task 6: Stub pages for /writing, /blog, /til

**Files:**
- Create: `src/pages/writing.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/til/index.astro`

- [ ] **Step 1: Create `src/pages/writing.astro`**

```astro
---
import Layout from '../layouts/Layout.astro'
import TitleBox from '../components/TitleBox.astro'
---

<Layout title="Writing | glncy">
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <TitleBox title="Writing" subtitle="Blog &amp; TIL — coming soon." />
  </div>
</Layout>
```

- [ ] **Step 2: Create `src/pages/blog/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro'
import TitleBox from '../../components/TitleBox.astro'
---

<Layout title="Blog | glncy">
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <TitleBox title="Blog" subtitle="Long-form posts — coming soon." />
  </div>
</Layout>
```

- [ ] **Step 3: Create `src/pages/til/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro'
import TitleBox from '../../components/TitleBox.astro'
---

<Layout title="TIL | glncy">
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <TitleBox title="TIL" subtitle="Today I Learned — short notes, coming soon." />
  </div>
</Layout>
```

- [ ] **Step 4: Build and assert routes exist**

Run: `bun run build`
Then: `ls dist/writing/index.html dist/blog/index.html dist/til/index.html`
Expected: all three files exist; build "Complete!".

- [ ] **Step 5: Commit**

```bash
git add src/pages/writing.astro src/pages/blog/index.astro src/pages/til/index.astro
git commit -m "feat: add stub /writing, /blog, /til pages (filled in Phase 3)"
```

---

### Task 7: Home hero — social row + CTAs

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update index.astro**

Replace the entire contents of `src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro'
import TitleBox from '../components/TitleBox.astro'
import SocialRow from '../components/SocialRow.astro'
import Button from '../components/Button.astro'
import { getEntry } from 'astro:content'

const profile = await getEntry('profile', 'profile')
const { name, tagline } = profile!.data
---

<Layout showNav={false} title="glncy">
  <div class="flex h-screen w-screen flex-col items-center justify-center gap-6">
    <TitleBox title={name} subtitle={tagline} />
    <SocialRow />
    <div class="flex flex-wrap items-center justify-center gap-3">
      <Button href="/about">About Me <Fragment slot="after" /></Button>
      <Button href="/writing" icon="ph:arrow-right">Writing</Button>
    </div>
  </div>
</Layout>
```

Note: the `About Me` button intentionally has no icon; the `Writing` button uses the arrow icon. Remove the stray `<Fragment slot="after" />` — corrected version:

```astro
    <div class="flex flex-wrap items-center justify-center gap-3">
      <Button href="/about">About Me</Button>
      <Button href="/writing" icon="ph:arrow-right">Writing</Button>
    </div>
```

- [ ] **Step 2: Build and assert hero content**

Run: `bun run build`
Then: `grep -c "social-row" dist/index.html` → expect `1`
Then: `grep -c 'href="/writing"' dist/index.html` → expect at least `1`
Expected: build "Complete!".

- [ ] **Step 3: Visual check**

Run: `bun run dev`, open `http://localhost:4321/`.
Verify: logo left / nav right header; on scroll the header condenses; hover `Writing` shows Blog/TIL dropdown; hero shows social icons + `About Me` and `Writing →`; mobile (narrow window) shows the hamburger which opens the nav.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(ui): home hero adds social row + About Me and Writing CTAs"
```

---

### Task 8: Final verification + push

- [ ] **Step 1: Full build**

Run: `bun run build`
Expected: "Complete!", 8 page(s) built (index, about, projects, contact, admin, writing, blog, til).

- [ ] **Step 2: Assert nav links present site-wide**

Run: `grep -o 'href="/writing"' dist/projects/index.html | head -1`
Expected: prints `href="/writing"` (header shared on all pages).

- [ ] **Step 3: Push branch**

```bash
git push origin site-v2
```

- [ ] **Step 4: Open MR (do NOT merge yet — Phase 2/3 continue tomorrow)**

```bash
glab mr create -R glncy/glncy --source-branch site-v2 --target-branch main \
  --title "Phase 1: header + hero redesign (Direction A) + design tokens" \
  --description "Implements Phase 1 of the site v2 spec: shared Header (logo left/nav right, Writing dropdown, sticky+condense, mobile menu), glass design tokens, Button + SocialRow components, home hero social row + CTAs, and stub /writing /blog /til pages (filled in Phase 3)." --yes
```

---

## Self-Review

- **Spec coverage (Phase 1):** header Direction A ✅ (Task 4), logo-left/nav-right ✅, Writing dropdown ✅, sticky+condense ✅, mobile ✅, shared via Layout ✅ (Task 5), home hero social row (GitHub/LinkedIn/Email/Messenger) ✅ (Task 3+7), About Me + Writing CTAs ✅ (Task 7), design tokens ✅ (Task 1), reusable Button ✅ (Task 2). Stub routes so nav resolves ✅ (Task 6).
- **Deferred to Phase 2/3 (not in this plan):** SectionHeading/Badge/Divider components, page transitions polish, About timeline, Projects filter/featured, Contact form, Blog/TIL real content. (Design-token + Button/SocialRow foundation laid here.)
- **Placeholder scan:** none — all steps contain real code/commands. (Fixed the stray `<Fragment slot="after" />` inline in Task 7 Step 1.)
- **Consistency:** `.cta`/`.glass` reused by Button; tokens defined in Task 1 used by Header (Task 4) and reused utilities; settings fields (`contact.*`, `github`) already exist and are read by SocialRow.
