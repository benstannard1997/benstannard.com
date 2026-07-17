// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://benstannard.example',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
