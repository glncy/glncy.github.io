// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import embeds from 'astro-embed/integration';

import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Custom domain (public/CNAME -> glncy.is-a.dev). User site at domain root: no `base`.
export default defineConfig({
  site: 'https://glncy.is-a.dev',

  // Astro 7 defaults to the Sätteri processor, which doesn't run remark/rehype
  // plugins. astro-embed registers a remark plugin, so we opt back into the
  // unified() pipeline (needs @astrojs/markdown-remark).
  markdown: {
    processor: unified(),
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // embeds() must come BEFORE mdx(). Auto-embeds bare URLs (YouTube, Vimeo,
  // Tweet, Bluesky, Gist, link previews) on their own line in .md/.mdx, and
  // provides <YouTube/> etc. components for manual use.
  integrations: [
    embeds(),
    mdx(),
    react(),
    icon(),
    // Exclude the CMS admin from the sitemap (it's not public content).
    sitemap({ filter: (page) => !page.includes('/admin') }),
  ],
});