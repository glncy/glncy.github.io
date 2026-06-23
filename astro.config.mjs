// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import rehypeEmbeds from './src/lib/rehype-embeds.mjs';

// https://astro.build/config
// Custom domain (public/CNAME -> glncy.is-a.dev). User site at domain root: no `base`.
export default defineConfig({
  site: 'https://glncy.is-a.dev',

  markdown: {
    // Auto-embed bare YouTube/Vimeo links in any markdown body.
    rehypePlugins: [rehypeEmbeds],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});