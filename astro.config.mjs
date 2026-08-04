// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cv.alex-boulanger.dev',
  build: {
    // One document, one request: inlining the CSS removes the render-blocking
    // stylesheet and makes the PDF render deterministic.
    inlineStylesheets: 'always',
  },
});
