# Phase 4 — Polish & Ship Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (or subagent-driven-development) to implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Finish the design-system polish not covered in Phases 1–3 (gentle page transitions), do a mobile QA pass, then ship the whole `site-v2` branch to production.

**Architecture:** Astro 7 already has `<ClientRouter />` (View Transitions). Add subtle fade/slide transition animations + a `prefers-reduced-motion` guard for them (transitions only — glitch/lofi background stay as-is per spec). Then merge → GitLab→GitHub mirror → Pages.

**Verification:** `bun run build` + visual check. **Branch:** `site-v2`.

---

### Task 1: Gentle page transitions

**Files:**
- Modify: `src/layouts/Layout.astro` (add a transition name on `<main>`)
- Modify: `src/styles/global.css` (transition keyframes + reduced-motion guard)

- [ ] **Step 1: Name the main region for transitions**

In `src/layouts/Layout.astro`, change the opening `<main ...>` tag to:

```astro
    <main class="relative z-10" transition:animate="fade">
```

(`transition:animate="fade"` uses Astro's built-in fade. If you want a custom slide, see Step 2.)

- [ ] **Step 2: Respect reduced motion (global.css)**

Append to `src/styles/global.css`:

```css
/* Honor reduced-motion for page transitions only (background art unchanged). */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

- [ ] **Step 3: Build + commit**

Run: `bun run build` — Expected: "Complete!".

```bash
git add src/layouts/Layout.astro src/styles/global.css
git commit -m "feat(ui): gentle page fade transition + reduced-motion guard"
```

---

### Task 2: Mobile QA pass

**Files:** (only fix what's broken; likely small tweaks)
- Potentially: `src/components/sections/Projects.astro`, `JobHistory.astro`, `src/pages/contact.astro`, writing pages.

- [ ] **Step 1: Build + run dev**

Run: `bun run dev`, open `http://localhost:4321` and check at a narrow width (≤414px):
- Header: centered logo; on inner pages the centered nav wraps cleanly; Writing caret menu opens on tap and is on-screen.
- About: timeline readable, nodes aligned, cards full-width.
- Projects: filter chips wrap; cards single-column; featured section stacks.
- Contact: form full-width, inputs tappable; socials wrap; copy-email works.
- Writing/Blog/TIL: cards single-column; detail pages readable; embeds responsive.

- [ ] **Step 2: Fix any overflow/spacing issues found**

Apply targeted CSS fixes (e.g., add `max-width:100%`, adjust paddings, ensure `flex-wrap`). Keep changes minimal.

- [ ] **Step 3: Build + commit**

```bash
git add -A
git commit -m "fix(ui): mobile QA pass (spacing/overflow tweaks)"
```

---

### Task 3: Ship — merge, mirror, deploy

**Files:** none (ops).

- [ ] **Step 1: Push branch + open MR (GitLab is source of truth)**

```bash
git push origin site-v2
glab mr create -R glncy/glncy --source-branch site-v2 --target-branch main \
  --title "Site v2: header/hero, page upgrades, Writing (Blog+TIL), polish" \
  --description "Phases 1–4 of the site v2 spec." --yes
```

- [ ] **Step 2: Review, then merge the MR**

```bash
glab mr merge <MR_NUMBER> -R glncy/glncy --yes --remove-source-branch
```

- [ ] **Step 3: Sync the GitLab→GitHub mirror**

After merge, trigger the mirror (FAT token; this batch touches no `.github/workflows/`, so the fine-grained token works):

```bash
MID=$(glab api "projects/glncy%2Fglncy/remote_mirrors" | python3 -c "import sys,json;print(json.load(sys.stdin)[0]['id'])")
glab api -X POST "projects/glncy%2Fglncy/remote_mirrors/$MID/sync"
```

Wait out the ~5-min cooldown if the timestamp doesn't advance; re-trigger. Verify:

```bash
gh api repos/glncy/glncy.github.io/commits/main --jq '.sha[0:7] + " " + .commit.message'
```

Expected: the merge commit on GitHub `main`.

- [ ] **Step 4: Confirm deploy**

```bash
gh run list -R glncy/glncy.github.io --limit 1
curl -s -o /dev/null -w "%{http_code}\n" -L https://glncy.is-a.dev/
```

Expected: latest workflow success; site returns 200. Spot-check `/writing`, `/blog`, `/til`, `/about`, `/projects`, `/contact` live.

- [ ] **Step 5: Post-ship CMS setup (manual, user)**

- In Sveltia (`/admin`), Site Settings → paste **Web3Forms access key** (`web3formsKey`) and optional **schedule URL** (`scheduleUrl`).
- Create a real Blog post + TIL via the CMS to confirm the end-to-end authoring flow.

---

## Self-Review

- **Spec coverage:** page transitions ✅ (Task 1) with reduced-motion guard; mobile pass ✅ (Task 2); ship pipeline ✅ (Task 3) matching the established GitLab→mirror→Pages flow.
- **Notes:** Design-system tokens/components/type/icons/micro-interactions were delivered across Phases 1–3; this phase only adds transitions + QA + deploy. Background glitch/lofi explicitly untouched.
- **Placeholder scan:** `<MR_NUMBER>` in Task 3 Step 2 is intentionally filled from Step 1's output at run time (the only runtime value).
