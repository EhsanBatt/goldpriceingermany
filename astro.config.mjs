import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goldpricegermany.online',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'ar',
        locales: {
          ar: 'ar',
          en: 'en',
          de: 'de',
          tr: 'tr'
        }
      }
    })
  ]
});
