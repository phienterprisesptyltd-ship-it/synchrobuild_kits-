// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Production domain for canonical URLs and sitemap generation.
  // Verify this matches the deployed domain before launch.
  site: 'https://www.synchrobuild.com.au',
  integrations: [
    sitemap({
      // Exclude pages that should not be indexed:
      // - /404: error page, not indexable
      // - /inquiry: redirect to canonical /get-started (avoid duplicate content)
      // - /testimonials: placeholder content until real testimonials added
      filter: (page) => !page.includes('/404') && !page.includes('/inquiry') && !page.includes('/testimonials'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});