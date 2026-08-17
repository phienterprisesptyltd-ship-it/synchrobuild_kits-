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
      // Exclude pages that should not be indexed. /testimonials and
      // /inspiration-gallery are temporarily excluded until real customer
      // testimonials / verified project photos replace the current
      // placeholder content - see src/pages/testimonials.astro and
      // src/pages/inspiration-gallery.astro.
      filter: (page) => !page.includes('/404') && !page.includes('/testimonials') && !page.includes('/inspiration-gallery'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});