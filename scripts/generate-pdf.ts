/**
 * Renders the built site to PDF, and to the Open Graph card.
 *
 * There is no PDF template. Chromium loads the same `dist/index.html` a
 * visitor gets, applies `print.css`, and prints it — so the document a
 * recruiter downloads cannot drift from the one they saw.
 *
 * Run after `astro build`:
 *   pnpm run pdf
 */

import { createReadStream, existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright';

import { profile } from '../src/content/profile';

const DIST = resolve(process.cwd(), 'dist');
const PDF_PATH = join(DIST, profile.pdfFileName);
const OG_PATH = join(DIST, 'og.png');

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

/**
 * A static server for `dist/`. Printing over `file://` would break every
 * root-relative URL — fonts included — and fonts are the whole layout.
 */
function serve(root: string): Promise<{ server: Server; origin: string }> {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ''));

    try {
      if ((await stat(file).catch(() => null))?.isDirectory()) {
        file = join(file, 'index.html');
      }
      if (!existsSync(file)) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.writeHead(200, {
        'content-type': MIME[extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-store',
      });
      createReadStream(file).pipe(res);
    } catch (error) {
      res.writeHead(500).end(String(error));
    }
  });

  return new Promise((done, fail) => {
    server.on('error', fail);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (typeof address === 'string' || address === null) {
        fail(new Error('Static server did not report a port.'));
        return;
      }
      done({ server, origin: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function main(): Promise<void> {
  if (!existsSync(join(DIST, 'index.html'))) {
    throw new Error('dist/index.html is missing. Run `astro build` first.');
  }

  const { server, origin } = await serve(DIST);
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
    });
    // The load animation must not be caught halfway by the screenshot, and the
    // card is printed on white like the PDF.
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
    await page.goto(origin, { waitUntil: 'networkidle' });

    // Web fonts settle after paint; printing early gives fallback metrics.
    await page.evaluate(() => document.fonts.ready);

    await page.screenshot({ path: OG_PATH });

    await page.pdf({
      path: PDF_PATH,
      printBackground: true,
      // `@page` in print.css owns the paper size and margins.
      preferCSSPageSize: true,
      tagged: true,
      outline: false,
    });

    console.log(`PDF      ${PDF_PATH}`);
    console.log(`OG card  ${OG_PATH}`);
  } finally {
    await browser.close();
    await new Promise((done) => server.close(done));
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
