// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Placeholder — Cloudflare/domain isn't connected yet. Confirm the real
  // production domain before launch and update this (affects canonical URLs
  // and OpenGraph tags only, not routing).
  site: 'https://www.synchrobuild.com.au',
  vite: {
    plugins: [tailwindcss()]
  }
});