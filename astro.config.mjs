import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rohithkalisetti13.github.io',
  base: '/',
  // the IDE moved onto the laptop in the desk world
  redirects: {
    '/ide': '/#about',
  },
});
