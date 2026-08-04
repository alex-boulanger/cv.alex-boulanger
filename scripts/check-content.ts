import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const CONTENT_DIR = resolve(process.cwd(), "src/content");
const MARKER = /TODO/;

const files = (await readdir(CONTENT_DIR)).filter((name) =>
  name.endsWith(".ts"),
);

const found: string[] = [];

for (const name of files) {
  const source = await readFile(join(CONTENT_DIR, name), "utf8");
  source.split("\n").forEach((line, index) => {
    if (MARKER.test(line)) {
      found.push(`src/content/${name}:${index + 1}  ${line.trim()}`);
    }
  });
}

if (found.length > 0) {
  console.error(`Placeholders left in résumé data (${found.length}):\n`);
  for (const entry of found) console.error(`  ${entry}`);
  console.error("\nFill these in, or delete the line, before publishing.");
  process.exit(1);
}

console.log("Content check passed — no placeholders left.");
