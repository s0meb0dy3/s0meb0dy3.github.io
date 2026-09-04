import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://s0meb0dy3.github.io',
  devToolbar: { enabled: false },
  base: process.env.BASE_PATH || '/',
  markdown: { shikiConfig: { theme: 'github-light' } },
});
