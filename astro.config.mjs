// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
// Custom domain (public/CNAME -> glncy.is-a.dev). User site at domain root: no `base`.
export default defineConfig({
  site: 'https://glncy.is-a.dev',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});