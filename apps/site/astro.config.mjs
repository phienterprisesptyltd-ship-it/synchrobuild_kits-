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
      // Exclude pages that should not be indexed. /testimonials is
      // temporarily excluded until real customer testimonials replace the
      // current placeholder content - see src/pages/testimonials.astro.
      // /inspiration-gallery now renders genuine, business-approved
      // project photos, so it's included again.
      filter: (page) => !page.includes('/404') && !page.includes('/testimonials'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});